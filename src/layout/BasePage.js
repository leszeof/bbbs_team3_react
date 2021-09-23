import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useScrollToTop } from '../hooks/index';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function BasePage({
  children,
  headTitle,
  headDescription,
  scrollUpDeps,
  isNoFooter,
  isHeaderTransparentOnTop,
}) {
  useScrollToTop(scrollUpDeps);

  return (
    <>
      <Helmet>
        <title>{headTitle}</title>
        <meta name="description" content={headDescription} />
      </Helmet>
      <Header isTransparentOnTop={isHeaderTransparentOnTop} />
      <main className="main">{children}</main>
      {!isNoFooter && <Footer />}
    </>
  );
}

BasePage.propTypes = {
  children: PropTypes.node,
  headTitle: PropTypes.string.isRequired,
  headDescription: PropTypes.string.isRequired,
  scrollUpDeps: PropTypes.arrayOf(PropTypes.any),
  isNoFooter: PropTypes.bool,
  isHeaderTransparentOnTop: PropTypes.bool,
};

BasePage.defaultProps = {
  children: null,
  scrollUpDeps: [],
  isNoFooter: false,
  isHeaderTransparentOnTop: false,
};

export default BasePage;
