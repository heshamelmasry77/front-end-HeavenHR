import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// Components
import FriendsComponents from '../components/FriendsComponents';

const {
  shape,
  arrayOf,
} = PropTypes;

class FriendsContainer extends Component {
  render() {
    const { friends } = this.props;

    return <FriendsComponents friends={friends} />;
  }
}

FriendsContainer.propTypes = {
  friends: arrayOf(shape({})),
};

FriendsContainer.defaultProps = {
  friends: [],
};


const mapStateToProps = ({ friends }) => ({
  friends,
});

export default connect(mapStateToProps)(FriendsContainer);
