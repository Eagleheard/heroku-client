import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { socket } from 'config';
import { ICommentParams, IGame } from 'types/interfaces';
import { fetchGameComments, sendComment } from 'api/fetchGame';
import { useAuth } from 'hooks/useAuth';
import { Button, Portal, SignUp, SignIn, Comment, Pagination, CommentForm } from 'components';
import { addGameRequest } from 'store/cart/actions';
import { ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';
import { CartState } from 'store/cart/types';

import './PageStyles.scss';

interface IGamePage {
  id: number;
  name?: string;
  preview?: string;
  popularity?: number;
  price: number;
  genre?: {
    id: number;
    name: string;
  };
  author?: {
    id: number;
    name: string;
  };
  description?: string;
  count: number;
  disk?: boolean;
  discount?: {
    discountCount: string;
  };
}

const QUANTITY_LIMIT = 10;
const DATA_LIMIT = 4;

export const GamePage: React.FC<IGamePage> = ({
  id,
  name,
  preview,
  popularity,
  price,
  genre,
  author,
  description,
  count,
  disk,
  discount,
}) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [gameComments, setGameComments] = useState<IGame[]>([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [buyingCount, setBuyingCount] = useState(count !== 0 ? 1 : 0);
  const [isSignInVisible, setIsSignInVisible] = useState<boolean>(false);
  const [isSignUpVisible, setIsSignUpVisible] = useState<boolean>(false);
  const [isGameBuyed, setIsGameBuyed] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const { cart } = useSelector((state: CartState) => state.cartReducer || []);
  const discountedPrice = discount
    ? price - (price * parseInt(discount.discountCount)) / 100
    : null;

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

  const { openToast } = useToast();
  const { gameError, isLoading } = useSelector((state: CartState) => state.cartReducer || []);

  const handleBuy = () => {
    dispatch(addGameRequest(id, buyingCount));
    if (!gameError && !isLoading) {
      setIsGameBuyed(true);
      return openToast('Successfully added to cart', ToastOptions.success);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await fetchGameComments(id, currentPage, DATA_LIMIT);
      setGameComments(data.rows);
      setCommentsCount(data.count);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      if (message !== 'Need autorization') {
        openToast(String(message), ToastOptions.error);
      }
    }
  };

  const sendMessage = async (params: ICommentParams) => {
    try {
      await sendComment(params);
      socket.emit('addNewComment', { gameId: id, dataLimit: DATA_LIMIT, currentPage: currentPage });
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  useEffect(() => {
    fetchComments();
    if (gameError && !isLoading) {
      return openToast('Something wrong', ToastOptions.error);
    }
    if (cart.filter(({ game }) => game.id === id).length !== 0) {
      setIsGameBuyed(true);
    }
  }, [gameError, isLoading, currentPage, user]);

  useEffect(() => {
    socket.connect();
    socket.on('newComments', (data) => {
      setGameComments(data.rows);
      setCommentsCount(data.count);
    });
  }, []);

  return (
    <div className="game" data-testid="gamePage">
      <div className="game__container-btn">
        <Button text="«" onClick={() => history(-1)} style="back-btn" />
      </div>
      <div className="game__container">
        <div className="game__info">
          <img src={preview} className="game__logo" />
          <div className="about">
            <div className="about__property">
              <p className="about__name" data-testid="gameName">
                {name}
              </p>
              <p className="about__genre">Genre: {genre?.name}</p>
              <p className="about__author">
                Author:
                <NavLink className="about__author--link" to={`/author/${author?.id}`}>
                  {author?.name}
                </NavLink>
              </p>
              <p className="about__popularity">Popularity: {popularity}%</p>
              {count ? <p className="about__count">Count: {count}</p> : null}
              {disk && (
                <div className="about__buying-count">
                  <Button
                    text="-"
                    onClick={() => setBuyingCount((prevValue) => prevValue - 1)}
                    style="cart-btn"
                    disabled={buyingCount === 1}
                  />
                  <p className="about__buying-value" data-testid="gameCount">
                    {buyingCount}
                  </p>
                  <Button
                    text="+"
                    onClick={() => setBuyingCount((prevValue) => prevValue + 1)}
                    style="cart-btn"
                    disabled={
                      buyingCount === count || buyingCount === QUANTITY_LIMIT || count === 0
                    }
                  />
                </div>
              )}
            </div>
            <div className="game__buying">
              {user ? (
                !isGameBuyed ? (
                  <Button
                    text="Buy now"
                    disabled={count === 0}
                    onClick={handleBuy}
                    style={count === 0 ? 'buy--disabled' : 'buy'}
                  />
                ) : (
                  <Button
                    text="Go to cart"
                    onClick={() => history(`/cart/${user.id}`)}
                    style="buy"
                  />
                )
              ) : (
                <Button text="Buy now" onClick={() => setIsSignInVisible(true)} style="buy" />
              )}
              <div className="game__price-block">
                <p className="game__price-label">Price: </p>
                {discount && <p className="game__discount">-{discount.discountCount}%</p>}
                <div className="game__price-information">
                  {discount ? (
                    <p className="game__price--old">{price}$</p>
                  ) : (
                    <p className="game__price">{price}$</p>
                  )}
                  {discount && <p className="game__price--new">{discountedPrice}$</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="description">
          <p className="description__label">Description: </p>
          <p className="description__text">{description}</p>
        </div>
      </div>
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
      {user ? (
        <div className="comments">
          <h1 className="comments__label">Comments</h1>
          <CommentForm id={id} sendMessage={sendMessage} />
          {gameComments.length !== 0 ? (
            <Pagination
              RenderComponent={Comment}
              getPaginatedData={gameComments}
              currentPage={currentPage}
              totalCount={commentsCount}
              pageSize={DATA_LIMIT}
              onPageChange={(page: number) => setCurrentPage(page)}
              style="game"
            />
          ) : (
            <div className="comments__notification">
              <p>No comments yet</p>
            </div>
          )}
        </div>
      ) : (
        <div className="comments__notification">
          <p>You need to&nbsp;</p>
          <p className="comments__notification--link" onClick={() => setIsSignInVisible(true)}>
            Sign in
          </p>
          <p>&nbsp;to see or leave comments</p>
        </div>
      )}
    </div>
  );
};
