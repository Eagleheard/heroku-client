import { cartDiscount, cartPrice } from '.';

jest.fn(cartPrice);
jest.fn(cartDiscount);

const testState = {
  cartReducer: {
    cart: [
      {
        quantity: 1,
        game: {
          price: 5,
          discount: {
            discountCount: 50,
          },
        },
      },
    ],
    achievements: [
      {
        id: 1,
        isAchieved: true,
        achievementId: 4,
        userId: 1,
        achievement: {
          name: 'Digital Age!',
          description: 'Buy digital edition',
          discount: 0.02,
        },
      },
    ],
  },
};

describe('cart selector', () => {
  it('should show cart price with discount', () => {
    const testPrice = cartPrice(testState);
    expect(testPrice).toEqual(2.5);
  });

  it('should show price with achievement discount', () => {
    const testPrice = cartDiscount(testState);
    expect(testPrice).toEqual(0.02);
  });
});
