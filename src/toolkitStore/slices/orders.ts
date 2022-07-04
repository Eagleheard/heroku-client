import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 0,
      name: '',
      email: '',
      address: '',
      zipCode: '',
      quantity: 0,
      comment: '',
      formatedCreatedAt: '',
      formatedUpdatedAt: '',
      game: {
        id: 0,
        name: '',
        price: 0,
        image: '',
        disk: false,
        digital: false,
      },
    },
  ],
  isLoading: false,
  ordersError: '',
};

export const ordersSlice = createSlice({
  name: 'ordersReducer',
  initialState,
  reducers: {
    getOrdersRequest: (state) => {
      state.isLoading = true;
    },
    getOrdersSuccess: (state, { payload }) => {
      state.orders = payload;
      state.isLoading = false;
      state.ordersError = '';
    },
    getOrdersFailure: (state, { payload }) => {
      state.isLoading = false;
      state.ordersError = payload;
    },
  },
});

export default ordersSlice.reducer;
