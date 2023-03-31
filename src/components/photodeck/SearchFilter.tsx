import { Box, Button, Theme, useTheme } from "@mui/material";
import { ColorScheme } from "../../service/types";
import Grid2 from "@mui/material/Unstable_Grid2";
import { parseSearchParams } from "../../service/apiutil";

type SearchFilterProps = {
  filter: string;
  onClear?: (photoId: string) => void;
  cs: ColorScheme;
  photoId: string;
};
function filterSX(theme: Theme, bgcolor: string, fgcolor: string) {
  return {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    margin: "auto",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    backgroundColor: bgcolor,
    color: fgcolor,
  };
}
export function SearchFilter(props: SearchFilterProps) {
  const theme = useTheme();
  const f = parseSearchParams(props.filter);

  return (
    <Box sx={filterSX(theme, props.cs.backgroundColor, props.cs.color)}>
      <Grid2
        container
        spacing={6}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Grid2>{f.cameraModel && "Camera Model: " + f.cameraModel}</Grid2>
        {props.onClear && (
          <Grid2>
            <Button
              variant="outlined"
              size="small"
              color="inherit"
              onClick={() => {
                if (props.onClear) props.onClear(props.photoId);
              }}
            >
              Clear Filter
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
}
