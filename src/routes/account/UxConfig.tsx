import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MPContext } from "../../MPContext";
import { Colors, UXConfig } from "../../service/types";
import { usePhotoService } from "../../service/mphotoservice";

const gridSpacings = [
  {
    value: 0,
    label: "None",
  },
  {
    value: 5,
    label: "Thin",
  },
  {
    value: 10,
    label: "Normal",
  },
  {
    value: 15,
    label: "Thick",
  },
];

const photoOrders = [
  { value: "upload", label: "Photo upload date" },
  { value: "original", label: "Photo creation date" },
];

export function UxConfig() {
  const ps = usePhotoService();
  const context = useContext(MPContext);

  const [cols, setCols] = useState<number>(4);
  const [loadItems, setLoadItems] = useState<number>(12);
  const [gridSpacing, setGridSpacing] = useState<number>(0);
  const [showBio, setShowBio] = useState<boolean>(false);
  const [photoBackground, setPhotoBackground] = useState<string>("");
  const [photoBorders, setPhotoBorders] = useState<
    "all" | "none" | "left-right"
  >("all");
  const [photoSortOrder, setPhotoSortOrder] = useState<"upload" | "original">(
    "upload"
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [denseTopBar, setDenseTopBar] = useState<boolean>(false);
  const [denseBottomBar, setDenseBottomBar] = useState<boolean>(false);

  useEffect(() => {
    setCols(context.uxConfig.photoGridCols);
    setLoadItems(context.uxConfig.photoItemsLoad);
    setGridSpacing(context.uxConfig.photoGridSpacing);
    setShowBio(context.uxConfig.showBio);
    setPhotoBackground(context.uxConfig.photoBackgroundColor);
    setTheme(context.uxConfig.colorTheme);
    setDenseTopBar(context.uxConfig.denseTopBar);
    setDenseBottomBar(context.uxConfig.denseBottomBar);
    setPhotoBorders(context.uxConfig.photoBorders);
    setPhotoSortOrder(context.uxConfig.photoSortOrder);
  }, [context.uxConfig]);

  const handleUpdate = () => {
    const updateConfig = async () => {
      try {
        const conf: UXConfig = {
          photoGridCols: cols,
          photoGridSpacing: gridSpacing,
          photoItemsLoad: loadItems,
          showBio: showBio,
          photoBackgroundColor: photoBackground,
          colorTheme: theme,
          denseTopBar: denseTopBar,
          denseBottomBar: denseBottomBar,
          photoBorders: photoBorders,
          photoSortOrder: photoSortOrder,
        };
        await ps.updateUXConfig(conf);
        context.checkUXConfig();
      } catch (e) {
        alert(e);
      }
    };
    void updateConfig();
  };

  const handleColsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCols(Number(event.target.value));
  };

  const handleLoadItemsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoadItems(Number(event.target.value));
  };

  const handleGridSpacing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGridSpacing(Number(event.target.value));
  };

  const handlePhotoSortOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "original") setPhotoSortOrder("original");
    else {
      setPhotoSortOrder("upload");
    }
  };
  const handleShowBio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowBio(event.target.checked);
  };
  const handleDenseTopBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDenseTopBar(event.target.checked);
  };
  const handleDenseBottomBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDenseBottomBar(event.target.checked);
  };

  const handlePhotoBackgroundChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhotoBackground((event.target as HTMLInputElement).value);
  };

  const handlePhotoBordersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    switch ((event.target as HTMLInputElement).value) {
      case "left-right":
        setPhotoBorders("left-right");
        break;
      case "none":
        setPhotoBorders("none");
        break;
      default:
        setPhotoBorders("all");
    }
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value === "dark") setTheme("dark");
    else setTheme("light");
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            size="medium"
            margin="normal"
            variant="outlined"
            id="cols"
            label="Grid Columns"
            value={cols}
            onChange={handleColsChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            select
            size="medium"
            margin="normal"
            type="number"
            variant="outlined"
            id="gridSpacing"
            label="Grid Spacing"
            value={gridSpacing}
            onChange={handleGridSpacing}
            fullWidth
          >
            {gridSpacings.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            select
            size="medium"
            margin="normal"
            variant="outlined"
            id="photoSortOrder"
            label="Photo Sort Order"
            value={photoSortOrder}
            onChange={handlePhotoSortOrder}
            fullWidth
          >
            {photoOrders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <TextField
            size="medium"
            margin="normal"
            variant="outlined"
            id="loadItems"
            label="Load Items"
            value={loadItems}
            onChange={handleLoadItemsChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <FormControlLabel
            label="Show Bio"
            control={
              <Switch
                checked={showBio}
                onChange={handleShowBio}
                name="showBioS"
                color="primary"
              />
            }
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <FormControlLabel
            label="Dense Topbar"
            control={
              <Switch
                checked={denseTopBar}
                onChange={handleDenseTopBar}
                name="densTopBarS"
                color="primary"
              />
            }
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <FormControlLabel
            label="Dense Bottombar"
            control={
              <Switch
                checked={denseBottomBar}
                onChange={handleDenseBottomBar}
                name="denseBottomBarS"
                color="primary"
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Photo Background</FormLabel>
            <RadioGroup
              aria-label="Photo Background"
              name="photoBackground"
              value={photoBackground}
              onChange={handlePhotoBackgroundChange}
            >
              <FormControlLabel
                value={Colors.White}
                control={<Radio />}
                label="White"
              />
              <FormControlLabel
                value={Colors.Light}
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel
                value={Colors.Grey}
                control={<Radio />}
                label="Grey"
              />
              <FormControlLabel
                value={Colors.Dark}
                control={<Radio />}
                label="Dark"
              />
              <FormControlLabel
                value={Colors.Black}
                control={<Radio />}
                label="Black"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Photo Borders</FormLabel>
            <RadioGroup
              aria-label="Photo Borders"
              name="photoBorders"
              value={photoBorders}
              onChange={handlePhotoBordersChange}
            >
              <FormControlLabel value="none" control={<Radio />} label="None" />
              <FormControlLabel
                value="left-right"
                control={<Radio />}
                label="Left-Right"
              />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Site Theme</FormLabel>
            <RadioGroup
              aria-label="Photo Detail Background"
              name="siteTheme"
              value={theme}
              onChange={handleThemeChange}
            >
              <FormControlLabel
                value={"light"}
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel
                value={"dark"}
                control={<Radio />}
                label="Dark"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item sx={{ justifyContent: "flex-end" }}>
          <Button onClick={handleUpdate} variant="outlined">
            Save Config
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
