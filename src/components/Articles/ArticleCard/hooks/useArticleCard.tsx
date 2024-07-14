import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { replaceRouteParam, routesPath } from "../../../../routes";
import { ChangeEvent } from "react";
import { userServices } from "../../../../services/user.services";
import { setUser } from "../../../../store/users.actions";

interface useArticleCardProps {
  article: Article;
}

export const useArticleCard = ({ article }: useArticleCardProps) => {
  const { user } = useSelector((state: RootState) => state.usersModel);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(replaceRouteParam(routesPath.articlePage, article._id));
  };

  const onChange = async (ev: ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.checked;
    if (user) {
      let fieldsToChange = {};
      if (value) {
        fieldsToChange = {
          favArticles: [...user.favArticles, article._id],
        };
      } else {
        let favArticles = user.favArticles.slice();
        const index = user.favArticles.findIndex(
          (articleCheck) => articleCheck._id === article._id
        );
        favArticles.splice(index, 1);
        fieldsToChange = {
          favArticles,
        };
      }
      const updateUser: User = await userServices.updateUser(
        user._id,
        fieldsToChange
      );
      dispatch(setUser(updateUser));
    }
  };

  return { onClick, onChange };
};
