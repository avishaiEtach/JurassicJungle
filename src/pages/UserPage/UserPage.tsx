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
import {
  Button,
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

  interface addDinosaurArticle {
    sections: { header: string; paragraphs: string[] }[];
    mainHeader: string;
    list: string[];
    show: boolean;
  }

  const EditCreateDinosaurs = () => {
    const [chosenDinosaur, setChosenDinosaur] = useState<undefined | Dinosaur>(
      undefined
    );
    const [addDinosaurArticle, setAddDinosaurArticle] =
      useState<addDinosaurArticle>({
        show: false,
        mainHeader: "",
        sections: [],
        list: [],
      });
    const [createDinosaur, setCreateDinosaur] = useState({
      name: {
        value: "",
        type: "string",
        items: [],
      },
      description: {
        value: "",
        type: "string",
        items: [],
      },
      continent: {
        value: "",
        type: "select",
        items: ["NA", "AF", "EU", "AS", "SA"],
      },
      diet: {
        value: "",
        type: "select",
        items: ["Carnivore", "Piscivore", "Herbivore"],
      },
      family: {
        value: "",
        type: "string",
        items: [],
      },
      // image: {
      //   value: "",
      //   type: "string",
      //   items: [],
      // },
      weight: {
        value: "",
        type: "number",
        items: [],
      },
      time_on_earth: {
        value: "",
        type: "string",
        items: [],
      },
      period: {
        value: "",
        type: "string",
        items: [],
      },
      // mainArticle: {
      //   value: "",
      //   type: "array",
      // },
      bodyLength: {
        value: "",
        type: "number",
        items: [],
      },
    });
    const dispatch = useDispatch();
    // type Dinosaur = typeof createDinosaur;

    // function isDinosaurProperty(key: string): key is keyof Dinosaur {
    //   return key in createDinosaur;
    // }

    const getContinentIconAndLabel = (
      continent: "NA" | "AF" | "EU" | "AS" | "SA"
    ) => {
      switch (continent) {
        case "NA":
          return { label: "North America", icon: <NA /> };
        case "AF":
          return { label: "Africa", icon: <AF /> };
        case "EU":
          return { label: "Europe", icon: <EU /> };
        case "AS":
          return { label: "Asia", icon: <AS /> };
        case "SA":
          return { label: "South America", icon: <SA /> };
        default:
          break;
      }
    };

    const onChange = (
      ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = ev.target;
      setCreateDinosaur((prev: any) => {
        return {
          ...prev,
          [name]: {
            ...prev[name],
            value: value,
          },
        };
      });
      // setError({ filed: "", active: false });
    };

    const getInputs = () => {
      return Object.entries(createDinosaur).map(([key, value]) => {
        return (
          <TextField
            placeholder={key}
            label={value.type === "select" ? key : undefined}
            multiline={value.type === "number" ? false : true}
            select={value.type === "select"}
            type={value.type}
            value={value.value}
            onChange={onChange}
            name={key}
            InputProps={
              value.type === "number"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        {key === "bodyLength" ? "Metres" : "Ton"}
                      </InputAdornment>
                    ),
                  }
                : undefined
            }
          >
            {value.type === "select"
              ? value.items.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {key === "continent"
                      ? getContinentIconAndLabel(item)?.label
                      : item}
                  </MenuItem>
                ))
              : undefined}
          </TextField>
        );
      });
      // for (let [key, value] of Object.entries(createDinosaur)) {
      //   return <TextField multiline select={value.type === "select"} />;
      // }
    };

    // const article = useMemo(
    //   () => extractSections(chosenDinosaur?.mainArticle ?? ""),
    //   [chosenDinosaur]
    // );

    // console.log("arti", extractSections(chosenDinosaur?.mainArticle ?? ""));
    // console.log("user", user);

    const onSend = async () => {
      let newDinosaur: Dictionary = {};
      for (let [key, value] of Object.entries(createDinosaur)) {
        newDinosaur = { ...newDinosaur, [key]: value.value };
      }
      newDinosaur.image = "";
      newDinosaur.mainArticle = "";
      if (!user) {
        return;
      }
      newDinosaur.author = user?._id;
      const dinosaur = await dinosaursServices.createDinosaur(newDinosaur);
      const fieldsToChange = {
        dinosaurs: [...user.memberId.dinosaurs, dinosaur._id],
      };
      await userServices.updateMember(user.memberId._id, fieldsToChange);
      const res: User = await userServices.getLoggedInUser();
      dispatch(setUser(res));
      console.log("dinosaur", dinosaur);
    };

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
        <div className="flex column">
          {getInputs()}
          <Button onClick={onSend} variant="outlined">
            Send
          </Button>
          {!addDinosaurArticle.show && (
            <Button
              onClick={() => {
                setAddDinosaurArticle((prev) => {
                  return { ...prev, show: true };
                });
              }}
              variant="outlined"
            >
              ADD
            </Button>
          )}
          {addDinosaurArticle.show && (
            <div>
              <TextField name="mainHeader" placeholder="mainHeader" />
              {!addDinosaurArticle.sections.length && (
                <Button
                  onClick={() => {
                    setAddDinosaurArticle((prev) => {
                      return {
                        ...prev,
                        sections: [
                          ...prev.sections,
                          { header: "", paragraphs: [] },
                        ],
                      };
                    });
                  }}
                  variant="outlined"
                >
                  ADD
                </Button>
              )}
              <div>
                {addDinosaurArticle.sections.map((section, index) => (
                  <>
                    <Paper
                      sx={{
                        width: "400px",
                        height: "200px",
                        backgroundColor: "red",
                        marginBottom: "20px",
                      }}
                    >
                      <h2>section{index + 1}</h2>
                      <h3>header</h3>
                      <TextField name="header" placeholder="header" />
                      {section.paragraphs.map((section, index) => (
                        <TextField
                          multiline
                          name={`p${index}`}
                          placeholder={`p${index + 1}`}
                        />
                      ))}
                      {!section.paragraphs.length && (
                        <Button
                          onClick={() => {
                            const newSection = {
                              ...section,
                              paragraphs: [...section.paragraphs, "AAAAAAAAA"],
                            };

                            // const newSections =
                            //   addDinosaurArticle.sections.splice(
                            //     index,
                            //     1,
                            //     newSection
                            //   );
                            // console.log("newSections", newSections);

                            setAddDinosaurArticle((prev: any) => {
                              return {
                                ...prev,
                                sections: [newSection],
                              };
                            });
                          }}
                          variant="outlined"
                        >
                          ADDPR
                        </Button>
                      )}
                    </Paper>
                  </>
                ))}
                {addDinosaurArticle.sections.length > 0 && (
                  <Button
                    onClick={() => {
                      setAddDinosaurArticle((prev) => {
                        return {
                          ...prev,
                          sections: [
                            ...prev.sections,
                            { header: "", paragraphs: [] },
                          ],
                        };
                      });
                    }}
                    variant="outlined"
                  >
                    ADD
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
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
