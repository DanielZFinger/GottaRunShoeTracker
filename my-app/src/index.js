import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'; // Import HashRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import awsconfig from './aws-exports'; // Check the actual import path
import {Amplify} from 'aws-amplify'; //Amplify is depreciated. Gotta have the brackets.


Amplify.configure(awsconfig);

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
