import React from 'react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter >
    <App />
  </BrowserRouter>
);
