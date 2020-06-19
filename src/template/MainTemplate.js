import React from 'react';

import { 
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

import {
    Navbar,
    Nav,
    NavDropdown,
    Button
    
} from 'react-bootstrap';

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
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to='/'>Home</Link>
                        <Link className="nav-link" to='/crop-bulk'>Bulk cropping</Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                {/* <header className="header">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item dropdown-toggle">
                                    <Link className="nav-link" to='/'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/crop-bulk'>Bulk cropping</Link>
                                </li>

                            </ul>
                        </div>

                    </nav>
                </header> */}
                <div className="main">
                        
                    <AppSwitch/>

                </div>
            </Router>
        )
    }
};

export default MainTemplate;