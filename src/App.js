import React from 'react';
import { Provider } from 'react-redux';
import $ from 'jquery';

import store from './redux';

// import PageCrop from './page/PageCrop';
import MainTemplate from 'template/MainTemplate';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {initSystem, setAxiosDefaults } from './system';

initSystem();
setAxiosDefaults();

function App() {
  window.$ = window.jQuery = require('jquery');
  return (
    <Provider store={store}>
      
      
      <div className="App">
        <MainTemplate/>
        {/* <PageCrop/> */}
      
      </div>
    </Provider>
  );
}

export default App;
