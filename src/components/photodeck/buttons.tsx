import { ReactNode } from "react";
import { colorScheme } from "../../api/apiutil";
import { alpha, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { ColorScheme } from "../../api/types";
import {
  ArrowBackIosSharp,
  ArrowForwardIosSharp,
  Close,
  Fullscreen,
  FullscreenExit,
} from "@mui/icons-material";

function baseButtonStyle(cs: ColorScheme, hasBorders: boolean) {
  return {
    color: cs.color,
    position: "absolute",
    backgroundColor: alpha(
      cs.backgroundColor,
      hasBorders ? 0.0 : 0.5
    ).toString(),
    marginRight: 1,
    "&:hover": {
      backgroundColor: alpha(cs.backgroundColor, 0.9).toString(),
    },
  };
}

function fontSize(largeDisplay: boolean) {
  return largeDisplay ? "large" : "small";
}

type EditIconButtonProps = {
  cs: ColorScheme;
  hasBorders: boolean;
  tooltip: string;
  onClick: () => void;
  children: ReactNode;
};

export function EditIconButton({
  cs,
  hasBorders,
  tooltip,
  onClick,
  children,
}: EditIconButtonProps) {
  return (
    <Tooltip title={tooltip}>
      <IconButton
        aria-label={tooltip}
        onClick={onClick}
        sx={{
          color: cs.color,
          backgroundColor: alpha(
            cs.backgroundColor,
            hasBorders ? 0.0 : 0.5
          ).toString(),
          marginRight: 1,
          "&:hover": {
            backgroundColor: alpha(cs.backgroundColor, 0.9).toString(),
          },
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

type ButtonGroupProps = {
  vertical?: boolean;
  cs: ColorScheme;
  hasBorders: boolean;
  children: ReactNode;
};

export function ButtonGroup({
  vertical,
  cs,
  hasBorders,
  children,
}: ButtonGroupProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...baseButtonStyle(cs, hasBorders),
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        top: theme.spacing(0),
        left: theme.spacing(0),
      }}
    >
      {children}
    </Box>
  );
}

type NavButtonProps = {
  navtype: "prev" | "next" | "enter" | "exit" | "close";
  cs: ColorScheme;
  hasBorders: boolean;
  largeDisplay: boolean;
  onClick: () => void;
};

export function NavButton({
  navtype,
  onClick,
  cs,
  hasBorders,
  largeDisplay,
}: NavButtonProps) {
  const fs = largeDisplay ? "large" : "small";
  const theme = useTheme();
  switch (navtype) {
    case "prev":
      return (
        <IconButton
          aria-label="previous"
          onClick={onClick}
          sx={{
            ...baseButtonStyle(cs, hasBorders),
            top: "50%",
            transform: "translateY(-50%)",
            left: theme.spacing(0),
          }}
        >
          <ArrowBackIosSharp fontSize={fs} />
        </IconButton>
      );
    case "next":
      return (
        <IconButton
          aria-label="next"
          onClick={onClick}
          sx={{
            ...baseButtonStyle(cs, hasBorders),
            top: "50%",
            transform: "translateY(-50%)",
            right: theme.spacing(-1),
          }}
          edge={"end"}
        >
          <ArrowForwardIosSharp fontSize={fs} />
        </IconButton>
      );
    case "exit":
      return (
        <IconButton
          aria-label="exit fullscreen"
          color="primary"
          onClick={onClick}
          sx={{
            ...baseButtonStyle(cs, hasBorders),
            top: theme.spacing(0),
            right: theme.spacing(-1),
          }}
        >
          <FullscreenExit fontSize={fs} />
        </IconButton>
      );
    case "enter":
      return (
        <IconButton
          aria-label="enter fullscreen"
          color="primary"
          onClick={onClick}
          sx={{
            ...baseButtonStyle(cs, hasBorders),
            top: theme.spacing(0),
            right: theme.spacing(-1),
          }}
        >
          <Fullscreen fontSize={fs} />
        </IconButton>
      );
    case "close":
      return (
        <IconButton
          aria-label="Close"
          color="primary"
          onClick={onClick}
          sx={{
            ...baseButtonStyle(cs, hasBorders),
            top: theme.spacing(0),
            right: theme.spacing(-1),
          }}
        >
          <Close fontSize={fs} />
        </IconButton>
      );
  }
}

type PrevNextButtonsProps = {
  cs: ColorScheme;
  hasBorders: boolean;
  largeDisplay: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function PrevNextButtons(props: PrevNextButtonsProps) {
  return (
    <>
      <NavButton
        navtype="prev"
        cs={props.cs}
        hasBorders={props.hasBorders}
        largeDisplay={props.largeDisplay}
        onClick={props.onPrev}
      />
      <NavButton
        navtype="next"
        cs={props.cs}
        hasBorders={props.hasBorders}
        largeDisplay={props.largeDisplay}
        onClick={props.onNext}
      />
    </>
  );
}
