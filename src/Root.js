import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import AddFriendContainer from "./containers/AddFriendContainer";
import FriendsContainer from "./containers/FriendsContainer";
import Notfound from "./NotFound";

const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-friend">Add A New Friend</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={FriendsContainer}/>
          <Route path="/add-friend" component={AddFriendContainer}/>
          <Route component={Notfound}/>
        </Switch>
      </div>
    </Router>
  </Provider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root
