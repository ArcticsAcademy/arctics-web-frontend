import React from 'react';
import ReactDOM from 'react-dom';
import  * as smoothscroll from 'smoothscroll-polyfill';
import './index.css';
import './style.css';
//import './responsive.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// kick off the polyfill!
smoothscroll.polyfill();


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
