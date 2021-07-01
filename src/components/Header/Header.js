/* eslint-disable jsx-a11y/no-static-element-interactions */
// !onClick в <header> используется исключительно для
// !делегирования функции закрытия мобильного меню по клику на ссылки
// !https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md#case-the-event-handler-is-only-being-used-to-capture-bubbled-events

import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.scss';
import PropTypes from 'prop-types';
import { CurrentUserContext, CitiesContext } from '../../contexts/index';
import { useClickOutside } from '../../hooks/index';
import { PROFILE_URL, AFISHA_URL, PLACES_URL } from '../../config/routes';
import { NavBar, UserMenuButton } from './index';

function Header({ onUserButtonClick, onLogout, onCityChange }) {
  const { pathname } = useLocation();
  const currentUser = useContext(CurrentUserContext);
  const cities = useContext(CitiesContext);

  const [userCityName, setUserCityName] = useState('');

  // определение города пользователя, используется в кнопках
  useEffect(() => {
    if (cities && currentUser) {
      const currentCity = cities.find((city) => city.id === currentUser.city);
      setUserCityName(currentCity.name);
    }
  }, [cities, currentUser]);

  // меню бургер
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // закрытие мобильного меню по клику вне хедера
  const headerRef = useClickOutside(() => setIsMobileMenuOpen(false));

  // закрытие мобильного меню по клику на ссылки
  const handleCloseMobileMenu = (evt) => {
    const { target } = evt;
    if (isMobileMenuOpen && target.classList.contains('mobile-link')) {
      setIsMobileMenuOpen(false);
    }
  };

  // липкий хедер
  const [isHeaderActive, setIsHeaderActive] = useState(true);
  let prevScrollPos = 0;

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const currentScrollPos = window.pageYOffset;
      // если prevScrollPos больше currentScrollPos значит мы скролим наверх
      if (prevScrollPos > currentScrollPos) {
        setIsHeaderActive(true);
      } else {
        setIsHeaderActive(false);
        setIsMobileMenuOpen(false);
      }

      if (currentScrollPos === 0) {
        setIsHeaderActive(true);
      }
      prevScrollPos = currentScrollPos;
    });
  }, []);

  const classNamesHeader = [
    'header',
    isMobileMenuOpen ? 'header_displayed' : '',
    !isHeaderActive ? 'header__on-scroll-up' : '',
  ]
    .join(' ')
    .trim();

  return (
    <header
      className={classNamesHeader}
      ref={headerRef}
      onClick={handleCloseMobileMenu}
      onKeyPress={handleCloseMobileMenu}
    >
      <div className="header__container">
        <NavBar
          onUserButtonClick={onUserButtonClick}
          onBurgerButtonClick={toggleMobileMenu}
          userCityName={userCityName}
          onCityChangeClick={onCityChange}
          onLogout={onLogout}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {pathname === PROFILE_URL && (
          <div className="header__user-info">
            <UserMenuButton
              title={
                userCityName
                  ? `${userCityName}. Изменить город`
                  : 'Изменить ваш город'
              }
              sectionClass="mobile-link"
              handleClick={onCityChange}
            />
            <UserMenuButton
              title="Выйти"
              sectionClass="mobile-link"
              handleClick={onLogout}
            />
          </div>
        )}

        {(pathname === AFISHA_URL || pathname === PLACES_URL) && (
          <div className="header__user-info">
            <UserMenuButton
              title={
                userCityName
                  ? `${userCityName}. Изменить город`
                  : 'Изменить ваш город'
              }
              handleClick={onCityChange}
              sectionClass="mobile-link"
            />
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  onUserButtonClick: PropTypes.func,
  onCityChange: PropTypes.func,
  onLogout: PropTypes.func,
};

Header.defaultProps = {
  onUserButtonClick: () => {},
  onCityChange: () => {},
  onLogout: () => {},
};

export default Header;
