import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchProductsAction from '../api/products';
import FriendsComponents from '../components/FriendsComponents';

import {
  getProductsError,
  getProducts,
  getProductsPending
} from '../store/reducers/products';


const Products = ({ fetchProducts, products, pending, error }) => {
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  if (pending) return <h2>loading..</h2>;

  return (
    <div>
      {error && <span>{error}</span>}
      <FriendsComponents friends={products}/>
    </div>
  );
};

const mapStateToProps = state => ({
  error: getProductsError(state.products),
  products: getProducts(state.products),
  pending: getProductsPending(state.products)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts: fetchProductsAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
