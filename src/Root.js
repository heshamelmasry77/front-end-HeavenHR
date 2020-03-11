import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import AddFriendContainer from "./containers/AddFriendContainer";
import FriendsContainer from "./containers/FriendsContainer";
import Notfound from "./NotFound";
import Container from '@material-ui/core/Container';
import NavBar from "./components/NavBar";

const Root = ({store}) => (
  <Provider store={store}>
    <Router>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={FriendsContainer}/>
          <Route path="/add-friend" component={AddFriendContainer}/>
          <Route component={Notfound}/>
        </Switch>
    </Router>
  </Provider>
);
Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root
