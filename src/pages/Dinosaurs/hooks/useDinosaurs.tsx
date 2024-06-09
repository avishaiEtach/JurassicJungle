import { useEffect, useState } from "react";
import { dinosaursServices } from "../../../services/dinosaurs.services";
import { configs } from "../../../assets/configs";

export const useDinosaurs = ({ setLoading }: useDinosaursProps) => {
  const [dinosaurs, setDinosaurs] = useState<Dinosaur[]>([]);
  const [page, setPage] = useState(1);
  const [pagesAmount, setPagesAmount] = useState(1);

  const [chosenDinosaur, setChosenDinosaur] = useState<Dinosaur | undefined>();

  const [search, setSearch] = useState<any>({
    continent: "",
    diet: "",
    size: "",
    weight: "",
  });

  const getDinosaurs = async () => {
    const searchParameters = [];
    setLoading(true);
    for (const [key, value] of Object.entries(search)) {
      if (value !== "") {
        searchParameters.push({ [key]: value });
      }
    }
    const result = await dinosaursServices.searchDinosaurs(
      searchParameters,
      page,
      configs.DINOSAURS_LIMIT
    );
    setDinosaurs(result.rows);
    setPagesAmount(Math.ceil(result.amount / configs.DINOSAURS_LIMIT));
    setLoading(false);
  };

  useEffect(() => {
    getDinosaurs();
  }, [search, page]);

  const getSearch = (key: string, value: string) => {
    setPage(1);
    if (search[key] === value) {
      setSearch((prev: any) => {
        return { ...prev, [key]: "" };
      });
    } else {
      setSearch((prev: any) => {
        return { ...prev, [key]: value };
      });
    }
  };

  const params = {
    dinosaurs,
    getSearch,
    setPage,
    setSearch,
    search,
    pagesAmount,
    chosenDinosaur,
    setChosenDinosaur,
    page,
  };

  return params;
};
