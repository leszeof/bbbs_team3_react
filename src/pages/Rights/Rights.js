import React, { useState, useEffect } from 'react';
import rightsPageTexts from '../../locales/rights-page-RU';
import './Rights.scss';
import {
  ALL_CATEGORIES,
  FIGURES,
  COLORS,
  DELAY_DEBOUNCE,
} from '../../config/constants';
import {
  renderFilterTags,
  handleCheckboxBehavior,
  selectOneTag,
  deselectOneTag,
} from '../../utils/filter-tags';
import { changeCaseOfFirstLetter } from '../../utils/utils';
import { useScrollToTop, useDebounce } from '../../hooks/index';
import { getRightsData, getRightsTags } from '../../api/rights-page';
import {
  BasePage,
  Loader,
  TitleH1,
  CardRights,
  CardsSectionWithLines,
  AnimatedPageContainer,
} from './index';

const PAGE_SIZE_PAGINATE = {
  small: 4,
  medium: 9,
  big: 16,
};

const Rights = () => {
  const { headTitle, headDescription, title, textStubNoData } = rightsPageTexts;

  useScrollToTop();

  // Стейты для пагинации
  const [pageSize, setPageSize] = useState(PAGE_SIZE_PAGINATE.big);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  // Стейты с данными Статьи, Теги
  const [articles, setArticles] = useState(null);
  const [categories, setCategories] = useState(null);

  // Загрузка данных
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  // флаг применения фильтров
  const [isFiltersUsed, setIsFiltersUsed] = useState(false);
  // Загрузка данных при переключении пагинации
  const [isLoadingPaginate, setIsLoadingPaginate] = useState(false);

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

  // отрисовка массива фильтров
  const renderTagsContainer = () => (
    <div className="tags">
      <ul className="tags__list">
        {renderFilterTags(categories, 'checkbox', changeCategory)}
      </ul>
    </div>
  );

  const renderCards = () => (
    <>
      <CardsSectionWithLines
        pageCount={pageCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isLoading={isLoadingPaginate}
      >
        {articles.map((item, i) => (
          <CardRights
            key={item?.id}
            title={item?.title}
            tags={item?.tags}
            shape={FIGURES[i % FIGURES.length]}
            color={COLORS[i % COLORS.length]}
          />
        ))}
      </CardsSectionWithLines>
    </>
  );

  // отрисовка контента страницы
  const renderMainContent = () => {
    if (!articles && !isLoadingPage) {
      return <AnimatedPageContainer titleText={textStubNoData} />;
    }

    return isFiltersUsed ? <Loader isNested /> : renderCards();
  };

  const getArticlesData = (tags) => {
    const offset = isFiltersUsed ? 0 : pageSize * pageNumber;

    getRightsData({
      limit: pageSize,
      offset,
      tags,
    })
      .then(({ results, count }) => {
        setPageCount(Math.ceil(count / pageSize));
        return results;
      })
      .then((results) => setArticles(results))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoadingPage(false);
        setIsLoadingPaginate(false);
        setIsFiltersUsed(false);
      });
  };

  const getArticlesTags = () => {
    getRightsTags()
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

  // функция-фильтратор с использованием АПИ
  const handleFiltration = () => {
    if (!isLoadingPage && isFiltersUsed) {
      const activeCategories = categories
        .filter((filter) => filter.isActive && filter.filter !== ALL_CATEGORIES)
        .map((filter) => filter.filter);

      const searchStr = activeCategories.join(',');

      if (activeCategories.length === 0) {
        selectOneTag(setCategories, ALL_CATEGORIES);
      }

      getArticlesData(searchStr);
    }
  };

  // Фильтрация с делэем
  const debounceFiltration = useDebounce(handleFiltration, DELAY_DEBOUNCE);
  useEffect(() => {
    debounceFiltration();
  }, [isFiltersUsed]);

  // Первая отрисовка страницы + переход по страницам пагинации
  useEffect(() => {
    if (isLoadingPage) {
      getArticlesData();
      getArticlesTags();
    }

    if (!isLoadingPage && !isFiltersUsed) {
      setIsLoadingPaginate(true);
      getArticlesData();
    }
  }, [pageSize, pageNumber]);

  // Юз эффект для пагинации
  useEffect(() => {
    const smallQuery = window.matchMedia('(max-width: 1399px)');
    const largeQuery = window.matchMedia('(max-width: 1640px)');

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

  // глобальный лоадер
  if (isLoadingPage) {
    return <Loader isCentered />;
  }

  return (
    <BasePage headTitle={headTitle} headDescription={headDescription}>
      <section className="rights page__section fade-in">
        <TitleH1 title={title} />
        {categories?.length > 1 && renderTagsContainer()}
        {renderMainContent()}
      </section>
    </BasePage>
  );
};

export default Rights;
