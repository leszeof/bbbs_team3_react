import '../Popup/Popup.scss';
import './PopupLogin.scss';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Popup from '../Popup/Popup';
import Button from '../ui/Button/Button';
import TitleH2 from '../ui/TitleH2/TitleH2';

function PopupLogin({ isOpen, onClose, onLoginFormSubmit }) {
  function submitHandler(event) {
    event.preventDefault();
    onLoginFormSubmit();
  }

  const history = useHistory();
  function closePopup() {
    history.push('/');
    onClose();
  }
  return (
    <Popup
      type="sign-in"
      typeContainer="sign-in"
      isOpen={isOpen}
      onClose={closePopup}
    >
      {/* popup__container_type_sign-in */}
      <TitleH2 sectionClass="popup__title_type_sign-in" title="Вход" />
      <p className="paragraph popup__sign-in">
        Вход в личный кабинет доступен наставникам программы «Старшие Братья
        Старшие Сёстры».
      </p>
      <p className="paragraph popup__sign-in">
        Пожалуйста, введите логин и пароль из письма. Если вам не приходило
        письмо, свяжитесь с вашим куратором.
      </p>
      <input
        type="text"
        className="popup__input"
        required
        placeholder="Логин"
      />
      <input
        type="password"
        className="popup__input"
        required
        placeholder="Пароль"
      />

      {/* забыли пароль это либо кнопка либо ссылка, смотря что хотят
      (переход на страницу или открытие попапа нового) */}
      <a href="/" className="popup__forgot-password">Забыли пароль?</a>

      {/* цвет кнопки должен меняться от валидности формы! */}
      <Button
        color="blue"
        title="Войти"
        onClick={submitHandler}
        isSubmittable
        isDisabled
        sectionClass="popup__button_type_sign-in"
      />
    </Popup>
  );
}

PopupLogin.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginFormSubmit: PropTypes.func.isRequired
};

export default PopupLogin;
