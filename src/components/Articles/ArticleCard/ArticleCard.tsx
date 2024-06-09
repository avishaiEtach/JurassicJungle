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

interface ArticleCardProps {
  article: Article;
  withSubTitle?: boolean;
}

export const ArticleCard = ({
  article,
  withSubTitle = false,
}: ArticleCardProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(replaceRouteParam(routesPath.articlePage, article._id));
  };

  return (
    <div onClick={onClick} className="article__card">
      <div className="icons__container flex align-center space-between">
        <div>{article.favoriteGrade}</div>
        <div>
          <Checkbox
            onClick={(ev) => {
              ev.stopPropagation();
            }}
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
