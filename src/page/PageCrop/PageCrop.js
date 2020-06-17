import React from 'react';
import axios from 'axios';

import DragAndDrop from 'components/DragAndDrop';
import Cropper from 'components/Cropper';

class PageCrop extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            file: null,
            fileRaw: null,
            croppers: {},   // uuid: {}
        }
        this.handleDrop = this.handleDrop.bind(this);
        this.onCroppingUpdated = this.onCroppingUpdated.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.removeCropper = this.removeCropper.bind(this);

        // Temp
        this.formats = [
            {
                name: 'Instagram post',
                aspect: 1.91,
            },
            {
                name: 'Instagram Post',
                aspect: 0.5,
            },
            {
                name: 'FaceBook Post',
                aspect: 2.5,
            },
            {
                name: 'Custom format',
                aspect: undefined,
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
        console.log('onCroppingUpdated -> this.state.croppers -> ', this.state.croppers)
        console.log(cropperUuid)
        console.log(cropData);
        let croppers = this.state.croppers;
        croppers[cropperUuid].crop = cropData;

        this.setState({
            croppers: croppers
        });

        axios.put('http://127.0.0.1:3000/api/cropper/crop-data',
            Object.keys(croppers).map(cropper => croppers[cropper].crop)
        )
            .then(response => {
                console.log(`onCroppingUpdated ->`, response)
                let croppers = this.state.croppers;
            })
    }

    addCropper = (formatName) => {
        const formatSelection = this.formats.find(e => e.name === formatName)
        console.log(`Added the format`, formatSelection);
        let croppers = this.state.croppers;
        axios.post('http://127.0.0.1:3000/api/cropper/crop-data',
        {
            format: formatSelection
        }
        )
            .then(response => {
                console.log(`onCroppingUpdated ->`, response)
                let croppers = this.state.croppers;
                const uuidResponse = response.data.uuid;
                croppers[uuidResponse] = {
                    format: formatSelection
                };
                this.setState({
                    croppers: croppers
                })
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
        axios.post(
            'http://127.0.0.1:3000/api/cropper/crop-image', 
            formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            )
            .then(resp => {
                console.log(`returned from file uploading`);
            })
            
    }

    render(){
        return (
        
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        
                        <div>
                            Please, upload a file below
                        </div>
                        <div className="mx-auto">
                            <DragAndDrop className="mx-auto" handleDrop={this.handleDrop}>
                                <div style={{'min-height': '300px', 'min-width': '250px'}}>
                                    { this.state.fileRaw && 
                                    <img className="drop-box_image-loaded" />
                                    }
                                </div>
                            </DragAndDrop>
                        </div>

                        <div>
                            Crop the file below
                        </div>

                        {this.state.file && 
                            this.formats.map(format => 
                                <button 
                                    key={format.name}
                                    onClick={e => this.addCropper(format.name)}
                                >
                                    Add {format.name}
                                </button>
                                
                            )
                        }

                        <div>
                            { this.state.file &&  this.state.croppers &&
                                Object.keys(this.state.croppers).map(cropperUuid => {
                                    console.log(this.state.croppers);
                                    const cropper = this.state.croppers[cropperUuid];
                                    console.log(`Cropper udpated ->`, cropper);
                                    let formatSelection = this.formats.find(e => (e.name === cropper.format.name))
                                    console.log(formatSelection);
                                    return (

                                        <div className="row">
                                            <div className="col-lg-12">
                                            
                                                <Cropper 
                                                    className="mx-auto"
                                                    image={this.state.file}
                                                    format={cropper.format}
                                                    uuid={cropperUuid}
                                                    onCroppingUpdated={this.onCroppingUpdated}
                                                    removeCropper={this.removeCropper}
                                                // getCropInfo={this.getCropInfo}
                                                />
                                                
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            Download the file
                        </div>
                        <button 
                            disabled={this.state.file === null}
                            onClick={this.handleDownload}
                        >
                            Crop
                        </button>



                
                    </div>
                </div>
            </div>
        )
    }
};

export default PageCrop;