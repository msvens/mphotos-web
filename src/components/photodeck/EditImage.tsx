import "react-image-crop/dist/ReactCrop.css";
import { EditPhotoParams, Photo, PhotoType } from "../../api/types";
import { Box, Dialog, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PhotosApi from "../../api/photoapi";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import { useRotateImage } from "../../hooks/useRotateImage";
import { CropControls, EditAction } from "./CropControls";

const landscape = 1200 / 628;
const square = 1;
const portrait = 1080 / 1350;

const StyledImg = styled("img")({
  objectFit: "contain",
  maxWidth: "100%",
  maxHeight: "96vh",
  width: "auto",
  height: "96vh",
});

function getAspect(p: Photo): number {
  return p.width / p.height;
}

function centerAndAspectCrop(
  aspect: number,
  width: number,
  height: number
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      width,
      height
    ),
    width,
    height
  );
}

type EditImageProps = {
  photo: Photo;
  openDialog: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  photoBackground: string;
  largeDisplay: boolean;
};

export function EditImage(props: EditImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [aspect, setAspect] = useState<number | undefined>(
    getAspect(props.photo)
  );
  const [rotate, setRotate] = useState<number>(0);
  const [preview, setPreview] = useState<boolean>(false);
  const { src: imgSrc } =
    useRotateImage(
      PhotosApi.getImageUrl(props.photo, PhotoType.Original, false, false),
      rotate
    ) ?? {};
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  useEffect(() => {
    setAspect(getAspect(props.photo));
    setRotate(0);
  }, [props.photo]);

  useEffect(() => {
    if (imgRef.current && aspect)
      setCrop(
        centerAndAspectCrop(aspect, imgRef.current.width, imgRef.current.height)
      );
  }, [aspect]);

  function getPhotoParams(): EditPhotoParams {
    const ret: EditPhotoParams = {};
    if (crop && imgRef.current) {
      ret.x = Math.floor((crop.x / 100) * imgRef.current.naturalWidth);
      ret.y = Math.floor((crop.y / 100) * imgRef.current.naturalHeight);
      ret.width = Math.floor((crop.width / 100) * imgRef.current.naturalWidth);
      ret.height = Math.floor(
        (crop.height / 100) * imgRef.current.naturalHeight
      );
    }
    ret.rotation = rotate;
    return ret;
  }

  const onCropChange = (crop: PixelCrop, percentCrop: Crop) =>
    setCrop(percentCrop);
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAndAspectCrop(getAspect(props.photo), width, height));
    //alert("load: "+width+" "+height)
    //setDim({width: width, height: height})
    //imgWidth = width
    //imgHeight = height
  };

  const handleEditAction = (a: EditAction) => {
    switch (a) {
      case EditAction.CropPortrait:
        setAspect(portrait);
        break;
      case EditAction.CropLandscape:
        setAspect(landscape);
        break;
      case EditAction.CropSquare:
        /*if (dim)
            setCrop(centerAndAspectCrop(square, dim.width, dim.height))*/
        setAspect(square);
        break;
      case EditAction.CropFree:
        setAspect(undefined);
        break;
      case EditAction.RotateRight:
        setRotate((r) => {
          return (r + 90) % 360;
        });
        break;
      case EditAction.RotateRight5:
        setRotate((r) => {
          return (r + 5) % 360;
        });
        break;
      case EditAction.Restore:
        setRotate(0);
        setAspect(getAspect(props.photo));
        break;
      case EditAction.Save:
        setPreview((prev) => !prev);
        break;
      default:
        alert(EditAction[a] + " not implemented");
    }
  };

  return (
    <Dialog
      PaperProps={{ style: { backgroundColor: props.photoBackground } }}
      fullScreen
      open={props.openDialog}
      onClose={props.onClose}
    >
      <Box
        style={{ backgroundColor: props.photoBackground }}
        sx={{
          display: "flex",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {preview ? (
          <StyledImg
            src={PhotosApi.getEditPreviewURL(props.photo, getPhotoParams())}
          />
        ) : (
          <ReactCrop
            crop={crop}
            onChange={onCropChange}
            aspect={aspect}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <StyledImg ref={imgRef} src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
        )}
        <CropControls
          photoBackground={props.photoBackground}
          verticalEditButtons
          onBackward={props.onPrev}
          onForward={props.onNext}
          onClose={props.onClose}
          isLargeDisplay={props.largeDisplay}
          onEdit={handleEditAction}
          hasBorders={false}
        />
      </Box>
    </Dialog>
  );
}
