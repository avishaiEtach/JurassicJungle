import { useLocation, useNavigate, useParams } from "react-router-dom";
import { articlesServices } from "../../services/articles.services";
import { useEffect, useState } from "react";
import { Article } from "../../types/ArticlesTypes";
import { useLoader } from "../../components/Loader/useLoader";
import parse from "html-react-parser";
import "./ArticlePage.scss";
import { getDate } from "../../assets/util";

export function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<undefined | Article>(undefined);
  const { loading, setLoading, Loader } = useLoader();

  const getArticleById = async () => {
    if (id) {
      const res: undefined | Article = await articlesServices.getArticleById(
        id
      );
      if (res) {
        setArticle(res);
      }
    }
  };

  useEffect(() => {
    getArticleById();
  }, []);

  if (!article) {
    return <Loader />;
  }

  return (
    <div className="article main-container">
      <article>
        <div style={{ marginBottom: "20px" }}>
          <h1>{article.title}</h1>
          <div className="flex column article__information">
            <span>{article.author}</span>
            <span>{getDate(new Date(article.date))}</span>
          </div>
        </div>
        {parse(article.content)}
      </article>
    </div>
  );
}
