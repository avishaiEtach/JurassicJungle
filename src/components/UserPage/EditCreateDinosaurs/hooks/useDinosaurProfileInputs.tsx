import { InputAdornment, MenuItem, TextField } from "@mui/material";
import { ReactComponent as NA } from "../../../../assets/images/na.svg";
import { ReactComponent as AF } from "../../../../assets/images/af.svg";
import { ReactComponent as EU } from "../../../../assets/images/eu.svg";
import { ReactComponent as AS } from "../../../../assets/images/as.svg";
import { ReactComponent as SA } from "../../../../assets/images/sa.svg";
import { useState } from "react";

interface useDinosaurProfileInputsProps {
  createDinosaur: Dictionary;
  setCreateDinosaur: any;
}

export const useDinosaurProfileInputs = ({
  createDinosaur,
  setCreateDinosaur,
}: useDinosaurProfileInputsProps) => {
  const onChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    setCreateDinosaur((prev: any) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value: value,
        },
      };
    });
    // setError({ filed: "", active: false });
  };

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

  const GetInputs = (
    <>
      {Object.entries(createDinosaur).map(([key, value]: any) => {
        return (
          <TextField
            placeholder={key}
            label={value.type === "select" || value.value ? key : undefined}
            multiline={value.type === "textarea" ? true : false}
            minRows={value.type === "textarea" ? 4 : undefined}
            select={value.type === "select"}
            type={value.type}
            value={value.value}
            onChange={onChange}
            name={key}
            InputProps={
              value.type === "number"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        {key === "bodyLength" ? "Metres" : "Kg"}
                      </InputAdornment>
                    ),
                  }
                : undefined
            }
          >
            {value.type === "select"
              ? value.items.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {key === "continent"
                      ? getContinentIconAndLabel(item)?.label
                      : item}
                  </MenuItem>
                ))
              : undefined}
          </TextField>
        );
      })}
    </>
  );

  return { GetInputs };
};
