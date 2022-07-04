import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  addGameRequest,
  decrementGameRequest,
  getCartRequest,
  incrementGameRequest,
  removeGameRequest,
} from 'store/cart/actions';
import { IGame } from 'types/interfaces';
import { Button, Portal, SignIn, SignUp } from 'components';
import { useAuth } from 'hooks/useAuth';
import { ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';
import { CartState } from 'store/cart/types';

import grey_cross from 'assets/grey-cross.png';

import {
  CardAdditionalInformation,
  CardAuthor,
  CardBuyButton,
  CardComponent,
  CardDescription,
  CardDiscount,
  CardGenre,
  CardImg,
  CardLabel,
  CardMainInformation,
  CardNavLink,
  CardNavLinkToCart,
  CardParagraph,
  CardPaymentInformation,
  CardPrice,
  CardPriceInformation,
  CardQuantity,
  CardQuantityValue,
  OrderTotalPrice,
} from './styled-components';

const quantityLimit = 10;

export const Card = ({
  id,
  name,
  genre,
  author,
  price,
  image,
  quantity,
  purchaseDate,
  disk,
  count,
  isCart,
  order,
  search,
  discount,
}: IGame) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false);
  const { openToast } = useToast();
  const { gameError, isLoading, cart } = useSelector((state: CartState) => state.cartReducer || []);
  const { user } = useAuth();
  const discountedPrice = discount
    ? price - (price * parseInt(discount.discountCount)) / 100
    : null;

  const handleBuy = () => {
    dispatch(addGameRequest(id, 1));
    if (!gameError && !isLoading) {
      return openToast(
        <>
          Successfully added to cart
          <CardNavLinkToCart to={`/cart/${user.id}`} className="link">
            Go to cart?
          </CardNavLinkToCart>
        </>,
        ToastOptions.success,
      );
    }
    if (gameError) {
      return openToast('Game already in cart', ToastOptions.error);
    }
  };

  const handleSwitch = () => {
    if (isSignInVisible) {
      setIsSignInVisible(false);
      setIsSignUpVisible(true);
      return;
    }
    if (isSignUpVisible) {
      setIsSignInVisible(true);
      setIsSignUpVisible(false);
      return;
    }
  };

  return (
    <CardComponent search={search} cart={isCart} order={order}>
      {user ? (
        !purchaseDate &&
        !quantity &&
        !search &&
        cart.filter(({ game }) => game.id === id).length === 0 ? (
          <CardBuyButton search={search} cart={isCart} order={order}>
            <Button disabled={count === 0} text="Buy now" onClick={handleBuy} style="card-buy" />
          </CardBuyButton>
        ) : (
          <CardBuyButton search={search} cart={isCart} order={order}>
            <Button
              text="Go to cart"
              onClick={() => navigate(`/cart/${user.id}`)}
              style="card-buy"
            />
          </CardBuyButton>
        )
      ) : (
        <CardBuyButton search={search} cart={isCart} order={order}>
          <Button
            disabled={count === 0}
            text="Buy now"
            onClick={() => setIsSignInVisible(true)}
            style="card-buy"
          />
        </CardBuyButton>
      )}
      <CardImg
        onClick={() => navigate(`/game/${id}`)}
        search={search}
        order={order}
        cart={isCart}
        src={image}
        alt="logo"
      ></CardImg>
      <CardDescription search={search} order={order} cart={isCart}>
        <CardMainInformation order={order} cart={isCart}>
          <CardLabel order={order} cart={isCart}>
            <CardNavLink data-testid={name} to={`/game/${id}`}>
              {name}
            </CardNavLink>
          </CardLabel>
          {genre && <CardGenre search={search}>{genre.name}</CardGenre>}
          {purchaseDate && (
            <CardParagraph order={order} cart={isCart}>
              Date of purchase: {purchaseDate}
            </CardParagraph>
          )}
          {quantity && purchaseDate && (
            <CardParagraph order={order} cart={isCart}>
              Quantity: {quantity}
            </CardParagraph>
          )}
          {quantity && !purchaseDate && (
            <p className="card__type">Type: {disk ? 'disk' : 'digital'}</p>
          )}
          {quantity && disk && !purchaseDate && (
            <CardQuantityValue>
              <Button
                text="-"
                onClick={() => dispatch(decrementGameRequest(id))}
                style="cart-btn"
                disabled={quantity === 1}
              />
              <CardQuantity>{quantity}</CardQuantity>
              <Button
                text="+"
                onClick={() => dispatch(incrementGameRequest(id))}
                style="cart-btn"
                disabled={count === 0 || quantity === quantityLimit}
              />
            </CardQuantityValue>
          )}
        </CardMainInformation>
        {purchaseDate && (
          <OrderTotalPrice>Price: {quantity ? price * quantity : price}$</OrderTotalPrice>
        )}
        <CardAdditionalInformation order={order} cart={isCart}>
          {quantity && !purchaseDate && (
            <button className="card__remove-btn" onClick={() => dispatch(removeGameRequest(id))}>
              <img src={grey_cross} />
            </button>
          )}
          <CardPaymentInformation cart={isCart}>
            {!purchaseDate && discount && (
              <CardDiscount cart={isCart}>-{discount.discountCount}%</CardDiscount>
            )}
            {price !== 0 && (
              <CardPriceInformation>
                {!purchaseDate && discount ? (
                  <CardPrice cart={isCart}>{price}$</CardPrice>
                ) : (
                  <CardLabel cart={isCart}>{price}$</CardLabel>
                )}
                {!purchaseDate && discount && (
                  <CardLabel cart={isCart}>{discountedPrice}$</CardLabel>
                )}
              </CardPriceInformation>
            )}
          </CardPaymentInformation>
          {author && (
            <CardAuthor search={search}>
              <CardNavLink to={`/author/${author.id}`}>{author.name}</CardNavLink>
            </CardAuthor>
          )}
        </CardAdditionalInformation>
      </CardDescription>
      {isSignInVisible && !user && (
        <Portal
          Component={() => <SignIn handleSwitch={handleSwitch} />}
          isOpen={isSignInVisible}
          text="Sign In"
          handleClose={() => setIsSignInVisible(false)}
        />
      )}
      {isSignUpVisible && (
        <Portal
          Component={() => <SignUp handleSwitch={handleSwitch} />}
          isOpen={isSignUpVisible}
          text="Sign Up"
          handleClose={() => setIsSignUpVisible(false)}
        />
      )}
    </CardComponent>
  );
};
