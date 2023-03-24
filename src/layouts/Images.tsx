import { styled } from "@mui/material";

export const SmallImg = styled("img")({
  maxWidth: "100%",
  maxHeight: "100%",
  alignSelf: "flex-start",
});

export const NormalImg = styled("img")({
  objectFit: "contain",
  maxWidth: "100%",
  maxHeight: "100%",
  width: "auto",
  height: "auto",
});
