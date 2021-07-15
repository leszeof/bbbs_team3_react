import './Books.scss';
import { useEffect, useState } from 'react';
import booksPageTexts from '../../locales/books-page-RU';
import { useScrollToTop, useDebounce } from '../../hooks/index';
import { getBooksPageData, getBooksPageFilter } from '../../api/books-page';
import {
  BasePage,
  TitleH1,
  CardBook,
  Loader,
  AnimatedPageContainer,
  TagsList,
} from './index';
import Paginate from '../../components/utils/Paginate/Paginate';
import { changeCaseOfFirstLetter } from '../../utils/utils';
import { ALL_CATEGORIES, DELAY_DEBOUNCE } from '../../config/constants';
import {
  handleCheckboxBehavior,
  selectOneTag,
  deselectOneTag,
} from '../../utils/filter-tags';

const PAGE_SIZE_PAGINATE = {
  mobile: 2,
  medium: 12,
  big: 16,
};

const { headTitle, headDescription, title, textStubNoData } = booksPageTexts;

function Books() {
  useScrollToTop();

  // Загрузка данных
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPaginate, setIsLoadingPaginate] = useState(false);
  // Стейты с данными Книг, Теги
  const [booksPageData, setBooksPageData] = useState(null);
  const [categories, setCategories] = useState(null);
  // флаг применения фильтров
  const [isFiltersUsed, setIsFiltersUsed] = useState(false);
  // Стейты для пагинации
  const [pageSize, setPageSize] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const getActiveTags = () => {
    if (categories) {
      return categories
        .filter((filter) => filter.isActive && filter.filter !== ALL_CATEGORIES)
        .map((filter) => filter.filter)
        .join(',');
    }
    return null;
  };

  const getBooksData = (activeCategories) => {
    const offset = isFiltersUsed ? 0 : pageSize * pageNumber;
    const activeTags = activeCategories || getActiveTags();

    getBooksPageData({
      limit: pageSize,
      offset,
      types: activeTags,
    })
      .then(({ results, count }) => {
        setPageCount(Math.ceil(count / pageSize));
        return results;
      })
      .then((results) => setBooksPageData(results))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
        setIsLoadingPaginate(false);
        setIsFiltersUsed(false);
      });
  };

  const getBooksFilter = () => {
    getBooksPageFilter()
      .then((tags) => {
        const categoriesArr = tags.map((tag) => ({
          filter: tag?.slug.toLowerCase(),
          name: changeCaseOfFirstLetter(tag?.name),
          isActive: false,
        }));

        setCategories([
          { filter: ALL_CATEGORIES, name: ALL_CATEGORIES, isActive: true },
          ...categoriesArr,
        ]);
      })
      .catch((err) => console.log(err));
  };

  // хэндлер клика по фильтру КАТЕГОРИЯ
  const changeCategory = (inputValue, isChecked) => {
    if (inputValue === ALL_CATEGORIES) {
      selectOneTag(setCategories, ALL_CATEGORIES);
    } else {
      handleCheckboxBehavior(setCategories, { inputValue, isChecked });
      deselectOneTag(setCategories, ALL_CATEGORIES);
    }
    setIsFiltersUsed(true);
  };

  // функция-фильтратор с использованием АПИ
  const handleFiltration = () => {
    if (categories && isFiltersUsed) {
      const activeCategories = getActiveTags();

      if (activeCategories.length === 0) {
        selectOneTag(setCategories, ALL_CATEGORIES);
      }
      getBooksData(activeCategories);
    }
  };

  /// Фильтрация с делэем
  const debounceFiltration = useDebounce(handleFiltration, DELAY_DEBOUNCE);
  const debouncePaginate = useDebounce(getBooksData, DELAY_DEBOUNCE);
  useEffect(() => {
    if (isFiltersUsed) {
      debounceFiltration();
    }
  }, [isFiltersUsed]);

  // Первая отрисовка страницы + переход по страницам пагинации
  useEffect(() => {
    if (isLoading && pageSize) {
      getBooksData();
      getBooksFilter();
    }

    if (!isLoading && !isFiltersUsed) {
      setIsLoadingPaginate(true);
      debouncePaginate();
    }
  }, [pageSize, pageNumber]);

  useEffect(() => {
    const smallQuery = window.matchMedia('(max-width: 1216px)');
    const largeQuery = window.matchMedia('(max-width: 1640px)');

    const listener = () => {
      if (smallQuery.matches) {
        setPageSize(PAGE_SIZE_PAGINATE.mobile);
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

  // контейнер заглушки
  function renderAnimatedContainer() {
    return <AnimatedPageContainer titleText={textStubNoData} />;
  }

  // контейнер с книгами
  const renderBooksContainer = () => {
    if (!booksPageData && !isLoading) {
      return renderAnimatedContainer();
    }
    return (
      <>
        {isLoadingPaginate ? (
          <Loader isNested />
        ) : (
          <ul className="books__cards cards-grid cards-grid_content_small-cards fade-in">
            {booksPageData.map((books) => (
              <CardBook
                key={books.id}
                data={books}
                pageCount={pageCount}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            ))}
          </ul>
        )}
        );
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
  };

  // главная функция рендеринга
  const renderPageContent = () => (
    <>
      <TitleH1 title={title} sectionClass="books__title" />

      {/* рендер фильтров */}
      {categories?.length > 1 && (
        <TagsList
          filterList={categories}
          name="tag"
          handleClick={changeCategory}
        />
      )}

      {/* рендерим книги */}
      {isFiltersUsed ? <Loader isNested /> : renderBooksContainer()}
    </>
  );

  // глобальный лоадер
  if (isLoading) {
    return <Loader isCentered />;
  }

  return (
    <BasePage headTitle={headTitle} headDescription={headDescription}>
      <section className="books page__section fade-in">
        {renderPageContent()}
      </section>
    </BasePage>
  );
}

export default Books;
