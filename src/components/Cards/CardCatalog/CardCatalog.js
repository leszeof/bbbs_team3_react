import './CardCatalog.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TitleH2 } from '../../utils/index';
import CardFigure from '../CardFigure/CardFigure';
import { staticImageUrl } from '../../../config/config';

function CardCatalog({ data: { id, title, image }, shape, sectionClass }) {
  const link = `/catalog/${id}`;
  return (
    <div className={`card-catalog ${sectionClass}`}>
      <Link to={link} className="card-catalog__link-wrap">
        <div className="card-catalog__image-wrap">
          <CardFigure
            sectionClass="card-catalog_type_shaped"
            shape={shape}
            color="white"
          >
            <img
              className="card-catalog__image"
              src={`${staticImageUrl}/${image}`}
              alt={title}
            />
          </CardFigure>
        </div>
        <TitleH2 sectionClass="card-catalog__title" title={title} />
      </Link>
    </div>
  );
}

CardCatalog.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
  shape: PropTypes.string,
  image: PropTypes.string,
  sectionClass: PropTypes.string,
};

CardCatalog.defaultProps = {
  data: {},
  title: '',
  shape: 'square',
  image: '',
  sectionClass: '',
};

export default CardCatalog;
