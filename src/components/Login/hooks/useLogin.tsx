import { useDispatch } from "react-redux";
import { userServices } from "../../../services/user.services";
import { useState } from "react";
import { setUser } from "../../../store/users.actions";
import { Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export const useLogin = ({ handleClose }: LoginProps) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [error, setError] = useState({ filed: "", active: false });

  const dispatch = useDispatch();

  const onChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    setLoginForm((prev) => {
      return { ...prev, [name]: value };
    });
    setError({ filed: "", active: false });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (!loginForm.email.includes("@")) {
        setError({
          filed: "email",
          active: true,
        });
        return;
      }
      if (!/^\d{9,}$/.test(loginForm.password)) {
        setError({
          filed: "password",
          active: true,
        });
        return;
      }
      const user = await userServices.login(loginForm);
      dispatch(setUser(user));
      if (user) {
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const EmailErrorComp = () => {
    return (
      <div className="error__tooltip">
        <p>Your email address must meet the following criteria:</p>
        <ul>
          <li>It must be in a valid format.</li>
          <li>It must contain an "@" symbol.</li>
          <li>It must include a complete domain (e.g., example.com).</li>
          <li>The email address field cannot be empty.</li>
          <li>
            The email address must be found in our system if you are trying to
            log in.
          </li>
        </ul>
        <p>
          Please ensure your email address meets these requirements to avoid
          errors.
        </p>
      </div>
    );
  };

  const PasswordErrorComp = () => {
    return (
      <div className="error__tooltip">
        <p>Your password must meet the following criteria:</p>
        <ul>
          <li>It must be at least 9 characters long.</li>
          <li>It can contain only numeric digits (0-9).</li>
        </ul>
        <p>
          Please ensure your password meets these requirements for enhanced
          security.
        </p>
      </div>
    );
  };

  const ErrorToolTip = (error: any, key: "email" | "password") => {
    return (
      <Tooltip
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -9],
                },
              },
            ],
          },
        }}
        placement="top"
        title={key === "email" ? <EmailErrorComp /> : <PasswordErrorComp />}
      >
        <InfoIcon
          className={`error__icon ${
            error.filed === key && error.active ? "show" : ""
          }`}
        />
      </Tooltip>
    );
  };

  return {
    loginForm,
    handleClickShowPassword,
    onChange,
    handleSubmit,
    showPassword,
    error,
    ErrorToolTip,
  };
};
