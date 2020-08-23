import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { withAlert } from 'react-alert';
import {
    Button
} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';

import DragAndDrop from 'components/DragAndDrop';
import TitleSubtitle from 'components/TitleSubtitle';
import ContainerSingle from 'components/ContainerSingle';
import ToolHelperFormResize from 'components/ToolHelperForm/ToolHelperFormResize';
import Resizer from '../../components/Resizer';

import { Redirect } from 'react-router-dom';

class PageResizeSingle extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            stateFiles: {}, // All uploaded files
            resizeTo: {},
            resizeConfiguration: {},    // Resize state
            opUuid: null,   // Operation UUID (must be initialized before any requests)
            redirectResult: null,
        }
    }


    onDrop = (file, fileRaw) => {
        let stateFiles = this.state.stateFiles;
        const fileUuid = uuidv4();
        stateFiles[fileUuid] = {
            file: file,
            fileRaw: fileRaw,
        };
        this.setState({
            stateFiles: stateFiles
        });
    }

    // Set state after an image has been loaded to the <img ... /> of the Resizer component
    setInitialSize = (fileUuid, size) => {
        this.setState({
            resizeConfiguration:
                Object.keys(this.state.resizeConfiguration).length === 0 ?
                    size
                    :
                    this.state.resizeConfiguration,
        });
    }

    // The values in the ToolHelper form have been updated
    onResizeValuesUpdated = (resizeTo) => {
        this.setState({
            resizeTo: resizeTo
        });
    }


    // Main action button clicked
    actionButtonClicked = () => {
        const data = this.props.resizeState;
        let formData = new FormData();
        Object.keys(this.state.stateFiles).forEach(fileUuid => {
            const fileData = this.state.stateFiles[fileUuid];
            const fileNameSplitted = fileData.fileRaw.name.split('.');
            const extension = fileNameSplitted[fileNameSplitted.length - 1];
            formData.append(`${fileUuid}.${extension}`,
                fileData.fileRaw,
                `${fileUuid}.${extension}`);
        });


        // post all the collected data
        const postData = () => {
            if (!this.state.opUuid){
                throw Error(`Operation key is not set: ${this.state.opUuid}`);
            }
            axios.post(
                `/api/resizer/set-data/${this.state.opUuid}`,
                this.state.resizeTo
            )
            .then(
                axios.post(
                    `/api/resizer/resize-images/${this.state.opUuid}`,
                    formData
                )
                .then(resp => {
                    this.setState({
                        redirectResult: true
                    })
                })
                .catch( error => {
                    this.props.alert.error('Something went wrong 😕');
                })
            )
            .catch( error => {
                this.props.alert.error('Something went wrong 😕');
            });
        }

        // Set system UUID
        if (!this.state.opUuid){
            axios.get('/api/system/set-ops/resize')
                .then(response => {
                    this.setState({
                        opUuid: response.data.uuid
                    }, () => {postData();} );
                })
                .catch( error => {
                    this.props.alert.error('Something went wrong 😕');
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
                <title>Resize images Fast, Simple, Free | MyImage.io</title>
                <meta name='description' content="Resize your JPG, PNG or GIF images fast, simple and free with MyImage.io resizer tool. Define pixels to set desired dimensions"/>
            </Helmet>

            <ContainerSingle className='text-center'>

                <TitleSubtitle
                    title='Resize image'
                    subtitle='Select image, define image size in pixels, and resize it'
                />
                
                <div className="mx-auto">
                    <DragAndDrop className="mx-auto" handleDrop={this.onDrop}>
                        <div style={{'min-height': '300px', 'min-width': '250px'}}>
                            { this.state.fileRaw && 
                            <img alt="uploaded image" className="drop-box_image-loaded" />
                            }
                        </div>
                    </DragAndDrop>
                </div>


                <div className="row">
                            <div className="col-lg-12">
                {Object.keys(this.state.stateFiles) && 
                    <div>
                        { Object.keys(this.state.resizeConfiguration).length !== 0 ?
                        <ToolHelperFormResize
                            ref={this.toolHelperFormResizeRef}
                            resizeConfiguration={this.state.resizeConfiguration}
                            onValuesUpdated={this.onResizeValuesUpdated}
                        />
                        : 
                        <></>
                        }
                        <Resizer 
                            imageSources={this.state.stateFiles}
                            onImageLoaded={this.setInitialSize}
                        />
                        <Button
                        variant='primary'
                            onClick={this.actionButtonClicked}
                        >Resize ⬇️</Button>
                    </div>
                }
                </div>
                </div>
                {this.state.redirectResult && 
                    <Redirect to={{
                        pathname: `/result/resize/${this.state.opUuid}`
                    }}/>
                }
            </ContainerSingle>
            </>
        )
    }
};

export default withAlert()(PageResizeSingle);