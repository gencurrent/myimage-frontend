import React from 'react';
import PropTypes from 'prop-types';

class Resizer extends React.Component {

    static propTypes = {
        imageSource: PropTypes.string.isRequired
    }

    constructor(props){
        super(props);
    
        this.imgRef = React.createRef();
        this.state = {

        };
    }

    onImageLoaded = (e) => {
        const image = e.target;
        const size = {
            height: image.naturalHeight,
            width: image.naturalWidth,
        }
        this.props.onImageLoaded && this.props.onImageLoaded(size);
    }

    render() {
        return(
            <div className='component-resizer'>
                <img
                    onLoad={this.onImageLoaded}
                    ref={this.imgRef} 
                    src={this.props.imageSource}
                />
                
            </div>
        );
    }
};


export default Resizer;