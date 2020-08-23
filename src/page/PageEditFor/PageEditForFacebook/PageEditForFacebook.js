import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { withAlert } from 'react-alert';
import { Redirect } from 'react-router-dom';

import DragAndDrop from 'components/DragAndDrop';
import Cropper from 'components/Cropper';
import TitleSubtitle from 'components/TitleSubtitle';


class PageEditForFacebook extends React.Component {
    constructor(props){
        super(props);

        this.cropperRef = React.createRef();

        this.handleDrop = this.handleDrop.bind(this);
        this.onCroppingUpdated = this.onCroppingUpdated.bind(this);
        // this.onCropRequiredClicked = this.onCropRequiredClicked.bind(this);

        this.formats = [
            {
                slug: 'instagram-story',
                name: 'Instagram, FaceBook Story',
                aspect: 1080 / 1920,
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
        ];

        this.state = {
            file: null,
            fileRaw: null,
            cropper: {},    // crop data to sync cropping with server
            opUuid: null,   // UUID for the crop operation

            redirectResult: null,  //  Results are ready
        }
    }



    handleDrop = (file, fileRaw) => {
        this.setState({
            file: file, 
            fileRaw: fileRaw,
            cropper: {
                downloading: false
            },
        });
    }

    onCroppingUpdated = (cropperUuid, cropData) => {
        let cropper = this.state.cropper;
        cropper.crop = cropData;
        cropper.downloading = false;

        this.setState({
            cropper: cropper,
        }, () => {console.log(this.state.cropper)});
    }


    onActionButtonClicked = () => {
        console.log(this.cropperRef.current);
        const fullData = this.cropperRef.current.getFullData();
        console.log(`Full Data = `, fullData);
        let formData = new FormData();
        formData.append('image', this.state.fileRaw);
        // this.setState({
        //     cropper: {...this.state.cropper, downloading: true}
        // })


        const postData = () => {
            console.log(`postData: `, this.state.cropper);
            if (!this.state.opUuid){
                throw Error(`Operation key is not set:`, this.state.opUuid);
            }
            axios.post(
                `/api/cropper/crop-image/set-data/${this.state.opUuid}`,
                this.state.cropper.crop
            )
            .then(
                resp => {
                    axios.post(
                        `/api/cropper/crop-image/${this.state.opUuid}`,
                        formData
                    )
                    .then(resp => {

                        this.setState({
                            redirectResult: true
                        })
                    })
                    .catch( error => {
                        this.setState({croppers: {...this.state.cropper, downloading: false}});
                        this.props.alert.error('Something went wrong 😕');
                    })
                }
            )
            .catch( error => {
                this.setState({croppers: {...this.state.cropper, downloading: false}});
                this.props.alert.error('Something went wrong 😕');
            });
        }

        // Set system UUID
        if (!this.state.opUuid){
            axios.get('/api/system/set-ops/crop')
                .then(response => {
                    let cropper = this.state.cropper;
                    const respUuid = response.data.uuid;
                    cropper.downloading = true;
                    this.setState({
                        opUuid: respUuid,
                        cropper: cropper,
                    }, () => {console.log(`Updated cropper: `, this.state.cropper); postData()} );
                });
        }
        else {
            postData();
        }
    }

    render(){
        return (
            <>

                <Helmet>
                    <title>Edit image for Instagram fast, simple, free</title>
                    <meta name='description' content="Crop, resize or compress your single JPG, PNG or GIF image for Instagram standard post or story fast, simple and free"/>
                </Helmet>
                <div className="container text-center">

                    <div className='row text-center'>
                        <div className='col-12'>

                            <TitleSubtitle
                                title="Format image for Instagram"
                                subtitle="Make JPG, PNG or GIF fit for Instagram"
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
                            {this.state.file &&
                                <Cropper 
                                    ref={this.cropperRef}
                                    className="mx-auto"
                                    image={this.state.file}
                                    formats={this.formats}
                                    uuid={this.state.opUuid}
                                    onCroppingUpdated={this.onCroppingUpdated}
                                    // onCropRequiredClicked={this.onCropRequiredClicked}
                                    downloading={this.state.cropper.downloading}
                                /> 
                            }
                        </div>
                    </div>

                    {this.state.file && 
                        <div className='row'>
                            <div className='col-lg-12 mx-auto'>
                                <button
                                    className='btn btn-lg btn-primary'
                                    onClick={this.onActionButtonClicked}
                                >Download crop</button>
                            </div>
                        </div>
                    }
                </div>


                {this.state.redirectResult && 
                    <Redirect to={{
                        pathname: `/result/crop/${this.state.opUuid}`
                    }}/>
                }
            </>
        )
    }
};

export default withAlert()(PageEditForFacebook);