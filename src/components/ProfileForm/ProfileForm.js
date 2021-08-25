import './ProfileForm.scss';
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import texts from './locales/RU';
import { ErrorsContext } from '../../contexts/index';
import { useFormWithValidation } from '../../hooks/index';
import captions from '../../utils/rating-captions';
import { staticImageUrl } from '../../config/config';
import { regExpImages } from '../../config/constants';
import {
  Card,
  Input,
  Caption,
  Rating,
  Button,
  ButtonRound,
} from '../utils/index';

function ProfileForm({
  data,
  sectionClass,
  isEditMode,
  isOpen,
  onClose,
  onSubmit,
}) {
  const classNames = ['card-container', 'profile-form', sectionClass]
    .join(' ')
    .trim();

  const { serverError, clearError } = useContext(ErrorsContext);

  const errorsString = serverError
    ? Object.values(serverError)
        .map((err) => err)
        .join(' ')
        .trim()
    : '';

  const [caption, setCaption] = useState(texts.rateCaptionText);
  const [userImage, setUserImage] = useState(null);

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    handleChangeFiles,
  } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!values?.mark) {
      values.mark = 'neutral';
    }
    onSubmit(values);
  };

  const handleFocusDataInput = (evt) => {
    // eslint-disable-next-line no-param-reassign
    evt.currentTarget.type = 'date';
  };

  const handleChangeImage = () => {
    if (values?.image) {
      // ссылка-блоб для отображения загруженной картинки
      const imageUrl = URL.createObjectURL(values.image);
      setUserImage({ ...userImage, imageUrl });
    }
  };

  const handleCloseForm = () => {
    setUserImage(null);
    resetForm();
    clearError();
    setCaption(texts.rateCaptionText);
    onClose();
  };

  useEffect(() => {
    if (values?.mark) setCaption(captions[values.mark]);
    else setCaption(texts.rateCaptionText);
  }, [values.mark]);

  useEffect(() => {
    handleChangeImage();
  }, [values.image]);

  useEffect(() => {
    if (isOpen) {
      if (data) {
        setUserImage({ image: data.image });
        setValues({
          id: data?.id,
          date: data?.date,
          place: data?.place,
          description: data?.description,
          mark: data?.mark,
        });
      }
    }
  }, [isOpen, data]);

  return (
    <form
      name="addStoryForm"
      onSubmit={(evt) => handleSubmit(evt)}
      className={classNames}
      noValidate
    >
      <Card sectionClass="profile-form__photo-upload">
        {(userImage?.imageUrl || userImage?.image) && (
          <img
            src={userImage.imageUrl || `${staticImageUrl}/${userImage.image}`}
            alt={data?.place}
            className="profile-form__uploaded-image"
          />
        )}

        <div
          className={`profile-form__input-upload ${
            (userImage?.imageUrl || userImage?.image) && !errors?.image
              ? 'profile-form__input-upload_hidden'
              : ''
          } ${errors?.image ? 'profile-form__input-upload_error' : ''}
          `}
        >
          <label htmlFor="input-upload" className="profile-form__label-file">
            <input
              id="input-upload"
              type="file"
              accept="image/*"
              name="image"
              className="profile-form__input-file"
              onChange={(evt) => handleChangeFiles(evt, regExpImages)}
            />
            <ButtonRound
              sectionClass={`profile-form__pseudo-button ${
                errors?.image ? 'profile-form__pseudo-button_error' : ''
              }`}
              color={`${errors?.image ? 'error' : 'lightGray'}`}
              isSpan
            />
            <Caption
              title={errors?.image || texts.uploadCaptionText}
              sectionClass={`profile-form__caption ${
                errors?.image ? 'profile-form__caption_error' : ''
              }`}
            />
          </label>
        </div>
      </Card>

      <Card sectionClass="profile-form__text-container">
        <div className="profile-form__texts">
          <Input
            id="profileInputPlace"
            type="text"
            name="place"
            placeholder={texts.placePlaceholder}
            onChange={handleChange}
            value={values.place}
            required
            minLength="5"
            maxLength="128"
            error={errors?.place}
          />

          <Input
            id="profileInputDate"
            type="text"
            name="date"
            placeholder={texts.datePlaceholder}
            onFocus={handleFocusDataInput}
            onChange={handleChange}
            value={values.date}
            required
            error={errors?.date}
          />

          <Input
            id="profileInputTextarea"
            type="text"
            name="description"
            placeholder={texts.descrPlaceholder}
            sectionClass="profile-form__input-wrap profile-form__input-wrap_textarea"
            onChange={handleChange}
            value={values.description}
            required
            maxLength="1024"
            error={errors?.description}
            isTextarea
          />

          <div className="profile-form__submit-zone">
            <span className="form-error-message">{errorsString}</span>
            <div className="profile-form__ratings-buttons">
              <div className="profile-form__ratings">
                <Rating
                  type="radio"
                  name="mark"
                  ratingType="good"
                  onChange={handleChange}
                  value="good"
                  sectionClass="profile-form__rating"
                  checked={data?.mark === 'good'}
                />
                <Rating
                  type="radio"
                  name="mark"
                  ratingType="neutral"
                  onChange={handleChange}
                  value="neutral"
                  sectionClass="profile-form__rating"
                  checked={data?.mark === 'neutral'}
                />
                <Rating
                  type="radio"
                  name="mark"
                  ratingType="bad"
                  onChange={handleChange}
                  value="bad"
                  sectionClass="profile-form__rating"
                  checked={data?.mark === 'bad'}
                />
                <Caption
                  title={caption}
                  sectionClass={`profile-form__ratings-text profile-form__ratings-text_type_${values.mark}`}
                />
              </div>
              <div className="profile-form__buttons">
                <Button
                  title={`${
                    isEditMode ? texts.buttonCancelText : texts.buttonDeleteText
                  }`}
                  color="gray-borderless"
                  sectionClass="profile-form__button_el_delete"
                  onClick={handleCloseForm}
                />
                <Button
                  title={`${
                    isEditMode ? texts.buttonSaveText : texts.buttonAddText
                  }`}
                  sectionClass="profile-form__button_el_add"
                  isDisabled={!isValid}
                  isSubmittable
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </form>
  );
}

ProfileForm.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  sectionClass: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onSubmit: PropTypes.func,
};

ProfileForm.defaultProps = {
  data: {},
  sectionClass: '',
  onClose: () => {},
  isOpen: false,
  isEditMode: false,
  onSubmit: () => {},
};

export default ProfileForm;
