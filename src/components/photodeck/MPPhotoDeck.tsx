import { Photo, PhotoType } from "../../service/types";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MPContext } from "../../MPContext";
import { colorScheme } from "../../service/apiutil";
import { Photoslice } from "../../service/photoslice";
import { SearchFilter } from "./SearchFilter";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { PhotoDeckControls } from "./PhotoDeckControls";
import { DeckImage } from "./DeckImage";
import { FullscreenView } from "./FullscreenView";
import { EditImage } from "./EditImage";
import { EditMetaData } from "./EditMetaData";
import { MPDialog } from "../MPDialog";
import { Detail } from "./Detail";
import { usePhotoService } from "../../service/mphotoservice";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";

const LargeImgGridSx = {
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  height: "80vh",
  maxheight: "85vh",
} as const;

const SmallImgGridSx = {
  position: "relative",
  margin: "auto",
  display: "flex",
} as const;

const detailGridSx = {
  paddingTop: 1,
  margin: "auto",
  maxWidth: 1024,
} as const;

const detailGridBordersSx = {
  ...detailGridSx,
  paddingLeft: 1,
  paddingRight: 1,
};

type TouchState = {
  xStart: number;
  xPos: number;
  yStart: number;
  yPos: number;
};

type MPPhotoDeckProps = {
  isAlbum?: boolean;
  photos: Photo[];
  startPhotoId?: string;
  urlPrefix: string;
  searchQuery?: string;
  editControls?: boolean;
  onClearSearchQuery?: (photoId: string) => void;
  onUpdatePhoto?: (p: Photo) => void;
  onDeletePhoto?: (p: Photo) => void;
};

