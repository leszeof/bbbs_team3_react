import './CardsSectionWithLines.scss';
import PropTypes from 'prop-types';
import { Paginate } from '../../utils/index';

function CardsSectionWithLines({
  pageCount,
  children,
  pageNumber,
  setPageNumber,
  sectionClass,
}) {
  return (
    <>
      <section className={`cards-section ${sectionClass}`}>
        <div className="cards-section__line" />
        <div className="cards-section__line" />
        <div className="cards-section__line" />
        {children}
      </section>
      {pageCount > 1 && (
        <Paginate
          sectionClass="cards-section__pagination"
          pageCount={pageCount}
          value={pageNumber}
          onChange={setPageNumber}
        />
      )}
    </>
  );
}

CardsSectionWithLines.propTypes = {
  pageCount: PropTypes.number,
  children: PropTypes.node,
  pageNumber: PropTypes.number,
  setPageNumber: PropTypes.func,
  sectionClass: PropTypes.string,
};

CardsSectionWithLines.defaultProps = {
  pageCount: 0,
  children: null,
  pageNumber: 0,
  setPageNumber: () => {},
  sectionClass: '',
};

export default CardsSectionWithLines;
