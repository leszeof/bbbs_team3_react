/* eslint-disable react/jsx-props-no-spreading */
import './ProfileForm.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { parseDate } from '../../utils/utils';
import captions from '../../utils/rating-captions';
import { adminUrl } from '../../config/config';
import { Card, Input, Caption, Rating, Button } from './index';

function ProfileForm({
  data,
  sectionClass,
  isEditMode,
  isOpen,
  onCancel,
  onSubmit,
}) {
  const classNames = ['card-container', 'profile-form', sectionClass]
    .join(' ')
    .trim();

  const [inputValues, setInputValues] = useState({});
  const [caption, setCaption] = useState('');
  const [userImage, setUserImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onFormSubmit = (values) => {
    let inputFields = Object.assign(values);
    inputFields = {
      ...inputFields,
      mark: inputValues.mark,
      id: inputValues.id,
    };
    if (userImage) {
      inputFields = {
        ...inputFields,
        image: userImage.image,
      };
    }
    onSubmit(inputFields);
  };

  const handleChangeRating = (value) => {
    setInputValues({ ...inputValues, mark: value });
  };

  const handleChangeImage = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage({ ...userImage, image: file, imageUrl });
    }
  };

  useEffect(() => {
    if (inputValues?.mark) setCaption(captions[inputValues.mark]);
    else setCaption('Оцените проведенное время');
  }, [inputValues.mark]);

  useEffect(() => {
    if (isOpen) {
      if (data) {
        setInputValues({ ...inputValues, ...data });
        setUserImage({ image: data.image });
        setValue('place', data.place);
        setValue('date', parseDate(data.date));
        setValue('description', data.description);
        setValue('mark', data.mark);
      }
    } else {
      setInputValues({});
      setUserImage(null);
      reset({
        place: '',
        date: '',
        description: '',
      });
    }
  }, [isOpen, data]);

  return (
    <div className={classNames}>
      <Card sectionClass="profile-form__photo-upload">
        {userImage && (
          <img
            src={userImage.imageUrl || `${adminUrl}/media/${userImage.image}`}
            alt={data?.place}
            className="profile-form__uploaded-image"
          />
        )}

        <div
          className={`profile-form__input-upload ${
            userImage ? 'profile-form__input-upload_hidden' : ''
          }`}
        >
          <label htmlFor="input-upload" className="profile-form__label-file">
            <input
              id="input-upload"
              type="file"
              name="image"
              className="profile-form__input-file"
              {...register('image')}
              onChange={(evt) => handleChangeImage(evt.target.files[0])}
            />
            <span className="profile-form__pseudo-button" />
          </label>
          <Caption
            title="Загрузить фото"
            sectionClass="profile-form__caption"
          />
        </div>
      </Card>

      <Card sectionClass="profile-form__form-container">
        <form
          name="addStoryForm"
          className="profile-form__form"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Input
            type="text"
            name="place"
            placeholder="Место встречи"
            register={register}
            required
            error={errors?.place}
            errorMessage="Место встречи*"
          />
          <Input
            type="date"
            name="date"
            placeholder="Дата&emsp;"
            sectionClass={`profile-form__input_el_date ${
              errors.date ? 'profile-form__input_el_date-error' : ''
            }`}
            register={register}
            required
            error={errors?.date}
            errorMessage="Дата*&emsp;"
          />
          <Input
            type="text"
            name="description"
            placeholder="Опишите вашу встречу, какие чувства вы испытывали, что понравилось / не понравилось"
            sectionClass="profile-form__input_el_textarea"
            register={register}
            required
            error={errors?.description}
            errorMessage="Опишите вашу встречу, какие чувства вы испытывали, что понравилось / не понравилось*"
            isTextarea
          />
          <div className="profile-form__submit-zone">
            <div className="profile-form__ratings">
              <Rating
                type="radio"
                name="rating"
                ratingType="good"
                onClick={handleChangeRating}
                value="good"
                sectionClass="profile-form__rating"
                checked={inputValues?.mark === 'good'}
              />
              <Rating
                type="radio"
                name="rating"
                ratingType="neutral"
                onClick={handleChangeRating}
                value="neutral"
                sectionClass="profile-form__rating"
                checked={inputValues?.mark === 'neutral'}
              />
              <Rating
                type="radio"
                name="rating"
                ratingType="bad"
                onClick={handleChangeRating}
                value="bad"
                sectionClass="profile-form__rating"
                checked={inputValues?.mark === 'bad'}
              />
              <Caption
                title={caption}
                sectionClass={`profile-form__ratings-text profile-form__ratings-text_type_${inputValues.mark}`}
              />
            </div>
            <div className="profile-form__buttons">
              <Button
                title={`${isEditMode ? 'Отмена' : 'Удалить'}`}
                color="gray-borderless"
                sectionClass="profile-form__button_el_delete"
                onClick={onCancel}
              />
              <Button
                title={`${isEditMode ? 'Сохранить' : 'Добавить'}`}
                sectionClass="profile-form__button_el_add"
                isDisabled={
                  !!(errors.place || errors.date || errors.description)
                }
                isSubmittable
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

ProfileForm.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  sectionClass: PropTypes.string,
  onCancel: PropTypes.func,
  isOpen: PropTypes.bool,
  isEditMode: PropTypes.bool,
  onSubmit: PropTypes.func,
};

ProfileForm.defaultProps = {
  data: {},
  sectionClass: '',
  onCancel: () => {},
  isOpen: false,
  isEditMode: false,
  onSubmit: () => {},
};

export default ProfileForm;
