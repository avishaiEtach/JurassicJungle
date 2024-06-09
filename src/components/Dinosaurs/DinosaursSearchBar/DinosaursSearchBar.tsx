import { Button, IconButton, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import SearchIcon from "@mui/icons-material/Search";
import { useDinosaursSearchBar } from "./hooks/useDinosaursSearchBar";
import "./DinosaursSearchBar.scss";

export const DinosaursSearchBar = (props: DinosaursSearchBarProps) => {
  const params = useDinosaursSearchBar(props);
  return (
    <div className="flex">
      <div className="divider"></div>
      <div className="flex g20">
        <Paper
          component="form"
          className="dinosaurs__search__bar__container"
          onSubmit={params.onSubmit}
          elevation={0}
        >
          <TextField
            className="dinosaurs__search__bar"
            fullWidth
            placeholder="Search by name..."
            name="name"
            onChange={params.onChange}
            value={params.inputValue}
          />
          {params.inputValue !== "" && (
            <div
              aria-label="close"
              className="dinosaurs__search__bar__clear__search__button"
              onClick={params.onClickClearSearchButton}
            >
              <IoIosClose />
            </div>
          )}
          <IconButton
            className="dinosaurs__search__bar__search__button"
            type="submit"
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          className={`clear__all__button`}
          onClick={params.onClickClearButton}
          disabled={!params.showButton()}
          variant="outlined"
        >
          clear all
        </Button>
      </div>
    </div>
  );
};
