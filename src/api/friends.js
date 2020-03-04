import axios from 'axios';
import {fetchFriendsPending, fetchFriendsSuccess, fetchFriendsError} from '../store/actions/friends';

const fetchFriends = () => async dispatch => {

  dispatch(fetchFriendsPending());

  const response = await axios.get('http://localhost:3020/friends');
  const {data} = response;
  try {
    if (response.error) {
      throw (response.error);
    }
    dispatch(fetchFriendsSuccess(data));
  } catch (error) {
    dispatch(fetchFriendsError(error));
  }
};

export default fetchFriends;
