import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useCallback, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import { formatString } from "../../../../assets/util";
import { ReactComponent as NA } from "../../../../assets/images/na.svg";
import { ReactComponent as AF } from "../../../../assets/images/af.svg";
import { ReactComponent as EU } from "../../../../assets/images/eu.svg";
import { ReactComponent as AS } from "../../../../assets/images/as.svg";
import { ReactComponent as SA } from "../../../../assets/images/sa.svg";
import { useModal } from "../../../Modal/useModal";
import { AlertMui } from "../../../Alert/AlertMui";

interface useEditCreateDinosaursCompProps {
  editDinosaur: EditDinosaur;
  onChange: (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChangeMainArticle: (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "mainHeader" | "section" | "paragraph" | "reference",
    sectionId: string | undefined
  ) => void;
  onDelateItem: (
    section:
      | {
          id: string;
          header: string;
          paragraphs: {
            id: string;
            text: string;
          }[];
          type: "section" | "paragraph";
        }
      | undefined,
    paragraphId: string | undefined,
    referenceId: string | undefined
  ) => void;
  onAddItem: (
    type: "section" | "paragraph" | "reference",
    sectionId: string | undefined
  ) => void;
  dinosaurState: {
    state: "edit" | "create";
    dinosaurId: string;
  };
  uploadDinosaurImage: (ev: any) => void;
  saveDinosaur: () => Promise<void>;
  saveDinosaurLoading: boolean;
  onShowDinosaurArticle: (
    ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

export const useEditCreateDinosaursComp = ({
  editDinosaur,
  onChange,
  onChangeMainArticle,
  onDelateItem,
  onAddItem,
  dinosaurState,
  uploadDinosaurImage,
  saveDinosaur,
  saveDinosaurLoading,
  onShowDinosaurArticle,
}: useEditCreateDinosaursCompProps) => {
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

  function isDinosaurProperty(key: string): key is keyof EditDinosaur {
    return key in editDinosaur;
  }

  function isDinosaurMainArticleProperty(
    key: string
  ): key is keyof DinosaurMainArticle {
    return key in editDinosaur.mainArticle.value;
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

  const ShowDinosaurMainDetailsInputs = useMemo(() => {
    const inputs = [];
    for (const key in editDinosaur) {
      if (isDinosaurProperty(key) && key !== "mainArticle" && key !== "image") {
        const { value, type, items } = editDinosaur[key];
        inputs.push(
          <TextField
            onChange={onChange}
            label={formatString(key)}
            className="text__filed"
            select={type === "select"}
            type={type}
            name={key}
            multiline={type === "textarea" ? true : undefined}
            minRows={type === "textarea" ? 2 : undefined}
            value={value}
            InputProps={
              type === "number"
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
            {type === "select"
              ? items.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {key === "continent"
                      ? getContinentIconAndLabel(item)?.label
                      : item}
                  </MenuItem>
                ))
              : undefined}
          </TextField>
        );
      }
    }
    return (
      <div className="flex column g30">{inputs.map((element) => element)}</div>
    );
  }, [editDinosaur]);

  const ShowDinosaurMainArticleInputs = useMemo(() => {
    const inputs = [];
    const mainArticle = editDinosaur.mainArticle.value;
    for (const key in mainArticle) {
      if (isDinosaurMainArticleProperty(key)) {
        if (key === "mainHeader") {
          inputs.unshift(
            <div className="edit__dinosaur__main__article__main__header">
              <h3>{formatString(key)}</h3>
              <TextField
                className="text__filed"
                onChange={(ev) => {
                  onChangeMainArticle(ev, "mainHeader", undefined);
                }}
                name={key}
                value={mainArticle.mainHeader}
                fullWidth
              />
            </div>
          );
        } else if (key === "sections") {
          mainArticle.sections.forEach((section, sectionIndex) => {
            inputs.push(
              <div className="edit__dinosaur__main__article__section__container">
                <div className="flex align-center space-between edit__dinosaur__main__article__section__header">
                  <div className="flex align-center g30">
                    <h4>{`sections ${sectionIndex + 1}`}</h4>
                    <IconButton
                      disabled={mainArticle.sections.length === 1}
                      onClick={() =>
                        onDelateItem(
                          { ...section, type: "section" },
                          undefined,
                          undefined
                        )
                      }
                    >
                      <MdDelete />
                    </IconButton>
                  </div>
                </div>
                <div>
                  <h5>header</h5>
                  <TextField
                    className="text__filed"
                    name={section.id}
                    value={section.header}
                    fullWidth
                    onChange={(ev) => {
                      onChangeMainArticle(ev, "section", undefined);
                    }}
                  />
                </div>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <div className="edit__dinosaur__main__article__paragraph__container">
                    <div className="flex align-center space-between g10">
                      <h5>{`paragraph ${paragraphIndex + 1}`}</h5>
                      <IconButton
                        disabled={section.paragraphs.length === 1}
                        onClick={() =>
                          onDelateItem(
                            { ...section, type: "paragraph" },
                            paragraph.id,
                            undefined
                          )
                        }
                      >
                        <MdDelete />
                      </IconButton>
                    </div>
                    <TextField
                      className="text__filed"
                      name={paragraph.id}
                      value={paragraph.text}
                      fullWidth
                      multiline
                      minRows={2}
                      onChange={(ev) => {
                        onChangeMainArticle(ev, "paragraph", section.id);
                      }}
                    />
                  </div>
                ))}
                <Button
                  onClick={() => onAddItem("paragraph", section.id)}
                  fullWidth
                  className="button"
                  disabled={
                    editDinosaur.mainArticle.value.sections[sectionIndex]
                      .paragraphs.length === 5
                  }
                >
                  Add Paragraph
                </Button>
                {sectionIndex ===
                  editDinosaur.mainArticle.value.sections.length - 1 && (
                  <Button
                    onClick={() => {
                      onAddItem("section", undefined);
                    }}
                    fullWidth
                    disabled={
                      editDinosaur.mainArticle.value.sections.length > 8
                    }
                    className="button"
                  >
                    Add Section
                  </Button>
                )}
              </div>
            );
          });
        } else if (key === "list") {
          inputs.push(
            <div>
              <h2>References</h2>
              <div style={{ marginBlock: "20px" }}>
                <AlertMui
                  severity="info"
                  alertText={
                    <div className="flex column g10">
                      <span>
                        If you want that{" "}
                        <em>
                          <b>text to be like that</b>
                        </em>
                        , add
                        <em>&lt;em&gt;&lt;/em&gt;</em> to the text.
                      </span>
                    </div>
                  }
                />
              </div>
              <div>
                {mainArticle.list.map((reference, index) => (
                  <div className="edit__dinosaur__main__article__reference__container">
                    <div className="flex align-center space-between g10">
                      <h5>{`reference ${index + 1}`}</h5>
                      <IconButton
                        disabled={mainArticle.list.length === 1}
                        onClick={() =>
                          onDelateItem(undefined, undefined, reference.id)
                        }
                      >
                        <MdDelete />
                      </IconButton>
                    </div>
                    <TextField
                      className="text__filed"
                      name={reference.id}
                      value={reference.text}
                      fullWidth
                      multiline
                      minRows={2}
                      onChange={(ev) => {
                        onChangeMainArticle(ev, "reference", undefined);
                      }}
                    />
                  </div>
                ))}
                <Button
                  onClick={() => {
                    onAddItem("reference", undefined);
                  }}
                  fullWidth
                  className="button"
                  disabled={editDinosaur.mainArticle.value.list.length === 5}
                >
                  Add Reference
                </Button>
              </div>
            </div>
          );
        }
      }
    }
    return (
      <div className="flex column g20">
        <div className="flex align-center  space-between">
          <h2 className="edit__dinosaur__main__article__header">
            Main Article
          </h2>
          <Button onClick={onShowDinosaurArticle} className="button">
            Show Dinosaur Article
          </Button>
        </div>
        <div>{inputs.map((element) => element)}</div>
      </div>
    );
  }, [editDinosaur]);

  const ShowEditDinosaurModal = useMemo(() => {
    return (
      <div className="flex column g30">
        <div>
          <h1>{`${
            dinosaurState.state === "edit" ? "Edit" : "Create"
          } Dinosaur`}</h1>
        </div>
        {dinosaurState.state === "edit" && (
          <AlertMui
            severity="warning"
            alertText="The operations you make here will affect all the dinosaur variants."
            alertTitle="Attention please!"
          />
        )}
        <div className="flex column justify-center align-center g20">
          <Paper className="edit__dinosaur__image__container">
            <img src={editDinosaur.image.value} />
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
              onChange={uploadDinosaurImage}
              accept="image/"
              type="file"
            />
          </Button>
        </div>
        {ShowDinosaurMainDetailsInputs}
        {ShowDinosaurMainArticleInputs}
        <LoadingButton
          className="button contained "
          onClick={saveDinosaur}
          variant="outlined"
          loading={saveDinosaurLoading}
        >
          Save
        </LoadingButton>
      </div>
    );
  }, [editDinosaur, saveDinosaurLoading]);

  return { ShowEditDinosaurModal };
};
