import { Box, useTheme } from "@mui/material";
import React from "react";

type DocLayoutProps = {
  children: React.ReactNode;
};
export function DocLayout({ children }: DocLayoutProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        margin: "auto",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        maxWidth: 700,
      }}
    >
      <Box>{children}</Box>
    </Box>
  );
}
