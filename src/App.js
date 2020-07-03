import React from 'react';
import { Provider } from 'react-redux';

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
          <MainTemplate/>
        </div>
      </AlertProvider>
    </Provider>
  );
}

export default App;
