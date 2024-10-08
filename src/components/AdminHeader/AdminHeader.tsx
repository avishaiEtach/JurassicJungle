import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/images/logo4.png";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { adminRoutes, routes, routesPath } from "../../routes";
import { Button } from "@mui/material";
import { formatString } from "../../assets/util";

const drawerWidth = 240;

interface Props {
  children: React.ReactElement;
}

export function AdminHeader(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const extractAdminValue = (path: string): string | null => {
    const adminIndex = path.indexOf("/admin/");
    if (adminIndex === -1) {
      return null; // No /admin/ found
    }

    const restOfPath = path.slice(adminIndex + "/admin/".length);
    const nextSlashIndex = restOfPath.indexOf("/");

    if (nextSlashIndex === -1) {
      return restOfPath; // If no more slashes, return the remainder of the path
    }

    return restOfPath.slice(0, nextSlashIndex); // Extract value between /admin/ and next /
  };
  const { pathname } = useLocation();

  const drawer = (
    <div>
      <Toolbar>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      </Toolbar>
      <Divider />
      <List>
        {adminRoutes
          .filter((route) => route.showInNavBar)
          .map((route) => (
            <NavLink to={route.path}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{route.icon}</ListItemIcon>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#F6F8FC",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          borderWidth: 0,
          borderStyle: "solid",
          borderColor: "rgba(0, 0, 0, 0.12)",
          borderBottomWidth: "thin",
          color: "black",
        }}
      >
        <Toolbar className="Toolbar">
          <div className="flex align-center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {formatString(extractAdminValue(pathname) as string)}
            </Typography>
          </div>
          <Button
            onClick={() => navigate(routesPath.home)}
            className="button square"
            sx={{ justifySelf: "flex-end" }}
          >
            go bake to site
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100dvh",
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
