import {FETCH_FRIENDS_PENDING, FETCH_FRIENDS_SUCCESS, FETCH_FRIENDS_ERROR} from '../actions/friends';

const initialState = {
  pending: false,
  friends: [],
  error: null
};

export function friendsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_FRIENDS_SUCCESS:
      return {
        ...state,
        pending: false,
        friends: action.payload
      };
    case FETCH_FRIENDS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const getFriends = state => state.friends;
export const getFriendsPending = state => state.pending;
export const getFriendsError = state => state.error;
