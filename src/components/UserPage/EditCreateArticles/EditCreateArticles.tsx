import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ArticleCard } from "../../Articles/ArticleCard/ArticleCard";
import { Article, Paragraph } from "../../../types/ArticlesTypes";
import { useModal } from "../../Modal/useModal";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { formatString, getDate, makeId } from "../../../assets/util";
import {
  Autocomplete,
  Button,
  Chip,
  IconButton,
  Paper,
  Popover,
  styled,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { userServices } from "../../../services/user.services";
import { setUser } from "../../../store/users.actions";
import { articlesServices } from "../../../services/articles.services";
import { IoClose } from "react-icons/io5";
import { replaceRouteParam, routesPath } from "../../../routes";
import { ArticlePage } from "../../../pages/ArticlePage/ArticlePage";
import parse from "html-react-parser";
import LoadingButton from "@mui/lab/LoadingButton";
import { AlertMui } from "../../Alert/AlertMui";
import { useSnackbarMui } from "../../Snackbar/useSnackbarMui";
import { MdDelete } from "react-icons/md";

export const EditCreateArticles = () => {
  const { user } = useSelector((state: RootState) => state.usersModel);
  const { handleOpen, MUIModal } = useModal();
  const { handleOpenSnackbar, handleCloseSnackbar, SnackbarMUI } =
    useSnackbarMui();
  const dispatch = useDispatch();

  const [editArticle, setEditArticle] = useState({
    images: {
      value: [] as string[],
      type: "array",
    },
    title: {
      value: "",
      type: "string",
    },
    topic: {
      value: "",
      type: "string",
    },
    subTitle: {
      value: "",
      type: "textarea",
    },
    keyWords: {
      value: [] as string[],
      type: "array",
    },
    thumbnailImage: {
      value:
        "https://res.cloudinary.com/maindevcloud/image/upload/v1718879505/JurassicJungle/g278npqws0lae6vuwev6.png",
      type: "string",
    },
    articleMainImage: {
      value:
        "https://res.cloudinary.com/maindevcloud/image/upload/v1718879505/JurassicJungle/g278npqws0lae6vuwev6.png",
      type: "string",
    },
    content: {
      value: {
        paragraphs: [
          {
            id: makeId(12),
            text: "",
          },
        ],
      },
      type: "object",
    },
    articleId: {
      value: "",
      type: "string",
    },
  });

  const [articleToShow, setArticleToShow] = useState({
    image: "",
    title: "",
    content: "",
    author: "",
    date: new Date(),
  });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  const [saveArticleLoading, setSaveArticleLoading] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  function isArticleProperty(key: string): key is keyof EditArticle {
    return key in editArticle;
  }

  const extractParagraphs = (inputString: string) => {
    const paragraphs =
      inputString.match(/<p>(.*?)<\/p>/g)?.map((paragraph) => ({
        id: makeId(12),
        text: paragraph.replace(/<\/?p>/g, ""),
      })) ?? [];
    return paragraphs;
  };

  useEffect(() => {
    let content = "";
    editArticle.content.value.paragraphs.forEach((paragraph) => {
      content += `<p>${paragraph.text}</p>`;
    });
    setArticleToShow((prev) => {
      return {
        ...prev,
        title: editArticle.title.value,
        image: editArticle.articleMainImage.value,
        content,
      };
    });
  }, [editArticle]);

  const onChooseArticle = (article: Article) => {
    // setDinosaurState({ state: "edit", dinosaurId: dinosaur._id });
    // setOnClickImage(false);
    const articleToInputs: Dictionary = {};
    for (const key in editArticle) {
      if (isArticleProperty(key)) {
        if (key == "content") {
          const paragraphs = extractParagraphs(article.content);
          articleToInputs.content = {
            ...articleToInputs[key],
            value: { paragraphs },
          };
        } else {
          articleToInputs[key] = {
            ...editArticle[key],
            value: key === "articleId" ? article._id : article[key],
          };
        }
      }
    }
    setEditArticle(articleToInputs as EditArticle);
    setArticleToShow((prev) => {
      return {
        ...prev,
        author: article.author,
        date: article.date,
      };
    });
    handleOpen();
  };

  const uploadArticleImage = (
    ev: any,
    type: "thumbnailImage" | "articleMainImage"
  ) => {
    // setOnClickImage(true);
    const file = ev.target.files[0];
    const reader = new FileReader();
    if (file && isArticleProperty(type)) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEditArticle((prev) => {
          return {
            ...prev,
            [type]: { ...prev[type], value: reader.result as string },
          };
        });
      };
    }
  };

  const onChange = (
    ev: any,
    type: "text" | "auto" | "paragraph",
    newValue?: string[],
    paragraphId?: string
  ) => {
    const { name, value } = ev.target;
    if (isArticleProperty(name)) {
      if (type === "text") {
        setEditArticle((prev) => {
          return {
            ...prev,
            [name]: {
              ...prev[name],
              value,
            },
          };
        });
      } else if (type === "auto") {
        setEditArticle((prev) => {
          return {
            ...prev,
            [name]: {
              ...prev[name],
              value: newValue,
            },
          };
        });
      } else {
        let paragraphs = editArticle.content.value.paragraphs.slice();
        const index = paragraphs.findIndex(
          (paragraph) => paragraph.id === paragraphId
        );
        paragraphs[index].text = value;
        setEditArticle((prev) => {
          return {
            ...prev,
            [name]: { value: { paragraphs } },
          };
        });
      }
    }
  };

  const onSend = async () => {
    setSaveArticleLoading(true);
    let fieldsToChange = {};
    if (!user) return;
    let savedArticle: Dictionary = {};
    for (let [key, value] of Object.entries(editArticle)) {
      if (key !== "content") {
        savedArticle = { ...savedArticle, [key]: value.value };
      } else {
        let content = "";
        editArticle.content.value.paragraphs.forEach((paragraph) => {
          content += `<p>${paragraph.text}</p>`;
        });
        savedArticle.content = content;
      }
    }
    const article = await articlesServices.updateArticle(
      savedArticle,
      editArticle.articleId.value
    );
    console.log("savedArticle", savedArticle);
    await userServices.updateMember(user.memberId._id, fieldsToChange);
    const res: User = await userServices.getLoggedInUser();
    dispatch(setUser(res));
    setSaveArticleLoading(false);
    handleOpenSnackbar();
  };

  const onClear = (ev: SyntheticEvent<Element, Event>) => {
    if (ev.type === "click") {
      setEditArticle((prev) => {
        return {
          ...prev,
          keyWords: {
            ...prev.keyWords,
            value: [],
          },
        };
      });
    }
  };

  const onDelete = (ev: any, value: string[], index: number) => {
    let options = value.slice();
    options.splice(index, 1);
    setEditArticle((prev) => {
      return {
        ...prev,
        keyWords: {
          ...prev.keyWords,
          value: options,
        },
      };
    });
  };

  const addParagraph = () => {
    let paragraphs = editArticle.content.value.paragraphs.slice();
    paragraphs.push({ id: makeId(12), text: "" });
    setEditArticle((prev) => {
      return {
        ...prev,
        content: {
          ...prev.content,
          value: { paragraphs },
        },
      };
    });
  };

  const deleteParagraph = (paragraphId: string) => {
    let paragraphs = editArticle.content.value.paragraphs.slice();
    let index = paragraphs.findIndex(
      (paragraph) => paragraph.id === paragraphId
    );
    paragraphs.splice(index, 1);
    setEditArticle((prev) => {
      return {
        ...prev,
        content: {
          ...prev.content,
          value: { paragraphs },
        },
      };
    });
  };

  const ShowArticleInputs = useMemo(() => {
    const inputs = [];
    for (const key in editArticle) {
      if (isArticleProperty(key) && key !== "articleId") {
        const { value, type } = editArticle[key];
        if (
          key !== "content" &&
          key !== "images" &&
          key !== "articleMainImage" &&
          key !== "thumbnailImage" &&
          key != "keyWords"
        ) {
          inputs.push(
            <TextField
              onChange={(ev) => onChange(ev, "text")}
              label={formatString(key)}
              className="text__filed"
              name={key}
              multiline={type === "textarea" ? true : undefined}
              minRows={type === "textarea" ? 2 : undefined}
              value={value}
            />
          );
        } else if (key === "keyWords") {
          inputs.push(
            <Autocomplete
              freeSolo
              multiple
              id="fixed-tags-demo"
              value={value as string[]}
              onChange={(ev, newValue) => onChange(ev, "auto", newValue)}
              options={[]}
              onInputChange={onClear}
              getOptionLabel={(option: any) => option}
              renderTags={(tagValue) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option}
                    onDelete={(ev) => onDelete(ev, value as string[], index)}
                  />
                ))
              }
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    name={key}
                    className="text__filed"
                    label={formatString(key)}
                  />
                );
              }}
              //     (
              //     <TextField
              //       name={key}
              //       className="text__filed"
              //       {...params}

              //       label={formatString(key)}
              //     />
              //   )}
            />
          );
        }
      }
    }
    return (
      <div className="flex column g30">{inputs.map((element) => element)}</div>
    );
  }, [editArticle]);

  const ShowArticleDataInputs = useMemo(() => {
    const inputs = [];
    for (const key in editArticle) {
      if (isArticleProperty(key)) {
        if (key === "content") {
          inputs.push(
            <div className="flex column g30">
              {editArticle[key].value.paragraphs.map((paragraph, index) => (
                <div>
                  <div
                    className="flex align-center space-between"
                    style={{ marginBottom: "5px" }}
                  >
                    <h5 style={{ margin: 0 }}>{`paragraph ${index + 1}`}</h5>
                    <IconButton
                      disabled={editArticle[key].value.paragraphs.length === 1}
                      onClick={() => deleteParagraph(paragraph.id)}
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                  <TextField
                    onChange={(ev) =>
                      onChange(ev, "paragraph", undefined, paragraph.id)
                    }
                    fullWidth
                    className="text__filed"
                    name={key}
                    multiline
                    minRows={2}
                    defaultValue={paragraph.text}
                  />
                  {index === editArticle[key].value.paragraphs.length - 1 && (
                    <Button onClick={addParagraph} fullWidth className="button">
                      Add Paragraph
                    </Button>
                  )}
                </div>
              ))}
            </div>
          );
        }
      }
    }
    return (
      <div className="flex column g30">{inputs.map((element) => element)}</div>
    );
  }, [editArticle]);

  const ShowEditArticleModal = useMemo(() => {
    return (
      <div className="flex column g30">
        <div>
          <h1>{`${
            editArticle.articleId.value !== "" ? "Edit" : "Create"
          } Article`}</h1>
        </div>
        <div>
          <h4>Thumbnail image</h4>
          <div
            className="flex column g10"
            style={{
              maxWidth: "fit-content",
            }}
          >
            <Paper className="edit__dinosaur__image__container">
              <img src={editArticle.thumbnailImage.value} />
            </Paper>
            <Button
              className="button contained square"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                onChange={(ev) => uploadArticleImage(ev, "thumbnailImage")}
                accept="image/"
                type="file"
              />
            </Button>
          </div>
        </div>
        {ShowArticleInputs}
        <div className="flex column g20">
          <div className="flex align-center  space-between ">
            <h2 style={{ margin: 0 }}>Article Data</h2>
            <Button className="button" onClick={handleClick}>
              Show Article
            </Button>
          </div>
          <div
            className="flex column g10"
            style={{
              maxWidth: "fit-content",
            }}
          >
            <Paper className="edit__dinosaur__image__container">
              <img src={editArticle.articleMainImage.value} />
            </Paper>
            <Button
              className="button contained square"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                onChange={(ev) => uploadArticleImage(ev, "articleMainImage")}
                accept="image/"
                type="file"
              />
            </Button>
          </div>
          {ShowArticleDataInputs}
        </div>
        <LoadingButton
          loading={saveArticleLoading}
          className="button contained"
          onClick={onSend}
        >
          Save
        </LoadingButton>
      </div>
    );
  }, [editArticle, saveArticleLoading]);

  console.log("editArticle", editArticle);
  return (
    <>
      <div className="user__dinosaurs__main__container">
        <div className="flex align-center space-between user__dinosaurs__main__header">
          <h1>Your Articles</h1>
          <Button className="button" onClick={handleOpen}>
            Add Article
          </Button>
        </div>
        <div className="dinosaurs__container card-grid">
          {user?.memberId.articles.map((article: Article) => (
            <div onClick={() => onChooseArticle(article)}>
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
                editArticle.articleId.value !== "" ? "saved" : "created"
              }  successfully!`}
            />
          ),
        })}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          PaperProps={{
            className: "dinosaur__article__popover",
          }}
        >
          <div className="dinosaur__article__popover__main__container">
            <IconButton className="modal__close__button" onClick={handleClose}>
              <IoClose />
            </IconButton>
            <div className="article ">
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <h1>{articleToShow.title}</h1>
                  <div className="flex column article__information">
                    <span>{articleToShow.author}</span>
                    <span>{getDate(new Date(articleToShow.date))}</span>
                  </div>
                </div>
                <div>
                  <img src={articleToShow.image} />
                </div>
                <div>{parse(articleToShow.content)}</div>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </>
  );
};
