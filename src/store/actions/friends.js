export const FETCH_FRIENDS_PENDING = 'FETCH_FRIENDS_PENDING';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const FETCH_FRIENDS_ERROR = 'FETCH_FRIENDS_ERROR';

function fetchFriendsPending() {
  return {
    type: FETCH_FRIENDS_PENDING
  }
}

function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    payload: friends
  }
}

function fetchFriendsError(error) {
  return {
    type: FETCH_FRIENDS_ERROR,
    payload: error
  }
}

export {fetchFriendsPending, fetchFriendsSuccess, fetchFriendsError};