export function MPPhotoDeck(props: MPPhotoDeckProps) {
  const ps = usePhotoService();
  const navigate = useNavigate();
  const context = useContext(MPContext);

  const [photos, setPhotos] = useState<Photoslice>(
    new Photoslice(props.photos)
  );
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCrop, setShowCrop] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const portrait = useMediaQuery("(orientation: portrait)");
  const largeDisplay = useIsLargeScreen();

  const touch: TouchState = { xStart: -1, xPos: -1, yStart: -1, yPos: -1 };
  const cs = colorScheme(context.uxConfig.photoBackgroundColor);

  useEffect(() => {
    if (props.startPhotoId && props.photos.length > 0) {
      let newIdx = 0;
      for (let i = 0; i < props.photos.length; i++) {
        if (props.photos[i].id === props.startPhotoId) {
          newIdx = i;
        }
      }
      setPhotos(new Photoslice(props.photos, newIdx));
    } else if (props.photos.length > 0) {
      setPhotos(new Photoslice(props.photos, 0));
    } else {
      setPhotos(new Photoslice());
    }
  }, [props.startPhotoId, props.photos]);

  const navigateUrl = (pd: Photoslice) => {
    if (props.searchQuery && props.searchQuery !== "") {
      return props.urlPrefix + pd.id() + props.searchQuery;
    } else {
      return props.urlPrefix + pd.id();
    }
  };

  const hasBorders = () => {
    return largeDisplay && context.uxConfig.photoBorders !== "none";
  };

  const handleCloseUpdate = (p?: Photo) => {
    if (p) {
      if (props.onUpdatePhoto) {
        props.onUpdatePhoto(p);
      }
      setPhotos(photos.update(p));
    }
    setShowUpdate(false);
  };

  const handleBackward = () => {
    const n = photos.previous();
    navigate(navigateUrl(n));
    setPhotos(n);
  };

  const handleForward = () => {
    const n = photos.next();
    navigate(navigateUrl(n));
    setPhotos(n);
  };

  const handlePrivate = () => {
    ps.togglePrivate(photos.id())
      .then((p) => {
        setPhotos(photos.update(p));
      })
      .catch((e) => alert(e.toString()));
  };

  const handleProfilePic = () => {
    ps.updateUserPic(
      ps.getImageUrl(photos.get(), PhotoType.Thumb, false, false)
    )
      .then((_u) => {
        context.checkUser();
      })
      .catch((e) => console.log(e.toString()));
  };

  const deletePhoto = () => {
    ps.deletePhoto(photos.id(), true)
      .then((_p) => {
        if (props.onDeletePhoto) {
          props.onDeletePhoto(photos.get());
        }
        setPhotos(photos.delete());
      })
      .catch((e) => alert(e.toString()));
  };

  const onStartTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (showFullscreen || (event.touches && event.touches.length > 1)) return;

    touch.xStart = event.touches[0].clientX;
    touch.yStart = event.touches[0].clientY;
    touch.xPos = touch.xStart;
    touch.yPos = touch.yStart;
  };

  const onMoveTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (showFullscreen || (event.touches && event.touches.length > 1)) return;
    touch.xPos = event.touches[0].clientX;
    touch.yPos = event.touches[0].clientY;
  };

  const onEndTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (showFullscreen || (event.touches && event.touches.length > 1)) return;

    const deltaX = touch.xStart - touch.xPos;
    const deltaY = touch.yStart - touch.yPos;
    touch.xStart = touch.yStart = touch.xPos = touch.yPos = -1;

    if (Math.abs(deltaX) > 30 && Math.abs(deltaY) < 40)
      deltaX < 0 ? handleBackward() : handleForward();
  };

  if (photos.isEmpty()) {
    return (
      <Box paddingBottom={2}>
        <Typography variant="h6" gutterBottom>
          No photos in this collection
        </Typography>
      </Box>
    );
  }

  return (
    <Grid2
      container
      sx={{
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      {props.searchQuery && (
        <Grid2 xs={12}>
          <SearchFilter
            cs={cs}
            photoId={photos.id()}
            filter={props.searchQuery}
            onClear={props.onClearSearchQuery}
          />
        </Grid2>
      )}
      <Grid2
        xs={12}
        style={{ backgroundColor: context.uxConfig.photoBackgroundColor }}
        sx={largeDisplay ? LargeImgGridSx : SmallImgGridSx}
        onTouchEnd={onEndTouch}
        onTouchStart={onStartTouch}
        onTouchMove={onMoveTouch}
      >
        <PhotoDeckControls
          photoBackground={context.uxConfig.photoBackgroundColor}
          onBackward={handleBackward}
          onForward={handleForward}
          onFullScreen={() => setShowFullscreen(true)}
          onPrivate={handlePrivate}
          onDelete={() => setShowDelete(true)}
          onEdit={() => setShowUpdate(true)}
          onCrop={() => setShowCrop(true)}
          onProfilePic={handleProfilePic}
          showEditControls={props.editControls}
          isAlbum={props.isAlbum}
          isPrivate={photos.get().private}
          isLargeDisplay={largeDisplay}
          inFullscreen={false}
          hasBorders={hasBorders()}
          verticalEditButtons={hasBorders()}
        />
        <DeckImage
          largeDisplay={largeDisplay}
          borderStyle={context.uxConfig.photoBorders}
          photo={photos.get()}
          portrait={portrait}
        />
      </Grid2>
      <Grid2 xs={12} sx={hasBorders() ? detailGridBordersSx : detailGridSx}>
        <Detail photo={photos.get()} />
      </Grid2>

      {/*Dialogs*/}
      <FullscreenView
        photo={photos.get()}
        openDialog={showFullscreen}
        onClose={() => setShowFullscreen(false)}
        onNext={handleForward}
        onPrev={handleBackward}
        photoBackground={context.uxConfig.photoBackgroundColor}
        largeDisplay={largeDisplay}
      />
      <EditImage
        photo={photos.get()}
        openDialog={showCrop}
        onClose={() => setShowCrop(false)}
        onNext={handleForward}
        onPrev={handleBackward}
        photoBackground={context.uxConfig.photoBackgroundColor}
        largeDisplay={largeDisplay}
      />
      <EditMetaData
        open={showUpdate}
        photo={photos.get()}
        onClose={handleCloseUpdate}
      />
      <MPDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onOk={deletePhoto}
        title={"Delete Photo?"}
        text="By removing the photo all associated image data will be deleted"
      />
    </Grid2>
  );
}
