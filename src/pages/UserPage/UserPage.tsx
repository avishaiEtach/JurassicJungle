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
import { extractSections } from "../../assets/util";
import { TextField } from "@mui/material";

export function UserPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.usersModel);
  const [catagories, setCatagories] = useState<any>([]);
  const [chosenDinosaur, setChosenDinosaur] = useState<undefined | Dinosaur>(
    undefined
  );

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

  const EditCreateDinosaurs = () => {
    const article = useMemo(
      () => extractSections(chosenDinosaur?.mainArticle ?? ""),
      [chosenDinosaur]
    );
    return (
      <div>
        <h1 style={{ marginTop: "20px" }}>User Dinosaurs</h1>
        <div className="dinosaurs__container card-grid">
          {user?.memberId.dinosaurs.map((dinosaur: any) => (
            <div
              onClick={() => {
                setChosenDinosaur(dinosaur);
              }}
            >
              <DinosaurCard dinosaur={dinosaur} />
            </div>
          ))}
        </div>
        <TextField fullWidth multiline rows={2} value={article.mainHeader} />
      </div>
    );
  };

  const EditCreateArticles = () => {
    return <div>EditCreateArticles</div>;
  };

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
  console.log(user);
  // console.log(
  //   "chosenDinosaur",
  //   extractSections(chosenDinosaur?.mainArticle ?? "")
  // );

  return (
    <>
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
    </>
  );
}
