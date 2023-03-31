import { Photo, PhotoType } from "../../service/types";
import { Box, Dialog } from "@mui/material";
import { PhotoDeckControls } from "./PhotoDeckControls";
import { NormalImg } from "../../layouts/Images";
import { usePhotoService } from "../../service/mphotoservice";

type FullscreenViewProps = {
  photo: Photo;
  openDialog: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  photoBackground: string;
  largeDisplay: boolean;
};

interface TouchState {
  xStart: number;
  xPos: number;
  yStart: number;
  yPos: number;
}

export function FullscreenView(props: FullscreenViewProps) {
  const ps = usePhotoService();

  const touch: TouchState = { xStart: -1, xPos: -1, yStart: -1, yPos: -1 };

  const onStartTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!props.openDialog || (event.touches && event.touches.length > 1))
      return;

    touch.xStart = event.touches[0].clientX;
    touch.yStart = event.touches[0].clientY;
    touch.xPos = touch.xStart;
    touch.yPos = touch.yStart;
  };

  const onMoveTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!props.openDialog || (event.touches && event.touches.length > 1))
      return;
    touch.xPos = event.touches[0].clientX;
    touch.yPos = event.touches[0].clientY;
  };

  const onEndTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!props.openDialog || (event.touches && event.touches.length > 1))
      return;

    const deltaX = touch.xStart - touch.xPos;
    const deltaY = touch.yStart - touch.yPos;
    touch.xStart = touch.yStart = touch.xPos = touch.yPos = -1;

    if (Math.abs(deltaX) > 30 && Math.abs(deltaY) < 40)
      deltaX < 0 ? props.onPrev() : props.onNext();
  };

  return (
    <Dialog
      PaperProps={{ style: { backgroundColor: props.photoBackground } }}
      fullScreen
      open={props.openDialog}
      onClose={props.onClose}
      onTouchStart={onStartTouch}
      onTouchMove={onMoveTouch}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: props.photoBackground,
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "100%",
          height: "100%",
        }}
        onTouchEnd={onEndTouch}
      >
        <NormalImg
          alt={props.photo.title}
          src={ps.getImageUrl(props.photo, PhotoType.Original, false, false)}
        />
        <PhotoDeckControls
          photoBackground={props.photoBackground}
          onBackward={props.onPrev}
          onForward={props.onNext}
          onFullScreen={props.onClose}
          showEditControls={false}
          isLargeDisplay={props.largeDisplay}
          inFullscreen={true}
          hasBorders={false}
        />
      </Box>
    </Dialog>
  );
}
