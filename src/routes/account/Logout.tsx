import { Box, Button, Typography } from "@mui/material";
import PhotosApi from "../../api/photoapi";
import { useContext } from "react";
import { MPContext } from "../../MPContext";

export function Logout() {
  const context = useContext(MPContext);

  const handleLogout = async (e: React.MouseEvent) => {
    PhotosApi.logout()
      .then((_res) => {
        context.checkUser();
      })
      .catch((e) => alert("check user: " + e));
  };

  if (context.isUser) {
    return (
      <Box>
        <Typography paragraph>
          Log out {context.user.name}. By Logging out you will no longer be able
          to upload pictures, etc.
        </Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Logout Now
        </Button>
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography paragraph>
          User not logged in. By Logging out you will no longer be able to
          upload pictures, etc.
        </Typography>
        <Button variant="outlined" disabled onClick={handleLogout}>
          Logout Now
        </Button>
      </Box>
    );
  }
}
