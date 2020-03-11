import {
  FETCH_FRIENDS_PENDING,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_ERROR,
  ADD_FRIEND,
} from '../actions/friends';

const initialState = {
  pending: false,
  friends: [],
  error: null
};

let copyList = [];

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
    case ADD_FRIEND:
      let payload = {
        name: action.name,
        sex: action.sex,
        id: action.id,
        isStared: false
      };
      copyList = [...state.friends, {name: payload.name, id: action.id, sex: action.sex, isStared: true}]
      return {...state, friends: copyList};
    default:
      return state;
  }
}

export const getFriends = state => state.friends;
export const getFriendsPending = state => state.pending;
export const getFriendsError = state => state.error;
