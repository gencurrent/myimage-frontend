import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { withAlert } from 'react-alert';

import DragAndDrop from 'components/DragAndDrop';
import Cropper from 'components/Cropper';
import TitleSubtitle from 'components/TitleSubtitle';


class PageCropSingle extends React.Component {
    constructor(props){
        super(props);
        console.log(`this.props = `, this.props);

        this.handleDrop = this.handleDrop.bind(this);
        this.imageDropped = this.imageDropped.bind(this);
        this.onCroppingUpdated = this.onCroppingUpdated.bind(this);
        this.onCropRequiredClicked = this.onCropRequiredClicked.bind(this);

        this.format = {
            slug: 'custom-format',
            name: 'Custom format',
            aspect: undefined,
        };

        this.state = {
            file: null,
            fileRaw: null,
            croppers: {},
        }
    }


    imageDropped = () => {
        axios.post('/api/cropper/crop-data',{})
            .then((response) => {
                let croppers = {};
                const uuidResponse = response.data.uuid;
                croppers[uuidResponse] = {
                    format: this.format
                };
                this.setState({
                    croppers: croppers
                })
            })
    }

    handleDrop = (file, fileRaw) => {
        this.setState({
            file: file, 
            fileRaw: fileRaw,
            croppers: {},
        }, () => {this.imageDropped()});
    }

    onCroppingUpdated = (cropperUuid, cropData) => {
        let croppers = this.state.croppers;
        croppers[cropperUuid].crop = cropData;

        this.setState({
            croppers: croppers
        });
    }


    onCropRequiredClicked = (cropUuid, fullData) => {
        
        let formData = new FormData();
        formData.append('image', this.state.fileRaw);
        const cropper = this.state.croppers[cropUuid];
        cropper.downloading = true;
        const croppers = this.state.croppers;
        croppers[cropUuid] = cropper;
        this.setState({
            croppers: {...croppers}
        })

        axios.post(
            `/api/cropper/set-data/${cropUuid}`,
            cropper
        ).then(
            () => axios.post(
            `/api/cropper/crop-image/${cropUuid}`, 
            formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            )
            .then(resp => {
                console.log(this.state);
                const url = resp.data.url;
                const link = document.createElement('a');
                link.href = url;
                link.download = this.state.fileRaw.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                const croppers = this.state.croppers;
                croppers[cropUuid].downloading = false;
                this.setState({croppers: croppers});
            })
            .catch( error => {
                const croppers = this.state.croppers;
                croppers[cropUuid].downloading = false;
                this.setState({croppers: croppers});

                this.props.alert.error('Something went wrong 😕');
            })
        )
    }

    render(){
        return (
            <>

            <Helmet>
                <title>MyImage.io | Crop images fast, simple and free</title>
                <meta name='description' content="Crop your single JPG, PNG or GIF image fast, simple and free with MyImage.io cropper tool. Just drag area on an image and download cut result."/>
            </Helmet>
            <div className="container text-center">

                <div className='row text-center'>
                    <div className='col-12'>

                        <TitleSubtitle
                            title="Crop single image tool"
                            subtitle="Use the tool for cropping  JPG, PNG or GIF"
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 text-center mx-auto">
                        <DragAndDrop className="mx-auto" handleDrop={this.handleDrop} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        {this.state.file && Object.keys(this.state.croppers).map(cropperUuid => {
                            const cropper = this.state.croppers[cropperUuid]
                            return <Cropper 
                                className="mx-auto"
                                image={this.state.file}
                                formats={[this.format]}
                                uuid={cropperUuid}
                                onCroppingUpdated={this.onCroppingUpdated}
                                onCropRequiredClicked={this.onCropRequiredClicked}
                                downloading={cropper.downloading}
                            /> 
                        })}
                    </div>
                </div>
            </div>
            </>
        )
    }
};

export default withAlert()(PageCropSingle);