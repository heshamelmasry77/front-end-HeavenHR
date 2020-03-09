import React from 'react';
import store from './store'
// Components
import Root from './Root';

function App() {
  return (
    <div>
      <Root store={store}/>
    </div>
  );
}

export default App;
