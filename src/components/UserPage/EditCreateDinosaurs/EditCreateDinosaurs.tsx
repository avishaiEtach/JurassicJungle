import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
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
  };

  function isDinosaurProperty(key: string): key is keyof CreateDinosaur {
    return key in createDinosaur;
  }

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
    } else {
      dinosaur = await dinosaursServices.createDinosaur(newDinosaur);
      fieldsToChange = {
        dinosaurs: [...user.memberId.dinosaurs, dinosaur._id],
      };
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
    <>
      <h2>MainArticle</h2>
      <div>
        <TextField
          onChange={(ev) => onChangeArticel(ev, "mainHeader")}
          name="mainHeader"
          value={addDinosaurArticle.mainHeader}
          placeholder="mainHeader"
        />
        <Button
          disabled={addDinosaurArticle.sections.length === 5}
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
        >
          Add section
        </Button>
        <div>
          {addDinosaurArticle.sections.map((section, index) => (
            <>
              <Paper
                sx={{
                  minHeight: "200px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="flex g20">
                  <h2>section{index + 1}</h2>
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
                  <Button
                    disabled={
                      addDinosaurArticle.sections[index].paragraphs.length > 7
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
                />
                {section.paragraphs.map((paragraph, index) => (
                  <div>
                    <label>paragraph{index + 1}</label>
                    <TextField
                      onChange={(ev) => onChangeArticel(ev, "paragraph")}
                      name={`${section.id} ${paragraph.id}`}
                      value={paragraph.text}
                      multiline
                      placeholder={`p${index + 1}`}
                    />
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
                ))}
              </Paper>
            </>
          ))}
        </div>
      </div>
      <div>
        <Paper>
          <div className="flex">
            <h2>References</h2>
            <Button
              disabled={addDinosaurArticle.list.length === 5}
              onClick={() => {
                setAddDinosaurArticle((prev) => {
                  return {
                    ...prev,
                    list: [...prev.list, { id: makeId(12), text: "" }],
                  };
                });
              }}
            >
              Add Reference
            </Button>
          </div>
          <div className="flex column">
            {addDinosaurArticle.list.map((reference, index) => (
              <TextField
                value={reference.text}
                onChange={(ev) => onChangeArticel(ev, "reference")}
                name={reference.id}
                placeholder={`reference ${index + 1}`}
              />
            ))}
          </div>
        </Paper>
      </div>
    </>
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
    </div>
  );
};

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
