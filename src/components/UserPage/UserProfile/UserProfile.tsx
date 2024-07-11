import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, MenuItem, TextField, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { RootState } from "../../../store/store";
import {
  compareObjects,
  getDateToObject,
  getMonthName,
  getTimeParameters,
  parseDate,
  splitCamelCaseToSnakeCase,
} from "../../../assets/util";
import { userServices } from "../../../services/user.services";
import { setUser } from "../../../store/users.actions";

type SubmitFormKeys = "firstName" | "lastName" | "email" | "date";

type SubmitFormState = Record<SubmitFormKeys, string | Dictionary>;

export const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.usersModel);
  const [submitForm, setSubmitForm] = useState<SubmitFormState>({
    firstName: user?.firstname ?? "",
    lastName: user?.lastname ?? "",
    email: user?.email ?? "",
    date: {
      day: getDateToObject(new Date(user?.dob as string))?.day ?? "",
      month: getDateToObject(new Date(user?.dob as string))?.month ?? "",
      year: getDateToObject(new Date(user?.dob as string))?.year ?? "",
    },
  });
  const [error, setError] = useState({ filed: "", active: false });
  const dispatch = useDispatch();

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    if (submitForm.firstName === "") {
      setSubmitForm((prev: any) => {
        return { ...prev, firstName: user?.firstname };
      });
      setError({ filed: "firstName", active: true });
      return;
    }
    if (submitForm.lastName === "") {
      setSubmitForm((prev: any) => {
        return { ...prev, lastName: user?.firstname };
      });
      setError({ filed: "lastName", active: true });
      return;
    }
    if (!submitForm.email.includes("@")) {
      setSubmitForm((prev: any) => {
        return { ...prev, lastName: user?.email };
      });
      setError({ filed: "email", active: true });
      return;
    }

    const { day, month, year } = submitForm.date as Dictionary;
    if (day === "" || month === "" || year === "") {
      setError({ filed: "date", active: true });
      return;
    }

    const formRelated = {
      firstname: submitForm.firstName,
      lastname: submitForm.lastName,
      email: submitForm.email,
      dob: new Date(year, month - 1, day).toISOString(),
    };

    let fieldsToChange = compareObjects(user as Dictionary, formRelated, [
      "permissions",
      "_id",
      "articles",
      "createdAt",
      "updatedAt",
      "__v",
    ]);

    if (fieldsToChange.dob) {
      fieldsToChange.dob = parseDate(fieldsToChange.dob);
    }

    const updateUser: User = await userServices.updateUser(
      user?._id,
      fieldsToChange
    );

    dispatch(setUser(updateUser));
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

  return (
    <div style={{ maxWidth: "40%", marginBlock: "30px" }}>
      <h1>User Profile</h1>
      <div
        className="flex column g20"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        <div className="flex g20 error__container">
          <TextField
            className={`singup__text__filed ${
              error.filed === "firstName" ? "error" : ""
            }`}
            label={splitCamelCaseToSnakeCase("firstName")}
            name={"firstName"}
            value={submitForm.firstName}
            onChange={onChange}
            error={error.filed === "firstName" && error.active}
          />
          {ErrorToolTip(error, "firstName")}
        </div>
        <div className="flex g20 error__container">
          <TextField
            className={`singup__text__filed ${
              error.filed === "lastName" ? "error" : ""
            }`}
            label="lastName"
            name={"lastName"}
            value={submitForm.lastName}
            onChange={onChange}
            error={error.filed === "lastName" && error.active}
          />
          {ErrorToolTip(error, "lastName")}
        </div>
        <div className="flex g20 error__container">
          <TextField
            className={`singup__text__filed ${
              error.filed === "email" ? "error" : ""
            }`}
            label="email"
            name={"email"}
            value={submitForm.email}
            onChange={onChange}
            error={error.filed === "email" && error.active}
          />
          {ErrorToolTip(error, "email")}
        </div>
        <div className="flex g20 error__container">
          <label>date of birth</label>
          {ErrorToolTip(error, "date")}
        </div>
        <div className="flex g10">
          <div className="flex g20 error__container">
            <TextField
              className={`singup__text__filed singup__select  ${
                error.filed === "date" ? "error" : ""
              }`}
              select
              size="small"
              label={"day"}
              fullWidth
              value={(submitForm.date as any)["day"]}
              onChange={(ev) => {
                onChange(ev, true);
              }}
              name={"day"}
              SelectProps={{
                MenuProps: {
                  classes: { paper: "singup__up__popover" },
                },
              }}
              error={error.filed === "date" && error.active}
            >
              {getTimeParameters("day").map((name: any) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <TextField
            className={`singup__text__filed singup__select  ${
              error.filed === "date" ? "error" : ""
            }`}
            select
            size="small"
            label={"month"}
            fullWidth
            value={(submitForm.date as any)["month"]}
            onChange={(ev) => {
              onChange(ev, true);
            }}
            name={"month"}
            SelectProps={{
              MenuProps: {
                classes: { paper: "singup__up__popover" },
              },
            }}
            error={error.filed === "date" && error.active}
          >
            {getTimeParameters("month").map((name: any) => (
              <MenuItem key={name} value={name}>
                {getMonthName(name)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={`singup__text__filed singup__select  ${
              error.filed === "date" ? "error" : ""
            }`}
            select
            size="small"
            label={"year"}
            fullWidth
            value={(submitForm.date as any)["year"]}
            onChange={(ev) => {
              onChange(ev, true);
            }}
            name={"year"}
            SelectProps={{
              MenuProps: {
                classes: { paper: "singup__up__popover" },
              },
            }}
            error={error.filed === "date" && error.active}
          >
            {getTimeParameters("year").map((name: any) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        {user?.memberId && (
          <TextField
            className={`singup__text__filed`}
            label={splitCamelCaseToSnakeCase("academicTitle")}
            name={"academicTitle"}
            defaultValue={user?.memberId.academicTitle}
            disabled
          />
        )}
        <div className="flex g10">
          <Button className="login__button">Change Password</Button>
          <Button className="login__button" onClick={handleSubmit}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
