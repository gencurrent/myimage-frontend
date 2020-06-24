import React from 'react';

import { 
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import {
    Navbar,
    Nav
} from 'react-bootstrap';

import BottomLine from 'components/BottomLine';
import AppSwitch from './AppSwitch';

import Logo from 'resources/logo.png';

class MainTemplate extends React.Component {
    render(){
        return (
            <Router>
                <Navbar bg="light" expand="lg">

                <Link className="navbar-brand" to="/">
                    <img height="30" src={Logo}/>
                </Link>
                <Navbar.Brand><Link to='/'>AB-images</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to='/'>Home</Link>
                        <Link className="nav-link" to='/crop-image'>Crop image</Link>
                        <Link className="nav-link" to='/crop-multiple-formats'>Bulk cropping</Link>
                        <Link className="nav-link" to='/about'>About</Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <div className="main">
                        
                    <AppSwitch/>

                </div>
                {/* <BottomLine/> */}
            </Router>
        )
    }
};

export default MainTemplate;