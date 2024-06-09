import React from "react";
import "./AppHeader.scss";
import { useAppHeader } from "./hooks/useAppHeader";
import { useModal } from "../Modal/useModal";
import { Login } from "../Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Signup } from "../Signup/Signup";

export const AppHeader = () => {
  const { MUIModal, handleClose, handleOpen } = useModal();
  const { state, user, loader } = useSelector(
    (state: RootState) => state.usersModel
  );
  const { DesktopHeader, MobileHeader } = useAppHeader({
    handleOpen,
    user,
    loader,
  });

  return (
    <>
      <header className="full main-container app__header">
        {DesktopHeader}
        {MobileHeader}
      </header>
      {MUIModal({
        children:
          state === "signup" ? (
            <Signup handleClose={handleClose} />
          ) : (
            <Login handleClose={handleClose} />
          ),
        small: true,
      })}
    </>
  );
};
