import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import Select from 'react-select';

class Cropper extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        image: PropTypes.string.isRequired,
        formats: PropTypes.array,
        onCropRequiredClicked: PropTypes.func,
        onCroppingUpdated: PropTypes.func.isRequired,
        uuid: PropTypes.string,
        onCropperRemoveButtonClicked: PropTypes.func,
        removeButton: PropTypes.bool,
    }

    constructor(props){
        super(props);
        this.defaultCropProperties = {
            unit: '%',
            width: 30,
        }
        
        this.formatSelectOptions = this.formFormatOptions();
        const formatOptionDefault = this.formatSelectOptions[0];
        this.state = {
            selectedFormatOption: formatOptionDefault,
            crop: {
                aspect: this.formatOptionToFormat(formatOptionDefault).aspect,
                unit: '%',
                width: 30,
            }
        }

        this.reactCrop = React.createRef();

        this.updateCrop = this.updateCrop.bind(this);
        this.downloadThisCrop = this.downloadThisCrop.bind(this);
        this.removeCropper = this.removeCropper.bind(this);
        // this.onLoad = this.onLoad.bind(this);

    }

    formFormatOptions = () => {
        return this.props.formats.map(format => {
            return {
            value: format.slug,
            label: format.name,
        }});
    }

    formatOptionToFormat = selectedOption => {
        return this.props.formats.find(format => format.slug == selectedOption.value);
    }

    removeCropper = e => {
        this.props.onCropperRemoveButtonClicked && this.props.onCropperRemoveButtonClicked(this.props.uuid);
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
                const fullData = {
                    ...this.state.crop,
                    image_height: this.reactCrop.current.imageRef.naturalHeight,
                    image_width: this.reactCrop.current.imageRef.naturalWidth,
                }
                this.props.onCroppingUpdated(this.props.uuid, fullData);
            }
        );
    }

    downloadThisCrop = () => {

        const fullData = {
            ...this.state.crop,
            image_height: this.reactCrop.current.imageRef.clientHeight,
            image_width: this.reactCrop.current.imageRef.clientWidth,
        }
        
        if(this.props.onCropRequiredClicked){
            this.props.onCropRequiredClicked(this.props.uuid, fullData);
        }
    }

    selectFormat = selectedFormatOption => {
        const crop = {
            ...this.defaultCropProperties,
            aspect: this.formatOptionToFormat(selectedFormatOption).aspect
        }
        this.setState({
            selectedFormatOption: selectedFormatOption,
            crop: crop
        },
        () => {
            this.reactCrop.current.forceUpdate();
        }
        );
    }

    render(){
        return (
            <div className={`crop-box ${this.props.className || ''}`}>
                <div className='crop-box-controls d-flex flex-row'>
                    { (this.props.formats.length > 1) && this.formatSelectOptions && 
                        <Select
                            className='col-lg-10 col-sm-10'
                            options={this.formatSelectOptions}
                            value={this.state.selectedFormatOption}
                            isSearchable={false}
                            onChange={this.selectFormat}
                        />
                    }
                    {this.props.removeButton && 
                        <button className=" col-lg-2 col-sm-2 btn btn-danger p-2" onClick={this.removeCropper}>Remove</button>
                    }
                </div>
                {this.props.image && 
                    <ReactCrop
                        ref={this.reactCrop}
                        src={this.props.image}
                        crop={this.state.crop}
                        onChange={newCrop => this.updateCrop(newCrop)}
                    // onImageLoaded={this.onLoad}
                    />
                }
                <button className='btn btn-primary' onClick={this.downloadThisCrop}>Download this crop
                </button>
            </div>
        )
    }
};

export default Cropper;