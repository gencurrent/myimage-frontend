import React from 'react';
import PropTypes from 'prop-types';

class Resizer extends React.Component {

    static propTypes = {
        imageSources: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
    }

    constructor(props){
        super(props);
    
        this.imgRef = React.createRef();
        this.state = {

        };
    }

    onImageLoaded = (e, fileUuid) => {
        const image = e.target;
        const size = {
            height: image.naturalHeight,
            width: image.naturalWidth,
        }
        console.log(`onImageLoaded -> size `, size);
        this.props.onImageLoaded && this.props.onImageLoaded(fileUuid, size);
    }

    render() {
        return(
            <>
            <div className='container'>
                <div className='row'>
                    {Object.keys(this.props.imageSources).map(fileUuid =>
                        (<div className='component-resizer col-lg-4'>
                            <div className='component-resizer-square mx-auto'>
                                <div className='resizer-container'>
                                    <img
                                        className='resizer-image'
                                        onLoad={(e) => {this.onImageLoaded(e, fileUuid)}}
                                        ref={this.imgRef} 
                                        src={this.props.imageSources[fileUuid].file}
                                    />
                                </div>
                            </div>
                        </div>))
                    }
                </div>
            </div>
            </>
        );
    }
};


export default Resizer;