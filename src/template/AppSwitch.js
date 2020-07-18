import React from 'react';

import {
    Route,
    Switch
} from 'react-router-dom';

import PageCropMultipleFormats from 'page/PageCropMultipleFormats';
import PageCropSingle from 'page/PageCropSingle';
import PageResizeSingle from 'page/PageResizeSingle';
import PageAbout from 'page/PageAbout';
import PageResults from 'page/PageResults';
import Main from 'page/Main';

class AppSwitch extends React.Component {
    render(){
        return (
            <Switch>

                <Route path='/crop-multiple-formats'>
                    <PageCropMultipleFormats/>
                </Route>

                <Route path='/resize-image'>
                    <PageResizeSingle/>
                </Route>

                <Route path='/crop-image'>
                    <PageCropSingle/>
                </Route>

                // TODO: Finish URL parameter for results
                <Route path='/result/:operationType/:operationHash'>
                    <PageResults/>
                </Route>

                <Route exact path='/about'>
                    <PageAbout/>
                </Route>

                <Route exact path='/'>
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