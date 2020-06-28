import React from 'react';

import axios from 'axios';

import DragAndDrop from 'components/DragAndDrop';
import TitleSubtitle from 'components/TitleSubtitle';
import ContainerSingle from 'components/ContainerSingle';
import ToolHelperFormResize from 'components/ToolHelperForm/ToolHelperFormResize';
import Resizer from '../../components/Resizer';


class PageResizeSingle extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            file: null,
            fileRaw: null,
            resizers: {},
            resizeTarget: {},
            resizeState: {},
        }
    }



    imageDropped = () => {
        axios.post('/api/resizer/resize-data',{})
            .then((response) => {
                let resizers = {};
                const uuidResponse = response.data.uuid;
                // resizers[uuidResponse] = {
                //     format: this.format
                // };
                this.setState({
                    resizers: resizers
                })
            })
    }

    onDrop = (file, fileRaw) => {
        this.setState({
            file: file, 
            fileRaw: fileRaw,
            resizers: {},
            resizeState: {}
        }, () => {this.imageDropped()});
    }

    // Set state after an image has been loaded to the <img ... /> of the Resizer component
    setInitialSize = (size) => {
        this.setState({
            resizeTarget: size
        }, () => {console.log(this.state)});
    }

    // The values in the ToolHelper form have been updated
    onResizeValuesUpdated = (resizeState) => {
        this.setState({
            resizeState: resizeState
        }, () => {console.log(`Resize Values updated`, this.state)});
    }


    // Main action button clicked
    actionButtonClicked = () => {
        const data = this.props.resizeState;
        console.log(`data -> `, data);
    }

    
    render(){
        return (
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
                {this.state.fileRaw &&
                    <div>
                        { Object.keys(this.state.resizeTarget).length > 0 ?
                        <ToolHelperFormResize
                            ref={this.toolHelperFormResizeRef}
                            resizeTarget={this.state.resizeTarget}
                            onValuesUpdated={this.onResizeValuesUpdated}
                        />
                        : 
                        <></>
                        }
                        <Resizer 
                            imageSource={this.state.file}
                            onImageLoaded={this.setInitialSize}
                            
                        />
                        <button
                            onClick={this.actionButtonClicked}
                        >Cool button</button>
                    </div>
                }
                </div>
                </div>

                
            </ContainerSingle>
        )
    }
};

export default PageResizeSingle;