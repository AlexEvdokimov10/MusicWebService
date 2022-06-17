import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App';

import reportWebVitals from './reportWebVitals';

import 'macro-css';
import {Provider} from "react-redux";
import {store} from "./reduces";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store} >
        <App />
    </Provider>,
);

