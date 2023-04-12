import { Photo, PhotoType } from "../service/types";
import { ReactNode } from "react";
import { ImageList, ImageListItem, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { usePhotoService } from "../service/mphotoservice";

const Thumb = styled("img")({
  width: "100%",
  height: "100%",
});

const ThumbPrivate = styled("img")({
  width: "100%",
  height: "100%",
  opacity: 0.5,
});

type MPPhotoGridProps = {
  columns: number;
  linkTo: string;
  masonry?: boolean;
  spacing: number;
  items: Photo[];
  itemListBar?: (p: Photo, idx: number) => ReactNode;
};

export function MPPhotoGrid(props: MPPhotoGridProps) {
  const ps = usePhotoService();

  function thumbUrl(p: Photo) {
    return ps.getImageUrl(p, PhotoType.Thumb, false, false);
  }

  return (
    <ImageList
      cols={props.columns}
      rowHeight={"auto"}
      gap={props.spacing}
      sx={{ overflow: "hidden" }}
    >
      {props.items.map((photo, index) => (
        <ImageListItem
          sx={{ width: "100%", height: "100%" }}
          cols={1}
          key={photo.id}
        >
          <RouterLink to={`${props.linkTo}${photo.id}`}>
            {photo.private ? (
              <ThumbPrivate
                alt={photo.fileName}
                src={thumbUrl(photo)}
                loading="lazy"
              />
            ) : (
              <Thumb
                alt={photo.fileName}
                src={thumbUrl(photo)}
                loading="lazy"
              />
            )}
          </RouterLink>
          {props.itemListBar && props.itemListBar(photo, index)}
        </ImageListItem>
      ))}
    </ImageList>
  );
}
