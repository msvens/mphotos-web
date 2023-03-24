import React from "react";

import { ReactComponent as MPLogoWhite } from "./mp_logo_white.svg";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { SvgIcon } from "@mui/material";

type MPIconColor = "black" | "white";

export type MPIconProps = SvgIconProps & {
  mpcolor: MPIconColor;
};

export function MPIcon(props: MPIconProps) {
  return (
    <SvgIcon
      component={MPLogoWhite}
      viewBox="0 0 1085.68 1085.68"
      {...props}
    ></SvgIcon>
  );
}
