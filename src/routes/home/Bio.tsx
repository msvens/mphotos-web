import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { MPContext } from "../../MPContext";
import Grid2 from "@mui/material/Unstable_Grid2";
import PhotosApi from "../../api/photoapi";
import { Link as RouterLink } from "react-router-dom";

function getImgClass(isLargeDisplay: boolean) {
  if (isLargeDisplay) {
    return {
      width: 128,
      height: 128,
      maxWidth: 128,
      maxHeight: 128,
    };
  } else {
    return {
      width: 68,
      height: 68,
      maxWidth: 68,
      maxHeight: 68,
    };
  }
}
export function Bio() {
  const theme = useTheme();
  const isLargeDisplay = useMediaQuery(theme.breakpoints.up("sm"));
  const context = useContext(MPContext);

  return (
    <Box
      sx={{ flexGrow: 1, flexWrap: "wrap", margin: "auto", paddingBottom: 4 }}
    >
      <Grid2
        sx={{
          paddingBottom: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
        container
        spacing={6}
      >
        <Grid2>
          <Avatar
            alt={context.user.name}
            src={PhotosApi.getProfilePicUrl(context.user)}
            sx={getImgClass(isLargeDisplay)}
          />
        </Grid2>
        <Grid2>
          <Typography variant="subtitle1" gutterBottom>
            <strong>{context.user.name}</strong>
          </Typography>
          <Typography variant="body2" gutterBottom>
            {context.user.bio}
          </Typography>
        </Grid2>
        {context.isUser && (
          <Grid2>
            <Button
              sx={{ textTransform: "none", borderRadius: 1 }}
              variant="outlined"
              size="small"
              color="inherit"
              component={RouterLink}
              to={"/user"}
            >
              Admin
            </Button>
          </Grid2>
        )}
      </Grid2>
      <Divider />
    </Box>
  );
}
