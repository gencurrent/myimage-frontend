import React from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom';

const CropForElement = (props) => {
    return (
        <Link className='crop-for-element' to={props.url}>
            <div className='crop-for-element_image_container'>

                <img 
                    height='100%' 
                    width='100%' 
                    className='crop-for-element_image' 
                    src={props.icon} 
                />
            </div>
            <h4 className='crop-for-element_title link-unstyled'>{props.title}</h4>
        </Link>
    )
}

CropForElement.propTypes = {
    icon: PropTypes.object, // an Icon. Dummy is placed if no icon provided
    title: PropTypes.string.isRequired, // CropForElement title
    url: PropTypes.object.isRequired,   // URL CropForElement click is leading to
} 

export default CropForElement;