export const ADD_FRIEND = 'ADD_FRIEND';

function addFriend(name, sex) {
  console.log('addFriend > Name', name);
  console.log('addFriend > Sex', sex);
  return {
    type: ADD_FRIEND,
    name: name,
    sex: sex,
  }
}

export {addFriend};
