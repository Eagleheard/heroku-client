import React from 'react';

import { IGame } from 'types/interfaces';

import userImg from 'assets/userPhoto.png';

import './styles.scss';

export const Comment: React.FC<IGame> = ({ comment, user, formatedCreatedAt }) => {
  return (
    <div className="comment__container">
      <img alt="user photo" className="comment__photo" src={user.photo ? user.photo : userImg} />
      <div className="comment__info">
        <p className="comment__name">{`${user.name} ${user.lastName}`}</p>
        <p className="comment__text">{comment}</p>
      </div>
      <p className="comment__data">{formatedCreatedAt}</p>
    </div>
  );
};
