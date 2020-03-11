import React, {Fragment, Component} from 'react';

import * as PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

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
