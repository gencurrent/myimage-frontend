import React from 'react';

import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import AppSwitch from './AppSwitch';

class MainTemplate extends React.Component {
    render(){
        return (
            <Router>
                <header className="header">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/crop-bulk'>Bulk cropping</Link>
                                </li>

                            </ul>
                        </div>

                    </nav>
                </header>
                <div className="main">
                        
                    <AppSwitch/>

                </div>
            </Router>
        )
    }
};

export default MainTemplate;