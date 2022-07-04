import React from 'react';

import loader from 'assets/loader.svg';

import './styles.scss';

export const Loader = () => {
  return (
    <div className="loader" data-testid="loader">
      <img className="loader__image" src={loader} />
    </div>
  );
};
