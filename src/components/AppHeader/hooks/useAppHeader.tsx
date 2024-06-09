import { useState } from "react";
import logo from "../../../assets/images/logo4.png";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GiHamburgerMenu } from "react-icons/gi";
import { Avatar, IconButton, Skeleton, TextField } from "@mui/material";
import { replaceRouteParam, routes, routesPath } from "../../../routes";
import { useModal } from "../../Modal/useModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { stringAvatar } from "../../../assets/util";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { userServices } from "../../../services/user.services";
import { setUser } from "../../../store/users.actions";

export const useAppHeader = ({ handleOpen, user, loader }: any) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAnchor = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const logout = async () => {
    const pageUrl = window.location.href.includes("account") 
    dispatch(setUser(undefined))
    await userServices.logout()
      if(pageUrl){
        navigate(routesPath.home)
      }
  };

  const navigate = useNavigate();

  const UserAvatar = (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openAnchor ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openAnchor ? "true" : undefined}
        >
          <Avatar {...stringAvatar(`${user?.firstname} ${user?.lastname}`)} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openAnchor}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate(replaceRouteParam(routesPath.account, user._id));
            handleClose();
          }}
        >
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );

  const DrawerList = (
    <Box
      className="drawer__box"
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Divider />
      <List>
        {routes.map((route) => {
          return route.showInNavBar ? (
            <NavLink className="flex" key={route.path} to={route.path}>
              <ListItem key={route.label} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ) : null;
        })}
      </List>
      <div className="flex justify-center align-center">
        {loader ? (
          <Skeleton variant="circular" className="avatar__skeleton" />
        ) : user ? (
          UserAvatar
        ) : (
          <Button onClick={handleOpen} className="login__button">
            Log in
          </Button>
        )}
      </div>
    </Box>
  );

  const DesktopHeader = (
    <div className="desktop__header">
      <div className="flex">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <nav className="navbar">
          {routes.map((route) => {
            return route.showInNavBar ? (
              <NavLink key={route.path} to={route.path}>
                {route.label}
              </NavLink>
            ) : null;
          })}
        </nav>
        <div className="flex justify-center align-center">
          {loader ? (
            <Skeleton variant="circular" className="avatar__skeleton" />
          ) : user ? (
            UserAvatar
          ) : (
            <Button onClick={handleOpen} className="login__button">
              Log in
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const MobileHeader = (
    <div className="mobile__header">
      <div className="flex">
        <IconButton onClick={toggleDrawer(true)}>
          <GiHamburgerMenu />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </div>
  );

  return { DesktopHeader, MobileHeader };
};
