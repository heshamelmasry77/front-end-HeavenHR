import React  from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Components
import FriendsContainer from './containers/FriendsContainer';

// reducer
import friendsReducer from './reducers/friendsReducer';

const store = createStore(friendsReducer);

function App() {
  return (
    <Provider store={store}>
      <FriendsContainer />
    </Provider>
  );
}

export default App;
