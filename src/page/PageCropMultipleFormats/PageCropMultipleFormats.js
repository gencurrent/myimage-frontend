import React from 'react';
import axios from 'axios';

import DragAndDrop from 'components/DragAndDrop';
import Cropper from 'components/Cropper';
import TitleSubtitle from 'components/TitleSubtitle';

class PageCropMultipleFormats extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            file: null,
            fileRaw: null,
            croppers: {},   // uuid: {}
        }
        this.addCropper = this.addCropper.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.onCroppingUpdated = this.onCroppingUpdated.bind(this);
        this.onCropRequiredClicked = this.onCropRequiredClicked.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.removeCropper = this.removeCropper.bind(this);

        // Temp
        this.formats = [
            {
                slug: 'custom-format',
                name: 'Custom format',
                aspect: undefined,
            },
            {
                slug: 'instagram-post',
                name: 'Instagram Post',
                aspect: 4/5,
            },
            {
                slug: 'facebook-post',
                name: 'FaceBook Post',
                aspect: 2.5,
            },
        ]
    }

    handleDrop = (file, fileRaw) => {
        this.setState({
            file: file, 
            fileRaw: fileRaw,
            croppers: {},
        });
    }


    onCroppingUpdated = (cropperUuid, cropData) => {
        let croppers = this.state.croppers;
        croppers[cropperUuid].crop = cropData;

        this.setState({
            croppers: croppers
        });
    }

    addCropper = () => {
        axios.post('/api/cropper/crop-data',{})
            .then(response => {
                let croppers = this.state.croppers;
                const uuidResponse = response.data.uuid;
                croppers[uuidResponse] = {
                    format: this.formats[0]
                };
                console.log(`addCropper -> this.state.croppers `, this.state.croppers)
                this.setState({
                    croppers: croppers
                })
            })
            .catch(err => {
                
            })
    }

    removeCropper = cropperUuid => {
        console.log(`removing the cropper`, cropperUuid)
        let croppers = this.state.croppers;
    
        delete croppers[cropperUuid];
        this.setState({
            croppers: croppers
        })

    }
    


    handleDownload(e) {
        e.preventDefault();
        console.log(`handleCrop -> this.state.croppers`, this.state.croppers);
        
        let formData = new FormData();
        formData.append('image', this.state.fileRaw);
        const croppers = this.state.croppers;
        axios.post(
            `/api/cropper/set-data`,
            croppers
        ).then(
            () => {
                axios.post(
                    '/api/cropper/crop-images',
                    formData, 
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                .then(resp => {
                    console.log(`handleDownload -> this.state.croppers `, this.state.croppers)
                })
            }
        )
        
    }

    onCropRequiredClicked = (cropUuid, fullData) => {
        
        let formData = new FormData();
        formData.append('image', this.state.fileRaw);
        const cropper = this.state.croppers[cropUuid];
        console.log(`onCropRequiredClicked -> this.state.croppers`, this.state.croppers);
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
                console.log(`onCropRequiredClicked -> cropping`, resp);
                // const link = document.createElement('a');
                // link.href = `your_link.pdf`;
                // document.body.appendChild(link);
                // link.click();
                // document.body.removeChild(link);
            })
        )
    }

    render(){
        return (
        
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <TitleSubtitle 
                            title="Bulk crop images for multiple formats" 
                            subtitle="Use the tool for getting multiple crops from JPG, PNG or GIF"
                        />
                        <div className="mx-auto">
                            <DragAndDrop className="mx-auto" handleDrop={this.handleDrop}>
                                <div style={{'min-height': '300px', 'min-width': '250px'}}>
                                    { this.state.fileRaw && 
                                    <img alt="uploaded image" className="drop-box_image-loaded" />
                                    }
                                </div>
                            </DragAndDrop>
                        </div>

                        {this.state.file &&
                            <button
                                
                                className='btn btn-primary' 
                                onClick={e => this.addCropper()}
                            >Add cropping</button>
                        }

                        <div>
                            { this.state.file &&  this.state.croppers &&
                                Object.keys(this.state.croppers).map(cropperUuid => {
                                    const cropper = this.state.croppers[cropperUuid];
                                    let formatSelection = this.formats.find(e => (e.slug === cropper.format.slug))
                                    return (

                                        <div className="row">
                                            <div className="col-lg-12">
                                            
                                                <Cropper 
                                                    className="mx-auto"
                                                    image={this.state.file}
                                                    formats={this.formats}
                                                    uuid={cropperUuid}
                                                    onCropRequiredClicked={this.onCropRequiredClicked}
                                                    onCroppingUpdated={this.onCroppingUpdated}
                                                    removeButton
                                                    onCropperRemoveButtonClicked={this.removeCropper}
                                                />
                                                
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {this.state.file && Object.keys(this.state.croppers).length > 0 && 
                            <button
                                className='btn btn-primary'
                                onClick={this.handleDownload}
                            >Crop</button>
                        }
                    </div>
                </div>
            </div>
        )
    }
};

export default PageCropMultipleFormats;