import { SyntheticEvent, useEffect, useState } from "react";
import { makeId } from "../../../../assets/util";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { userServices } from "../../../../services/user.services";
import { articlesServices } from "../../../../services/articles.services";
import { setUser } from "../../../../store/users.actions";

interface useEditCreateArticlesFunctionsProps {
  handleOpen: () => void;
  handleOpenSnackbar: () => void;
}

export const useEditCreateArticlesFunctions = ({
  handleOpen,
  handleOpenSnackbar,
}: useEditCreateArticlesFunctionsProps) => {
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

  const [onClickImage, setOnClickImage] = useState<{
    state: boolean;
    name: string[];
  }>({ state: false, name: [] });

  const { user } = useSelector((state: RootState) => state.usersModel);

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    const file = ev.target.files[0];
    const reader = new FileReader();
    if (file && isArticleProperty(type)) {
      setOnClickImage((prev) => {
        return { state: true, name: [...prev.name, type] };
      });
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setEditArticle((prev) => {
          return {
            ...prev,
            [type]: { ...prev[type], value: reader.result as string },
          };
        });
      };
    } else {
      setOnClickImage({ state: false, name: [] });
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
    let article: Dictionary = {};
    if (onClickImage.state && onClickImage.name.includes("articleMainImage")) {
      let articleMainImage = await articlesServices.uploadArticleImage(
        editArticle.articleMainImage.value
      );
      savedArticle.articleMainImage = articleMainImage;
    }
    if (onClickImage.state && onClickImage.name.includes("thumbnailImage")) {
      let thumbnailImage = await articlesServices.uploadArticleImage(
        editArticle.thumbnailImage.value
      );
      savedArticle.thumbnailImage = thumbnailImage;
    }
    if (editArticle.articleId.value === "") {
      savedArticle.author = user.memberId._id;
      article = await articlesServices.createArticle(savedArticle as Article);
      setEditArticle({
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
      fieldsToChange = {
        articles: [...user.memberId.articles, article._id],
      };
    } else {
      article = await articlesServices.updateArticle(
        savedArticle,
        editArticle.articleId.value
      );
      onChooseArticle(article as Article);
    }
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

  const OnClickCrateArticle = () => {
    setEditArticle({
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
    handleOpen();
  };

  return {
    editArticle,
    isArticleProperty,
    onChange,
    onClear,
    onDelete,
    deleteParagraph,
    addParagraph,
    uploadArticleImage,
    handleClick,
    saveArticleLoading,
    onSend,
    OnClickCrateArticle,
    onChooseArticle,
    id,
    open,
    anchorEl,
    handleClose,
    articleToShow,
  };
};
