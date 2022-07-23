import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertContainer } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
    <AlertContainer floatingTime={3000} />
  </React.StrictMode>
);
