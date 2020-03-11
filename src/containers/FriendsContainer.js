import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import fetchFriendsAction from '../api/friends';
import FriendsComponents from '../components/FriendsComponents';

import {
  getFriendsError,
  getFriends,
  getFriendsPending
} from '../store/reducers/friends';


const FriendsContainer = ({fetchFriends, friends, pending, error},) => {
  useEffect(() => {
    if (friends.length === 0) {
      fetchFriends();
    }
  }, []);

  if (pending) return <h2>loading..</h2>;

  return (
    <div>
      {error && <span>{error}</span>}
      <FriendsComponents friends={friends}/>
    </div>
  );
};

const mapStateToProps = state => ({
  error: getFriendsError(state.friends),
  friends: getFriends(state.friends),
  pending: getFriendsPending(state.friends)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchFriends: fetchFriendsAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendsContainer);
