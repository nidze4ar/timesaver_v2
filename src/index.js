import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StoredMain from './components/Main/StoredMain';
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.render(
  <Provider store={store}>
   <StoredMain /> 
  </Provider>
, document.getElementById('root'));







