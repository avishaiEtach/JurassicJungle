import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Popover,
  styled,
  TextField,
  Tooltip,
  Typography,
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
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useModal } from "../../Modal/useModal";
import { extractSections, formatString, makeId } from "../../../assets/util";
import { MdDelete } from "react-icons/md";
import parse from "html-react-parser";
import { IoClose } from "react-icons/io5";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import { dinosaursServices } from "../../../services/dinosaurs.services";
import { userServices } from "../../../services/user.services";
import { setUser } from "../../../store/users.actions";
import { useEditCreateDinosaursComp } from "./hooks/useEditCreateDinosaursComp";

interface DinosaurMainArticle {
  sections: {
    id: string;
    header: string;
    paragraphs: { id: string; text: string }[];
  }[];
  mainHeader: string;
  list: { id: string; text: string }[];
}

export const EditCreateDinosaurs = () => {
  const { handleOpen, MUIModal } = useModal();

  const { handleOpenSnackbar, handleCloseSnackbar, SnackbarMUI } =
    useSnackbarMui();

  const { user } = useSelector((state: RootState) => state.usersModel);

  const {
    editDinosaur,
    onChange,
    onChangeMainArticle,
    onDelateItem,
    onAddItem,
    dinosaurState,
    uploadDinosaurImage,
    dinosaurArticle,
    saveDinosaur,
    saveDinosaurLoading,
    onClickCreateDinosaur,
    onChooseDinosaur,
    onShowDinosaurArticle,
    anchorEl,
    id,
    open,
    handleClose,
  } = useEditCreateDinosaurFunctions({
    handleOpen,
    handleOpenSnackbar,
  });

  const { ShowEditDinosaurModal } = useEditCreateDinosaursComp({
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
  });

  return (
    <>
      <div style={{ paddingBlock: "40px" }}>
        <div className="flex align-center space-between">
          <h1 style={{ margin: 0 }}>Your Dinosaurs</h1>
          <Button className="button" onClick={onClickCreateDinosaur}>
            Add Dinosaur
          </Button>
        </div>
        <div className="dinosaurs__container card-grid">
          {user?.memberId.dinosaurs.map((dinosaur: Dinosaur) => (
            <div onClick={() => onChooseDinosaur(dinosaur)}>
              <DinosaurCard dinosaur={dinosaur} />
            </div>
          ))}
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxWidth: "600px",
              maxHeight: "700px",
              top: "50%",
              left: "50%",
              transform: "translate(-70%, -10%)",
            },
          }}
        >
          <div style={{ padding: "30px" }}>
            <IconButton className="modal__close__button" onClick={handleClose}>
              <IoClose />
            </IconButton>
            <div style={{ marginTop: "30px" }} className="injectHtml">
              {parse(dinosaurArticle)}
            </div>
          </div>
        </Popover>
      </div>
      {MUIModal({
        children: <ShowEditDinosaurModal />,
      })}
      {SnackbarMUI({
        children: (
          <AlertMui
            variant="filled"
            onClose={handleCloseSnackbar}
            alertText={`Your dinosaur has been ${
              dinosaurState.state === "edit" ? "saved" : "created"
            }  successfully!`}
          />
        ),
      })}
    </>
  );
};

// if (isInCreatedMode) {
//   return (
//     <>
//       <div style={{ marginTop: "40px" }}>{DinosaurProfile}</div>
//       {SnackbarMUI({
//         children: (
//           <AlertMui
//             variant="filled"
//             onClose={handleCloseSnackbar}
//             alertText={`Your dinosaur has been ${
//               chosenDinosaur ? "saved" : "created"
//             }  successfully!`}
//           />
//         ),
//       })}
//     </>
//   );
// }

{
  // const { handleOpen, MUIModal } = useModal();
  // const {
  //   onCreateDinosaur,
  //   setChosenDinosaur,
  //   chosenDinosaur,
  //   createDinosaur,
  //   setCreateDinosaur,
  //   addDinosaurArticle,
  //   setAddDinosaurArticle,
  //   onChangeArticel,
  //   dinosaurImage,
  //   uploadDinosaurImage,
  //   sendLoading,
  //   onSend,
  //   isInCreatedMode,
  //   setIsInCreatedMode,
  //   modalDinosaur,
  //   setModalDinosaur,
  // } = useEditCreateDinosaurFunctions({ handleOpenSnackbar });
  // const { GetInputs } = useDinosaurProfileInputs({
  //   createDinosaur,
  //   setCreateDinosaur,
  // });
  // const { MainArticle } = useMainArticle({
  //   addDinosaurArticle,
  //   setAddDinosaurArticle,
  //   onChangeArticel,
  // });
  // const { DinosaurProfile } = useDinosaurProfile({
  //   chosenDinosaur,
  //   dinosaurImage,
  //   GetInputs,
  //   MainArticle,
  //   uploadDinosaurImage,
  //   sendLoading,
  //   onSend,
  //   isInCreatedMode,
  //   setIsInCreatedMode,
  //   addDinosaurArticle,
  //   createDinosaur,
  //   setModalDinosaur,
  //   modalDinosaur,
  // });
}

{
  /* <>
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
    </> */
}

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
