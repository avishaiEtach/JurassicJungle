import { IconButton, Paper } from "@mui/material";
import { formatGmailStyle } from "../../assets/util";
import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { routesPath } from "../../routes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./MailPage.scss";
import { adminServices } from "../../services/admin.services";
import { read } from "fs";
import { setUser } from "../../store/users.actions";

export const MailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.usersModel);
  const [mail, setMail] = useState<Mail | undefined>();

  useEffect(() => {
    const mail = user?.employeeId?.mails.find((mail) => mail._id === id);
    setMail(mail);
    setMailToRead(mail?._id as string);
  }, []);

  const setMailToRead = async (id: string) => {
    const res: User = await adminServices.updateMail(id, { read: true });
    if (res) {
      dispatch(setUser(res));
    }
  };

  if (!mail) {
    return <div> no mail</div>;
  }

  return (
    <Paper className="mail__page__main__container">
      <div>
        <IconButton
          onClick={() => {
            navigate(routesPath.inbox);
          }}
          size="small"
        >
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="flex column mail__page__container">
        <div className="mail__page__subject">{mail.subject}</div>
        <div className="flex align-center space-between mail__page__details">
          <span>{mail.fromSend}</span>
          <span>{formatGmailStyle(dayjs(mail.sendTime))}</span>
        </div>
        <div>{mail.description}</div>
      </div>
    </Paper>
  );
};
