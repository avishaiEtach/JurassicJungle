import React, { ReactElement, useCallback, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import parse from "html-react-parser";
import { IoClose } from "react-icons/io5";
import { IconButton } from "@mui/material";
import "./Modal.scss";
import { useDispatch } from "react-redux";
import { setUserChosen } from "../../store/users.actions";

export function useModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = useCallback(() => {
    dispatch(setUserChosen("login"));
    setOpen(true);
  }, [open]);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const MUIModal: React.FC<{
    children?: ReactElement;
    injectHtml?: string;
    small?: boolean;
  }> = ({ children, injectHtml, small = false }) => {
    return (
      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          disableAutoFocus
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box className={`modal__box ${small ? "small__box" : ""}`}>
              <IconButton
                className="modal__close__button"
                onClick={handleClose}
              >
                <IoClose />
              </IconButton>
              {children ? (
                children
              ) : injectHtml ? (
                <div className="injectHtml">{parse(injectHtml)}</div>
              ) : undefined}
            </Box>
          </Fade>
        </Modal>
      </>
    );
  };

  return { handleOpen, handleClose, MUIModal };
}
