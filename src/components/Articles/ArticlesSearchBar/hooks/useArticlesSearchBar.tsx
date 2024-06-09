import { useState } from "react";

export const useArticlesSearchBar = ({
  setPage,
  getSearch,
  search,
}: ArticlesSearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const onChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = ev.target;
    setInputValue(value);
  };

  const onClickClearSearchButton = () => {
    setInputValue("");
    if (search.name !== "") {
      setPage(1);
      getSearch("name", "");
    }
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    getSearch("name", inputValue);
  };

  return { onChange, onClickClearSearchButton, onSubmit, inputValue };
};
