import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import { positions as AlertPosition, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import store from './redux';

// import PageCrop from './page/PageCrop';
import MainTemplate from 'template/MainTemplate';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {initSystem, setAxiosDefaults } from './system';

initSystem();
setAxiosDefaults();

const alertOptions = {
  timeout: 4000,
  position: AlertPosition.BOTTOM_CENTER
}

function App() {
  return (
    <Provider store={store}>
      {/* Error Provider */}
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <div className="App">

          <Helmet>
            <meta charSet="utf-8"/>
            <title>MyImage.io | Edit images the fast and simple way for free</title>
            <meta name='description' content="Easy and efficient way or modify your images with a set of tools: crop/cut, resize, format, crop with multiple formats and other image changing tools"/>
            <link rel='canonical' href='https://myimage.io'/>
          </Helmet>
          <MainTemplate/>
          
        </div>
      </AlertProvider>
    </Provider>
  );
}

export default App;
