import { IconButton, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import SearchIcon from "@mui/icons-material/Search";
import "./ArticlesSearchBar.scss";
import { useArticlesSearchBar } from "./hooks/useArticlesSearchBar";

export const ArticlesSearchBar = ({
  setPage,
  getSearch,
  search,
}: ArticlesSearchBarProps) => {
  const { onChange, onClickClearSearchButton, onSubmit, inputValue } =
    useArticlesSearchBar({ setPage, getSearch, search });
  return (
    <div className="flex g20">
      <Paper
        component="form"
        className="articles__search__bar__container"
        onSubmit={onSubmit}
        elevation={0}
      >
        <TextField
          className="articles__search__bar"
          fullWidth
          placeholder="Search by name..."
          name="name"
          onChange={onChange}
          value={inputValue}
        />
        {inputValue !== "" && (
          <div
            aria-label="close"
            className="articles__search__bar__clear__search__button"
            onClick={onClickClearSearchButton}
          >
            <IoIosClose />
          </div>
        )}
        <IconButton
          className="articles__search__bar__search__button"
          type="submit"
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};
