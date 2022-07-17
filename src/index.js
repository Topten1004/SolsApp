import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'dotenv/config';

import reportWebVitals from './utils/reportWebVitals';

ReactDOM.render(
  // <Web3ReactProvider getLibrary={getLibrary}>
    // <CookiesProvider>
      <App />,
    // </CookiesProvider>,
  // </Web3ReactProvider> ,
  document.getElementById('root')
);

reportWebVitals();
