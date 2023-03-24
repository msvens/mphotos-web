import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, Box, AppBar, Toolbar } from "@mui/material";
import { useContext } from "react";
import { MPContext } from "./MPContext";

const linkText = {
  textTransform: "uppercase",
  margin: 0,
  marginRight: 1,
  marginLeft: 1,
  fontSize: "80%",
} as const;

function toLink(to: string, name: string) {
  return (
    <Link
      sx={linkText}
      color={"inherit"}
      style={{ textDecoration: "none" }}
      component={RouterLink}
      to={to}
    >
      <Typography variant="caption" gutterBottom={false}>
        <Box sx={linkText}>{name}</Box>
      </Typography>
    </Link>
  );
}

export function Footer() {
  const context = useContext(MPContext);
  return (
    <AppBar
      sx={{ marginLeft: 0, marginRight: 0, top: "auto", bottom: 0 }}
      position="relative"
      color={"transparent"}
      elevation={0}
    >
      <Toolbar
        style={{ paddingLeft: 0, paddingRight: 0 }}
        variant={context.uxConfig.denseBottomBar ? "dense" : "regular"}
      >
        <Box sx={{ flexGrow: 1 }} />
        {toLink("/about", "ABOUT")}
        {toLink("/resume", "RESUME")}
        {toLink("/", "MELLOWTECH.ORG")}
        {toLink("/account", "ACCOUNT")}
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
