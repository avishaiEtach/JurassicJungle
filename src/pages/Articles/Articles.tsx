import { ArticleCard } from "../../components/Articles/ArticleCard/ArticleCard";
import { useLoader } from "../../components/Loader/useLoader";
import { PaginationMui } from "../../components/Pagination/Pagination";
import { ArticlesSearchBar } from "../../components/Articles/ArticlesSearchBar/ArticlesSearchBar";
import { ArticlesKeyWordsSearch } from "../../components/Articles/ArticlesKeyWordsSearch/ArticlesKeyWordsSearch";
import { useArticles } from "./hooks/useArticles";
import "./Articles.scss";

export function Articles() {
  const { loading, setLoading, Loader } = useLoader();
  const { setPage, page, getSearch, search, articles, pagesAmount } =
    useArticles({ setLoading });
  return (
    <div>
      <div className="flex space-between align-center justify-center articles__search__container g20">
        <ArticlesSearchBar
          setPage={setPage}
          getSearch={getSearch}
          search={search}
        />
        <ArticlesKeyWordsSearch
          getSearch={getSearch}
          setPage={setPage}
          search={search}
        />
      </div>
      {loading || !articles.length ? (
        <div className="flex align-center justify-center dinosaurs__loader__container">
          {loading ? <Loader /> : <div>no articles</div>}
        </div>
      ) : (
        <div className="articles__container">
          {articles.map((article) => (
            <ArticleCard article={article} withSubTitle={true} />
          ))}
        </div>
      )}
      <PaginationMui page={page} pagesAmount={pagesAmount} setPage={setPage} />
    </div>
  );
}
