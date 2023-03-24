import { Photo, PhotoType } from "../../api/types";
import { NormalImg, SmallImg } from "../../layouts/Images";
import PhotosApi from "../../api/photoapi";
import { useTheme } from "@mui/material";

type DeckImageProps = {
  largeDisplay: boolean;
  borderStyle: string;
  photo: Photo;

  portrait: boolean;
};

export function DeckImage({
  largeDisplay,
  borderStyle,
  photo,
  portrait,
}: DeckImageProps) {
  const theme = useTheme();

  if (!largeDisplay) {
    return (
      <SmallImg
        alt={photo.title}
        src={PhotosApi.getImageUrl(
          photo,
          PhotoType.Dynamic,
          portrait,
          largeDisplay
        )}
      />
    );
  }
  if (borderStyle === "none") {
    return (
      <NormalImg
        alt={photo.title}
        src={PhotosApi.getImageUrl(
          photo,
          PhotoType.Dynamic,
          portrait,
          largeDisplay
        )}
      />
    );
  } else if (borderStyle === "left-right") {
    return (
      <NormalImg
        sx={{ px: theme.spacing(7) }}
        alt={photo.title}
        src={PhotosApi.getImageUrl(
          photo,
          PhotoType.Dynamic,
          portrait,
          largeDisplay
        )}
      />
    );
  } else {
    return (
      <NormalImg
        sx={{ px: theme.spacing(7), py: theme.spacing(4) }}
        alt={photo.title}
        src={PhotosApi.getImageUrl(
          photo,
          PhotoType.Dynamic,
          portrait,
          largeDisplay
        )}
      />
    );
  }
}
