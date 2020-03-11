import React from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

import {addFriend} from '../store/actions/friends';

window.id = 0;

class AddFriendContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sex: ''
    }
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleSexChange(event) {
    this.setState({
      sex: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if ((this.state.name !== '') && (this.state.sex !== '')) {
      this.props.actions.addFriend(this.state.name, this.state.sex, window.id++);
      //reset input box
      this.setState({
        name: '',
        sex: ''
      })
    }
  }

  render() {
    return (
      <div className="AddFriendContainer container">
        <div className="title">
          <input
            type="text"
            placeholder="name.."
            required={true}
            value={this.state.name}
            onChange={this.handleNameChange.bind(this)}
          />
          <input
            type="text"
            placeholder="sex.."
            required={true}
            value={this.state.sex}
            onChange={this.handleSexChange.bind(this)}
          />
        </div>
        <div className="submitButton">
          <button className="btn btn-light text-primary" onClick={this.handleSubmit.bind(this)}>Add</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions:
      bindActionCreators(
        {
          addFriend: addFriend
        },
        dispatch
      )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFriendContainer);
