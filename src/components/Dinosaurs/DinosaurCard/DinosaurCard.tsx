import { Paper, Radio } from "@mui/material";
import "./DinosaurCard.scss";
import { useDinosaurCard } from "./hooks/useDinosaurCard";
import { ReactComponent as NA } from "../../../assets/images/na.svg";
import { ReactComponent as AF } from "../../../assets/images/af.svg";
import { ReactComponent as EU } from "../../../assets/images/eu.svg";
import { ReactComponent as AS } from "../../../assets/images/as.svg";
import { ReactComponent as SA } from "../../../assets/images/sa.svg";

export const DinosaurCard = ({
  dinosaur,
  setChosenDinosaur,
  handleOpen,
  dinosaurChecked,
}: DinosaurCardProps) => {
  const { getIcons, onClick, getContinentIconAndLabel } = useDinosaurCard({
    dinosaur,
    setChosenDinosaur,
    handleOpen,
    dinosaurChecked,
  });

  if (!dinosaurChecked) {
    return (
      <div onClick={onClick} className="dinosaur__card">
        {getIcons(dinosaur)}
        <div className="dinosaur__card__img">
          <img src={dinosaur.image} />
        </div>
        <span className="dinosaur__card__dinosaur__name">{dinosaur.name}</span>
        <div className="dinosaur__title">
          <span>{dinosaur.description}</span>
        </div>
      </div>
    );
  } else {
    return (
      <Paper
        elevation={0}
        className="flex align-center dinosaur__card__radio"
        sx={{
          padding: "20px 15px",
          backgroundColor: "white",
          cursor: "pointer",
        }}
      >
        {/* <Radio
          color="default"
          checked={
            dinosaurChecked && dinosaurChecked === dinosaur._id ? true : false
          }
          sx={{ marginRight: "20px" }}
        /> */}
        <div className="flex dinosaur__card__radio__container">
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#e5e5e5",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "contain",
              }}
              src={dinosaur.image}
            />
          </div>
          <div className="flex column g10" style={{ marginLeft: "20px" }}>
            <label style={{ fontSize: "14px", color: "#858585" }}>
              Dinosaur name
            </label>
            <span style={{ fontWeight: "700" }}>{dinosaur.name}</span>
          </div>
          <div className="flex column g10" style={{ marginLeft: "20px" }}>
            <label style={{ fontSize: "14px", color: "#858585" }}>
              continent
            </label>
            <span style={{ fontWeight: "700" }}>
              {getContinentIconAndLabel(dinosaur.continent)?.label}
            </span>
          </div>
          <div className="flex column g10" style={{ marginLeft: "20px" }}>
            <label style={{ fontSize: "14px", color: "#858585" }}>diet</label>
            <span style={{ fontWeight: "700" }}>{dinosaur.diet}</span>
          </div>
          <div className="flex column g10" style={{ marginLeft: "20px" }}>
            <label style={{ fontSize: "14px", color: "#858585" }}>
              description
            </label>
            <span
              style={{
                fontWeight: "700",
                whiteSpace: "nowrap",
                width: "270px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {dinosaur.description}
            </span>
          </div>
        </div>
      </Paper>
    );
  }
};
