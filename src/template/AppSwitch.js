import React from 'react';

import {
    Route,
    Switch
} from 'react-router-dom';

import PageCropMultipleFormats from 'page/PageCropMultipleFormats';
import PageCropSingle from 'page/PageCropSingle';
import PageAbout from 'page/PageAbout';
import Main from 'page/Main';

class AppSwitch extends React.Component {
    render(){
        return (
            <Switch>

                <Route path='/crop-multiple-formats'>
                    <PageCropMultipleFormats/>
                </Route>

                <Route path='/crop-image'>
                    <PageCropSingle/>
                </Route>

                <Route exact path='/about'>
                    <PageAbout/>
                </Route>

                <Route path='/'>
                    <Main/>
                </Route>

                {/* <Route>
                    <Main/>
                </Route> */}
                
            </Switch>
        )
    }
}

export default AppSwitch;