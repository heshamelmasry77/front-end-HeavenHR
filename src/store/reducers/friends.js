import {FETCH_FRIENDS_PENDING, FETCH_FRIENDS_SUCCESS, FETCH_FRIENDS_ERROR, ADD_FRIEND} from '../actions/friends';

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
      // return {
      //   ...state,
      //   name: action.name,
      //   sex: action.sex,
      //   isStared: false,
      //   id: getId(state)
      // };
      console.log(action.sex);
      console.log(action.name);
      console.log(action.id);
      let payload = {
        name: action.name,
        sex: action.sex,
        id: action.id,
        isStared: false
      };
      // console.log(payload)
      // console.log(state)
      //Remember when altering data in redux, make sure to treat data as immutable,
      //Not changing existing data, instead assigning new data.
      //Assign a copy of the array created via .slice() method.
      // copyList = payload.slice();
      // console.log(action)
      // // //Add another element to the array.
      // copyList.push(action.payload);
      // //Best to use console.logs to understand what your application is doing.
      // console.log('------------copyofList', copyList);
      // //Use spread operator with an object to assign a new array to array list property in state.
      console.log(state)
      copyList = [...state.friends, {name: payload.name, id: action.id, sex: action.sex, isStared: true}]
      console.log(copyList)
      // return copyList
      return {...state, friends: copyList};
    default:
      return state;
  }
}

export const getFriends = state => state.friends;
export const getFriendsPending = state => state.pending;
export const getFriendsError = state => state.error;
