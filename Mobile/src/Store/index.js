import React from 'react';
import { Provider } from 'react-redux';
import App from '../Navigation';
// import Firebase from 'firebase/app';

import { init } from '@rematch/core';
import LoadingPlugin from '@rematch/loading';
import * as models from './Models';
import io from 'socket.io-client';

// require('../Utils/Firebase');

// import { firebaseConfig } from '../Utils';

// Firebase.initializeApp(firebaseConfig);
let socket;
export default () => {
  const [ sock, setSock ] = React.useState(null);
  React.useEffect(() => {
    // init socket-io
    socket = io('http://localhost:3001');
    setSock(socket);

    return () => {
      // socket.emit('disconnect');
    };
  }, []);
  const store = init({ models, plugins: [ LoadingPlugin({ asNumber: false }) ] });
  return (
    <Provider store={store}>
      <App socket={sock} />
    </Provider>
  );
};
