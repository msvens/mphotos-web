import { Box, styled } from "@mui/material";

export const StandardLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  overflow: "hidden",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  margin: "auto",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  maxWidth: 1024,
}));
