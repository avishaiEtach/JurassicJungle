import styled from "@emotion/styled";
import {
  Autocomplete,
  Button,
  Chip,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { SyntheticEvent, useMemo } from "react";
import { formatString, getDate } from "../../../../assets/util";
import { MdDelete } from "react-icons/md";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import { IoClose } from "react-icons/io5";
import parse from "html-react-parser";

interface useEditCreateArticlesCompsProps {
  editArticle: EditArticle;
  isArticleProperty: (key: string) => key is keyof EditArticle;
  onChange: (
    ev: any,
    type: "text" | "auto" | "paragraph",
    newValue?: string[],
    paragraphId?: string
  ) => void;
  onClear: (ev: SyntheticEvent<Element, Event>) => void;
  onDelete: (ev: any, value: string[], index: number) => void;
  deleteParagraph: (paragraphId: string) => void;
  addParagraph: () => void;
  uploadArticleImage: (
    ev: any,
    type: "thumbnailImage" | "articleMainImage"
  ) => void;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  saveArticleLoading: boolean;
  onSend: () => Promise<void>;
  articleToShow: {
    image: string;
    title: string;
    content: string;
    author: string;
    date: Date;
  };
  handleClose: () => void;
}

export const useEditCreateArticlesComps = ({
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
  articleToShow,
  handleClose,
}: useEditCreateArticlesCompsProps) => {
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
                  <div className="flex align-center space-between article__paragraph__header__container">
                    <h5>{`paragraph ${index + 1}`}</h5>
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
                    value={paragraph.text}
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
            <Paper className="edit__article__image__container">
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
          <div className="flex align-center space-between article__main__header__container">
            <h2>Article Data</h2>
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
            <Paper className="edit__article__image__container">
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

  const ArticlePopover = () => {
    return (
      <>
        <div className="article__popover__main__container">
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
      </>
    );
  };

  return { ShowEditArticleModal, ArticlePopover };
};
