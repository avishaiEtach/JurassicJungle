import { Button, IconButton, Paper, TextField, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { MdDelete } from "react-icons/md";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeId } from "../../../../assets/util";
import { AlertMui } from "../../../Alert/AlertMui";
import PreviewIcon from "@mui/icons-material/Preview";
import { Dispatch, SetStateAction } from "react";
import { useModal } from "../../../Modal/useModal";

interface useDinosaurProfileProps {
  chosenDinosaur: undefined | Dinosaur;
  dinosaurImage: any;
  GetInputs: JSX.Element;
  MainArticle: JSX.Element;
  uploadDinosaurImage: any;
  sendLoading: boolean;
  onSend: () => void;
  isInCreatedMode: boolean;
  setIsInCreatedMode: (isInCreatedMode: boolean) => void;
  createDinosaur: Dictionary;
  addDinosaurArticle: addDinosaurArticle;
  setModalDinosaur: Dispatch<SetStateAction<Dinosaur | undefined>>;
  modalDinosaur: Dinosaur | undefined;
}

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

export const useDinosaurProfile = ({
  chosenDinosaur,
  dinosaurImage,
  GetInputs,
  MainArticle,
  uploadDinosaurImage,
  sendLoading,
  onSend,
  isInCreatedMode,
  setIsInCreatedMode,
  createDinosaur,
  addDinosaurArticle,
  setModalDinosaur,
  modalDinosaur,
}: useDinosaurProfileProps) => {
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

  const { handleOpen, MUIModal } = useModal();

  const DinosaurProfile = (
    <div className={`flex column ${isInCreatedMode ? "" : "dinosaur_profile"}`}>
      <div className="flex align-center space-between dinosaur_profile_header ">
        <h3>
          <span>{`${chosenDinosaur ? "Edit" : "Create"} Dinosaur`}</span>
        </h3>
        {isInCreatedMode && (
          <div className="flex g20">
            <Button
              onClick={(ev) => {
                ev.stopPropagation();
                let newDinosaur: Dictionary = {};
                for (let [key, value] of Object.entries(createDinosaur)) {
                  newDinosaur = { ...newDinosaur, [key]: value.value };
                }
                newDinosaur.image = dinosaurImage
                  ? dinosaurImage
                  : "https://res.cloudinary.com/maindevcloud/image/upload/v1718879505/JurassicJungle/g278npqws0lae6vuwev6.png";

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
                setModalDinosaur(newDinosaur as Dinosaur);
                handleOpen();
              }}
              className="button square"
            >
              show article
            </Button>
            <Button
              onClick={() => {
                setIsInCreatedMode(false);
              }}
              className="button square"
            >
              go back
            </Button>
          </div>
        )}
      </div>
      {chosenDinosaur && (
        <AlertMui
          severity="warning"
          alertText="The operations you make here will affect all the dinosaur variants."
          alertTitle="Attention please!"
        />
      )}
      <div className="flex column g30 dinosaur_profile__container">
        <div className="flex column align-center g20">
          <Paper className="dinosaur_profile_image_container">
            <img
              src={
                dinosaurImage !== ""
                  ? dinosaurImage
                  : chosenDinosaur
                  ? chosenDinosaur.image
                  : "https://res.cloudinary.com/maindevcloud/image/upload/v1718879505/JurassicJungle/g278npqws0lae6vuwev6.png"
              }
            />
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
        {GetInputs}
        {MainArticle}
        <LoadingButton
          className="button"
          onClick={onSend}
          variant="outlined"
          loading={sendLoading}
        >
          Send
        </LoadingButton>
      </div>
      {MUIModal({
        injectHtml: modalDinosaur ? modalDinosaur.mainArticle : undefined,
      })}
    </div>
  );
  return { DinosaurProfile };
};
