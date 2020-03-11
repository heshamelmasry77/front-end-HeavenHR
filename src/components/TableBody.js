import React, {Component} from 'react';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './Pagination.scss'
import _ from 'lodash';

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const {
  shape,
  arrayOf,
} = PropTypes;


class FriendsTableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      currentPage: 0,
      sliceData: [],
      pageCount: 0,
      search: [],
      filteredFriends: [],
      selectedFilter: null,
      edit: false,
      id: null,
      name: null,
      isStared: false
    };
    this.handlePageClick = this
      .handlePageClick
      .bind(this);
    this.searchHandler = this.searchHandler.bind(this)
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      const data = this.props.friends;
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        sliceData: slice
      })
    });
  };

  searchHandler(event) {
    if (event.target.value) {
      let searchQuery = event.target.value.toLowerCase();
      let displayedContacts = this.state.sliceData.filter((el) => {
        let searchValue = el.name.toLowerCase();
        return searchValue.indexOf(searchQuery) !== -1;
      });
      this.setState({
        sliceData: displayedContacts
      })
    } else {
      const data = this.props.friends;
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        sliceData: slice,
      })
    }
  }

  componentDidMount() {
    const friendsList = window.localStorage.getItem('friendsList');
    const parsedFriendsList = JSON.parse(friendsList);
    if (parsedFriendsList == null) {
      const data = this.props.friends;
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        sliceData: slice,
      })
    } else {
      const data = parsedFriendsList;
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        sliceData: slice,
      })
    }
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
    const slice = filteredFriends.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(filteredFriends.length / this.state.perPage),
      sliceData: slice,
    })
  };

  handleSorting(e) {
    const friendsSortedArray = _.sortBy(this.props.friends, o => o[e.target.value]);
    const slice = friendsSortedArray.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(friendsSortedArray.length / this.state.perPage),
      sliceData: slice,
    })
  }


  handleEditFriend(e) {
    this.setState({
      edit: true,
      id: arguments[0],
      name: arguments[1]
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();

    let friendsArray = this.props.friends;
    let foundIndex = friendsArray.findIndex(friend => friend.id === this.state.id);
    friendsArray[foundIndex].name = event.target.updatedFriendName.value;
    const slice = friendsArray.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(friendsArray.length / this.state.perPage),
      sliceData: slice
    }, () => {
      localStorage.setItem("friendsList", JSON.stringify(this.state.sliceData))
    });
    this.setState({
      edit: false
    })
  }

  handleStarBtn(id, isStarted) {
    let friendsArray = this.props.friends;
    let foundIndex = friendsArray.findIndex(friend => friend.id === id);
    friendsArray[foundIndex].isStared = !isStarted;
    const slice = friendsArray.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(friendsArray.length / this.state.perPage),
      sliceData: slice
    }, () => {
      localStorage.setItem("friendsList", JSON.stringify(this.state.sliceData))
    })
  }

  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)}>
        <input type="text" name="updatedFriendName" defaultValue={this.state.name}/>
        <button className="btn btn-light text-primary">Update</button>
      </form>
    }
  }

  render() {
    let friends = this.state.sliceData;
    return (
      <TableBody>
        <TableRow>
          <TableCell>
            {this.renderEditForm()}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div>
              <select onChange={this.handleFilter.bind(this)}>
                <option
                  value="Choose Filter"
                >Choose Filter
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="stared">Stared</option>
              </select>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div>
              <select onChange={this.handleSorting.bind(this)}>
                <option
                  value="Sort By"
                >Sort By
                </option>
                <option value="id">ID</option>
                <option value="name">Name</option>
              </select>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <input type="text" className="search" placeholder='Search by Name:' onChange={this.searchHandler}/>
          </TableCell>
        </TableRow>
        {
          friends.map(({id, name, sex, isStared}) => (
            <TableRow key={id}>
              <TableCell className="text-secondary"> {id} </TableCell>
              <TableCell className="text-secondary"> {name} </TableCell>
              <TableCell>
                <i className={classnames(`fa`, 'text-primary', {
                  'fa-female': sex === 'female',
                  'fa-male': sex === 'male'
                })}/>
              </TableCell>
              <TableCell> {
                <button type="button" className="btn btn-light text-primary"
                        onClick={() => this.handleStarBtn(id, isStared)}>
                  <i className={classnames('fa', {
                    'fa-star': isStared,
                    'fa-star-o': !isStared
                  })}/>
                </button>
              } </TableCell>
              <TableCell>
                {
                  <button className="btn btn-light text-primary" onClick={() => this.handleEditFriend(id, name)}>
                    edit
                  </button>
                } </TableCell>
            </TableRow>
          ))
        }
        <TableRow>
          <TableCell>
            <ReactPaginate
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
              activeClassName={"active"}/>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }
}

FriendsTableBody.propTypes = {
  friends: arrayOf(shape({})),
};

FriendsTableBody.defaultProps = {
  friends: [],
};

export default FriendsTableBody;
