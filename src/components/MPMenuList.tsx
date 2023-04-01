import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export type MenuItem = {
  name: string;
  link?: string;
};

export function MI(name: string, link?: string): MenuItem {
  return {name: name, link: link};
}

export type MPMenuListProps = {
  sparse?: boolean;
  large?: boolean;
  items: Map<string, MenuItem>;
  isSelected: (item: string) => boolean;
  minWidth?: number;
  onSelect?: (item: string) => void;
  borderBottom?: boolean;
};

export function MPMenuList(props: MPMenuListProps) {
  const theme = useTheme();

  function listText(name: string) {
    if (props.large) {
      return (
        <ListItemText
          primary={name}
          primaryTypographyProps={{variant: "subtitle1"}}
        />
      );
    } else return <ListItemText primary={name}/>;
  }

  function listButton(key: string, item: MenuItem) {
    if (item.link)
      return (
        <ListItemButton
          selected={props.isSelected(key)}
          onSelect={() => {
            if (props.onSelect) props.onSelect(key);
          }}
          component={RouterLink}
          to={item.link}
          key={key}
        >
          {listText(item.name)}
        </ListItemButton>
      );
    else {
      return (
        <ListItemButton
          selected={props.isSelected(key)}
          onSelect={() => {
            if (props.onSelect) props.onSelect(key);
          }}
          key={key}
        >
          {listText(item.name)}
        </ListItemButton>
      );
    }
  }


  return (
    <Box
      sx={props.borderBottom ? {borderBottom: 1, borderColor: theme.palette.divider} : {
        borderRight: 1,
        borderColor: theme.palette.divider,
        paddingRight: 2,
      }}
      height={"100%"}
    >
      <List
        dense={!props.sparse}
        sx={{
          width: "100%",
        }}
      >
        {Array.from(props.items.entries()).map((entry, _idx) =>
          listButton(entry[0], entry[1])
        )}
      </List>
    </Box>
  );
}
