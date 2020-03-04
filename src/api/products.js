import axios from 'axios';
import { fetchProductsPending, fetchProductsSuccess, fetchProductsError } from '../store/actions/products';

const fetchProducts = () => async dispatch => {

  dispatch(fetchProductsPending());

  const response = await axios.get('http://localhost:3020/friends');
  const {data} = response;
  console.log(data)
  try {
    if (response.error) {
      throw (response.error);
    }
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsError(error));
  }
}

export default fetchProducts;
