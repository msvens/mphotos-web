import { StandardLayout } from "../../layouts/StandardLayout";
import { Box, styled, Typography } from "@mui/material";
import { AlbumGrid } from "./AlbumGrid";

export function AlbumRoute() {
  return (
    <StandardLayout sx={{ justifyContent: "flex-start" }}>
      <Box paddingBottom={4}>
        <Typography variant="h6" gutterBottom>
          Photo Albums
        </Typography>
      </Box>
      <AlbumGrid />
    </StandardLayout>
  );
}
