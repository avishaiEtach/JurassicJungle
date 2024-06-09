import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getMonthName,
  getTimeParameters,
  splitCamelCaseToSnakeCase,
} from "../../../assets/util";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { userServices } from "../../../services/user.services";
import { setUser, setUserChosen } from "../../../store/users.actions";
import InfoIcon from "@mui/icons-material/Info";

type SubmitFormKeys =
  | "firstName"
  | "lastName"
  | "email"
  | "password"
  | "confirmPassword"
  | "date";

type SubmitFormState = Record<SubmitFormKeys, string | Dictionary>;

export const useSingup = ({ handleClose }: SingupProps) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [submitForm, setSubmitForm] = useState<SubmitFormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    date: {
      day: "",
      month: "",
      year: "",
    },
  });

  const [error, setError] = useState({ filed: "", active: false });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const TextErrorComp = () => {
    return (
      <div className="error__tooltip">
        <p>You must meet the following criteria:</p>
        <ul>
          <li>The field cannot be empty.</li>
        </ul>
        <p>
          Please ensure your input meets these requirements to avoid errors.
        </p>
      </div>
    );
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
          <li>The field cannot be empty.</li>
          <li>It must be at least 9 characters long.</li>
          <li>It can contain only numeric digits (0-9).</li>
          <li>
            The password confirmation does not match the original password
          </li>
        </ul>
        <p>
          Please ensure your password meets these requirements for enhanced
          security.
        </p>
      </div>
    );
  };

  const DateErrorComp = () => {
    return (
      <div className="error__tooltip">
        <p>You must meet the following criteria:</p>
        <ul>
          <li>Please ensure that the day, month, and year inputs are valid.</li>
          <li>The field cannot be empty.</li>
        </ul>
        <p>For the day input:</p>
        <ul>
          <li>It must be a number between 1 and 31</li>
          <li>Ensure it matches the number of days in the selected month.</li>
        </ul>
        <p>For the month input:</p>
        <ul>
          <li>It must be a number between 1 and 12.</li>
        </ul>
        <p>For the year input:</p>
        <ul>
          <li>It must be a valid year.</li>
        </ul>
        <p>
          Please review and correct the inputs accordingly. to avoid errors.
        </p>
      </div>
    );
  };

  const ErrorToolTip = (error: any, key: string) => {
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
        title={
          key === "email" ? (
            <EmailErrorComp />
          ) : key.includes("word") ? (
            <PasswordErrorComp />
          ) : key === "date" ? (
            <DateErrorComp />
          ) : (
            <TextErrorComp />
          )
        }
      >
        <InfoIcon
          className={`error__icon ${key === "date" ? "date" : ""} ${
            error.filed === key && error.active ? "show" : ""
          }`}
        />
      </Tooltip>
    );
  };

  const getTextFieldByKey = (key: SubmitFormKeys) => {
    if (key.includes("word")) {
      return (
        <div className="flex g20 error__container">
          <TextField
            className={`singup__text__filed ${
              error.filed === key ? "error" : ""
            }`}
            value={submitForm[key]}
            onChange={onChange}
            name={key}
            placeholder={splitCamelCaseToSnakeCase(key)}
            fullWidth
            error={error.filed === key && error.active}
            type={showPassword ? "text" : "password"}
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
          {ErrorToolTip(error, key)}
        </div>
      );
    } else if (!key.includes("date")) {
      return (
        <div className="flex g20 error__container">
          <TextField
            className={`singup__text__filed ${
              error.filed === key ? "error" : ""
            }`}
            value={submitForm[key]}
            onChange={onChange}
            name={key}
            placeholder={splitCamelCaseToSnakeCase(key)}
            fullWidth
            error={error.filed === key && error.active}
          />
          {ErrorToolTip(error, key)}
        </div>
      );
    } else {
      return (
        <div className="singup__up__date__container">
          <div className="flex g20 error__container">
            <p>What is your date of birth?</p>
            {ErrorToolTip(error, "date")}
          </div>
          <Box className="flex align-center g20 singup__up__date__box__container">
            {Object.keys(submitForm[key]).map((key) => (
              <>
                <TextField
                  className={`singup__text__filed singup__select  ${
                    error.filed === "date" ? "error" : ""
                  }`}
                  select
                  size="small"
                  label={key}
                  fullWidth
                  value={(submitForm.date as any)[key]}
                  onChange={(ev) => {
                    onChange(ev, true);
                  }}
                  name={key}
                  SelectProps={{
                    MenuProps: {
                      classes: { paper: "singup__up__popover" },
                    },
                  }}
                  error={error.filed === "date" && error.active}
                >
                  {getTimeParameters(key).map((name: any) => (
                    <MenuItem key={name} value={name}>
                      {key === "month" ? getMonthName(name) : name}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            ))}
          </Box>
        </div>
      );
    }
  };

  const onChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    withDate = false
  ) => {
    const { name, value } = ev.target;
    if (withDate) {
      setSubmitForm((prev) => {
        return {
          ...prev,
          date: {
            ...(prev.date as Dictionary),
            [name]: value,
          },
        };
      });
    } else {
      setSubmitForm((prev) => {
        return { ...prev, [name]: value };
      });
    }
    setError({ filed: "", active: false });
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (submitForm.firstName === "") {
      setError({ filed: "firstName", active: true });
      return;
    }
    if (submitForm.lastName === "") {
      setError({ filed: "lastName", active: true });
      return;
    }
    if (!submitForm.email.includes("@")) {
      setError({ filed: "email", active: true });
      return;
    }

    if (!/^\d{9,}$/.test(submitForm.password as string)) {
      setError({ filed: "password", active: true });
      return;
    }

    if (submitForm.password !== submitForm.confirmPassword) {
      setError({ filed: "confirmPassword", active: true });
      return;
    }

    if (submitForm.password !== submitForm.confirmPassword) {
      setError({ filed: "confirmPassword", active: true });
      return;
    }
    const { day, month, year } = submitForm.date as Dictionary;
    if (day === "" || month === "" || year === "") {
      setError({ filed: "date", active: true });
      return;
    }
    const newUser = {
      firstname: submitForm.firstName as string,
      lastname: submitForm.lastName as string,
      password: submitForm.password as string,
      email: submitForm.email as string,
      dob: new Date(year, month - 1, day).toISOString(),
      _id: "",
    };
    const user: User = await userServices.signup(newUser);
    dispatch(setUser(user));
    handleClose();
  };

  const onChangeUserView = () => {
    dispatch(setUserChosen("login"));
  };

  const submitFormKeys = Object.keys(submitForm) as SubmitFormKeys[];

  return {
    getTextFieldByKey,
    handleSubmit,
    onChangeUserView,
    submitFormKeys,
  };
};
