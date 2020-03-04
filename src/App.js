import React  from 'react';

import { Provider } from 'react-redux';
import store from './store'

// Components
import Products from './containers/FriendsContainer';

function App() {
  return (
    <Provider store={store}>
      <Products />
    </Provider>
  );
}

export default App;
