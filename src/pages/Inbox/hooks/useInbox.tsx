import { useEffect, useState } from "react";
import { userServices } from "../../../services/user.services";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Autocomplete, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface useInboxProps {
  handleClose: () => void;
  handleOpenSnackbar: () => void;
}

export const useInbox = ({
  handleClose,
  handleOpenSnackbar,
}: useInboxProps) => {
  const { user } = useSelector((state: RootState) => state.usersModel);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<
    { email: string; employeeId: string }[]
  >([
    {
      email: "",
      employeeId: "",
    },
  ]);
  const [newMail, setNewMail] = useState<NewMail>({
    description: "",
    employeeId: "",
    subject: "",
  });

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = async () => {
    let employees = await userServices.getAllEmployees();
    console.log("employees", employees);

    const options = employees
      .filter((employee: any) => employee.userId._id !== user?._id)
      .map((employee: any) => {
        return { email: employee.userId.email, employeeId: employee._id };
      });
    setOptions(options);
  };

  const handleChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id?: any
  ) => {
    const { name, value } = ev.target;
    setNewMail((prev) => {
      return { ...prev, [id ? "employeeId" : name]: id ? id : value };
    });
  };

  const onSend = async () => {
    setLoading(true);
    const mail = await userServices.createMail(newMail);
    if (mail) {
      handleClose();
      setLoading(false);
      handleOpenSnackbar();
    }
  };

  const MailModal = (
    <div>
      <div className="mail__modal__header">new massage</div>
      <div className="flex column g10">
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.email}
          onChange={(ev, value) => {
            handleChange(
              ev as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
              value?.employeeId
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="text__filed"
              variant="standard"
              label="to"
              fullWidth
            />
          )}
        />
        <TextField
          className="text__filed"
          variant="standard"
          label="subject"
          name="subject"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          multiline={true}
          className="text__filed new__mail__textarea"
          variant="standard"
          fullWidth
          name="description"
          onChange={handleChange}
        />
        <LoadingButton loading={loading} onClick={onSend} className="button">
          Send
        </LoadingButton>
      </div>
    </div>
  );

  return { MailModal };
};
