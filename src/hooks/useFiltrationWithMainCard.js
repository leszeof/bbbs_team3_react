import { useContext, useEffect, useState } from 'react';
import { ErrorsContext, PopupsContext } from '../contexts';
import {
  ALL_CATEGORIES,
  ALL_CATEGORIES_TAG,
  DELAY_DEBOUNCE,
  ERROR_MESSAGES,
  RESOURCE_GROUP_TAG,
} from '../config/constants';
import useDebounce from './useDebounce';
import { changeCaseOfFirstLetter } from '../utils/utils';
import {
  deselectOneTag,
  handleCheckboxBehavior,
  selectOneTag,
} from '../utils/filter-tags';

// хук для фильтров/пагинации на страницах Video и Articles
// он сложнее и требует доп. условий

const useFiltrationAndPagination = ({
  apiGetDataCallback,
  apiGetFiltersCallback,
  apiFilterNames,
  pageSize,
  setIsPageError,
  isVideoPage,
  currentUser,
}) => {
  const { setError } = useContext(ErrorsContext);
  const { openPopupError } = useContext(PopupsContext);
  // данные
  const [dataToRender, setDataToRender] = useState([]);
  const [filters, setFilters] = useState([]);

  // главная карточка
  const [mainCard, setMainCard] = useState({});
  const [isMainCardShown, setIsMainCardShown] = useState(false);
  const isMainCard = !!Object.keys(mainCard).length;

  // лоадеры, флаги
  const [isFiltersUsed, setIsFiltersUsed] = useState(false);
  const [isPaginationUsed, setIsPaginationUsed] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  // пагинация
  const [totalPages, setTotalPages] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  const debounceFiltration = useDebounce(handleFiltration, DELAY_DEBOUNCE);
  const debouncePaginate = useDebounce(getData, DELAY_DEBOUNCE);

  // Первая отрисовка страницы
  useEffect(() => {
    if (isPageLoading && pageSize) {
      firstPageRender();
    }
  }, [pageSize, isPageLoading]);

  // перезапуск страницы, если залогинился/разлогинился (для Видео)
  useEffect(() => {
    setIsPageLoading(true);
  }, [currentUser]);

  // Переход по пагинации, страница уже загружена
  useEffect(() => {
    if (!isPageLoading && !isFiltersUsed) {
      const { activeFilters, isResourceGroupSelected } = getActiveFilters();

      if (activeFilters || isResourceGroupSelected) {
        const params = {
          [apiFilterNames.tags]: activeFilters,
          [apiFilterNames.resourceGroup]: isResourceGroupSelected,
        };
        debouncePaginate({ isFiltersActive: true, params });
      } else debouncePaginate({ isFiltersActive: false });
    }
  }, [pageSize, pageIndex]);

  // Фильтры, страница уже загружена
  useEffect(() => {
    if (!isPageLoading && isFiltersUsed) {
      debounceFiltration();
    }
  }, [isFiltersUsed]);

  return {
    dataToRender,
    filters,
    mainCard,
    isMainCard,
    isMainCardShown,
    isPageLoading,
    isFiltersUsed,
    isPaginationUsed,
    totalPages,
    pageIndex,
    changePageIndex,
    changeFilter,
  };

  // РАБОТА С ФИЛЬТРАМИ
  function getActiveFilters() {
    let activeFilters;
    if (isVideoPage) {
      const activeTags = filters.filter(
        (f) => f.isActive && f.filter !== ALL_CATEGORIES
      );

      const isResourceGroupSelected = activeTags.some(
        (tag) => tag.filter === RESOURCE_GROUP_TAG
      );

      if (!isResourceGroupSelected) {
        activeFilters = activeTags.map((f) => f.filter).join(',');
      } else {
        activeFilters = activeTags
          .filter((tag) => tag.filter !== RESOURCE_GROUP_TAG)
          .map((f) => f.filter)
          .join(',');
      }

      return { activeFilters, isResourceGroupSelected };
    }

    if (filters) {
      activeFilters = filters
        .filter((f) => f.isActive && f.filter !== ALL_CATEGORIES)
        .map((f) => f.filter)
        .join(',');
      return { activeFilters };
    }
    return null;
  }

  // хэндлер клика по фильтру
  function changeFilter(inputValue, isChecked) {
    if (inputValue === ALL_CATEGORIES) {
      // кнопка "Все", откат на 1 страницу
      selectOneTag(setFilters, ALL_CATEGORIES);
      if (isMainCard) setIsMainCardShown(true);
    } else {
      handleCheckboxBehavior(setFilters, { inputValue, isChecked });
      deselectOneTag(setFilters, ALL_CATEGORIES);
      setIsMainCardShown(false);
    }
    // сбрасываем пагинацию
    setPageIndex(0);
    // ставим флажок фильтров
    setIsFiltersUsed(true);
  }

  // функция-фильтратор
  // eslint-disable-next-line consistent-return
  function handleFiltration() {
    if (filters && isFiltersUsed) {
      const { activeFilters, isResourceGroupSelected } = getActiveFilters();

      if (!activeFilters && !isResourceGroupSelected) {
        selectOneTag(setFilters, ALL_CATEGORIES);
        getData({ isFiltersActive: false });
      } else {
        const params = {
          [apiFilterNames.tags]: activeFilters,
          [apiFilterNames.resourceGroup]: isResourceGroupSelected,
        };
        getData({ isFiltersActive: true, params });
      }
    }
  }

  // РАБОТА С ПАГИНАЦИЕЙ
  function changePageIndex(value) {
    if (value !== pageIndex) {
      setPageIndex(value);
      setIsPaginationUsed(true);
      setIsMainCardShown(false);
    }
  }

  // РАБОТА С API
  function getData({ isFiltersActive, params }) {
    // isFiltersUsed учитывает кнопку ВСЕ
    // isFiltersActive - только активные
    const offset = isFiltersUsed ? 0 : pageSize * pageIndex;

    // большая карточка всегда будет в первой выдаче
    const fixedLimit =
      pageIndex === 0 && isMainCard && !isFiltersActive
        ? pageSize + 1
        : pageSize;

    const fixedOffset =
      pageIndex > 0 && isMainCard && !isFiltersActive ? offset + 1 : offset;

    apiGetDataCallback({
      limit: fixedLimit,
      offset: fixedOffset,
      ...params,
    })
      .then(({ results, count }) => {
        if (isFiltersUsed) {
          if (isMainCard && !isFiltersActive) {
            setTotalPages(Math.ceil((count - 1) / pageSize));
          } else {
            setTotalPages(Math.ceil(count / pageSize));
          }
        }

        if (pageIndex === 0 && isMainCard && !isFiltersActive) {
          setDataToRender(() =>
            results.filter((item) => !item?.pinnedFullSize)
          );
          setIsMainCardShown(true);
        } else setDataToRender(results);
      })
      .catch(() => {
        if (isFiltersUsed) {
          setError(ERROR_MESSAGES.filterErrorMessage);
          openPopupError();
        } else {
          setIsPageError(true);
        }
      })
      .finally(() => {
        setIsPaginationUsed(false);
        setIsFiltersUsed(false);
      });
  }

  function firstPageRender() {
    Promise.all([
      apiGetFiltersCallback(),
      apiGetDataCallback({ limit: pageSize + 1 }),
    ])
      .then(([tags, { results, count }]) => {
        handleMainCard({ results, count });
        defineFilters(tags);
      })
      .catch(() => setIsPageError(true))
      .finally(() => {
        setIsPageLoading(false);
      });
  }

  // обработка пришедших с сервера фильтров
  function defineFilters(tags) {
    const filtersArray = tags.map((tag) => ({
      filter: tag?.slug.toLowerCase(),
      name: changeCaseOfFirstLetter(tag?.name),
      isActive: false,
    }));

    const defaultTags = [
      { filter: ALL_CATEGORIES_TAG, name: ALL_CATEGORIES_TAG, isActive: true },
      ...filtersArray,
    ];

    if (isVideoPage) {
      const tagsWithResourceGroup = [
        {
          filter: ALL_CATEGORIES_TAG,
          name: ALL_CATEGORIES_TAG,
          isActive: true,
        },
        {
          filter: RESOURCE_GROUP_TAG,
          name: RESOURCE_GROUP_TAG,
          isActive: false,
        },
        ...filtersArray,
      ];

      if (currentUser) {
        // проверка хоть на 1 видео из ресурсной группы
        apiGetDataCallback({
          limit: 1,
          [apiFilterNames.resourceGroup]: true,
        })
          .then((resourceGroupData) => {
            if (resourceGroupData.count > 0) {
              setFilters(tagsWithResourceGroup);
            } else {
              setFilters(defaultTags);
            }
          })
          .catch(() => setIsPageError(true));
      } else {
        setFilters(defaultTags);
      }
    } else {
      setFilters(defaultTags);
    }
  }

  // обработка главной карточки для страниц Video и Articles
  function handleMainCard({ results, count }) {
    const pinnedFullSizeCard = results.find((item) => item?.pinnedFullSize);
    if (pinnedFullSizeCard) {
      setMainCard(pinnedFullSizeCard);
      setIsMainCardShown(true);
      setDataToRender(() => results.filter((item) => !item?.pinnedFullSize));
      setTotalPages(Math.ceil((count - 1) / pageSize));
    } else {
      if (results.length > pageSize) {
        setDataToRender(results.slice(0, -1));
      } else {
        setDataToRender(results);
      }
      setTotalPages(Math.ceil(count / pageSize));
    }
  }
};

export default useFiltrationAndPagination;
