import { useEffect, useState } from 'react';
import readAndWatchPageTexts from './locales/read-and-watch-page-RU';
import {
  BasePage,
  CardArticle,
  CardBook,
  CardCatalog,
  CardFilm,
} from './index';
import {
  ARTICLES_URL,
  BOOKS_URL,
  CATALOG_URL,
  MOVIES_URL,
  VIDEO_URL,
} from '../../config/routes';
import {
  ELEMS_PER_SLIDE,
  RAW_DELAY_SLIDER_TRANSITION,
  RAW_SLIDER_BREAKPOINTS,
  RAW_SLIDER_PADDINGS,
} from './constants';
import ReadAndWatchSection from '../../components/ReadAndWatchSection/ReadAndWatchSection';
// АПИ
import { getCatalogPageData } from '../../api/catalog-page';
import { getVideoPageData } from '../../api/video-page';
import { getArticlesPageData } from '../../api/articles-page';
import { getMoviesPageData } from '../../api/movies-page';
import { getBooksPageData } from '../../api/books-page';
import './ReadAndWatch.scss';

// константы страницы
const { headTitle, headDescription, pageTitles, paragraphNoContent } =
  readAndWatchPageTexts;
const { catalogTitle, articlesTitle, moviesTitle, videosTitle, booksTitle } =
  pageTitles;
const { S, M, L } = RAW_SLIDER_BREAKPOINTS;
const { one, two, three, four } = ELEMS_PER_SLIDE;

function ReadAndWatch() {
  // определяет сколько объектов показывать в ряду
  const [pageSize, setPageSize] = useState(null);

  useEffect(() => {
    // 1 элемент в ряду (до 700px)
    const querySizeS = window.matchMedia(`(max-width: ${S}px)`);
    // 2 элемента в ряду (до 1120px)
    const querySizeM = window.matchMedia(`(max-width: ${M}px)`);
    // 3 элемента в ряду (до 1440px)
    const querySizeL = window.matchMedia(`(max-width: ${L}px)`);
    // больше 1440px будет 4 элемента в ряду

    const listener = () => {
      if (querySizeS.matches) {
        setPageSize(one);
      } else if (querySizeM.matches) {
        setPageSize(two);
      } else if (querySizeL.matches) {
        setPageSize(three);
      } else {
        setPageSize(four);
      }
    };
    listener();

    querySizeS.addEventListener('change', listener);
    querySizeM.addEventListener('change', listener);
    querySizeL.addEventListener('change', listener);
    return () => {
      querySizeS.removeEventListener('change', listener);
      querySizeM.removeEventListener('change', listener);
      querySizeL.removeEventListener('change', listener);
    };
  }, []);

  return (
    <BasePage headTitle={headTitle} headDescription={headDescription}>
      <section className="readwatch-page page__section fade-in">
        {pageSize && renderUniqueSliderSections()}
      </section>
    </BasePage>
  );

  function renderUniqueSliderSections() {
    return (
      <>
        <ReadAndWatchSection
          breakpoints={RAW_SLIDER_BREAKPOINTS}
          elemPaddings={RAW_SLIDER_PADDINGS}
          transitionDelay={RAW_DELAY_SLIDER_TRANSITION}
          paragraphNoContentText={paragraphNoContent}
          pageSize={pageSize}
          getDataFromApi={getCatalogPageData}
          CardTemplateComponent={CardCatalog}
          path={CATALOG_URL}
          sectionTitle={catalogTitle}
          sectionClass="readwatch-page__slider-container_el_catalog"
        />
        <ReadAndWatchSection
          breakpoints={RAW_SLIDER_BREAKPOINTS}
          elemPaddings={RAW_SLIDER_PADDINGS}
          transitionDelay={RAW_DELAY_SLIDER_TRANSITION}
          paragraphNoContentText={paragraphNoContent}
          pageSize={pageSize}
          getDataFromApi={getVideoPageData}
          CardTemplateComponent={CardFilm}
          path={VIDEO_URL}
          sectionTitle={videosTitle}
          sectionClass="readwatch-page__slider-container_el_video"
          isVideo
        />
        <ReadAndWatchSection
          breakpoints={RAW_SLIDER_BREAKPOINTS}
          elemPaddings={RAW_SLIDER_PADDINGS}
          transitionDelay={RAW_DELAY_SLIDER_TRANSITION}
          paragraphNoContentText={paragraphNoContent}
          pageSize={pageSize}
          getDataFromApi={getArticlesPageData}
          CardTemplateComponent={CardArticle}
          path={ARTICLES_URL}
          sectionTitle={articlesTitle}
          sectionClass="readwatch-page__slider-container_el_articles"
        />
        <ReadAndWatchSection
          breakpoints={RAW_SLIDER_BREAKPOINTS}
          elemPaddings={RAW_SLIDER_PADDINGS}
          transitionDelay={RAW_DELAY_SLIDER_TRANSITION}
          paragraphNoContentText={paragraphNoContent}
          pageSize={pageSize}
          getDataFromApi={getMoviesPageData}
          CardTemplateComponent={CardFilm}
          path={MOVIES_URL}
          sectionTitle={moviesTitle}
          sectionClass="readwatch-page__slider-container_el_movies"
        />
        <ReadAndWatchSection
          breakpoints={RAW_SLIDER_BREAKPOINTS}
          elemPaddings={RAW_SLIDER_PADDINGS}
          transitionDelay={RAW_DELAY_SLIDER_TRANSITION}
          paragraphNoContentText={paragraphNoContent}
          pageSize={pageSize}
          getDataFromApi={getBooksPageData}
          CardTemplateComponent={CardBook}
          path={BOOKS_URL}
          sectionTitle={booksTitle}
          sectionClass="readwatch-page__slider-container_el_books"
        />
      </>
    );
  }
}

export default ReadAndWatch;
