import "./DinosaurCard.scss";
import { useDinosaurCard } from "./hooks/useDinosaurCard";

export const DinosaurCard = ({
  dinosaur,
  setChosenDinosaur,
  handleOpen,
}: DinosaurCardProps) => {
  const { getIcons, onClick } = useDinosaurCard({
    dinosaur,
    setChosenDinosaur,
    handleOpen,
  });
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
};
