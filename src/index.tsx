import React, { createElement } from 'react';
import { render } from 'react-dom';
import App from './App/App';
import './index.css';
import { Provider } from 'react-redux';
import Store from './App/state';
//@ts-ignore
render(<Provider store={Store}>{createElement(App)}</Provider>, document.querySelector('main'));
