import PropTypes from 'prop-types';
import { useContext } from 'react';
import { PopupsContext } from '../../../contexts';
import { Caption, Card, Rubric, TitleH2 } from '../../utils';
import { changeCaseOfFirstLetter, formatDuration } from '../../../utils/utils';
import texts from './locales/RU';
import { staticImageUrl } from '../../../config/config';
import { setLocalStorageData } from '../../../hooks/useLocalStorage';
import { localStChosenVideo } from '../../../config/constants';
import parserLinkYoutube from '../../../utils/parser-link-youtube';
import './CardFilm.scss';

function CardFilm({
  data: { image, title, info, link, tags, duration },
  sectionClass,
  isVideo,
}) {
  const { openPopupVideo } = useContext(PopupsContext);
  // Пробрасываем данные в попап
  const handleClick = () => {
    setLocalStorageData(localStChosenVideo, {
      image,
      title,
      info,
      link,
      tags,
      duration,
    });
    openPopupVideo();
  };

  const { imagePreview } = parserLinkYoutube(link);

  return (
    <Card sectionClass={`card-film ${sectionClass}`}>
      <div className="card-film__video">
        {renderVideoPlayback(renderPreview())}
      </div>

      <div className="card-film__video-info">
        <div className="card-film__title-wrap">
          <TitleH2
            sectionClass="card-film__title"
            title={changeCaseOfFirstLetter(title)}
          />
          <Caption
            sectionClass="card-film__info"
            title={changeCaseOfFirstLetter(info)}
          />
        </div>
        {link &&
          renderVideoPlayback(
            isVideo ? texts.linkTextVideo : texts.linkTextMovie
          )}
      </div>
    </Card>
  );

  // Рендерим верхную часть с фоткой
  function renderPreview() {
    let durationString = '';

    if (duration) {
      const { hours, minutes, seconds } = formatDuration(duration);
      durationString =
        hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
    }

    return (
      <>
        <img
          draggable="false"
          src={`${staticImageUrl}/${image}` || imagePreview}
          alt={`${texts.altText} ${title}`}
          className="card-film__preview image-scale"
        />
        {duration ? (
          <span className="card-film__duration paragraph">
            {durationString}
          </span>
        ) : (
          <ul className="card-film__rubric-list">
            {tags.map((tag) => (
              <li key={tag.id}>
                <Rubric title={tag.name} sectionClass="card-film__rubric" />
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  function renderVideoPlayback(childrenElem) {
    return (
      <button
        className="link card-film__button"
        type="button"
        onClick={handleClick}
        draggable="false"
      >
        {childrenElem}
      </button>
    );
  }
}

CardFilm.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  image: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
  link: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sectionClass: PropTypes.string,
  isVideo: PropTypes.bool,
};

CardFilm.defaultProps = {
  data: {},
  image: '',
  title: '',
  info: '',
  link: '',
  tags: [],
  duration: '',
  sectionClass: '',
  isVideo: false,
};

export default CardFilm;
