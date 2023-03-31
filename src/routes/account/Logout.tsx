import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { MPContext } from "../../MPContext";
import { usePhotoService } from "../../service/mphotoservice";

export function Logout() {
  const ps = usePhotoService();
  const context = useContext(MPContext);

  const handleLogout = async () => {
    ps.logout()
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
