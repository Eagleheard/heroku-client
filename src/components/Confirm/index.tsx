import React from 'react';

import { Button } from 'components/Button';

import './styles.scss';

interface IConfirm {
  confirmDeleting: () => void;
  handleClose: () => void;
}

export const ConfirmDialog: React.FC<IConfirm> = ({ confirmDeleting, handleClose }) => {
  return (
    <div className="confirm">
      <Button text="No" onClick={handleClose} style="clear" />
      <Button text="Yes" onClick={confirmDeleting} style="search" />
    </div>
  );
};
