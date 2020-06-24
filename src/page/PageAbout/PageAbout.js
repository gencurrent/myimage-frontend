import React from 'react';

import ContainerSingle from 'components/ContainerSingle';
import TitleSubtitle from 'components/TitleSubtitle';

class PageAbout extends React.Component {
    render(){
        return (
            <ContainerSingle className='text-center'>
                
                <TitleSubtitle 
                    title="About myimage.io" 
                    subtitle="We keep things being simple"
                />
                <div className='shadow-sm'>
                    <p className='large text-center'>
                    MyImage.io is here to keep your image manipulation process the most simple and fast way.
                    </p>
                </div>

                <div className='shadow-sm'>
                    <p className='large text-center'>
                    We have our own vision about how image editing could be done.
                    </p>
                </div>

                <div className='shadow-sm'>
                    <p className='large text-center'>
                    It is free to use. We work, to keep you getting results easy in a short time.
                    </p>
                </div>

                <div className='shadow-sm'>
                    <p className='large text-center'>
                    Also, we would be kindly glad to get your questions, suggestions or anything else you would want to tell to improve the service.
                    Contact the developer:
                    contact@myimage.io
                    </p>
                </div>
            </ContainerSingle>
        )
    }
};

export default PageAbout;