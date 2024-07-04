import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { RootState } from "../../../store/store";
import { DinosaurCard } from "../../Dinosaurs/DinosaurCard/DinosaurCard";
import { useSnackbarMui } from "../../Snackbar/useSnackbarMui";
import { AlertMui } from "../../Alert/AlertMui";
import { useDinosaurProfile } from "./hooks/useDinosaurProfile";
import { useMainArticle } from "./hooks/useMainArticle";
import { useDinosaurProfileInputs } from "./hooks/useDinosaurProfileInputs";
import { useEditCreateDinosaurFunctions } from "./hooks/useEditCreateDinosaurFunctions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PreviewIcon from "@mui/icons-material/Preview";
import "./EditCreateDinosaurs.scss";
import { useState } from "react";
import { useModal } from "../../Modal/useModal";

export const EditCreateDinosaurs = () => {
  const { handleOpenSnackbar, handleCloseSnackbar, SnackbarMUI } =
    useSnackbarMui();

  const {
    onCreateDinosaur,
    setChosenDinosaur,
    chosenDinosaur,
    createDinosaur,
    setCreateDinosaur,
    addDinosaurArticle,
    setAddDinosaurArticle,
    onChangeArticel,
    dinosaurImage,
    uploadDinosaurImage,
    sendLoading,
    onSend,
    isInCreatedMode,
    setIsInCreatedMode,
    modalDinosaur,
    setModalDinosaur,
  } = useEditCreateDinosaurFunctions({ handleOpenSnackbar });

  const { GetInputs } = useDinosaurProfileInputs({
    createDinosaur,
    setCreateDinosaur,
  });

  const { MainArticle } = useMainArticle({
    addDinosaurArticle,
    setAddDinosaurArticle,
    onChangeArticel,
  });

  const { DinosaurProfile } = useDinosaurProfile({
    chosenDinosaur,
    dinosaurImage,
    GetInputs,
    MainArticle,
    uploadDinosaurImage,
    sendLoading,
    onSend,
    isInCreatedMode,
    setIsInCreatedMode,
  });

  const { handleOpen, MUIModal } = useModal();

  const { user } = useSelector((state: RootState) => state.usersModel);

  if (isInCreatedMode) {
    return <div style={{ marginTop: "40px" }}>{DinosaurProfile}</div>;
  }

  return (
    <>
      <div style={{ marginTop: "40px" }}>
        <div>
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
              <Accordion
                onClick={() => {
                  setChosenDinosaur(dinosaur);
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex align-center space-between accordion__summary__container ">
                    <Tooltip arrow title="show article">
                      <IconButton
                        onClick={(ev) => {
                          ev.stopPropagation();
                          setModalDinosaur(dinosaur);
                          handleOpen();
                        }}
                      >
                        <PreviewIcon />
                      </IconButton>
                    </Tooltip>
                    <DinosaurCard
                      dinosaurChecked={chosenDinosaur?._id ?? "createDinosaur"}
                      dinosaur={dinosaur}
                    />
                  </div>
                </AccordionSummary>
                <AccordionDetails>{DinosaurProfile}</AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
      {SnackbarMUI({
        children: (
          <AlertMui
            variant="filled"
            onClose={handleCloseSnackbar}
            alertText={`Your dinosaur has been ${
              chosenDinosaur ? "saved" : "created"
            }  successfully!`}
          />
        ),
      })}
      {MUIModal({
        injectHtml: modalDinosaur ? modalDinosaur.mainArticle : undefined,
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
