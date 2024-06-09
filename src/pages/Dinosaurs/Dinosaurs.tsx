import { useModal } from "../../components/Modal/useModal";
import { DinosaursSearchBar } from "../../components/Dinosaurs/DinosaursSearchBar/DinosaursSearchBar";
import { DinosaursCatagories } from "../../components/Dinosaurs/DinosaursCatagories/DinosaursCatagories";
import { useLoader } from "../../components/Loader/useLoader";
import { DinosaurCard } from "../../components/Dinosaurs/DinosaurCard/DinosaurCard";
import { PaginationMui } from "../../components/Pagination/Pagination";
import { useDinosaurs } from "./hooks/useDinosaurs";
import "./Dinosaurs.scss";

export function Dinosaurs() {
  const { loading, setLoading, Loader } = useLoader();
  const { handleOpen, MUIModal } = useModal();
  const params = useDinosaurs({ setLoading });

  return (
    <div className="flex Dinosaurs__main__container">
      <div>
        <DinosaursSearchBar
          getSearch={params.getSearch}
          setPage={params.setPage}
          setSearch={params.setSearch}
          search={params.search}
        />
        <DinosaursCatagories
          search={params.search}
          getSearch={params.getSearch}
        />
      </div>
      {loading || !params.dinosaurs.length ? (
        <div className="flex align-center justify-center dinosaurs__loader__container">
          {loading ? <Loader /> : <div>no dinosaurs</div>}
        </div>
      ) : (
        <div className="flex column dinosaurs__cards__container">
          <div className="dinosaurs__container card-grid">
            {params.dinosaurs.map((dinosaur) => (
              <DinosaurCard
                dinosaur={dinosaur}
                setChosenDinosaur={params.setChosenDinosaur}
                handleOpen={handleOpen}
              />
            ))}
          </div>
          <PaginationMui
            page={params.page}
            pagesAmount={params.pagesAmount}
            setPage={params.setPage}
          />
        </div>
      )}

      {MUIModal({
        injectHtml: params.chosenDinosaur
          ? params.chosenDinosaur.mainArticle
          : undefined,
      })}
    </div>
  );
}
