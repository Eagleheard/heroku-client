import React from 'react';

import './style.scss';

interface ICheckbox {
  label: string;
  onClick?: () => void;
  onChange?: () => void;
  value?: boolean;
}

export const Checkbox: React.FC<ICheckbox> = ({ label, value, onClick, onChange }) => {
  return (
    <div className="checkbox">
      <input
        defaultChecked={value}
        type="checkbox"
        data-testid={label}
        onClick={onClick}
        onChange={onChange}
      />
      <label className="checkbox__label">{label}</label>
    </div>
  );
};
