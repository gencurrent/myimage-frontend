import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';
import Select from 'react-select';
import {
    Spinner
} from 'react-bootstrap';
import {
    ArrowDownCircleFill,
    DashCircleFill,
} from 'react-bootstrap-icons';

class Cropper extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        image: PropTypes.string.isRequired,
        formats: PropTypes.array,
        onCropRequiredClicked: PropTypes.func,
        onCroppingUpdated: PropTypes.func.isRequired,
        uuid: PropTypes.string,
        onCropperRemoveButtonClicked: PropTypes.func,
        removeButton: PropTypes.bool,       // Display button "Remove"
        downloading: PropTypes.bool,        // Is currently downloading state on the Download button
        showButtonDownload: PropTypes.bool, // Display button "Download"
    }

    constructor(props){
        super(props);
        this.defaultCropProperties = {
            unit: '%',
            width: 30,
        }

        this.formatSelectOptions = this.formFormatOptions();
        const formatOptionDefault = this.formatSelectOptions[0];

        // Image aspect
        const formatSelected = this.formatOptionToFormat(formatOptionDefault);
        let aspect = formatSelected.aspect;
        const sizeTarget = formatSelected.sizeTarget;   // Ideal image size described in the format object
        if (sizeTarget !== undefined){
            aspect =  sizeTarget.width / sizeTarget.height;
        }

        this.state = {
            selectedFormatOption: formatOptionDefault,
            crop: {
                aspect: aspect,
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
                console.log(`The image data = `, this.reactCrop.current.imageRef);
                const fullData = {
                    ...this.state.crop,
                    image_height: this.reactCrop.current.imageRef.clientHeight,
                    image_width: this.reactCrop.current.imageRef.clientWidth,
                }
                this.props.onCroppingUpdated(this.props.uuid, fullData);
            }
        );
    }

    downloadThisCrop = () => {
        console.log(`The image data = `, this.reactCrop.current.imageRef);
        const fullData = {
            ...this.state.crop,
            image_height: this.reactCrop.current.imageRef.clientHeight,
            image_width: this.reactCrop.current.imageRef.clientWidth,
        }
        
        if(this.props.onCropRequiredClicked){
            this.props.onCropRequiredClicked(this.props.uuid, fullData);
        }
    }
    
    getFullData = () => {
        console.log(`The full image data = `, this.reactCrop.current.imageRef);
        const fullData = {
            ...this.state.crop,
            image_height: this.reactCrop.current.imageRef.clientHeight,
            image_width: this.reactCrop.current.imageRef.clientWidth,
        }
        return fullData;
    }

    selectFormat = selectedFormatOption => {
        // Image aspect
        const formatSelected = this.formatOptionToFormat(selectedFormatOption);
        let aspect = formatSelected.aspect;
        const sizeTarget = formatSelected.sizeTarget;   // Ideal image size described in the format object
        if (sizeTarget !== undefined){
            aspect =  sizeTarget.width / sizeTarget.height;
        }

        console.log(`Format Selected = `, formatSelected);
        const crop = {
            ...this.defaultCropProperties,
            aspect: aspect
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
        
        let formatSelectColumnWidth  = 12;
        if (this.props.removeButton) {
            formatSelectColumnWidth -= 2;
        }
        const formatSelectColStyles = `col-lg-${formatSelectColumnWidth} col-sm-${formatSelectColumnWidth}`;
        return (
            <div className={`crop-box ${this.props.className || ''}`}>
                <div className='container my-1'>
                    
                    <div className='crop-box-controls row'>
                        { (this.props.formats.length > 1) && this.formatSelectOptions &&
                            <Select
                                className={formatSelectColStyles}
                                options={this.formatSelectOptions}
                                value={this.state.selectedFormatOption}
                                isSearchable={false}
                                onChange={this.selectFormat}
                            />
                        }
                        {this.props.removeButton && 
                            <div className='col-lg-2 col-sm-2'>
                                <button className="btn btn-danger w-100" onClick={this.removeCropper}><DashCircleFill size={24}/> Remove</button>
                            </div>
                        }
                    </div>
                </div>
                {this.props.image && 
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <ReactCrop
                                    ref={this.reactCrop}
                                    src={this.props.image}
                                    crop={this.state.crop}
                                    onChange={newCrop => this.updateCrop(newCrop)}
                                // onImageLoaded={this.onLoad}
                                />
                            </div>
                            { this.props.showButtonDownload && 
                                <div className='col-lg-12'>
                                    {/* <React.Component.Spinner animation="border" role="status" /> */}
                                    <button className='btn btn-primary float-right' onClick={this.downloadThisCrop}>
                                    {this.props.downloading ? 
                                        <><Spinner size='sm' animation="border" role="status"/> Downloading</>
                                        :
                                        <><ArrowDownCircleFill size={24}/> Download this crop</>
                                    }
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                }

            </div>
        )
    }
};

export default Cropper;