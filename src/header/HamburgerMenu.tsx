import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  HomeOutlined,
  Menu,
  Person,
  PersonAdd,
  PhotoAlbumOutlined,
  PhotoCameraOutlined,
  PhotoOutlined,
} from "@mui/icons-material";
import { MPContext } from "../MPContext";

type Anchor = "top" | "left" | "bottom" | "right";

export function HamburgerMenu() {
  const context = useContext(MPContext);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const menuList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer("right", false)}
      onKeyDown={toggleDrawer("right", false)}
    >
      <List>
        <ListItemButton key="HomePage" component={RouterLink} to="/">
          <ListItemIcon>
            <HomeOutlined />
          </ListItemIcon>
          <ListItemText primary="HomePage" />
        </ListItemButton>
        <ListItemButton key="Photos" component={RouterLink} to="/photo">
          <ListItemIcon>
            <PhotoOutlined />
          </ListItemIcon>
          <ListItemText primary="Photos" />
        </ListItemButton>
        <ListItemButton key="Albums" component={RouterLink} to="/album">
          <ListItemIcon>
            <PhotoAlbumOutlined />
          </ListItemIcon>
          <ListItemText primary="Albums" />
        </ListItemButton>
        <ListItemButton key="Cameras" component={RouterLink} to="/camera">
          <ListItemIcon>
            <PhotoCameraOutlined />
          </ListItemIcon>
          <ListItemText primary="Cameras" />
        </ListItemButton>
        <ListItemButton key="GuestPage" component={RouterLink} to="/guest">
          <ListItemIcon>
            {context.isGuest ? <Person /> : <PersonAdd />}
          </ListItemIcon>
          <ListItemText primary={context.isGuest ? "Guest" : "Add GuestPage"} />{" "}
          :
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        edge="start"
        aria-label="menu"
        onClick={toggleDrawer("right", true)}
        size={"small"}
      >
        <Menu fontSize="large" />
      </IconButton>

      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {menuList()}
      </Drawer>
    </>
  );
}
