import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from 'hooks';

import './styles.scss';

interface ISelect {
  placeholder: string;
  reset?: string;
  options: {
    id: number;
    value: string;
    label: string;
  }[];
  style: string;
  isHeaderMode?: boolean;
  handleSelect: (value: string) => void;
}

export const Select: React.FC<ISelect> = ({
  placeholder,
  options,
  style,
  handleSelect,
  reset,
  isHeaderMode,
}) => {
  const [isListHidden, setIsListHidden] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');
  const selectRef = useRef(null);
  const outsideClick = () => {
    setIsListHidden(true);
  };

  useClickOutside(selectRef, outsideClick);

  const handleChange = (label: string) => {
    if (!isHeaderMode) {
      setValue(label);
    }
    handleSelect(label);
    setIsListHidden(true);
  };

  useEffect(() => {
    setValue(reset || '');
  }, [reset]);

  return (
    <label className={`select ${style}__select`}>
      <div
        className="select__input"
        data-testid={`${placeholder}__select__input`}
        ref={selectRef}
        onClick={() => setIsListHidden((prevValue) => !prevValue)}
      >
        {!value ? (
          <p className={`select__placeholder ${style}__placeholder`}>{placeholder}</p>
        ) : (
          value
        )}
        <p>{isListHidden ? '↓' : '↑'}</p>
      </div>
      <div className={`select__menu ${style}__select-menu`} data-testid={placeholder}>
        {!isListHidden &&
          options.map(({ id, label }) => (
            <div
              key={id}
              data-testid={label}
              className={`select__menu-item ${style}__select-menu-item`}
              onClick={() => handleChange(label)}
            >
              {label}
            </div>
          ))}
      </div>
    </label>
  );
};
