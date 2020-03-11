import React, {Fragment, Component} from 'react';

import * as PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import ReactPaginate from 'react-paginate';

import TableBody from './TableBody';
import TableHeader from './TableHeader';
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
      friends: [],
      offset: 0,
      perPage: 5
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.sliceData = this.sliceData.bind(this);
    this.handleStaredCallbackFunction = this.handleStaredCallbackFunction.bind(this);
    this.handleEditFriendCallbackFunction = this.handleEditFriendCallbackFunction.bind(this);
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

  sliceData() {
    const data = this.state.friends;
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
    this.setState({
      friends: slice,
      pageCount: Math.ceil(data.length / this.state.perPage),
    })
  }

  componentDidMount() {
    this._isMounted = true;

    const friendsList = window.localStorage.getItem('friendsList');
    const parsedFriendsList = JSON.parse(friendsList);
    if (parsedFriendsList == null && (this.props.friends.length > 0)) {
      this.setState({
        friends: this.props.friends,
      }, () => {
        this.sliceData();
      })
    } else {
      this.setState({
        friends: parsedFriendsList,
      }, () => {
        this.sliceData();
      })
    }

  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    const data = this.props.friends;
    const slice = data.slice(offset, offset + this.state.perPage);
    this.setState({
      friends: slice,
      pageCount: Math.ceil(this.props.friends.length / this.state.perPage),
    })
  };

  handleStaredCallbackFunction(id, isStarted) {
    let friendsArray = this.props.friends;
    let foundIndex = friendsArray.findIndex(friend => friend.id === id);
    friendsArray[foundIndex].isStared = !isStarted;
    this.setState({
      friends: friendsArray
    }, () => {
      this.sliceData();
      localStorage.setItem("friendsList", JSON.stringify(this.state.friends))
    })
  }

  handleEditFriendCallbackFunction(name, id) {
    let friendsArray = this.props.friends;
    let foundIndex = friendsArray.findIndex(friend => friend.id === id);
    friendsArray[foundIndex].name = name;
    this.setState({
      friends: friendsArray
    }, () => {
      this.sliceData();
      localStorage.setItem("friendsList", JSON.stringify(this.state.friends))
    });
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
            {this._isMounted &&
            <TableBody friends={friends} handStaredToFriendComponentCallback={this.handleStaredCallbackFunction}
                       handEditFriendToFriendComponentCallback={this.handleEditFriendCallbackFunction}/>}
          </Table>
        </Paper>
        {this._isMounted && <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}/>}

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
