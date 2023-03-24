import { Photo, PhotoList, PhotoType } from "../api/types";
import { ReactNode, useEffect, useState } from "react";
import { IconButton, ImageList, ImageListItem, styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PhotosApi from "../api/photoapi";

const Thumb = styled("img")({
  width: "100%",
  height: "100%",
});

const ThumbPrivate = styled("img")({
  width: "100%",
  height: "100%",
  opacity: 0.5,
});

type MpPhotoGridProps = {
  columns: number;
  linkTo: string;
  masonry?: boolean;
  spacing: number;
  items: Photo[];
  itemListBar?: (p: Photo) => ReactNode;
};

function thumbUrl(p: Photo) {
  return PhotosApi.getImageUrl(p, PhotoType.Thumb, false, false);
}

export function MPPhotoGrid(props: MpPhotoGridProps) {
  return (
    <ImageList
      cols={props.columns}
      rowHeight={"auto"}
      gap={props.spacing}
      sx={{ overflow: "hidden" }}
    >
      {props.items.map((photo) => (
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
          {props.itemListBar && props.itemListBar(photo)}
        </ImageListItem>
      ))}
    </ImageList>
  );
}
