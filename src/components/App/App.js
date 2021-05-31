import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
// import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// попапы
import PopupConfirmation from '../Popup/PopupConfirmation';
import PopupSuccessfully from '../Popup/PopupSuccessfully';
import PopupLogin from '../Popup/PopupLogin';
import PopupAboutEvent from '../Popup/PopupAboutEvent';
import PopupCities from '../PopupCities/PopupCities';
// страницы
import MainPage from '../MainPage/MainPage';
import Calendar from '../Calendar/Calendar';
import AboutUs from '../AboutUs/AboutUs';
import Account from '../Account/Account';
import PageNotFound from '../PageNotFound/PageNotFound';
// серверная дата
import { getCalendarPageData } from '../../utils/api';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const handleUserButtonClick = () => {
    if (isAuthorized) setIsAuthorized(false);
    else setIsAuthorized(true);
  };

  // стейт переменные попапов
  const [isPopupConfirmationOpen, setIsPopupConfirmationOpen] = useState(false);
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false);
  const [isPopupSuccessfullyOpen, setIsPopupSuccessfullyOpen] = useState(false);
  const [isPopupAboutDescriptionOpen, setIsPopupAboutDescriptionOpen] = useState(false);
  const [isPopupCitiesOpen, setIsPopupCitiesOpen] = useState(false);

  // выбранная карточка при открытии попапа
  const [selectedCalendarCard, setSelectedCalendarCard] = useState({});
  // записан ли ты на событие
  const [isBooked, setIsBooked] = useState(false);

  // данные страницы-календаря с сервера
  const [dataCalendar, setDataCalendar] = useState([]);

  function handleClickBooked() {
    setIsBooked(true);
  }

  // управление попапами
  function closeAllPopups() {
    setIsPopupConfirmationOpen(false);
    setIsPopupSuccessfullyOpen(false);
    setIsPopupLoginOpen(false);
    setIsPopupAboutDescriptionOpen(false);
    setIsPopupCitiesOpen(false);
  }

  function handleClickPopupConfirmationOpened(cardData) {
    setIsPopupConfirmationOpen(true);
    setSelectedCalendarCard(cardData);
  }

  function handleClickPopupSuccessfullyOpened() {
    closeAllPopups();
    setIsPopupSuccessfullyOpen(true);
  }

  function handleClickPopupLoginOpened() {
    setIsPopupLoginOpen(true);
  }

  function handleClickPopupAboutEventOpened(cardData) {
    setIsPopupAboutDescriptionOpen(true);
    setSelectedCalendarCard(cardData);
  }

  function handleClickPopupCities() {
    setIsPopupCitiesOpen(true);
  }

  // эффект закрытия модалок по Escape
  useEffect(() => {
    window.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    });
  }, []);

  // эффект при монтировании, загрузка данных страницы Календарь с сервера
  useEffect(() => {
    getCalendarPageData()
      .then((res) => setDataCalendar(res.data.calendarPageData))
      .catch((err) => console.log(err));
  }, [setDataCalendar]);

  //! завязать на isBooked и выкинуть
  const [isSelected, setIsSelected] = useState(false);
  function handleClickSelectedButton() {
    setIsSelected(true);
  }

  return (
    <BrowserRouter>
      <div className="page">
        <Header
          isAuthorized={isAuthorized}
          handleUserButtonClick={handleUserButtonClick}
          handleChangeCity={handleClickPopupCities}
        />
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
                onEventSignUpClick={handleClickPopupConfirmationOpened}
                onEventFullDescriptionClick={handleClickPopupAboutEventOpened}
                clickButton={handleClickSelectedButton}
                isSelected={isSelected}
                dataCalendar={dataCalendar}
                isBooked={isBooked}
              />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </main>
        <Footer />
        <PopupConfirmation
          isOpen={isPopupConfirmationOpen}
          onClose={closeAllPopups}
          onConfirmButtonClick={handleClickPopupSuccessfullyOpened}
          data={selectedCalendarCard}
          putBookedEvent={handleClickBooked}
        />
        <PopupSuccessfully
          isOpen={isPopupSuccessfullyOpen}
          onClose={closeAllPopups}
          data={selectedCalendarCard}
        />
        <PopupLogin
          isOpen={isPopupLoginOpen}
          onClose={closeAllPopups}
          onLoginFormSubmit={handleClickPopupLoginOpened}
        />
        <PopupAboutEvent
          isOpen={isPopupAboutDescriptionOpen}
          onClose={closeAllPopups}
          onEventSignUpClick={handleClickPopupSuccessfullyOpened}
          data={selectedCalendarCard}
        />
        <PopupCities
          isOpen={isPopupCitiesOpen}
          onClose={closeAllPopups}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
