import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  discounts: [
    {
      id: 0,
      startDiscount: '',
      endDiscount: '',
      gameId: 0,
      discountCount: '',
      gameName: '',
    },
  ],
  isLoading: false,
  discountError: '',
};

export const discountsSlice = createSlice({
  name: 'discountsReducer',
  initialState,
  reducers: {
    addDiscountsRequest: (state, { payload }) => {
      state.isLoading = true;
      state.discounts = payload;
    },
    addDiscountsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.discounts = payload;
      state.discountError = '';
    },
    addDiscountsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.discountError = payload;
    },
    getDiscountsRequest: (state) => {
      state.isLoading = true;
    },
    getDiscountsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.discounts = payload;
    },
    getDiscountsFailure: (state, { payload }) => {
      state.isLoading = false;
      state.discountError = payload;
    },
  },
});

export default discountsSlice.reducer;
