import { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AboutUs,
  Profile,
  Calendar,
  MainPage,
  PageNotFound,
  Catalog,
  Questions,
  Places,
  Movies,
  ReadAndWatching,
} from '../pages/index';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {
  MAIN_PAGE_URL,
  ABOUT_US_URL,
  AFISHA_URL,
  QUESTIONS_URL,
  PLACES_URL,
  MOVIES_URL,
  READANDWATCHING_URL,
  CATALOG_URL,
  PROFILE_URL,
} from '../config/routes';

function Router({
  handlers: {
    handleEventBooking,
    handleClickPopupAboutEventOpened,
    handleClickPopupLoginOpened,
    handleClickPopupCities,
  },
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Switch>
      <Route exact path={MAIN_PAGE_URL}>
        <MainPage
          onEventSignUpClick={handleEventBooking}
          onEventFullDescriptionClick={handleClickPopupAboutEventOpened}
        />
      </Route>
      <Route exact path={ABOUT_US_URL}>
        <AboutUs />
      </Route>
      <Route path={AFISHA_URL}>
        <Calendar
          onEventSignUpClick={handleEventBooking}
          onEventFullDescriptionClick={handleClickPopupAboutEventOpened}
          onOpenLoginPopup={handleClickPopupLoginOpened}
        />
      </Route>
      <Route path={QUESTIONS_URL}>
        <Questions />
      </Route>
      <ProtectedRoute
        exact
        path={PROFILE_URL}
        component={Profile}
        onEventFullDescriptionClick={handleClickPopupAboutEventOpened}
        isAuth={!!currentUser}
      />
      <Route exact path={PLACES_URL}>
        <Places openPopupCities={handleClickPopupCities} />
      </Route>
      <Route exact path={MOVIES_URL}>
        <Movies />
      </Route>
      <Route exact path={READANDWATCHING_URL}>
        <ReadAndWatching />
      <Route exact path={CATALOG_URL}>
        <Catalog openPopupCities={handleClickPopupCities} />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
}

Router.propTypes = {
  handlers: PropTypes.objectOf(PropTypes.any),
};

Router.defaultProps = {
  handlers: {},
};

export default Router;
