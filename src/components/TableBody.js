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
    console.log(selectedPage)
    console.log(offset)
    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {

      const data = this.props.friends;
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      console.log(slice)
      this.setState({
        sliceData: slice
      })
    });
  };

  searchHandler(event) {
    console.log(event)
    if (event.target.value) {

      let searchQuery = event.target.value.toLowerCase();
      console.log('searchQuery:', searchQuery);
      console.log(this.state)

      let displayedContacts = this.state.sliceData.filter((el) => {
        // console.log(el.name)
        let searchValue = el.name.toLowerCase();
        // console.log(searchValue)
        // console.log(searchValue.indexOf(searchQuery))
        return searchValue.indexOf(searchQuery) !== -1;
      });
      console.log(displayedContacts);
      this.setState({
        sliceData: displayedContacts
      })
    } else {
      console.log('dsd')
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
      }, () => {
        console.log(this.state)
      })
    } else {
      const data = parsedFriendsList;
      const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        sliceData: slice,
      }, () => {
        console.log(this.state)
      })
    }

    console.log(this.props);

  }

  handleFilter(e) {
    let filteredFriends = this.props.friends;
    let friendFilter = e.target.value;

    filteredFriends = filteredFriends.filter((friend) => {

      // friend[friendFilter].toLowerCase().includes(friendFilter)
      console.log(friendFilter)

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
      // return friend[type] === friendFilter;
    });
    console.log(filteredFriends);
    const slice = filteredFriends.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(filteredFriends.length / this.state.perPage),
      sliceData: slice,
    })

  };

  handleSorting(e) {
    console.log(e.target.value)
    const friendsSortedArray = _.sortBy(this.props.friends, o => o[e.target.value]);
    const slice = friendsSortedArray.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
      pageCount: Math.ceil(friendsSortedArray.length / this.state.perPage),
      sliceData: slice,
    }, () => {
      // console.log(this.state)
    })
  }


  handleEditFriend(e) {
    console.log('handleEditFriend')
    console.log(this.props)
    this.setState({
      edit: true,
      id: arguments[0],
      name: arguments[1]
    }, () => {
      console.log(this.state)
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();
    this.setState({
      sliceData: this.props.friends.map(item => {
        if (item.id === this.state.id) {
          item['name'] = event.target.updatedFriendName.value; //updating the name
          console.log(item['name']);
          return item;
        }//todo what if the list got updated from the API itself
        return item;
      })
    }, () => {
      console.log(this.state)
      if (localStorage.getItem('friendsList') == null) {
        localStorage.setItem("friendsList", JSON.stringify(this.state.sliceData))
      } else {
        const list = JSON.parse(localStorage.getItem('friendsList'))
        console.log(list);
        localStorage.setItem("friendsList", JSON.stringify(this.state.sliceData))
      }
      this.setState({
        edit: false
      });
    });
  }

  handleStarBtn(e) {

    this.setState({
      sliceData: this.props.friends.map(item => {
        if (item.id === arguments[0]) {
          item['isStared'] = !arguments[1]; //updating the name
          console.log(item['isStared']);
          return item;
        }//todo what if the list got updated from the API itself
        return item;
      })
    }, () => {
      if (localStorage.getItem('friendsList') == null) {
        localStorage.setItem("friendsList", JSON.stringify(this.state.sliceData))
      } else {
        const list = JSON.parse(localStorage.getItem('friendsList'))
        console.log(list);
        localStorage.setItem("friendsList", JSON.stringify(this.state.sliceData))
      }
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
