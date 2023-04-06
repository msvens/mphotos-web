import { useMediaQuery, useTheme } from "@mui/material";

export function useIsLargeScreen(): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up("sm"));
}