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
}

export const useDinosaurProfile = ({
  chosenDinosaur,
  dinosaurImage,
  GetInputs,
  MainArticle,
  uploadDinosaurImage,
  sendLoading,
  onSend,
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
      </div>
      {chosenDinosaur && (
        <AlertMui
          severity="warning"
          alertText="The operations you make here will affect all the dinosaur variants."
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
        <LoadingButton
          // className="login__button singup__modal contained"
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
