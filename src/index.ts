import { createElement } from 'react';
import { render } from 'react-dom'
import App from './App/App';
import { init } from './App/Api';

render(createElement(App), document.querySelector('main'), () => init())