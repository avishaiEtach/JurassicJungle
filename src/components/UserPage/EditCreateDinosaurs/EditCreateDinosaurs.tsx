import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import { ReactComponent as NA } from "../../../assets/images/na.svg";
import { ReactComponent as AF } from "../../../assets/images/af.svg";
import { ReactComponent as EU } from "../../../assets/images/eu.svg";
import { ReactComponent as AS } from "../../../assets/images/as.svg";
import { ReactComponent as SA } from "../../../assets/images/sa.svg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { MdDelete } from "react-icons/md";
import { RootState } from "../../../store/store";
import { extractSections, makeId } from "../../../assets/util";
import { DinosaurCard } from "../../Dinosaurs/DinosaurCard/DinosaurCard";
import { dinosaursServices } from "../../../services/dinosaurs.services";
import { userServices } from "../../../services/user.services";
import { setUser } from "../../../store/users.actions";
import { useSnackbarMui } from "../../Snackbar/useSnackbarMui";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useModal } from "../../Modal/useModal";
import { AlertMui } from "../../Alert/AlertMui";

interface addDinosaurArticle {
  sections: {
    id: string;
    header: string;
    paragraphs: { id: string; text: string }[];
  }[];
  mainHeader: string;
  list: { id: string; text: string }[];
  show: boolean;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const EditCreateDinosaurs = () => {
  const [chosenDinosaur, setChosenDinosaur] = useState<undefined | Dinosaur>(
    undefined
  );
  const [addDinosaurArticle, setAddDinosaurArticle] =
    useState<addDinosaurArticle>({
      show: false,
      mainHeader: "",
      sections: [
        {
          id: makeId(12),
          header: "",
          paragraphs: [{ id: makeId(5), text: "" }],
        },
      ],
      list: [{ id: makeId(12), text: "" }],
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

  type CreateDinosaur = typeof createDinosaur;

  const { user } = useSelector((state: RootState) => state.usersModel);

  const [dinosaurImage, setDinosaurImage] = useState<any>("");

  const { handleOpenSnackbar, handleCloseSnackbar, SnackbarMUI } =
    useSnackbarMui();

  const dispatch = useDispatch();

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

  const GetInputs = (
    <>
      {Object.entries(createDinosaur).map(([key, value]) => {
        return (
          <TextField
            placeholder={key}
            label={value.type === "select" ? key : undefined}
            // multiline={value.type === "number" ? false : true}
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
                        {key === "bodyLength" ? "Metres" : "Kg"}
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
      })}
    </>
  );

  function isDinosaurProperty(key: string): key is keyof CreateDinosaur {
    return key in createDinosaur;
  }

  useEffect(() => {
    setChosenDinosaur(user?.memberId.dinosaurs[0]);
  }, []);

  useEffect(() => {
    if (chosenDinosaur) {
      let articel = extractSections(chosenDinosaur.mainArticle);
      const sections = articel.sections.map((section) => {
        const paragraphs = section.paragraphs.map((paragraph) => {
          return { id: makeId(5), text: paragraph };
        });
        return { ...section, id: makeId(12), paragraphs };
      });

      const list = articel.list.map((item) => {
        return { id: makeId(12), text: item };
      });

      const editArticel = {
        ...articel,
        sections,
        list,
        show: false,
      };

      const object: Dictionary = {};
      for (let key in createDinosaur) {
        if (isDinosaurProperty(key)) {
          object[key] = {
            ...createDinosaur[key],
            value: chosenDinosaur[key],
          };
        }
      }

      setCreateDinosaur(object as any);
      setAddDinosaurArticle(editArticel);
    }
  }, [chosenDinosaur]);

  const onSend = async () => {
    let newDinosaur: Dictionary = {};
    for (let [key, value] of Object.entries(createDinosaur)) {
      newDinosaur = { ...newDinosaur, [key]: value.value };
    }
    newDinosaur.image = "";

    if (dinosaurImage !== "") {
      newDinosaur.image = await dinosaursServices.uploadDinosaurImage(
        dinosaurImage
      );
    } else {
      newDinosaur.image = chosenDinosaur?.image ?? "";
    }

    let mainArticle = `<article><h1>${addDinosaurArticle.mainHeader}</h1><div><img src=${newDinosaur.image} /></div>`;

    addDinosaurArticle.sections.forEach((section) => {
      mainArticle += `<section><h2>${section.header}</h2>`;
      section.paragraphs.forEach((paragraph) => {
        mainArticle += `<p>${paragraph.text}</p>`;
      });
      mainArticle += `</section>`;
    });

    mainArticle += `<section><h2>Reference</h2><ul>`;

    addDinosaurArticle.list.forEach((reference) => {
      mainArticle += `<li>${reference.text}</li>`;
    });
    mainArticle += `</ul></section></article>`;
    newDinosaur.mainArticle = mainArticle;
    if (!user) {
      return;
    }
    newDinosaur.author = user?._id;
    let dinosaur = null;
    let fieldsToChange = {};
    if (chosenDinosaur) {
      dinosaur = await dinosaursServices.updateDinosaur(
        newDinosaur,
        chosenDinosaur._id
      );
      handleOpenSnackbar();
    } else {
      dinosaur = await dinosaursServices.createDinosaur(newDinosaur);
      fieldsToChange = {
        dinosaurs: [...user.memberId.dinosaurs, dinosaur._id],
      };
      handleOpenSnackbar();
      setCreateDinosaur({
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
      setAddDinosaurArticle({
        show: false,
        mainHeader: "",
        sections: [
          {
            id: makeId(12),
            header: "",
            paragraphs: [{ id: makeId(5), text: "" }],
          },
        ],
        list: [{ id: makeId(12), text: "" }],
      });
      setDinosaurImage("");
      setChosenDinosaur(undefined);
    }
    await userServices.updateMember(user.memberId._id, fieldsToChange);
    const res: User = await userServices.getLoggedInUser();
    dispatch(setUser(res));
    console.log("dinosaur", dinosaur);
  };

  const onChangeArticel = (ev: any, type: string) => {
    let { name, value } = ev.target;
    const { sections, list } = addDinosaurArticle;
    if (type === "mainHeader") {
      setAddDinosaurArticle((prev) => {
        return {
          ...prev,
          mainHeader: value,
        };
      });
    }
    if (type === "section") {
      let sectionIndex = sections.findIndex(
        (section: any) => section.id === name
      );
      sections[sectionIndex].header = value;
      setAddDinosaurArticle((prev) => {
        return {
          ...prev,
          sections: [...sections],
        };
      });
    }
    if (type === "paragraph") {
      name = name.split(" ");
      //name[0] - section ID
      //name [1] - paragraph ID
      let sectionIndex = sections.findIndex(
        (section: any) => section.id === name[0]
      );
      let paragraphIndex = sections[sectionIndex].paragraphs.findIndex(
        (paragraph: any) => paragraph.id === name[1]
      );
      sections[sectionIndex].paragraphs[paragraphIndex].text = value;
      setAddDinosaurArticle((prev) => {
        return {
          ...prev,
          sections: [...sections],
        };
      });
    }
    if (type === "reference") {
      let referenceIndex = list.findIndex(
        (section: any) => section.id === name
      );
      list[referenceIndex].text = value;
      setAddDinosaurArticle((prev) => {
        return {
          ...prev,
          list: [...list],
        };
      });
    }
  };

  const MainArticle = (
    <div className="flex column g30" style={{ position: "relative" }}>
      <div className="flex align-center space-between">
        <h2 style={{ margin: 0 }}>MainArticle</h2>
      </div>
      <div>
        <TextField
          onChange={(ev) => onChangeArticel(ev, "mainHeader")}
          fullWidth
          name="mainHeader"
          value={addDinosaurArticle.mainHeader}
          placeholder="mainHeader"
        />
        <div>
          {addDinosaurArticle.sections.map((section, index) => (
            <>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBlock: "30px",
                  gap: "10px",
                  padding: "20px 15px",
                }}
              >
                <div className="flex g20 align-center space-between">
                  <div className="flex g10 align-center">
                    <h2 style={{ margin: 0 }}>section {index + 1}</h2>
                    <IconButton
                      onClick={() => {
                        if (addDinosaurArticle.sections.length === 1) {
                          return;
                        }
                        let sections = addDinosaurArticle.sections;
                        sections.splice(index, 1);
                        setAddDinosaurArticle((prev) => {
                          return {
                            ...prev,
                            sections: [...sections],
                          };
                        });
                      }}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                  <Button
                    disabled={
                      addDinosaurArticle.sections[index].paragraphs.length === 5
                    }
                    onClick={() => {
                      let paragraphs =
                        addDinosaurArticle.sections[index].paragraphs;
                      paragraphs.push({ id: makeId(5), text: "" });
                      let sections = addDinosaurArticle.sections;
                      sections[index].paragraphs = paragraphs;
                      setAddDinosaurArticle((prev) => {
                        return { ...prev, sections: [...sections] };
                      });
                    }}
                    className="login__button singup__modal"
                    variant="outlined"
                  >
                    add paragraph
                  </Button>
                </div>
                <h3>header</h3>
                <TextField
                  value={section.header}
                  onChange={(ev) => onChangeArticel(ev, "section")}
                  name={section.id}
                  placeholder="header"
                  fullWidth
                />
                {section.paragraphs.map((paragraph, index) => (
                  <div>
                    <div className="flex align-center g10">
                      <h4 style={{ margin: "0px" }}>paragraph {index + 1}</h4>
                      <IconButton
                        onClick={() => {
                          let sections = addDinosaurArticle.sections;
                          let sectionIndex = sections.findIndex(
                            (searchSection) => searchSection.id === section.id
                          );
                          let pIndex = section.paragraphs.findIndex(
                            (searchParagraph) =>
                              searchParagraph.id === paragraph.id
                          );
                          sections[sectionIndex].paragraphs.splice(pIndex, 1);
                          setAddDinosaurArticle((prev) => {
                            return { ...prev, sections: [...sections] };
                          });
                        }}
                      >
                        <MdDelete />
                      </IconButton>
                    </div>
                    <TextField
                      onChange={(ev) => onChangeArticel(ev, "paragraph")}
                      name={`${section.id} ${paragraph.id}`}
                      value={paragraph.text}
                      // multiline
                      placeholder={`paragraph ${index + 1}`}
                      fullWidth
                    />
                  </div>
                ))}
                {index === addDinosaurArticle.sections.length - 1 && (
                  <Button
                    sx={{ marginTop: "20px" }}
                    disabled={addDinosaurArticle.sections.length > 8}
                    onClick={() => {
                      setAddDinosaurArticle((prev) => {
                        return {
                          ...prev,
                          sections: [
                            ...prev.sections,
                            { id: makeId(12), header: "", paragraphs: [] },
                          ],
                        };
                      });
                    }}
                    variant="outlined"
                    className="login__button singup__modal"
                  >
                    Add section
                  </Button>
                )}
              </Paper>
            </>
          ))}
        </div>
      </div>
      <div>
        <Paper
          className="flex column g20"
          sx={{ padding: "15px 20px", paddingBottom: "30px" }}
        >
          <div className="flex space-between align-center">
            <h2 style={{ margin: 0 }}>References</h2>
            <Button
              variant="outlined"
              disabled={addDinosaurArticle.list.length === 5}
              onClick={() => {
                setAddDinosaurArticle((prev) => {
                  return {
                    ...prev,
                    list: [...prev.list, { id: makeId(12), text: "" }],
                  };
                });
              }}
              className="login__button singup__modal"
            >
              Add Reference
            </Button>
          </div>
          <div className="flex column g20">
            {addDinosaurArticle.list.map((reference, index) => (
              <TextField
                value={reference.text}
                onChange={(ev) => onChangeArticel(ev, "reference")}
                name={reference.id}
                placeholder={`reference ${index + 1}`}
                fullWidth
              />
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );

  const uploadDinosaurImage = (ev: any) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDinosaurImage(reader.result);
      };
    } else {
      setDinosaurImage("");
    }
  };

  const DinosaurProfile = (
    <div
      className="flex column"
      style={{
        paddingInline: "30px",
        flexBasis: "40%",
        overflowY: "scroll",
        maxHeight: "80vh",
      }}
    >
      <div
        className="flex align-center space-between"
        style={{ marginBottom: "30px" }}
      >
        <h3 style={{ margin: "0px" }}>
          <span>{`${chosenDinosaur ? "Edit" : "Create"} Dinosaur`}</span>
        </h3>
        {/* <IconButton
          onClick={handleOpen}
          sx={{ position: "sticky", top: "20px" }}
        >
          <VisibilityIcon />
        </IconButton> */}
      </div>
      {chosenDinosaur && (
        // <Alert severity="info">
        //   <AlertTitle sx={{ fontWeight: "700" }}>Attention please!</AlertTitle>
        //   The operations you make here will affect all product variants.
        // </Alert>
        <AlertMui
          severity="info"
          alertText="The operations you make here will affect all product variants."
          alertTitle="Attention please!"
        />
      )}
      <div className="flex column g30" style={{ marginTop: "40px" }}>
        <div className="flex column align-center g20">
          <Paper style={{ width: "200px", height: "200px" }}>
            <img
              src={
                dinosaurImage !== ""
                  ? dinosaurImage
                  : chosenDinosaur
                  ? chosenDinosaur.image
                  : "https://res.cloudinary.com/maindevcloud/image/upload/v1718879505/JurassicJungle/g278npqws0lae6vuwev6.png"
              }
              style={{
                objectFit: "contain",
                display: "block",
                height: "100%",
                width: "100%",
              }}
            />
          </Paper>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ backgroundColor: "black" }}
          >
            Upload file
            <VisuallyHiddenInput
              onChange={uploadDinosaurImage}
              accept="image/"
              type="file"
            />
          </Button>
        </div>
        {GetInputs}
        {MainArticle}
        <Button
          className="login__button singup__modal contained"
          onClick={onSend}
          variant="outlined"
        >
          Send
        </Button>
      </div>
    </div>
  );

  const onCreateDinosaur = () => {
    setCreateDinosaur({
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
    setAddDinosaurArticle({
      show: false,
      mainHeader: "",
      sections: [
        {
          id: makeId(12),
          header: "",
          paragraphs: [{ id: makeId(5), text: "" }],
        },
      ],
      list: [{ id: makeId(12), text: "" }],
    });
    setDinosaurImage("");
    setChosenDinosaur(undefined);
  };

  return (
    <>
      <div className="flex" style={{ marginTop: "40px" }}>
        <div
          style={{
            borderRight: "1px solid black",
            flexBasis: "60%",
            paddingRight: "30px",
          }}
        >
          <div
            className="flex align-center space-between"
            style={{ marginBottom: "30px" }}
          >
            <h1>User Dinosaurs</h1>
            <Button
              className="login__button singup__modal"
              onClick={onCreateDinosaur}
              variant="outlined"
            >
              Create Dinosaur
            </Button>
          </div>
          <div className="flex column g15">
            {user?.memberId.dinosaurs.map((dinosaur: any) => (
              <div
                onClick={() => {
                  setChosenDinosaur(dinosaur);
                }}
              >
                <DinosaurCard
                  dinosaurChecked={chosenDinosaur?._id ?? "createDinosaur"}
                  dinosaur={dinosaur}
                />
              </div>
            ))}
          </div>
        </div>
        {DinosaurProfile}
      </div>
      {SnackbarMUI({
        children: (
          <AlertMui
            variant="filled"
            onClose={handleCloseSnackbar}
            alertText={
              chosenDinosaur
                ? "Your dinosaur has been saved successfully!"
                : "Your dinosaur has been created successfully!"
            }
          />
        ),
      })}
    </>
  );
};

// <div>
//   <Alert
//     onClose={handleCloseSnackbar}
//     severity="success"
//     variant="filled"
//     sx={{ width: "100%" }}
//   >
//     {chosenDinosaur
//       ? "your Dinosaur as been save secsfuly!"
//       : "your Dinosaur as been carte secsfuly!"}
//   </Alert>
// </div>

{
  /* <div className="flex">
<div className="flex column">
  {getInputs()}
  {MainArticle}
  <Button onClick={onSend} variant="outlined">
    Send
  </Button>
</div>
<div className="flex column align-center g20">
  <Paper style={{ width: "200px", height: "200px" }}>
    <img
      src={
        dinosaurImage !== ""
          ? dinosaurImage
          : chosenDinosaur
          ? chosenDinosaur.image
          : ""
      }
      style={{
        objectFit: "contain",
        display: "block",
        height: "100%",
        width: "100%",
      }}
    />
  </Paper>
  <Button
    component="label"
    role={undefined}
    variant="contained"
    tabIndex={-1}
    startIcon={<CloudUploadIcon />}
  >
    Upload file
    <VisuallyHiddenInput
      onChange={uploadDinosaurImage}
      accept="image/"
      type="file"
    />
  </Button>
</div>
</div> */
}
