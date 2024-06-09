import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useLogin } from "./hooks/useLogin";
import "./Login.scss";
import { setUserChosen } from "../../store/users.actions";
import { useDispatch } from "react-redux";

export const Login = ({ handleClose }: LoginProps) => {
  const {
    loginForm,
    handleClickShowPassword,
    onChange,
    handleSubmit,
    showPassword,
    error,
    ErrorToolTip,
  } = useLogin({ handleClose });

  const dispatch = useDispatch();

  return (
    <div className="flex column align-center g20 login__main__container">
      <h1 className="login__header">Login</h1>
      <form className="flex column g20 login__form" onSubmit={handleSubmit}>
        <div className="flex g20 error__container">
          <TextField
            className={`login__text__filed ${
              error.filed === "email" ? "error" : ""
            }`}
            value={loginForm.email}
            onChange={onChange}
            name="email"
            placeholder="Email"
            fullWidth
            error={error.filed === "email" && error.active}
          />
          {ErrorToolTip(error, "email")}
        </div>
        <div className="flex g20 error__container">
          <TextField
            className={`login__text__filed ${
              error.filed === "password" ? "error" : ""
            }`}
            value={loginForm.password}
            onChange={onChange}
            name="password"
            placeholder="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            error={error.filed === "password" && error.active}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {ErrorToolTip(error, "password")}
        </div>
        <Button type="submit" fullWidth className="login__button login__modal">
          Login
        </Button>
      </form>
      <Divider className="login__divider" orientation="horizontal" flexItem />
      <span>Not a member yet?</span>
      <span
        className="login__modal__link"
        onClick={() => {
          dispatch(setUserChosen("signup"));
        }}
      >
        Sign Up
      </span>
    </div>
  );
};
