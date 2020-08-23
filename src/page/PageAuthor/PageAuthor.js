import React from 'react';
import { Helmet } from 'react-helmet';

import ContainerSingle from 'components/ContainerSingle';
import TitleSubtitle from 'components/TitleSubtitle';


class PageAuthor extends React.Component {
    render(){
        
        <ContainerSingle className='text-center'>
            <Helmet>
                <title>Author of MyImage.io</title>
                <meta name='description' content="About the author of myimage.io image processing website"/>
            </Helmet>
        
            <div className='shadow-sm'>
                <p className='large text-center'>
                MyImage.io is here to keep your image manipulation process the most simple and fast way.
                </p>
            </div>

        </ContainerSingle>
    }
}