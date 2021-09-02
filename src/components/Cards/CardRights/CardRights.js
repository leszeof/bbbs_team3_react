import React from 'react';
import './CardRights.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Rubric } from '../../utils/index';
import CardFigure from '../CardFigure/CardFigure';

function CardRights({
  title,
  tags,
  shape,
  color,
  sectionClass,
  id,
  getActiveTags,
}) {
  return (
    <div className={`rights-card ${sectionClass}`}>
<<<<<<< HEAD
      <Link
        to={{ pathname: `/rights/${id}`, getActiveTags }}
        className="rights-card__link"
      >
        <CardFigure shape={shape} title={title} color={color}>
=======
      <Link to={`/rights/${id}`} className="rights-card__link">
        <CardFigure
          shape={shape}
          title={title}
          color={color}
          sectionClass="rights-card__card"
        >
>>>>>>> dev
          <div className="rights-card__block">
            {tags.map((tag) => (
              <Rubric
                key={tag.id}
                sectionClass="rights-card__rubric"
                title={tag.name}
              />
            ))}
          </div>
        </CardFigure>
      </Link>
    </div>
  );
}

CardRights.propTypes = {
  title: PropTypes.string,
  shape: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(Array),
  color: PropTypes.string,
  sectionClass: PropTypes.string,
  id: PropTypes.number,
  getActiveTags: PropTypes.func,
};

CardRights.defaultProps = {
  title: '',
  tags: [],
  color: '',
  sectionClass: '',
  id: 0,
  getActiveTags: () => {},
};

export default CardRights;
