import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';
import ReduxWrapper from './redux';

ReactDOM.render(
  <ReduxWrapper>
    <Router basename="/">
      <App />
    </Router>
  </ReduxWrapper>,
  document.getElementById('root'),
);
