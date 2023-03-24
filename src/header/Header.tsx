import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import { MPContext } from "../MPContext";
import { MPIcon } from "../components/MPIcon";
import { Search } from "./Search";
import { HamburgerMenu } from "./HamburgerMenu";
import {
  HomeOutlined,
  Person,
  PersonAdd,
  PhotoAlbumOutlined,
  PhotoCameraOutlined,
  PhotoOutlined,
} from "@mui/icons-material";

type HeaderProps = {
  search?: boolean;
};

export function Header(p: HeaderProps) {
  const context = useContext(MPContext);
  const theme = useTheme();
  const burgerMenu = useMediaQuery(theme.breakpoints.down("sm"));
  const showSearch = p.search && !burgerMenu;
  const iconFSize = context.uxConfig.denseTopBar ? "medium" : "large";

  return (
    <AppBar sx={{}} position="sticky" color="inherit" elevation={0}>
      <Toolbar
        disableGutters
        sx={{ paddingLeft: 0, marginLeft: 0, paddingRight: 0 }}
        variant={context.uxConfig.denseTopBar ? "dense" : "regular"}
      >
        <Box sx={{ marginLeft: 0 }}>
          <IconButton
            aria-label="home"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            <MPIcon
              key="topLogo"
              mpcolor="white"
              fontSize={context.uxConfig.denseTopBar ? "medium" : "large"}
            />
          </IconButton>
        </Box>
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ textDecoration: "none" }}
        >
          <Typography variant="body2" component="span">
            <Box letterSpacing={2}>
              MELLOWTECH
              <br />
              PHOTOS
            </Box>
          </Typography>
        </Link>
        {showSearch && <Search />}
        <Box sx={{ flexGrow: 1 }} />
        {burgerMenu ? (
          <HamburgerMenu />
        ) : (
          <>
            <IconButton
              aria-label="home"
              color="inherit"
              component={RouterLink}
              to="/"
            >
              <HomeOutlined fontSize={iconFSize} />
            </IconButton>
            <IconButton
              aria-label="photos"
              color="inherit"
              component={RouterLink}
              to="/photo"
            >
              <PhotoOutlined fontSize={iconFSize} />
            </IconButton>
            <IconButton
              aria-label="albums"
              color="inherit"
              component={RouterLink}
              to="/album"
            >
              <PhotoAlbumOutlined fontSize={iconFSize} />
            </IconButton>
            <IconButton
              aria-label="cameras"
              color="inherit"
              component={RouterLink}
              to="/camera"
            >
              <PhotoCameraOutlined fontSize={iconFSize} />
            </IconButton>
            <IconButton
              aria-label="guest"
              color="inherit"
              component={RouterLink}
              to="/guest"
            >
              {context.isGuest ? (
                <Person fontSize={iconFSize} />
              ) : (
                <PersonAdd fontSize={iconFSize} />
              )}
            </IconButton>
          </>
        )}
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
