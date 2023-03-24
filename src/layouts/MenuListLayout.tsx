import Grid2 from "@mui/material/Unstable_Grid2";
import { MPMenuList, MPMenuListProps } from "../components/MPMenuList";
import { FullWidthLayout } from "./FullWidthLayout";

type MenuListLayoutProps = {
  children: React.ReactNode;
} & MPMenuListProps;

export function MenuListLayout(props: MenuListLayoutProps) {
  return (
    <FullWidthLayout>
      <Grid2
        container
        spacing={4}
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
          />
        </Grid2>
        <Grid2 xs={12} sm={9}>
          {props.children}
        </Grid2>
      </Grid2>
    </FullWidthLayout>
  );
}
