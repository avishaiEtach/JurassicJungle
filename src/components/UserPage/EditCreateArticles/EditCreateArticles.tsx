import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ArticleCard } from "../../Articles/ArticleCard/ArticleCard";
import { Article } from "../../../types/ArticlesTypes";
import { useModal } from "../../Modal/useModal";
import { Button, Popover } from "@mui/material";
import { AlertMui } from "../../Alert/AlertMui";
import { useSnackbarMui } from "../../Snackbar/useSnackbarMui";
import { useEditCreateArticlesFunctions } from "./hooks/useEditCreateArticlesFunctions";
import { useEditCreateArticlesComps } from "./hooks/useEditCreateArticlesComps";
import "./EditCreateArticles.scss";

export const EditCreateArticles = () => {
  const { user } = useSelector((state: RootState) => state.usersModel);
  const { handleOpen, MUIModal } = useModal();
  const { handleOpenSnackbar, handleCloseSnackbar, SnackbarMUI } =
    useSnackbarMui();
  const params = useEditCreateArticlesFunctions({
    handleOpen,
    handleOpenSnackbar,
  });
  const { ShowEditArticleModal, ArticlePopover } =
    useEditCreateArticlesComps(params);

  return (
    <>
      <div className="user__articles__main__container">
        <div className="flex align-center space-between user__articles__main__header">
          <h1>Your Articles</h1>
          <Button className="button" onClick={params.OnClickCrateArticle}>
            Add Article
          </Button>
        </div>
        <div className="articles__container card-grid">
          {user?.memberId.articles.map((article: Article) => (
            <div onClick={() => params.onChooseArticle(article)}>
              <ArticleCard withOutOnClick={true} article={article} />
            </div>
          ))}
        </div>
        {MUIModal({
          children: ShowEditArticleModal,
        })}
        {SnackbarMUI({
          children: (
            <AlertMui
              variant="filled"
              onClose={handleCloseSnackbar}
              alertText={`Your article has been ${
                params.editArticle.articleId.value !== "" ? "saved" : "created"
              }  successfully!`}
            />
          ),
        })}
        <Popover
          id={params.id}
          open={params.open}
          anchorEl={params.anchorEl}
          onClose={params.handleClose}
          PaperProps={{
            className: "article__popover",
          }}
        >
          <ArticlePopover />
        </Popover>
      </div>
    </>
  );
};
