import { Tooltip } from "@mui/material";
import { FaFish, FaLeaf } from "react-icons/fa";
import { GiMeat } from "react-icons/gi";
import { ReactComponent as NA } from "../../../../assets/images/na.svg";
import { ReactComponent as AF } from "../../../../assets/images/af.svg";
import { ReactComponent as EU } from "../../../../assets/images/eu.svg";
import { ReactComponent as AS } from "../../../../assets/images/as.svg";
import { ReactComponent as SA } from "../../../../assets/images/sa.svg";

export const useDinosaurCard = ({
  dinosaur,
  setChosenDinosaur,
  handleOpen,
}: DinosaurCardProps) => {
  const getContinentIconAndLabel = (
    continent: "NA" | "AF" | "EU" | "AS" | "SA"
  ) => {
    switch (continent) {
      case "NA":
        return { label: "North America", icon: <NA /> };
      case "AF":
        return { label: "Africa", icon: <AF /> };
      case "EU":
        return { label: "Europe", icon: <EU /> };
      case "AS":
        return { label: "Asia", icon: <AS /> };
      case "SA":
        return { label: "South America", icon: <SA /> };
      default:
        break;
    }
  };

  const getIcons = (dinosaur: Dinosaur) => {
    const { diet, continent } = dinosaur;
    const dinosaurDietIcon =
      diet === "Carnivore" ? (
        <GiMeat className="meat" />
      ) : diet === "Herbivore" ? (
        <FaLeaf className="leaf" />
      ) : (
        <FaFish className="fish" />
      );

    return (
      <div className="dinosaur__card__icons__container">
        <Tooltip arrow title={dinosaur.diet}>
          <div className="dinosaur__card__icon">{dinosaurDietIcon}</div>
        </Tooltip>
        <Tooltip arrow title={getContinentIconAndLabel(continent)?.label}>
          <div className="dinosaur__card__icon">
            {getContinentIconAndLabel(continent)?.icon}
          </div>
        </Tooltip>
      </div>
    );
  };

  const onClick = () => {
    handleOpen();
    setChosenDinosaur(dinosaur);
  };

  return { getIcons, onClick };
};
