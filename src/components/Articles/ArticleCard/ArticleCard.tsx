import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import { IoIosArrowForward } from "react-icons/io";
import { replaceRouteParam, routesPath } from "../../../routes";
import { Article } from "../../../types/ArticlesTypes";
import "./ArticleCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { userServices } from "../../../services/user.services";
import { setUser } from "../../../store/users.actions";
import { ChangeEvent } from "react";
import { useArticleCard } from "./hooks/useArticleCard";

interface ArticleCardProps {
  article: Article;
  withSubTitle?: boolean;
  withOutOnClick?: boolean;
}

export const ArticleCard = ({
  article,
  withSubTitle = false,
  withOutOnClick = false,
}: ArticleCardProps) => {
  const { user } = useSelector((state: RootState) => state.usersModel);
  const { onClick, onChange } = useArticleCard({ article });

  return (
    <div
      onClick={!withOutOnClick ? onClick : undefined}
      className="article__card"
    >
      <div className="icons__container flex align-center space-between">
        <div>{article.favoriteGrade}</div>
        <div>
          <Checkbox
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            disabled={!user}
            checked={
              !!user?.favArticles.find(
                (articleCheck) => articleCheck._id === article._id
              )
            }
            onChange={onChange}
            icon={<FaRegStar />}
            checkedIcon={<FaStar />}
          />
        </div>
      </div>
      <div
        className={`article__card__inside__container ${
          withSubTitle ? "withSubTitle" : ""
        }`}
      >
        <div className="article__card__image__container">
          <img src={article.thumbnailImage} />
        </div>
        <div className="article__card__information__container">
          <span className="article__card__title">{article.title}</span>
          {withSubTitle && (
            <span className="article__card__sub__title">
              {article.subTitle}
            </span>
          )}
          <span className="article__card__author">{article.author}</span>
        </div>
      </div>
      {!withSubTitle && (
        <div className="flex space-between article__card__author__read__more">
          <span className="article__card__title">Read More</span>
          <IoIosArrowForward />
        </div>
      )}
    </div>
  );
};

{
  /* <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
<div className="article__card__image__container">
  <img src={article.thumbnailImage} />
</div>
<div className="article__card__information__container">
  <span className="article__card__title">{article.title}</span>
  {withSubTitle && (
    <span className="article__card__sub__title">
      {article.subTitle}
    </span>
  )}
  <span className="article__card__author">{article.author}</span>
</div>
</div> */
}
