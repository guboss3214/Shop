import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveToLocalStorage } from '../utils/localStorage';
import toast from 'react-hot-toast';

export const fetchProducts = createAsyncThunk(
  'user/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      saveToLocalStorage('products', response.data.products);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  name: '',
  email: '',
  img: null,
  products: JSON.parse(localStorage.getItem('products')) || [],
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  isSignedUp: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      Object.assign(state, action.payload);
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      saveToLocalStorage('products', action.payload);
    },
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      const title = action.payload.title;
      if (existingProduct) {
        toast.error(`${title} already in cart!`);
        return;
      }
      state.cart.push(action.payload);
      saveToLocalStorage('cart', state.cart);
      toast.success(`${title} added to cart!`);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      saveToLocalStorage('cart', state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      saveToLocalStorage('cart', []);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectProducts = (state) => state.user.products;
export const selectCart = (state) => state.user.cart;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export const {
  setUserData,
  setProducts,
  addToCart,
  removeFromCart,
  clearCart,
} = userSlice.actions;
export default userSlice.reducer;
