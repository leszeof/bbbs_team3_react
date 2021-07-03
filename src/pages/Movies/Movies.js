import './Movies.scss';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useScrollToTop, useDebounce } from '../../hooks';
import {
  getMoviesPageData,
  getActiveMoviesTags,
  getActualMoviesForFilter,
} from '../../api/movies-page';
import { BasePage, TitleH1, CardFilm, CardAnnotation, Loader } from './index';
import Paginate from '../../components/utils/Paginate/Paginate';
import { changeCaseOfFirstLetter } from '../../utils/utils';
import { ALL_CATEGORIES, DELAY_DEBOUNCE } from '../../config/constants';
import {
  handleCheckboxBehavior,
  renderFilterTags,
  selectOneTag,
  deselectOneTag,
} from '../../utils/filter-tags';

function Movies() {
  useScrollToTop();

  // Загрузка данных
  const [isLoading, setIsLoading] = useState(false);
  // Стейты с данными Фильмов, Теги
  const [moviesPageData, setMoviesPageData] = useState(null);
  const [categories, setCategories] = useState(null);
  // флаг применения фильтров
  const [isFiltersUsed, setIsFiltersUsed] = useState(false);
  // Стейты для пагинации
  const [pageSize, setPageSize] = useState(16);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const offset = pageSize * pageNumber;
    getMoviesPageData({ limit: pageSize, offset })
      .then((moviesData) => {
        setMoviesPageData(moviesData.results);
        setPageCount(Math.ceil(moviesData.count / pageSize));
      })
      .catch((error) => console.log(error));
  }, [pageSize, pageNumber]);

  useEffect(() => {
    getActiveMoviesTags()
      .then((tagsFilters) => {
        const customFilters = tagsFilters.map((tag) => {
          const filterName = changeCaseOfFirstLetter(tag.name);
          return {
            isActive: false,
            name: filterName,
            filter: tag.slug,
          };
        });
        setCategories([
          { filter: ALL_CATEGORIES, name: ALL_CATEGORIES, isActive: true },
          ...customFilters,
        ]);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const smallQuery = window.matchMedia('(max-width: 1399px)');
    const largeQuery = window.matchMedia('(max-width: 1640px)');

    const listener = () => {
      if (mobileQuery.matches) {
        setPageSize(2);
      } else if (smallQuery.matches) {
        setPageSize(4);
      } else if (largeQuery.matches) {
        setPageSize(12);
      } else {
        setPageSize(16);
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

  const changeCategory = (inputValue, isChecked) => {
    if (inputValue === ALL_CATEGORIES) {
      selectOneTag(setCategories, ALL_CATEGORIES);
    } else {
      handleCheckboxBehavior(setCategories, { inputValue, isChecked });
    }
    setIsLoading(true);
    setIsFiltersUsed(true);
  };

  const handleFiltration = () => {
    const activeCategories = categories
      .filter((filter) => filter.isActive && filter.filter !== ALL_CATEGORIES)
      .map((filter) => filter.filter);
    console.log(activeCategories);

    if (activeCategories.length === 0) {
      const offset = pageSize * pageNumber;
      getMoviesPageData({ limit: pageSize, offset })
        .then((moviesData) => {
          setMoviesPageData(moviesData.results);
          setPageCount(Math.ceil(moviesData.count / pageSize));
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));

      selectOneTag(setCategories, ALL_CATEGORIES);
    } else {
      const query = activeCategories.join();
      getActualMoviesForFilter(query)
        .then((filteredMovies) => {
          setMoviesPageData(filteredMovies);
          setPageCount(Math.ceil(filteredMovies.length / pageSize));
        })
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));

      deselectOneTag(setCategories, ALL_CATEGORIES);
    }
  };

  const debounceFiltration = useDebounce(handleFiltration, DELAY_DEBOUNCE);
  useEffect(() => {
    if (isFiltersUsed) {
      debounceFiltration();
    }
    setIsFiltersUsed(false);
  }, [isFiltersUsed]);

  // контейнер с фильмами
  const renderMoviesContainer = () => (
    <ul className="movies__cards cards-grid cards-grid_content_small-cards fade-in">
      {moviesPageData.map((movie) => (
        <li className="card-container" key={movie.id}>
          <CardFilm
            data={movie}
            pageCount={pageCount}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
          <CardAnnotation description={movie.annotation} />
        </li>
      ))}
    </ul>
  );

  // контейнер фильтров
  const renderTagsContainer = () => (
    <div className="tags tags_content_long-list">
      <ul className="tags__list tags__list_type_long">
        {renderFilterTags(categories, 'tag', changeCategory)}
      </ul>
    </div>
  );

  // главная функция рендеринга
  const renderPageContent = () => {
    if (moviesPageData.length > 0) {
      return (
        <>
          <TitleH1 title="Фильмы" />

          {/* рендер фильтров */}
          {categories?.length > 1 && renderTagsContainer()}

          {/* рендерим фильмы */}
          {isLoading ? <Loader isNested /> : renderMoviesContainer()}

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

    return null;
  };

  // глобальный лоадер
  if (!moviesPageData || !categories) {
    return <Loader isCentered />;
  }

  return (
    <BasePage>
      <Helmet>
        <title>Фильмы</title>
        <meta
          name="description"
          content="Подборка фильмов, которые можно посмотреть, с аннотацией к ним"
        />
      </Helmet>
      <section className="movies page__section fade-in">
        {renderPageContent()}
      </section>
    </BasePage>
  );
}

export default Movies;
