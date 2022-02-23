// ENTRY FILE
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../index.css';
import MyRoutes from './components/MyRoutes';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <MyRoutes />
    </Provider>
  </div>,
  document.getElementById('app')
);
