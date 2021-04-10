import React from 'react';
import { Provider } from 'react-redux';
import App from '../Navigation';
// import Firebase from 'firebase/app';

import { init } from '@rematch/core';
import LoadingPlugin from '@rematch/loading';
import * as models from './Models';

// require('../Utils/Firebase');

// import { firebaseConfig } from '../Utils';

// Firebase.initializeApp(firebaseConfig);

export default () => {
  const store = init({ models, plugins: [ LoadingPlugin({ asNumber: false }) ] });
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
