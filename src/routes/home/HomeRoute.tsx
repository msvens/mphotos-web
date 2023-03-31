import { Box, IconButton, ImageListItemBar, useTheme } from "@mui/material";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { MPContext } from "../../MPContext";
import { Bio } from "./Bio";
import { Photo, PhotoList } from "../../service/types";
import { MPPhotoGrid } from "../../components/MPPhotoGrid";
import { LockOpen, Lock } from "@mui/icons-material";
import { usePhotoService } from "../../service/mphotoservice";

export function HomeRoute() {
  const ps = usePhotoService();
  const [photos, setPhotos] = useState<PhotoList>({ length: 0, photos: [] });
  const theme = useTheme();
  const context = useContext(MPContext);

  useEffect(() => {
    ps.getPhotos(context.uxConfig.photoSortOrder).then((res) => {
      setPhotos(res);
    });
  }, [context.uxConfig.photoSortOrder, ps]);

  function onToggleVisiblity(p: Photo) {
    ps.togglePrivate(p.id).then((res) => {
      const newPhotos = photos.photos.map((photo) => {
        if (photo.id === res.id) {
          return res;
        } else return photo;
      });
      const newPL: PhotoList = { photos: newPhotos, length: newPhotos.length };
      setPhotos(newPL);
    });
  }

  function getItemBar(p: Photo): ReactNode {
    if (!context.isUser) {
      return null;
    }
    return (
      <ImageListItemBar
        actionIcon={
          <>
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.70)" }}
              aria-label={"Toggle Private/Public"}
              onClick={() => onToggleVisiblity(p)}
            >
              {p.private ? <Lock /> : <LockOpen />}
            </IconButton>
          </>
        }
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        paddingLeft: 0,
        maxWidth: 1024,
        margin: "auto",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
      }}
    >
      {context.uxConfig.showBio && <Bio />}

      {photos.length > 0 && (
        <MPPhotoGrid
          columns={context.uxConfig.photoGridCols}
          linkTo={"/photo/"}
          spacing={context.uxConfig.photoGridSpacing}
          items={photos.photos}
          itemListBar={getItemBar}
        />
      )}
      {/*<PhotoGrid
        fetchItems={context.uxConfig.photoItemsLoad}
        columns={context.uxConfig.photoGridCols}
        spacing={context.uxConfig.photoGridSpacing}
        order="drive"
      />*/}
    </Box>
  );
}
