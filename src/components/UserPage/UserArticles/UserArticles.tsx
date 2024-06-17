import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ArticleCard } from "../../Articles/ArticleCard/ArticleCard";

export const UserArticles = () => {
  const { user } = useSelector((state: RootState) => state.usersModel);
  return (
    <div>
      <h1 style={{ marginTop: "20px" }}>Favorite Articles</h1>
      <div className="articles__container">
        {user?.favArticles.length ? (
          user?.favArticles.map((article) => (
            <ArticleCard article={article} withSubTitle={true} />
          ))
        ) : (
          <div>no articles found</div>
        )}
      </div>
    </div>
  );
};
