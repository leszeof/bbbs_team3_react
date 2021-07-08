import './PopupCities.scss';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import texts from './locales/RU';
import { CurrentUserContext, CitiesContext } from '../../../contexts/index';
import { updateUserProfile } from '../../../api/user';
import { localStUserCity, DELAY_DEBOUNCE } from '../../../config/constants';
import { dispatchLocalStorageEvent } from '../../../hooks/useLocalStorage';
import { useDebounce } from '../../../hooks/index';
import Popup from '../Popup/Popup';
import { TitleH2 } from '../../utils/index';

function PopupCities({ isOpen, onClose }) {
  const { currentUser, updateUser } = useContext(CurrentUserContext);
  const cities = useContext(CitiesContext);

  function submitCity(evt) {
    const cityId = parseInt(evt.target.value, 10);
    if (currentUser) {
      updateUserProfile({ city: cityId })
        .then((res) => {
          updateUser(res);
          onClose();
        })
        .catch(console.log);
    } else {
      dispatchLocalStorageEvent(localStUserCity, cityId);
      onClose();
    }
  }

  const debounceSubmitCity = useDebounce(submitCity, DELAY_DEBOUNCE);

  return (
    cities && (
      <Popup
        type="cities"
        typeContainer="cities"
        isOpen={isOpen}
        onClose={onClose}
        withoutCloseButton
      >
        <div className="popup__form">
          <TitleH2 title={texts.title} sectionClass="cities__title" />
          <div className="cities__container">
            <ul className="cities__list cities__list_type_primary">
              {cities &&
                cities
                  .filter((item) => item?.isPrimary === true)
                  .map((item) => (
                    <li className="cities__list-item" key={item?.id}>
                      <button
                        className="cities__city"
                        type="button"
                        value={item?.id}
                        onClick={(evt) => debounceSubmitCity(evt)}
                      >
                        {item?.name}
                      </button>
                    </li>
                  ))}
            </ul>
            <ul className="cities__list">
              {cities &&
                cities
                  .filter((item) => item?.isPrimary !== true)
                  .map((item) => (
                    <li className="cities__list-item" key={item?.id}>
                      <button
                        className="cities__city"
                        type="button"
                        value={item?.id}
                        onClick={(evt) => debounceSubmitCity(evt)}
                      >
                        {item?.name}
                      </button>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </Popup>
    )
  );
}

PopupCities.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

PopupCities.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

export default PopupCities;
