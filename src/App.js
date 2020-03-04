import React from 'react';

import {Provider} from 'react-redux';
import store from './store'

// Components
import FriendsContainer from './containers/FriendsContainer';

function App() {
  return (
    <Provider store={store}>
      <FriendsContainer/>
    </Provider>
  );
}

export default App;
