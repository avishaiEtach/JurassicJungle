import { Button, Divider } from "@mui/material";
import { useSingup } from "./hooks/useSingup";
import "./Signup.scss";

export const Signup = ({ handleClose }: SingupProps) => {
  const { getTextFieldByKey, handleSubmit, onChangeUserView, submitFormKeys } =
    useSingup({ handleClose });

  return (
    <div className="flex column align-center g20 singup__main__container">
      <h1 className="singup__header">Create an account</h1>
      <form className="flex column g20 singup__form" onSubmit={handleSubmit}>
        {submitFormKeys.map((key) => getTextFieldByKey(key))}
        <Button type="submit" fullWidth className="login__button singup__modal">
          Sign up
        </Button>
      </form>
      <Divider className="singup__divider" orientation="horizontal" flexItem />
      <span>Already have an account? </span>
      <span className="singup__modal__link" onClick={onChangeUserView}>
        Login
      </span>
    </div>
  );
};
