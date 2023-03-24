import { StandardLayout } from "../../../layouts/StandardLayout";
import { MPPhotoGrid } from "../../../components/MPPhotoGrid";
import { ReactNode, useContext, useEffect, useState } from "react";
import { MPContext } from "../../../MPContext";
import PhotosApi from "../../../api/photoapi";
import { useParams } from "react-router-dom";
import { Box, IconButton, ImageListItemBar, Typography } from "@mui/material";
import { Album, Photo, PhotoList, PhotoType } from "../../../api/types";
import {
  AlbumOutlined,
  Camera,
  CameraOutlined,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";

type AlbumParams = {
  albumId: any;
};

export function AlbumIdRoute() {
  const [album, setAlbum] = useState<Album>();
  const [photos, setPhotos] = useState<PhotoList>({ length: 0, photos: [] });
  const [fetch, setFetch] = useState(false);
  const { albumId } = useParams<AlbumParams>();
  const context = useContext(MPContext);

  useEffect(() => {
    PhotosApi.getAlbum(albumId)
      .then((res) => {
        setAlbum(res.info);
        setPhotos(res.photos);
      })
      .catch((e) => console.log(e));
  }, [albumId]);

  function onUp(p: Photo) {
    alert("up " + p.id);
  }

  function onDown(p: Photo) {
    alert("down " + p.id);
  }

  function onCover(p: Photo) {
    const update = async () => {
      if (album) {
        const imgUrl = PhotosApi.getImageUrl(p, PhotoType.Thumb, false, false);
        alert(imgUrl);
        try {
          const res = await PhotosApi.updateAlbum({
            ...album,
            coverPic: imgUrl,
          });
          setAlbum(res);
        } catch (e) {
          console.log(e);
        }
      }
    };
    update();
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
              aria-label={"Move Up"}
              onClick={() => onUp(p)}
            >
              <SkipPrevious />
            </IconButton>
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.70)" }}
              aria-label={"Move Down"}
              onClick={() => onDown(p)}
            >
              <SkipNext />
            </IconButton>
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.70)" }}
              aria-label={"Album Cover"}
              onClick={() => onCover(p)}
            >
              {PhotosApi.getImageUrl(p, PhotoType.Thumb, false, false) ===
              album?.coverPic ? (
                <Camera />
              ) : (
                <CameraOutlined />
              )}
            </IconButton>
          </>
        }
      />
    );
  }

  return (
    <StandardLayout sx={{ justifyContent: "flex-start" }}>
      <Box paddingBottom={2}>
        <Typography variant="h6" gutterBottom>
          {album && album.name}
        </Typography>
        {photos.length < 1 && (
          <Typography variant="body2" gutterBottom>
            Add photos to this album
          </Typography>
        )}
      </Box>
      {photos.length > 0 && (
        <MPPhotoGrid
          linkTo={"/album/" + albumId + "/"}
          columns={context.uxConfig.photoGridCols}
          spacing={context.uxConfig.photoGridSpacing}
          items={photos.photos}
          itemListBar={getItemBar}
        />
      )}
    </StandardLayout>
  );
}
