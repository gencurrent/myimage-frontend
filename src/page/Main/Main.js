import React from 'react';

import { 
    Link
} from 'react-router-dom';

import TitleSubtitle from 'components/TitleSubtitle';
import IconCropSingle from 'resources/icon-crop-single.png';
import IconCropMultiformat from 'resources/icon-crop-multiformat.png';


class Main extends React.Component {
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <TitleSubtitle 
                            title="Edit your images easily" 
                            subtitle="We make image manipulations simple, fast and free"
                        />
                        <div className='container shadow-sm'>
                            <div className="row justify-content-lg-center">
                                <div className='text-center col-lg-9 col-sm-12 '>
                                    <div className='tools-table container'>

                                        <div className='row'>

                                            <Link className='link-unstyled col-lg-4 col-sm-12 my-3' to='/crop-image'>
                                                <div className='service-description'>
                                                    <div className='service-description_icon'>
                                                        <img className='sd-icon' alt='icon-crop-single' src={IconCropSingle}/>
                                                    </div>
                                                    <div className='service-description_title'><h3 className=''>Crop image</h3></div>
                                                    <div className='service-description_description'>Use visual editor or define size in pixels to crop your image and download it</div>
                                                </div>
                                            </Link>
                                            <Link className='link-unstyled col-lg-4 col-sm-12' to='/crop-multiple-formats'>
                                                <div className='service-description'>
                                                    <div className='service-description_icon'>
                                                        <img className='sd-icon' alt='icon-crop-single' src={IconCropMultiformat}/>
                                                    </div>
                                                    <div className='service-description_title'><h3 className=''>Crop bulk formats</h3></div>
                                                    <div className='service-description_description'>Select image and crop it to multiple formats, e.g. Square, Instagram Post, Facebook Post and etc</div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                            
                        
                    </div>
                </div>
            </div>

        )
    }
}

export default Main;