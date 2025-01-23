import { saveToLocalStorage } from '../utils/localStorage';
import toast from 'react-hot-toast';

export const addToCart = (product, cart, dispatch, setUserData) => {
  const updatedCart = [...cart, product];
  saveToLocalStorage('products', updatedCart);
  dispatch(setUserData({ products: updatedCart }));
  toast.success(`${product.title} added to cart`);
};
