import { useEffect, useState } from "react";
import { configs } from "../../../assets/configs";
import { articlesServices } from "../../../services/articles.services";
import { Article } from "../../../types/ArticlesTypes";

export const useArticles = ({ setLoading }: useArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState({
    keyword: "all",
    name: "",
  });
  const [page, setPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(1);

  const getArticles = async () => {
    setLoading(true);
    const searchParameters = [];
    for (const [key, value] of Object.entries(search)) {
      if (value !== "" && value !== "all") {
        searchParameters.push({ [key]: value });
      }
    }
    const res = await articlesServices.searchArticles(
      searchParameters,
      page,
      configs.ARTICLES_LIMIT
    );
    setArticles(res.rows);
    setPagesAmount(Math.ceil(res.amount / configs.ARTICLES_LIMIT));
    setLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, [search, page]);

  const getSearch = (key: string, value: string) => {
    setSearch((prev: any) => {
      return { ...prev, [key]: value };
    });
  };

  return { setPage, page, getSearch, search, articles, pagesAmount };
};
