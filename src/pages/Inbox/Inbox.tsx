import { Paper } from "@mui/material";
import dayjs from "dayjs";
import { makeId } from "../../assets/util";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { GoHorizontalRule } from "react-icons/go";
import "./Inbox.scss";
import { useNavigate } from "react-router-dom";
import { replaceRouteParam, routesPath } from "../../routes";

export const Inbox = () => {
  const massages = [
    {
      id: makeId(5),
      subject:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis",
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis animi iusto adipisci deserunt eos? Distinctio dolor repellat deserunt, dolores ad eum qui. Dolor, deleniti tempore. Perspiciatis, id. Voluptatum, quo tempora.
      Magni similique possimus ullam nesciunt obcaecati optio assumenda, hic quam itaque quasi quis doloremque cupiditate. Perferendis, reprehenderit! Dolore praesentium impedit nemo fugiat aspernatur nam ipsam eveniet, similique obcaecati laudantium eaque.
      Nisi, praesentium inventore tempore animi sint explicabo voluptatem culpa harum dolorem numquam quidem, sapiente suscipit dignissimos dolorum. Sequi qui deserunt voluptates velit perspiciatis mollitia iure, dolorem, nulla molestias commodi sed!`,
      sendTime: dayjs(new Date()),
      read: false,
      fromSend: "avishai",
    },
    {
      id: makeId(5),
      subject: "hi wahts up",
      description: "hi i am bot",
      sendTime: dayjs(new Date()),
      read: false,
      fromSend: "Avishai",
    },
    {
      id: makeId(5),
      subject: "hi wahts up",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident magni sapiente, repellendus sed ipsam nobis sint quis maiores tenetur sequi quod voluptatibus iusto quidem assumenda ratione ullam excepturi illo deleniti!",
      sendTime: dayjs(new Date()),
      read: false,
      fromSend: "Avishai",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="inbox__main__container">
      {massages.map((massage, index) => (
        <div
          onClick={() => {
            navigate(replaceRouteParam(routesPath.mailPage, massage.id));
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
            <div className="inbox__row__time">12:55</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// <div className="flex space-between">
//   <div className="flex">
//     <div style={{ marginRight: "70px" }}>{massage.fromSend}</div>
//     <div className="flex align-center">
//       <div>{massage.subject}</div>
//       <GoHorizontalRule />
//       <div
//         style={{
//           whiteSpace: "nowrap",
//           overflowWrap: "break-word",
//           textOverflow: "ellipsis",
//           overflow: "hidden",
//           flex: 1,
//           width: "400px",
//           //   flexBasis: "80%",
//         }}
//       >
//         {massage.description}
//       </div>
//     </div>
//   </div>
//   <div>12:45</div>
// </div>
// <div
//   className={`inbox__massage__container ${massage.read ? "read" : ""}`}
// >
//   <span
//     className={`inbox__massage__fromSend ${
//       !massage.read ? "text__un__read" : ""
//     }`}
//   >
//     {massage.fromSend}
//   </span>
//   <div className="spacer"></div>
//   <div className="flex">
//     <span
//       className={`inbox__massage__title ${
//         !massage.read ? "text__un__read" : ""
//       }`}
//     >
//       {massage.title}
//     </span>
//     {/* <HorizontalRuleIcon fontSize="small" sx={{ marginInline: "5px" }} />
//     <div className="inbox__massage__line">
//       <GoHorizontalRule />
//     </div>
//     <span
//       className={`inbox__massage__massage ${
//         !massage.read ? "un__read" : ""
//       }`}
//     >
//       {massage.massage}
//     </span>
//     <div className="spacer small"></div>
//     <span
//       className={`inbox__massage__time ${
//         !massage.read ? "text__un__read" : ""
//       }`}
//     >
//       12:24
//     </span>
//   </div>
// </div>
//   ))}
