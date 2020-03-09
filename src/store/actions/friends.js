export const FETCH_FRIENDS_PENDING = 'FETCH_FRIENDS_PENDING';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const FETCH_FRIENDS_ERROR = 'FETCH_FRIENDS_ERROR';
export const ADD_FRIEND = 'ADD_FRIEND';

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

function addFriend(name, sex, id) {
  console.log('addFriend > Name', name);
  console.log('addFriend > Sex', sex);
  console.log('ID', id);
  return {
    type: ADD_FRIEND,
    name: name,
    sex: sex,
    isStared: false,
    id: id
  }
}


export {fetchFriendsPending, fetchFriendsSuccess, fetchFriendsError, addFriend};
