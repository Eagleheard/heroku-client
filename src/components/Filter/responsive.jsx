import React from 'react';

import { Form } from 'components/Form';

import grey_cross from 'assets/grey-cross.png';

import './responsive-style.scss';

export const ResponsiveFilter = ({ handleClose, fillGames }) => {
  return (
    <div className="responsive-filter">
      <button className="responsive-filter__close-btn" onClick={handleClose}>
        <img src={grey_cross} />
      </button>
      <Form fillGames={fillGames} />
    </div>
  );
};
