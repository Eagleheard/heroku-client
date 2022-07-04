import { discountsSlice } from 'toolkitStore/slices/discounts';

export const {
  addDiscountsRequest,
  addDiscountsSuccess,
  addDiscountsFailure,
  getDiscountsRequest,
  getDiscountsSuccess,
  getDiscountsFailure,
} = discountsSlice.actions;
