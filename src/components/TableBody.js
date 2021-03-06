import React, {Component} from 'react';
import classnames from 'classnames';
import * as PropTypes from 'prop-types';

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
      friends: [],
      edit: false,
      id: null,
      name: null,
      isStared: false
    };
  }

  componentDidMount() {
    this.setState({
      friends: this.props.friends,
    })
  }

  componentWillReceiveProps(nextProps) {
    const data = nextProps.friends;
    this.setState({
      friends: data,
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
    this.props.handleEditFriendToFriendComponentCallback(event.target.updatedFriendName.value, this.state.id);
    this.setState({
      edit: false
    })
  }

  handleStarBtn(id, isStarted) {
    this.props.handleStaredToFriendComponentCallback(id, isStarted);
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
    let friends = this.state.friends;
    return (
      <TableBody>
        {this.state.edit && <TableRow>
          <TableCell>
            {this.renderEditForm()}
          </TableCell>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell/>
        </TableRow>}
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
