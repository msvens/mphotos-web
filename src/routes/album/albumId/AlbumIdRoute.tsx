import {StandardLayout} from "../../../layouts/StandardLayout";
import {MPPhotoGrid} from "../../../components/MPPhotoGrid";
import {ReactNode, useContext, useEffect, useState} from "react";
import {MPContext} from "../../../MPContext";
import {Link as RouterLink, useParams} from "react-router-dom";
import {Box, Button, IconButton, ImageListItemBar, Typography} from "@mui/material";
import {Album, Photo, PhotoList, PhotoType} from "../../../service/types";
import {
  Camera,
  CameraOutlined,
  SkipNext,
  SkipPrevious,
} from "@mui/icons-material";
import {usePhotoService} from "../../../service/mphotoservice";

type AlbumParams = {
  albumId: any;
};

export function AlbumIdRoute() {
  const ps = usePhotoService();
  const [orderUpdated, setOrderUpdated] = useState<boolean>(false)
  const [album, setAlbum] = useState<Album>();
  const [photos, setPhotos] = useState<PhotoList>({length: 0, photos: []});
  const {albumId} = useParams<AlbumParams>();
  const context = useContext(MPContext);

  useEffect(() => {
    ps.getAlbum(albumId)
      .then((res) => {
        setAlbum(res.info);
        setPhotos(res.photos);
      })
      .catch((e) => console.log(e));
  }, [albumId, ps]);

  function movePhoto(idx: number, up: boolean) {
    if(photos.length < 2) {
      return
    }
    let newPhotos: Photo[] = [...photos.photos]
    if(up && idx == 0) { //in this case we shift all element to the left
      const first = newPhotos.shift()!
      newPhotos.push(first)
    } else if (idx == photos.length - 1 && !up) { //
      const last = newPhotos.pop()!;
      newPhotos.unshift(last)
    } else { //swap with your neighbor
      const swapIdx = up ? idx - 1 : idx + 1;
      const temp = newPhotos[swapIdx]
      newPhotos[swapIdx] = newPhotos[idx]
      newPhotos[idx] = temp
    }
    setPhotos(prev => {
      return {photos: newPhotos, length: prev.length}
    })
    setOrderUpdated(true)
    //handle special cases first
  }

  function onUpdateOrdering() {
    const update = async () => {
      if (album) {
        try {
          const _ = await ps.updateAlbumOrder(album, photos)
          const res = await ps.getAlbum(albumId)
          setPhotos(res.photos)
          setOrderUpdated(false)
        } catch (e) {
          alert(e)
        }
      }
    }
    update()
  }

  function onUp(p: Photo, idx: number) {
    movePhoto(idx, true)
  }

  function onDown(p: Photo, idx: number) {
    movePhoto(idx, false)
  }

  function onCover(p: Photo) {
    const update = async () => {
      if (album) {
        const imgUrl = ps.getImageUrl(p, PhotoType.Landscape, false, false);
        try {
          const res = await ps.updateAlbum({
            ...album,
            coverPic: imgUrl,
          });
          setAlbum(res);
        } catch (e) {
          console.log(e);
        }
      }
    };
    void update();
  }

  function getItemBar(p: Photo, index: number): ReactNode {
    if (!context.isUser) {
      return null;
    }
    return (
      <ImageListItemBar
        actionIcon={
          <>
            <IconButton
              sx={{color: "rgba(255, 255, 255, 0.90)"}}
              aria-label={"Move Up"}
              onClick={() => onUp(p, index)}
            >
              <SkipPrevious/>
            </IconButton>
            <IconButton
              sx={{color: "rgba(255, 255, 255, 0.90)"}}
              aria-label={"Move Down"}
              onClick={() => onDown(p, index)}
            >
              <SkipNext/>
            </IconButton>
            <IconButton
              sx={{color: "rgba(255, 255, 255, 0.90)"}}
              aria-label={"Album Cover"}
              onClick={() => onCover(p)}
            >
              {ps.getImageUrl(p, PhotoType.Landscape, false, false) ===
              album?.coverPic ? (
                <Camera/>
              ) : (
                <CameraOutlined/>
              )}
            </IconButton>
          </>
        }
      />
    );
  }

  return (
    <StandardLayout sx={{justifyContent: "flex-start"}}>
      <Box paddingBottom={2}>
        <Typography variant="h6" gutterBottom>
          {album && album.name}
        </Typography>
        {photos.length < 1 && (
          <Typography variant="body2" gutterBottom>
            Add photos to this album
          </Typography>
        )}
        {photos.length > 1 && context.isUser && (
          <Button disabled={!orderUpdated}
                  sx={{textTransform: "none", borderRadius: 1}}
                  variant="outlined"
                  size="small"
                  color="inherit" onClick={onUpdateOrdering}
          >
            Save Ordering
          </Button>
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
