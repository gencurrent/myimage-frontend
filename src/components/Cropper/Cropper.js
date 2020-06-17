import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

class Cropper extends React.Component {

    static propTypes = {
        image: PropTypes.string.isRequired,
        format: PropTypes.object.isRequired,
        onCroppingUpdated: PropTypes.func.isRequired,
        uuid: PropTypes.string,
        removeCropper: PropTypes.func,
    }

    constructor(props){
        super(props);
        console.log(`Croppper -> props`, this.props);
        this.state = {
            crop: {
                aspect: this.props.format.aspect,
                unit: '%',
                width: 30,
            }
        }

        this.reactCrop = React.createRef();

        this.updateCrop = this.updateCrop.bind(this);
        this.removeCropper = this.removeCropper.bind(this);
        // this.onLoad = this.onLoad.bind(this);

    }

    removeCropper = e => {
        this.props.removeCropper && this.props.removeCropper(this.props.uuid);
    }

    // onLoad = img => {
    //     this.originalImage = img;
    //     this.setState({
    //         imageOriginal: {
    //             naturalHeight: img.naturalHeight,
    //             naturalWidth: img.naturalWidth,
    //         }
    //     });
      
    //     const aspect = this.props.format.aspect;
    //     const width = img.width > img.height ? 100 : ((img.height * aspect) / img.width) * 100;
    //     const height = img.height > img.width ? 100 : (img.width / aspect / img.height) * 100;
    //     const y = (100 - height) / 2;
    //     const x = (100 - width) / 2;
      
    //     this.setState({
    //         crop: {
    //             unit: '%',
    //             width,
    //             x,
    //             y,
    //             aspect,
    //         }
    //     });
      
    //     return false; // Return false if you set crop state in here.
    //   };

    updateCrop = (newCrop, percentCrop) => {
        this.setState(
            {crop: newCrop}, 
            () => {
                console.log(`Croppping updated`);
                console.log(this.reactCrop.current.imageRef)
                const fullData = {
                    ...this.state.crop,
                    image_height: this.reactCrop.current.imageRef.clientHeight,
                    image_width: this.reactCrop.current.imageRef.clientWidth,
                }
                this.props.onCroppingUpdated(this.props.uuid, fullData);
            }
        );
    }

    render(){
        // console.log(`Cropper -> props`, this.props)
        return (
            <div className='crop-box'>
                <button onClick={this.removeCropper}>Remove</button>
                {this.props.image && 
                    <ReactCrop
                        ref={this.reactCrop}
                        src={this.props.image}
                        crop={this.state.crop}
                        onChange={newCrop => this.updateCrop(newCrop)}
                        // onImageLoaded={this.onLoad}
                    />
                }
                <buton>
                    Download crop
                </buton>
            </div>
        )
    }
};

export default Cropper;