import './Main.scss';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getCalendarPageData } from '../../utils/api';
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
import PopupAboutEvent from '../Popup/PopupAboutEvent';

function Main({ isAuthorized }) {
  const [isSelected, setIsSelected] = useState(false);
  const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = useState(false);
  const [isPopupSuccessfullyOpen, setIsPopupSuccessfullyOpen] = useState(false);
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false);
  const [dataCalendar, setDataCalendar] = useState(null);
  const [selectedDataCalendar, setSelectedDataCalendar] = useState('');

  function handleClickSelectedButton() {
    setIsSelected(true);
  }

  function handleClickPopupConfirmationOpened(data) {
    setIsPopupConfirmation(true);
    setSelectedDataCalendar(data);
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

  useEffect(() => {
    getCalendarPageData()
      .then((res) => setDataCalendar(res.data.calendarPageData))
      .catch((err) => console.log(err));
  }, [setDataCalendar]);

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
            dataCalendar={dataCalendar}
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
        data={selectedDataCalendar}
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
      <PopupAboutEvent />
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
