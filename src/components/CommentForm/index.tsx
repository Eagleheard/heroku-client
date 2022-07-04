import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ICommentParams } from 'types/interfaces';
import { Button } from 'components/Button';

import './styles.scss';

const MAX_COMMENT_COUNT = 100;

interface IInput {
  id: number;
  sendMessage: (params: ICommentParams) => void;
}

export const CommentForm: React.FC<IInput> = ({ id, sendMessage }) => {
  const [commentCount, setCommentCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICommentParams>();

  const handleCommentCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentCount(e.target.value.length);
  };

  const submitForm = (data: ICommentParams) => {
    sendMessage({ ...data, id });
    setCommentCount(0);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="input__container">
      <textarea
        className="input__field"
        placeholder="Type comment..."
        {...register('comment', {
          required: true,
        })}
        maxLength={MAX_COMMENT_COUNT}
        onChange={handleCommentCount}
      />
      {errors.comment && <p className="input__errors">Description cannot be empty</p>}
      <p className="input__field-count">{MAX_COMMENT_COUNT - commentCount}</p>
      <Button text="Send" onClick={() => submitForm} style="send" />
    </form>
  );
};
