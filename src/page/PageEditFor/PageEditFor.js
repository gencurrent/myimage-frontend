import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

import TitleSubtitle from 'components/TitleSubtitle';
import CropForElement from 'components/CropForElement';
import ContainerSingle from 'components/ContainerSingle';

import FORMAT_TREE from 'utils/imageFormats';

import ICON_INSTAGRAM from 'resources/brands/icon-instagram.png';
import ICON_FACEBOOK from 'resources/brands/icon-facebook.png';

const CropForArray = [
    {
        title: 'Instagram',
        icon: ICON_INSTAGRAM,
        url: '/edit-for/instagram'
    },
    {
        title: 'Facebook',
        icon: ICON_FACEBOOK,
        url: '/edit-for/facebook'
    }
]

class PageEditFor extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (

            <ContainerSingle className='text-center'>

                <TitleSubtitle
                    title='Edit image for a special app'
                    subtitle='Crop or resize my image for the application I want'
                />

                <Container>
                    <Row>
                            
                            {Object.keys(FORMAT_TREE).map(application => {
                                const el = FORMAT_TREE[application];
                                return (
                                    <Col className='p-0 col-12' md={4} lg={3} xl={3}>
                                        <div className='crop-for-element_container'>
                                            <CropForElement
                                                title={el.title}
                                                url={`/edit-for/${application}`}
                                                icon={el.icon}
                                            />

                                        </div>
                                    </Col>   
                                )
                            })}

                    </Row>
                </Container>
            </ContainerSingle>
        )
    }
};


export default PageEditFor;