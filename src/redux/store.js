import { createStore } from 'redux';

const initialState = {
  name: '',
  email: '',
  img: null,
  products: [],
  isSignedUp: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
