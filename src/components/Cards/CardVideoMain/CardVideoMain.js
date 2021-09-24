import { useContext } from 'react';
import PropTypes from 'prop-types';
import texts from './locales/RU';
import { PopupsContext } from '../../../contexts';
import { Caption, Card, TitleH2 } from '../../utils';
import { changeCaseOfFirstLetter, formatDuration } from '../../../utils/utils';
import { staticImageUrl } from '../../../config/config';
import { setLocalStorageData } from '../../../hooks/useLocalStorage';
import { localStChosenVideo } from '../../../config/constants';
import parserLinkYoutube from '../../../utils/parser-link-youtube';
import './CardVideoMain.scss';

function CardVideoMain({ data: { title, info, link, image, duration } }) {
  const { openPopupVideo } = useContext(PopupsContext);

  // Пробрасываем данные в попап
  const handleClick = () => {
    setLocalStorageData(localStChosenVideo, {
      title,
      info,
      link,
      image,
      duration,
    });
    openPopupVideo();
  };

  const { imagePreview } = parserLinkYoutube(link);

  return (
    <div className="card-container card-container_type_main-video">
      <Card sectionClass="card-video-main" color="yellow">
        <div className="card-video-main__title-wrap">
          <TitleH2
            sectionClass="card-video-main__title"
            title={changeCaseOfFirstLetter(title)}
          />
          <Caption
            sectionClass="card-video-main__info"
            title={changeCaseOfFirstLetter(info)}
          />
        </div>
        {link && renderVideoPlayback(texts.linkText)}
      </Card>

      <Card sectionClass="card-video-main__video">
        {renderVideoPlayback(renderPreview())}
      </Card>
    </div>
  );

  // Рендерим верхную часть с фоткой и props.children из компонета выше
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
          src={`${staticImageUrl}/${image}` || imagePreview}
          alt={`${texts.imageAlt}: ${title}`}
          className="card-video-main__image image-scale"
        />

        <span className="card-video-main__duration paragraph">
          {durationString}
        </span>
      </>
    );
  }

  function renderVideoPlayback(childrenElem) {
    return (
      <button
        className="link card-video-main__button"
        type="button"
        onClick={handleClick}
      >
        {childrenElem}
      </button>
    );
  }
}

CardVideoMain.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};

CardVideoMain.defaultProps = {
  data: {},
};

export default CardVideoMain;
