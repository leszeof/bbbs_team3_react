import './Main.scss';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// страницы
import MainPage from '../MainPage/MainPage';
import Calendar from '../Calendar/Calendar';
import AboutUs from '../AboutUs/AboutUs';
import Account from '../Account/Account';
import PageNotFound from '../PageNotFound/PageNotFound';
// попапы
import PopupConfirmation from '../Popup/PopupConfirmation';
import PopupSuccessfully from '../Popup/PopupSuccessfully';
import PopupLogin from '../Popup/PopupLogin';

function Main({ isAuthorized }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = useState(false);
  const [isPopupSuccessfullyOpen, setIsPopupSuccessfullyOpen] = useState(false);
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false);

  function handleClickSelectedButton() {
    setIsSelected(true);
  }

  function handleClickPopupConfirmationOpened() {
    setIsPopupConfirmationOpen(true);
  }

  function handleClickPopupSuccessfullyOpened() {
    setIsPopupSuccessfullyOpen(true);
  }

  function handleClickPopupLoginOpened() {
    setIsPopupLoginOpen(true);
  }

  function closeAllPopups() {
    setIsPopupConfirmationOpen(false);
    setIsPopupSuccessfullyOpen(false);
    setIsPopupLoginOpen(false);
  }

  useEffect(() => {
    const clickOverlay = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    };
    const clickEscape = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };
    if (isPopupConfirmationOpen) {
      window.addEventListener('click', clickOverlay);
      window.addEventListener('keyup', clickEscape);
    }
    return () => {
      window.removeEventListener('click', clickOverlay);
      window.removeEventListener('keyup', clickEscape);
    };
  }, [isPopupConfirmationOpen]);

  return (
    <main className="main">
      <Switch>
        <Route exact path="/">
          <MainPage isAuthorized={isAuthorized} />
        </Route>
        <Route exact path="/about-us">
          <AboutUs isAuthorized={isAuthorized} />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/calendar">
          <Calendar
            isAuthorized={isAuthorized}
            onClick={handleClickPopupConfirmationOpened}
            clickButton={handleClickSelectedButton}
            isSelected={isSelected}
          />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <PopupConfirmation
        isOpen={isPopupConfirmationOpen}
        onClose={closeAllPopups}
        onConfirmFormSubmit={handleClickPopupSuccessfullyOpened}
      />
      <PopupSuccessfully
        isOpen={isPopupSuccessfullyOpen}
        onClose={closeAllPopups}
      />
      <PopupLogin
        isOpen={isPopupLoginOpen}
        onClose={closeAllPopups}
        onLoginFormSubmit={handleClickPopupLoginOpened}
      />
    </main>
  );
}

Main.propTypes = {
  isAuthorized: PropTypes.bool
};

Main.defaultProps = {
  isAuthorized: false
};

export default Main;
