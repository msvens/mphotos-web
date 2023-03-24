import { Box, styled, useTheme } from "@mui/material";

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
        overflow: "hidden",
        paddingLeft: 0,
        margin: "auto",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        width: 700,
        maxWidth: 700,
      }}
    >
      <Box>{children}</Box>
    </Box>
  );
}
