import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './NavBar.scss'

class NavBar extends Component {

  render() {
    return (
      <div className="NavBar">
        <div className='container'>
          <h1 className="font-weight-bold h3 text-left text-uppercase mr-auto text-white">Friends</h1>
          <ul className="ml-auto">
            <li>
              <NavLink exact={true} activeClassName='is-active' to="/">Home</NavLink>
            </li>
            <li>
              <NavLink activeClassName='is-active' to="/add-friend">Add A New Friend</NavLink>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}


export default NavBar;
