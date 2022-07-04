import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { IGame } from 'types/interfaces';
import { Button } from 'components';

import './styles.scss';

interface IPreview {
  previewGames: IGame[];
}

export const Preview: React.FC<IPreview> = ({ previewGames }) => {
  const [previewPage, setPreviewPage] = useState(0);

  const setPreviousPreviewPage = () => {
    setPreviewPage((prevValue) => prevValue - 1);
  };

  const setNextPreviewPage = () => {
    setPreviewPage((prevValue) => prevValue + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (previewPage === previewGames.length - 1) {
        return setPreviewPage(0);
      }
      setPreviewPage((prevValue) => prevValue + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, [previewPage, previewGames.length]);

  return (
    <div className="preview" data-testid="container">
      {previewGames.map(({ id, name, genre, price, preview, discount }, index) => (
        <div
          key={id}
          data-testid="preview"
          className={classNames('preview__container', {
            'preview__container--active': index === previewPage,
            'preview__container--prev': index === previewPage - 1,
            'preview__container--next': index === previewPage + 1,
          })}
        >
          <img
            src={preview}
            data-testid={`preview-${index}`}
            alt="preview logo"
            className={classNames('preview__img', {
              'preview__img--active': index === previewPage,
              'preview__img--prev': index === previewPage - 1,
              'preview__img--next': index === previewPage + 1,
            })}
          ></img>
          <div className="preview__description">
            <h1 className="preview__name">
              <NavLink className="preview__name--link" to={`/game/${id}`}>
                {name}
              </NavLink>
            </h1>
            <p className="preview__genre">Genre: {genre.name}</p>
            <div className="preview__price-block">
              <p className="preview__price-label">Price: </p>
              <div className="preview__price-information">
                {discount && (
                  <p className="preview__price--new">
                    {price - (price * parseInt(discount.discountCount)) / 100}$
                  </p>
                )}
                {discount ? (
                  <p className="preview__price--old">{price}$</p>
                ) : (
                  <p className="preview__price">{price}$</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      {previewGames.length !== 0 && (
        <>
          <Button
            text="«"
            onClick={setPreviousPreviewPage}
            style="prev-btn"
            disabled={previewPage === 0}
          />
          <Button
            text="»"
            onClick={setNextPreviewPage}
            style="next-btn"
            disabled={previewPage === previewGames.length - 1}
          />
        </>
      )}
    </div>
  );
};
