import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { withAlert } from 'react-alert';

import DragAndDrop from 'components/DragAndDrop';
import Cropper from 'components/Cropper';
import TitleSubtitle from 'components/TitleSubtitle';
import {
    PlusCircle,
    Files
} from 'react-bootstrap-icons';

class PageCropMultipleFormats extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            file: null,
            fileRaw: null,
            croppers: {},   // {key: string - operation UUID, value: Object{} - cropper}
            opUuid: null, // Base Operation UUID
        }
        this.addCropper = this.addCropper.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onCroppingUpdated = this.onCroppingUpdated.bind(this);
        this.onCropRequiredClicked = this.onCropRequiredClicked.bind(this);
        this.onActionButtonClicked = this.onActionButtonClicked.bind(this);
        this.removeCropper = this.removeCropper.bind(this);

        // Temp
        this.formats = [
            {
                slug: 'custom-format',
                name: 'Custom format',
                aspect: undefined,
            },
            {
                slug: 'square',
                name: 'Square (1:1)',
                aspect: 1,
            },
            {
                slug: 'instagram-post-square',
                name: 'Instagram Post (square)',
                aspect: 1,
            },
            {
                slug: 'instagram-post-portrait',
                name: 'Instagram Post (portrait)',
                aspect: 4/5,
            },
            {
                slug: 'instagram-post-landscape',
                name: 'Instagram Post (landscape)',
                aspect: 1.91,
            },
            {
                slug: 'instagram-story',
                name: 'Instagram, FaceBook Story',
                aspect: 1080 / 1920,
            },
            {
                slug: 'facebook-post',
                name: 'FaceBook Post',
                aspect: 1200 / 628,
            },
        ]
    }

    onDrop = (file, fileRaw) => {
        // Fix it to acquire the opUuid at the moment of clicking an Action Button
        axios.get('/api/system/set-ops/crop-multiformat')
            .then(resp => {
                this.setState({
                    file: file,
                    fileRaw: fileRaw,
                    croppers: {},
                    opUuid: resp.data.uuid
                });
            })
    }


    onCroppingUpdated = (cropperUuid, cropData) => {
        let croppers = this.state.croppers;
        croppers[cropperUuid].crop = cropData;
        this.setState({
            croppers: croppers
        });
    }

    addCropper = () => {
        axios.get('/api/system/set-ops/crop')
            .then(response => {
                let croppers = this.state.croppers;
                const opUuid = response.data.uuid;
                croppers[opUuid] = {
                    format: this.formats[0]
                };
                console.log(`addCropper -> this.state.croppers `, this.state.croppers)
                this.setState({
                    croppers: croppers
                })
            })
            .catch(err => {
                this.props.alert.error('Something went wrong 😕');
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
    

    // Download all crops on the page
    onActionButtonClicked(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('image', this.state.fileRaw);
        const croppers = this.state.croppers;
        axios.post(
            `/api/cropper/crop-images/set-data/${this.state.opUuid}`,
            croppers
        ).then(
            () => {
                axios.post(
                    `/api/cropper/crop-images/${this.state.opUuid}`,
                    formData,
                    {headers: {'Content-Type': 'multipart/form-data'}}
                )
                .then(resp => {
                    console.log(`onActionButtonClicked -> this.state.croppers `, this.state.croppers)
                })
                .catch(err => {
                    this.props.alert.error('Something went wrong 😕');
                })
            }
        )
        .catch(err => {
            this.props.alert.error('Something went wrong 😕');
        })
        
    }

    // Download a single crop result
    onCropRequiredClicked = (cropUuid, fullData) => {
        
        let formData = new FormData();
        formData.append('image', this.state.fileRaw);
        const cropper = this.state.croppers[cropUuid];
        console.log(`onCropRequiredClicked -> this.state.croppers`, this.state.croppers);
        axios.post(
            `/api/cropper/crop-image/set-data/${cropUuid}`,
            cropper.crop
        ).then(
            () => axios.post(
                `/api/cropper/crop-image/${cropUuid}`, 
                formData, 
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
            .then(resp => {
                const url = resp.data.url;
                const link = document.createElement('a');
                link.href = url;
                link.download = this.state.fileRaw.name;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
        )
    }

    render(){
        return (
            <>
            <Helmet>
                <title>Crop image with multiple size formats Fast, Free, Simple | MyImage.io</title>
                <meta name='description' content="Crop your JPG, PNG or GIF images to multiple aspects/ratios at the same time. Just upload a single image and add popular formats to cut the image."/>
            </Helmet>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <TitleSubtitle
                            title="Bulk crop images for multiple formats"
                            subtitle="Use the tool for getting multiple crops from JPG, PNG or GIF"
                        />
                        <div className="mx-auto">

                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <DragAndDrop className="mx-auto" handleDrop={this.onDrop}>
                                            <div style={{'min-height': '300px', 'min-width': '250px'}}>
                                                { this.state.fileRaw && 
                                                <img alt="uploaded image" className="drop-box_image-loaded" />
                                                }
                                            </div>
                                        </DragAndDrop>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {this.state.file &&

                            <div className="container my-4">
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <button
                                            className='btn btn-lg btn-success' 
                                            onClick={e => this.addCropper()}
                                        ><PlusCircle size={24} /> Add format</button>
                                    </div>
                                </div>
                            </div>
                        }

                        <div class='container my-2'>
                            <div className="row text-center">
                                { this.state.file &&  this.state.croppers &&
                                <>
                                    {Object.keys(this.state.croppers).map(cropperUuid => {
                                        const cropper = this.state.croppers[cropperUuid];
                                        let formatSelection = this.formats.find(e => (e.slug === cropper.format.slug))
                                        return (
                                                <div className="col-lg-10 col-sm-12 mx-auto my-4">
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
                                            )
                                        })
                                    }
                                    
                                </>
                                }
                            </div>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    {Object.keys(this.state.croppers).length > 0 && 
                                        <button
                                            className='btn btn-lg btn-success' 
                                            onClick={e => this.addCropper()}
                                        ><PlusCircle size={24}/> Add format
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                        {this.state.file && Object.keys(this.state.croppers).length > 0 && 
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <button
                                        className='btn btn-lg btn-primary'
                                        onClick={this.onActionButtonClicked}
                                    >Crop all and download zip</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            </>
        )
    }
};

export default withAlert()(PageCropMultipleFormats);