import React, {Fragment, Component} from 'react';

import * as PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableCell from "@material-ui/core/TableCell";
import _ from "lodash";

const {
  shape,
  arrayOf,
} = PropTypes;


class FriendsComponent extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      friends: []
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  handleFilter(e) {
    let filteredFriends = this.props.friends;
    let friendFilter = e.target.value;

    filteredFriends = filteredFriends.filter((friend) => {
      switch (friendFilter) {
        case 'male':
          // code block
          return friend.sex === 'male';
        case 'female':
          // code block
          return friend.sex === 'female';
        case 'stared':
          // code block
          return friend.isStared;
        default:
          return friend
        // code block
      }
    });
    this.setState({
      friends: filteredFriends
    })
  };

  handleSorting(e) {
    const friendsSortedArray = _.sortBy(this.props.friends, o => o[e.target.value]);
    this.setState({
      friends: friendsSortedArray
    })
  }
  searchHandler(event) {
    if (event.target.value) {
      let searchQuery = event.target.value.toLowerCase();
      let displayedContacts = this.state.friends.filter((el) => {
        let searchValue = el.name.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      });
      this.setState({
        friends: displayedContacts
      })
    } else {
      this.setState({
        friends: this.props.friends
      })
    }
  }
  componentDidMount() {
    this._isMounted = true;

    this.setState({
      friends: this.props.friends
    })
  }

  render() {
    const friends = this.state.friends;
    return (
      <Fragment>
        <p className="font-weight-bold ml-4 mt-4 h3 text-uppercase">Friends</p>
        <div>
          <select onChange={this.handleFilter}>
            <option
              value="Choose Filter"
            >Choose Filter
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="stared">Stared</option>
          </select>
        </div>
        <div>
          <select onChange={this.handleSorting}>
            <option
              value="Sort By"
            >Sort By
            </option>
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div>
          <input type="text" className="search" placeholder='Search by Name:' onChange={this.searchHandler}/>
        </div>
        <Paper className="m-4 mt-0">
          <Table className="p-2">
            <TableHeader/>
            {this._isMounted && <TableBody friends={friends}/>}
          </Table>
        </Paper>
      </Fragment>
    )
  }
}

FriendsComponent.propTypes = {
  friends: arrayOf(shape({})),
};

FriendsComponent.defaultProps = {
  friends: [],
};
export default FriendsComponent;
