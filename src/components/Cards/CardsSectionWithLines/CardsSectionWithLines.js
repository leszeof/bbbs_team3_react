import PropTypes from 'prop-types';
import './CardsSectionWithLines.scss';
import { Paginate, Loader } from '../../utils/index';
import renderThoseDamnedLines from '../../../utils/render-lines';

function CardsSectionWithLines({
  pageCount,
  children,
  pageNumber,
  setPageNumber,
  sectionClass,
  isLoading,
  dataLength,
  pageSize,
}) {
  return (
    <>
      {isLoading ? (
        <Loader isNested />
      ) : (
        <>
          <section className={`cards-section ${sectionClass}`}>
            {renderThoseDamnedLines(dataLength, pageSize)}
            {children}
          </section>
        </>
      )}

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
  isLoading: PropTypes.bool,
  dataLength: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

CardsSectionWithLines.defaultProps = {
  pageCount: 0,
  children: null,
  pageNumber: 0,
  setPageNumber: () => {},
  sectionClass: '',
  isLoading: false,
};

export default CardsSectionWithLines;
