import { useEffect, useState } from 'react';
import catalogPageTexts from './locales/RU';
import {
  AnimatedPageContainer,
  BasePage,
  CardCatalog,
  CardsSectionWithLines,
  Loader,
  TitleH1,
  TitleH2,
} from './index';
import { getCatalogPageData } from '../../api/catalog-page';
import { ERROR_MESSAGES, FIGURES } from '../../config/constants';
import './Catalog.scss';

const PAGE_SIZE_PAGINATE = {
  small: 4,
  medium: 9,
  big: 16,
};

const maxScreenWidth = {
  small: 1399,
  medium: 1640,
};

const { headTitle, headDescription, title, subtitle, textStubNoData } =
  catalogPageTexts;

function Catalog() {
  const [pageSize, setPageSize] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const [catalogPageData, setCatalogPageData] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingPaginate, setIsLoadingPaginate] = useState(false);
  // Стейт ошибки
  const [isPageError, setIsPageError] = useState(false);

  function getPageData() {
    const offset = pageSize * pageNumber;

    getCatalogPageData({ limit: pageSize, offset })
      .then(({ results, count }) => {
        setCatalogPageData(results);
        setPageCount(Math.ceil(count / pageSize));
      })
      .catch(() => setIsPageError(true))
      .finally(() => {
        setIsLoadingPaginate(false);
        setIsLoadingPage(false);
      });
  }

  useEffect(() => {
    if (pageSize) {
      getPageData();
    }

    if (!isLoadingPage) {
      setIsLoadingPaginate(true);
    }
  }, [pageSize, pageNumber]);

  useEffect(() => {
    const smallQuery = window.matchMedia(
      `(max-width: ${maxScreenWidth.small}px)`
    );
    const largeQuery = window.matchMedia(
      `(max-width: ${maxScreenWidth.medium}px)`
    );

    const listener = () => {
      if (smallQuery.matches) {
        setPageSize(PAGE_SIZE_PAGINATE.small);
      } else if (largeQuery.matches) {
        setPageSize(PAGE_SIZE_PAGINATE.medium);
      } else {
        setPageSize(PAGE_SIZE_PAGINATE.big);
      }
    };
    listener();

    smallQuery.addEventListener('change', listener);
    largeQuery.addEventListener('change', listener);

    return () => {
      smallQuery.removeEventListener('change', listener);
      largeQuery.removeEventListener('change', listener);
    };
  }, []);

  if (isLoadingPage) {
    return <Loader isCentered />;
  }

  return (
    <BasePage headTitle={headTitle} headDescription={headDescription}>
      {renderPageContent()}
    </BasePage>
  );

  function renderCards() {
    return (
      <CardsSectionWithLines
        pageCount={pageCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isLoading={isLoadingPaginate}
        dataLength={catalogPageData.length}
        pageSize={pageSize}
      >
        {catalogPageData.map((item, i) => (
          <CardCatalog
            sectionClass="cards-section__item scale-in"
            key={item?.id}
            data={item}
            shape={FIGURES[i % FIGURES.length]}
          />
        ))}
      </CardsSectionWithLines>
    );
  }

  function renderPageContent() {
    if (isPageError) {
      return (
        <AnimatedPageContainer
          titleText={ERROR_MESSAGES.generalErrorMessage.title}
        />
      );
    }
    if (!catalogPageData && !isLoadingPage && !isPageError) {
      return <AnimatedPageContainer titleText={textStubNoData} />;
    }

    return (
      <section className="catalog page__section fade-in">
        <TitleH1 sectionClass="catalog__title" title={title} />
        <TitleH2 sectionClass="catalog__subtitle" title={subtitle} />
        {renderCards()}
      </section>
    );
  }
}

export default Catalog;
