import {Box, useMediaQuery, useTheme} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {MPMenuList, MPMenuListProps} from "../components/MPMenuList";

type MenuListLayoutProps = {
  children: React.ReactNode;
} & MPMenuListProps;

export function MenuListLayout(props: MenuListLayoutProps) {
  const theme = useTheme();
  const largeDisplay = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box sx={{
      display: "flex",
      px: 2,
      paddingTop: 4,
      paddingBottom: 2
    }}>
      <Grid2
        container
        sx={{
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Grid2 xs={12} sm={3}>
          <MPMenuList
            sparse={props.sparse}
            large={props.large}
            items={props.items}
            isSelected={props.isSelected}
            borderBottom={!largeDisplay}
          />
        </Grid2>
        <Grid2 xs={12} sm={9} sx={largeDisplay ? {paddingLeft: 2} : {paddingTop: 2}}>
          {props.children}
        </Grid2>
      </Grid2>
    </Box>
  );
}
