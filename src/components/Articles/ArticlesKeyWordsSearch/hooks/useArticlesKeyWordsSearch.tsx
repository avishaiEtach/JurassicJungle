import { useEffect, useState } from "react";
import { articlesServices } from "../../../../services/articles.services";

export const useArticlesKeyWordsSearch = ({
  getSearch,
  setPage,
  search,
}: ArticlesKeyWordsSearchProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);

  const getKeywords = async () => {
    const res = await articlesServices.getKeywords();
    setKeywords(res);
  };

  useEffect(() => {
    getKeywords();
  }, []);

  const onClickKeyWord = (word: string) => {
    setPage(1);
    getSearch("keyword", word);
  };

  return { keywords, onClickKeyWord };
};
