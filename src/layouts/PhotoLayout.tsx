import { Box, styled } from "@mui/material";

export const PhotoLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  margin: "auto",
  paddingBottom: theme.spacing(2),
}));
