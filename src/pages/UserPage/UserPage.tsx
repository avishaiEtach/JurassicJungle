import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routesPath } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import "./UserPage.scss";
import { UserProfile } from "../../components/UserPage/UserProfile/UserProfile";
import { ArticleCard } from "../../components/Articles/ArticleCard/ArticleCard";
import { UserArticles } from "../../components/UserPage/UserArticles/UserArticles";
import { ReactComponent as EditDinosaursIcon } from "../../assets/images/editDin.svg";
import { ReactComponent as EditArticlesIcon } from "../../assets/images/EditArticles.svg";
import { DinosaurCard } from "../../components/Dinosaurs/DinosaurCard/DinosaurCard";
import { extractSections, makeId } from "../../assets/util";
import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { ReactComponent as NA } from "../../assets/images/na.svg";
import { ReactComponent as AF } from "../../assets/images/af.svg";
import { ReactComponent as EU } from "../../assets/images/eu.svg";
import { ReactComponent as AS } from "../../assets/images/as.svg";
import { ReactComponent as SA } from "../../assets/images/sa.svg";
import { dinosaursServices } from "../../services/dinosaurs.services";
import { userServices } from "../../services/user.services";
import { setUser } from "../../store/users.actions";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { MdDelete } from "react-icons/md";
import { split } from "lodash";
import { EditCreateDinosaurs } from "../../components/UserPage/EditCreateDinosaurs/EditCreateDinosaurs";
import { EditCreateArticles } from "../../components/UserPage/EditCreateArticles/EditCreateArticles";
import { FaClipboardUser } from "react-icons/fa6";
import { EditUsers } from "../../components/EditUsers/EditUsers";

export function UserPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.usersModel);
  const [catagories, setCatagories] = useState<any>([]);

  const userCatagories = [
    {
      value: "profile",
      icon: <PersonIcon />,
      tooltip: "User Profile",
    },
    {
      value: "articles",
      icon: <StarIcon />,
      tooltip: "Favorite Articles",
    },
  ];

  const memberCatagories: any = [
    {
      value: "editDinosaurs",
      icon: (
        <div style={{ width: "24px", height: "24px" }}>
          <EditDinosaursIcon />
        </div>
      ),
      tooltip: "Favorite Articles",
    },
    {
      value: "editArticles",
      icon: <EditArticlesIcon />,
      tooltip: "Favorite Articles",
    },
  ];

  useEffect(() => {
    if (!user) {
      navigate(routesPath.home);
    } else {
      let catagories = [...userCatagories];
      if (user.permissions && user.permissions > 1) {
        catagories.push(...memberCatagories);
      }
      setCatagories(catagories);
    }
  }, [user]);

  const UserComponentReader = () => {
    switch (chooseUser) {
      case "articles":
        return <UserArticles />;
      case "editDinosaurs":
        return <EditCreateDinosaurs />;
      case "editArticles":
        return <EditCreateArticles />;
      default:
        return <UserProfile />;
    }
  };

  const [chooseUser, setChooseUser] = useState("profile");

  return (
    <div>
      <div className="flex user__tab__container">
        {catagories.map((category: any) => (
          <div
            onClick={() => {
              setChooseUser(category.value);
            }}
            className={`user__tab ${
              chooseUser === category.value ? "active" : ""
            }`}
          >
            {category.icon}
          </div>
        ))}
      </div>
      {UserComponentReader()}
    </div>
  );
}
