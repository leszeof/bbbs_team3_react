import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import rightsArticlePageTexts from './locales/RU';
import { ERROR_CODES, ERROR_MESSAGES } from '../../config/constants';
import { NOT_FOUND_URL, RIGHTS_URL } from '../../config/routes';
import { useScrollToTop } from '../../hooks';
import { getRightsArticle } from '../../api/rights-page';
import {
  AnimatedPageContainer,
  BasePage,
  Loader,
  NextArticleLink,
} from './index';
import './RightsArticle.scss';

const { headTitle, headDescription, stubButtonText } = rightsArticlePageTexts;

function RightsArticle() {
  const { articleId } = useParams();
  const { state } = useLocation();
  const history = useHistory();

  useScrollToTop([articleId]);

  const [articleData, setArticleData] = useState({});
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  // Стейт ошибки
  const [isPageError, setIsPageError] = useState(false);

  const getArticleData = ({ id, tags }) => {
    getRightsArticle({ id, tags })
      .then((res) => setArticleData(res))
      .catch((err) => {
        if (err.status === ERROR_CODES.notFound) history.push(NOT_FOUND_URL);
        else setIsPageError(true);
      })
      .finally(() => {
        setIsLoadingPage(false);
      });
  };

  useEffect(() => {
    if (articleId) {
      setIsLoadingPage(true);
      if (state?.fromRightsPage) {
        const params = state.activeTags
          ? { id: articleId, tags: state.activeTags }
          : { id: articleId };
        getArticleData(params);
      } else {
        getArticleData({ id: articleId });
      }
    }
  }, [articleId]);

  return (
    <BasePage
      headTitle={articleData.title ?? headTitle}
      headDescription={articleData.description ?? headDescription}
      isHeaderTransparentOnTop
    >
      {isLoadingPage ? <Loader isPaginate /> : renderMainContent()}
    </BasePage>
  );

  function renderMainContent() {
    if (isPageError) {
      return (
        <AnimatedPageContainer
          titleText={ERROR_MESSAGES.generalErrorMessage.title}
          urlBack={RIGHTS_URL}
          buttonText={stubButtonText}
          staticPage
        />
      );
    }

    return (
      <>
        {renderLeadBlock()}
        <div className="rights-article page__section fade-in">
          <div className="rights-article__container">
            {renderHtmlBlock()}
            {renderNextPageBlock()}
          </div>
        </div>
      </>
    );
  }

  function renderLeadBlock() {
    return (
      <section className="article-lead fade-in">
        <div className="article-lead__content">
          <h1 className="chapter-title article-lead__title">
            {articleData.title}
          </h1>
          <p className="section-title article-lead__text">
            {articleData.description}
          </p>
        </div>
      </section>
    );
  }

  function renderHtmlBlock() {
    return (
      <ReactMarkdown className="markdown rights-article__markdown">
        {articleData.body}
      </ReactMarkdown>
    );
  }

  function renderNextPageBlock() {
    if (articleData && articleData.nextArticle) {
      // если пришли со страницы Прав, то передаём активные теги в линку
      const link = state?.fromRightsPage
        ? {
            pathname: `/rights/${articleData.nextArticle.id}`,
            state: { fromRightsPage: true, activeTags: state.activeTags },
          }
        : `/rights/${articleData.nextArticle.id}`;

      return (
        <NextArticleLink text={articleData.nextArticle.title} href={link} />
      );
    }
    return null;
  }
}

export default RightsArticle;
