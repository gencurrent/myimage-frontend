import React from 'react';
import axios from 'axios';

import DragAndDrop from 'components/DragAndDrop';
import Cropper from 'components/Cropper';

class PageCropSingle extends React.Component {
    constructor(props){
        super(props);

        this.handleDrop = this.handleDrop.bind(this);
        this.imageDropped = this.imageDropped.bind(this);
        this.onCroppingUpdated = this.onCroppingUpdated.bind(this);

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

        axios.put('/api/cropper/crop-data',
            Object.keys(croppers).map(cropper => croppers[cropper].crop)
        )
            .then(response => {
                console.log(`onCroppingUpdated ->`, response)
                // let croppers = this.state.croppers;
            })
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="mx-auto">
                            <DragAndDrop className="mx-auto" handleDrop={this.handleDrop} />
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                {this.state.file && Object.keys(this.state.croppers).map(cropperUuid => {
                                    return <Cropper 
                                        className="mx-auto"
                                        image={this.state.file}
                                        formats={[this.format]}
                                        uuid={cropperUuid}
                                        onCroppingUpdated={this.onCroppingUpdated}
                                    /> 
                                })}
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
};

export default PageCropSingle;