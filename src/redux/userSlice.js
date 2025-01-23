import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'user/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
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
  products: [],
  isSignedUp: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.products.length === 0) {
          state.products = action.payload;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectProducts = (state) => state.user.products;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export const { setUserData, setProducts, setLoading, setError } =
  userSlice.actions;
export default userSlice.reducer;
