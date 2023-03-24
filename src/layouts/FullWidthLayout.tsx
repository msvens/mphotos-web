import { Box, styled } from "@mui/material";

export const FullWidthLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
}));
