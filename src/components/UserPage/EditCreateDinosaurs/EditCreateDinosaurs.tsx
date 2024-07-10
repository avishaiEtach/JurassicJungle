import { useSelector } from "react-redux";
import { Button, IconButton, Popover } from "@mui/material";
import { RootState } from "../../../store/store";
import { DinosaurCard } from "../../Dinosaurs/DinosaurCard/DinosaurCard";
import { useSnackbarMui } from "../../Snackbar/useSnackbarMui";
import { AlertMui } from "../../Alert/AlertMui";
import { useEditCreateDinosaurFunctions } from "./hooks/useEditCreateDinosaurFunctions";
import { useModal } from "../../Modal/useModal";
import parse from "html-react-parser";
import { IoClose } from "react-icons/io5";
import { useEditCreateDinosaursComp } from "./hooks/useEditCreateDinosaursComp";
import "./EditCreateDinosaurs.scss";

export const EditCreateDinosaurs = () => {
  const { handleOpen, MUIModal } = useModal();

  const { handleOpenSnackbar, handleCloseSnackbar, SnackbarMUI } =
    useSnackbarMui();

  const { user } = useSelector((state: RootState) => state.usersModel);

  const params = useEditCreateDinosaurFunctions({
    handleOpen,
    handleOpenSnackbar,
  });

  const { ShowEditDinosaurModal } = useEditCreateDinosaursComp({ ...params });

  return (
    <>
      <div className="user__dinosaurs__main__container">
        <div className="flex align-center space-between user__dinosaurs__main__header">
          <h1>Your Dinosaurs</h1>
          <Button className="button" onClick={params.onClickCreateDinosaur}>
            Add Dinosaur
          </Button>
        </div>
        <div className="dinosaurs__container card-grid">
          {user?.memberId.dinosaurs.map((dinosaur: Dinosaur) => (
            <div onClick={() => params.onChooseDinosaur(dinosaur)}>
              <DinosaurCard dinosaur={dinosaur} />
            </div>
          ))}
        </div>
        <Popover
          id={params.id}
          open={params.open}
          anchorEl={params.anchorEl}
          onClose={params.handleClose}
          PaperProps={{
            className: "dinosaur__article__popover",
          }}
        >
          <div className="dinosaur__article__popover__main__container">
            <IconButton
              className="modal__close__button"
              onClick={params.handleClose}
            >
              <IoClose />
            </IconButton>
            <div className="injectHtml dinosaur__article__popover__text">
              {parse(params.dinosaurArticle)}
            </div>
          </div>
        </Popover>
      </div>
      {MUIModal({
        children: ShowEditDinosaurModal,
      })}
      {SnackbarMUI({
        children: (
          <AlertMui
            variant="filled"
            onClose={handleCloseSnackbar}
            alertText={`Your dinosaur has been ${
              params.dinosaurState.state === "edit" ? "saved" : "created"
            }  successfully!`}
          />
        ),
      })}
    </>
  );
};
