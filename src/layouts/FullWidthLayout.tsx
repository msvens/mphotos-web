import { Box, styled } from "@mui/material";

export const FullWidthLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
}));
