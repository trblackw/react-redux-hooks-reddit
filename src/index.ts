import { createElement } from 'react';
import { render } from 'react-dom';
import App from './App/App';
import './index.css'

render(createElement(App), document.querySelector('main'));
