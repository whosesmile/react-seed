import './less/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import App from './components';
import { history } from 'library/util';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={ App } />
    </Router>
  </Provider>,
  document.querySelector('#root')
);
