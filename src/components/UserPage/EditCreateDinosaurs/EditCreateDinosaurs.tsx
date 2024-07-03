import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { RootState } from "../../../store/store";
import { DinosaurCard } from "../../Dinosaurs/DinosaurCard/DinosaurCard";
import { useSnackbarMui } from "../../Snackbar/useSnackbarMui";
import { AlertMui } from "../../Alert/AlertMui";
import { useDinosaurProfile } from "./hooks/useDinosaurProfile";
import { useMainArticle } from "./hooks/useMainArticle";
import { useDinosaurProfileInputs } from "./hooks/useDinosaurProfileInputs";
import { useEditCreateDinosaurFunctions } from "./hooks/useEditCreateDinosaurFunctions";

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
  });

  const { user } = useSelector((state: RootState) => state.usersModel);

  return (
    <>
      <div className="flex" style={{ marginTop: "40px" }}>
        <div
          style={{
            borderRight: "1px solid black",
            flexBasis: "60%",
            paddingRight: "30px",
          }}
        >
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
              <div
                onClick={() => {
                  setChosenDinosaur(dinosaur);
                }}
              >
                <DinosaurCard
                  dinosaurChecked={chosenDinosaur?._id ?? "createDinosaur"}
                  dinosaur={dinosaur}
                />
              </div>
            ))}
          </div>
        </div>
        {DinosaurProfile}
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
