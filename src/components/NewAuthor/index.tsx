import React, { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  addNewAuthorSaveOptionts,
  resetNewAuthor,
  resetUpdatedAuthor,
  updateAuthorSaveOptionts,
} from 'toolkitStore/actions/authors';
import { AuthorsReducerState } from 'toolkitStore/types';
import { addNewAuthor, updateSelectedAuthor } from 'toolkitStore/thunk';
import { ToastOptions } from 'types/enumerators';
import { useToast } from 'hooks';
import { uploadGamePhoto } from 'api/adminRequests';
import { Button, Loader, ToastComponent } from 'components';

import userPhoto from 'assets/userPhoto.png';

import './styles.scss';

const MAX_DESCRIPTION_COUNT = 300;

interface INewAuthor {
  isEditMode?: boolean;
}

export const NewAuthor: React.FC<INewAuthor> = ({ isEditMode }) => {
  const [authorPhoto, setAuthorPhoto] = useState<string>();
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const history = useNavigate();
  const dispatch = useDispatch();
  const { openToast } = useToast();
  const { authorError, isLoading, updatedAuthor, newAuthor } = useSelector(
    (state: AuthorsReducerState) => state.authorsReducer || [],
  );
  const authorType = isEditMode ? updatedAuthor : newAuthor;

  const { handleSubmit, register, reset } = useForm();

  const uploadNewAuthorPhoto = async (files: FileList | null) => {
    try {
      const formData = new FormData();
      files ? formData.append('file', files[0]) : undefined;
      formData.append('upload_preset', 'fabra5gx');
      setIsPhotoLoading(true);
      const { data } = await uploadGamePhoto(formData);
      if (isEditMode) {
        dispatch(updateAuthorSaveOptionts({ ...updatedAuthor, ['image']: data.url }));
      }
      if (!isEditMode) {
        dispatch(addNewAuthorSaveOptionts({ ...newAuthor, ['image']: data.url }));
      }
      setAuthorPhoto(data.url);
      setIsPhotoLoading(false);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  const handleReset = () => {
    dispatch(resetNewAuthor());
    dispatch(resetUpdatedAuthor());
    reset();
  };

  const submitForm: SubmitHandler<FieldValues> = (data) => {
    if (!isEditMode) {
      dispatch(addNewAuthor({ ...data, image: authorPhoto }));
    }
    if (isEditMode) {
      dispatch(updateSelectedAuthor({ ...data, id: updatedAuthor.id, image: authorPhoto }));
    }
    handleReset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    dispatch(addNewAuthorSaveOptionts({ ...newAuthor, [id]: value }));
  };

  const handleDescriptionCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setDescriptionCount(e.target.value.length);
    dispatch(addNewAuthorSaveOptionts({ ...newAuthor, [id]: value }));
  };

  useEffect(() => {
    if (authorError && !isLoading) {
      openToast(authorError, ToastOptions.error);
    }
  }, [authorError]);

  useEffect(() => {
    if (authorType.id) {
      if (!authorError && !isLoading) {
        openToast(
          isEditMode ? 'Successfully updated' : 'Successfully created',
          ToastOptions.success,
        );
        history(`/author/${authorType.id}`);
        handleReset();
      }
    }
  }, [submitForm]);

  return (
    <div className="new-author">
      <form onSubmit={handleSubmit(submitForm)} className="new-author__form">
        <h1>{isEditMode ? 'Update author' : 'New author'}</h1>
        <div className="new-author__image-info">
          {!isPhotoLoading ? (
            <img
              className="new-author__image"
              src={authorType.image || userPhoto}
              alt="profile photo"
            />
          ) : (
            <Loader />
          )}
          <label className="new-author__upload-label" htmlFor="file-upload">
            Upload new photo
          </label>
        </div>
        <div className="new-author__main-info">
          <input
            className="new-author__upload-input"
            id="file-upload"
            type="file"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              uploadNewAuthorPhoto(event.target.files)
            }
          />
          <div className="new-author__group">
            <input
              {...register('name', {
                required: true,
              })}
              type="text"
              id="name"
              defaultValue={authorType.name ?? ''}
              onChange={handleChange}
              placeholder="Name"
              className="new-author__name"
            />
            <label htmlFor="name" className="new-author__label">
              Name
            </label>
          </div>
          <div className="new-author__group">
            <input
              {...register('location', {
                required: true,
              })}
              type="text"
              id="location"
              defaultValue={authorType.location ?? ''}
              onChange={handleChange}
              placeholder="Location"
              className="new-author__location"
            />
            <label htmlFor="location" className="new-author__label">
              Location
            </label>
          </div>
          <div className="new-author__group">
            <input
              {...register('popularity', {
                required: true,
              })}
              id="popularity"
              defaultValue={authorType.popularity ?? ''}
              onChange={handleChange}
              placeholder="Popularity"
              type="number"
              max="100"
              className="new-author__location"
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            />
            <label htmlFor="Popularity" className="new-author__label">
              Popularity
            </label>
          </div>
          <div className="new-author__group">
            <textarea
              {...register('description')}
              id="description"
              defaultValue={authorType.description ?? ''}
              placeholder="description"
              className="new-author__description"
              onChange={handleDescriptionCount}
              maxLength={MAX_DESCRIPTION_COUNT}
            />
            <label htmlFor="description" className="new-author__label">
              Description
            </label>
            <p className="new-game__description-count">
              {MAX_DESCRIPTION_COUNT - descriptionCount}
            </p>
          </div>
        </div>
        <div className="new-author__additional-info"></div>
        <div className="new-author__submit">
          <Button style="admin-clear" text="Clear" type="reset" onClick={handleReset} />
          <Button
            style="admin-search"
            text={isEditMode ? 'Update author' : 'Add author'}
            type="submit"
            onClick={() => submitForm}
          />
        </div>
      </form>
      <ToastComponent />
    </div>
  );
};
