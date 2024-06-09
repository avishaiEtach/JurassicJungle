import { useRef, useState } from "react";
import { Button, ButtonGroup, Divider } from "@mui/material";
import { MdKeyboardArrowRight } from "react-icons/md";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

export const useDinosaursCatagories = ({
  getSearch,
  search,
}: DinosaursCatagoriesProps) => {
  const catagories: Categoric[] = [
    {
      title: "continent",
      items: [
        {
          label: "North America",
          value: "NA",
        },
        {
          label: "South America",
          value: "SA",
        },
        {
          label: "Europe",
          value: "EU",
        },
        {
          label: "Asia",
          value: "AS",
        },
        {
          label: "Africa",
          value: "AF",
        },
      ],
    },
    {
      title: "diet",
      items: [
        {
          label: "Herbivores",
          value: "Herbivore",
        },
        {
          label: "Carnivores",
          value: "Carnivore",
        },
        {
          label: "Piscivores",
          value: "Piscivore",
        },
      ],
    },
    {
      title: "size",
      items: [
        {
          label: "Small (up to 5 meters)",
          value: "small",
        },
        {
          label: "Medium (5-15 meters)",
          value: "medium",
        },
        {
          label: "Large (over 15 meters)",
          value: "large",
        },
      ],
    },
    {
      title: "weight",
      items: [
        {
          label: "Light (up to 1 ton)",
          value: "light",
        },
        {
          label: "Medium (1-10 tons)",
          value: "medium",
        },
        {
          label: "Heavy (over 10 tons)",
          value: "heavy",
        },
      ],
    },
  ];

  const LargeScreensCategories = () => {
    return (
      <div className="large__screens__categories__container">
        {catagories.map((categoric) => (
          <div className="dinosaurs__catagories">
            <div>
              <div className="flex space-between">
                <h5>{categoric.title}</h5>
                <MdKeyboardArrowRight />
              </div>
              <Divider
                variant="inset"
                flexItem
                className="dinosaurs__catagories__divider"
              />
            </div>
            <ul>
              {categoric.items.map((item) => (
                <li
                  className={
                    item.value === search[categoric.title] ? "chosen" : ""
                  }
                  onClick={() => {
                    getSearch(categoric.title, item.value);
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const SmallScreensCategories = ({
    categoric,
  }: SmallScreensCategoriesProps) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }

      setOpen(false);
    };

    return (
      <>
        <ButtonGroup
          variant="outlined"
          ref={anchorRef}
          aria-label="Button group with a nested menu"
        >
          <Button className="clear__all__button">{categoric.title}</Button>
          <Button
            className="clear__all__button"
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          className="dinosaurs__catagories__small__popper"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {categoric.items.map((option: any, index: number) => (
                      <MenuItem
                        key={index}
                        className={
                          option.value === search[categoric.title]
                            ? "small__screen__chosen"
                            : ""
                        }
                        onClick={(ev) => {
                          ev.stopPropagation();
                          getSearch(categoric.title, option.value);
                        }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };

  return { catagories, LargeScreensCategories, SmallScreensCategories };
};
