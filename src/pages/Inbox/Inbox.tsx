import dayjs from "dayjs";
import { formatGmailStyle, makeId } from "../../assets/util";
import "./Inbox.scss";
import { useNavigate } from "react-router-dom";
import { replaceRouteParam, routesPath } from "../../routes";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Inbox = () => {
  const { user } = useSelector((state: RootState) => state.usersModel);
  const navigate = useNavigate();
  return (
    <div className="inbox__main__container">
      {user?.employeeId?.mails.map((massage, index) => (
        <div
          onClick={() => {
            navigate(replaceRouteParam(routesPath.mailPage, massage._id));
          }}
        >
          <div
            className={`inbox__row__container ${!massage.read ? "unread" : ""}`}
            aria-label={`${index}`}
          >
            <div className={`inbox__row__send`}>{massage.fromSend}</div>
            <div className="inbox__row__subject">{massage.subject}</div>
            <span className="inbox__row__spacer"> - </span>
            <div className="inbox__row__description">{massage.description}</div>
            <div className="inbox__row__time">
              {formatGmailStyle(dayjs(massage.sendTime))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
