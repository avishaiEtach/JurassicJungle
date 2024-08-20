import dayjs from "dayjs";
import { formatGmailStyle } from "../../assets/util";
import { useNavigate } from "react-router-dom";
import { replaceRouteParam, routesPath } from "../../routes";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CreateIcon from "@mui/icons-material/Create";
import { Button } from "@mui/material";
import { useModal } from "../../components/Modal/useModal";
import { useSnackbarMui } from "../../components/Snackbar/useSnackbarMui";
import { AlertMui } from "../../components/Alert/AlertMui";
import { useInbox } from "./hooks/useInbox";
import "./Inbox.scss";

export const Inbox = () => {
  const { user } = useSelector((state: RootState) => state.usersModel);
  const navigate = useNavigate();
  const { handleOpen, MUIModal, handleClose } = useModal();
  const { handleOpenSnackbar, handleCloseSnackbar, SnackbarMUI } =
    useSnackbarMui();
  const { MailModal } = useInbox({ handleClose, handleOpenSnackbar });

  return (
    <div className="inbox__main__container">
      <div className="inbox__new__mail">
        <Button
          size="small"
          className="button square"
          startIcon={<CreateIcon />}
          onClick={handleOpen}
        >
          new mail
        </Button>
      </div>
      <div>
        {user?.employeeId?.mails.map((massage, index) => (
          <div
            onClick={() => {
              navigate(replaceRouteParam(routesPath.mailPage, massage._id));
            }}
          >
            <div
              className={`inbox__row__container ${
                !massage.read ? "unread" : ""
              }`}
              aria-label={`${index}`}
            >
              <div className={`inbox__row__send`}>{massage.fromSend}</div>
              <div className="inbox__row__subject">{massage.subject}</div>
              <span className="inbox__row__spacer"> - </span>
              <div className="inbox__row__description">
                {massage.description}
              </div>
              <div className="inbox__row__time">
                {formatGmailStyle(dayjs(massage.sendTime))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {MUIModal({
        small: true,
        children: MailModal,
      })}
      {SnackbarMUI({
        children: (
          <AlertMui
            variant="filled"
            onClose={handleCloseSnackbar}
            alertText={`Your mail has been successfully send!`}
          />
        ),
      })}
    </div>
  );
};
