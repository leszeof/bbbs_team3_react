import './CardArticle.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CardAnnotation, TitleH2, Card, Caption } from './index';

function CardArticle({
  data: { title, info, annotation, imageUrl, articleUrl },
  isMain,
  color,
  sectionClass,
}) {
  const cardColor = isMain ? 'yellow' : color;

  return (
    <article className={`card-container ${sectionClass}`}>
      <Card
        sectionClass={`article-card ${isMain ? 'article-card_main' : ''}`}
        color={cardColor}
      >
        <div className="article-card__title-wrap">
          <Link to={articleUrl} className="article-card__link-wrap">
            <TitleH2 sectionClass="article-card__title" title={title} />
          </Link>
          <Caption sectionClass="article-card__info" title={info} />
        </div>

        {isMain && (
          <Link
            to={articleUrl}
            className="article-card__link-wrap article-card__link-wrap_content_article-img"
          >
            <img src={imageUrl} alt={title} className="article-card__image" />
          </Link>
        )}

        <a
          href={articleUrl}
          className="link article-card__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          читать на сайте
        </a>
      </Card>
      <CardAnnotation description={annotation} isMain={isMain} />
    </article>
  );
}

CardArticle.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
  info: PropTypes.string,
  imageUrl: PropTypes.string,
  articleUrl: PropTypes.string,
  annotation: PropTypes.string,
  color: PropTypes.string,
  sectionClass: PropTypes.string,
  isMain: PropTypes.bool,
};

CardArticle.defaultProps = {
  data: {},
  title: '',
  info: '',
  imageUrl: '',
  articleUrl: '',
  annotation: '',
  color: 'white',
  isMain: false,
  sectionClass: '',
};

export default CardArticle;
