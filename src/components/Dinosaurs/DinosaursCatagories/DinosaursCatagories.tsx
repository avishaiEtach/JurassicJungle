import "./DinosaursCatagories.scss";
import { useDinosaursCatagories } from "./hooks/useDinosaursCatagories";

export const DinosaursCatagories = (props: DinosaursCatagoriesProps) => {
  const { catagories, LargeScreensCategories, SmallScreensCategories } =
    useDinosaursCatagories(props);
  return (
    <>
      <LargeScreensCategories />
      <div className="small__screens__categories__container">
        {catagories.map((categoric) => (
          <SmallScreensCategories categoric={categoric} />
        ))}
      </div>
    </>
  );
};
