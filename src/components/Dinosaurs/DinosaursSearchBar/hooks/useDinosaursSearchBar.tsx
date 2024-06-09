import { useState } from "react";

export const useDinosaursSearchBar = ({
  getSearch,
  setPage,
  setSearch,
  search,
}: DinosaursSearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    getSearch("name", inputValue);
  };

  const onClickClearSearchButton = () => {
    setPage(1);
    setInputValue("");
    getSearch("name", "");
  };

  const onClickClearButton = () => {
    setSearch({
      continent: "",
      diet: "",
      size: "",
      weight: "",
    });
    setInputValue("");
    setPage(1);
  };

  const showButton = () => {
    if (inputValue !== "") {
      return true;
    }
    for (const key in search) {
      if (search[key] !== "") {
        return true;
      }
    }
    return false;
  };

  const onChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = ev.target;
    setInputValue(value);
  };

  const params = {
    onSubmit,
    onClickClearSearchButton,
    onClickClearButton,
    showButton,
    onChange,
    inputValue,
  };

  return params;
};
