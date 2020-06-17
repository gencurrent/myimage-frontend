import React from 'react';

import {
    Route,
    Switch
} from 'react-router-dom';

import PageCrop from 'page/PageCrop';
import Main from 'page/Main';

class AppSwitch extends React.Component {
    render(){
        return (
            <Switch>

                <Route path='/crop-bulk'>
                    <PageCrop/>
                </Route>

                <Route path='/'>
                    <Main/>
                </Route>
                
            </Switch>
        )
    }
}

export default AppSwitch;