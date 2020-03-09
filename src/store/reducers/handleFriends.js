// import {ADD_FRIEND} from '../actions/handleFriends';
//
// const initialState = {
//   pending: false,
//   friends: [],
//   error: null
// };
// function getId(state) {
//   return state.friends.reduce((maxId, friend) => {
//     return Math.max(friend.id, maxId)
//   }, -1) + 1
// }
// export function handleFriendsReducer(state = initialState, action) {
//   if (action.type === ADD_FRIEND) {
//     console.log(state)
//
//     return {
//       ...state,
//       name: action.name,
//       sex: action.sex,
//       isStared: false,
//       id: getId(state)
//     };
//     // return Object.assign({}, state, {
//     //   friends: [{
//     //     name: action.name,
//     //     sex: action.sex,
//     //     isStared: false,
//     //     id: getId(state)
//     //   }, ...state.friends]
//     // });
//   } else {
//     return state;
//   }
// }
//
//
