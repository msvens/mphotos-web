import { alpha, Box, InputBase, styled, useTheme } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export function Search() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.grey["50"],
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          marginLeft: theme.spacing(3),
          width: "auto",
        },
      }}
    >
      <SearchIconWrapper theme={theme}>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInputBase
        theme={theme}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Box>
  );
}
