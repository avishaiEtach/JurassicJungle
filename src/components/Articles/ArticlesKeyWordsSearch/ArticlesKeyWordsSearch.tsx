import { useArticlesKeyWordsSearch } from "./hooks/useArticlesKeyWordsSearch";
import "./ArticlesKeyWordsSearch.scss";

export const ArticlesKeyWordsSearch = ({
  getSearch,
  setPage,
  search,
}: ArticlesKeyWordsSearchProps) => {
  const { keywords, onClickKeyWord } = useArticlesKeyWordsSearch({
    getSearch,
    setPage,
    search,
  });
  return (
    <div className="keywords__container">
      {keywords.map((word) => (
        <span
          className={`${search.keyword === word ? "active" : ""}`}
          onClick={() => {
            onClickKeyWord(word);
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};
