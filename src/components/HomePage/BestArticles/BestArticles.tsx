import React, { useEffect, useState } from "react";
import { Article } from "../../../types/ArticlesTypes";
import { articlesServices } from "../../../services/articles.services";
import "./BestArticles.scss";
import { ArticleCard } from "../../Articles/ArticleCard/ArticleCard";

export const BestArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getBestArticles = async () => {
      setArticles(await articlesServices.getBestArticles());
    };
    getBestArticles();
  }, []);

  return (
    <div className="best__articles__main__container">
      <h3>best articles</h3>
      <div className="best__articles__container">
        {articles.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
    </div>
  );
};
