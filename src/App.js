import React from 'react';
import { Provider } from 'react-redux';

import store from './redux';

import PageCrop from './page/PageCrop';

import './App.css';
import {initSystem} from './system';

initSystem();

function App() {
  return (
    <Provider store={store}>
      
      
      <div className="App">
        <PageCrop/>
      
      </div>
    </Provider>
  );
}

export default App;
