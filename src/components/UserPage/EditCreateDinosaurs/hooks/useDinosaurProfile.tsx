import { Button, IconButton, Paper, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { MdDelete } from "react-icons/md";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeId } from "../../../../assets/util";
import { AlertMui } from "../../../Alert/AlertMui";

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

  const DinosaurProfile = (
    <div className={`flex column ${isInCreatedMode ? "dinosaur_profile" : ""}`}>
      <div className="flex align-center space-between dinosaur_profile_header ">
        <h3>
          <span>{`${chosenDinosaur ? "Edit" : "Create"} Dinosaur`}</span>
        </h3>
        {isInCreatedMode && (
          <Button
            onClick={() => {
              setIsInCreatedMode(false);
            }}
            className="button square"
          >
            go back
          </Button>
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
    </div>
  );
  return { DinosaurProfile };
};
