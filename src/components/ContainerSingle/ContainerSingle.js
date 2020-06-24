/**
 * A single container for including children's content.
 * Just wrap all the content for any page
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

const ContainerSingle = (props) => {
    return (
        <Container className={props.className}>
            <Row>
                <Col>
                    {props.children}
                </Col>
            </Row>
        </Container>
    )
};

ContainerSingle.propTypes = {
    className: PropTypes.string,
}

export default ContainerSingle;