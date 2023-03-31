import { colorScheme } from "../../service/apiutil";
import {
  Face,
  Lock,
  PhotoAlbum,
  LockOpen,
  Edit,
  CropRotate,
  DeleteForever,
} from "@mui/icons-material";
import {
  ButtonGroup,
  EditIconButton,
  NavButton,
  PrevNextButtons,
} from "./buttons";

type PhotoDeckControlsProps = {
  photoBackground: string;
  isLargeDisplay: boolean;
  showEditControls?: boolean;
  inFullscreen: boolean;
  hasBorders: boolean;
  onBackward: () => void;
  onForward: () => void;
  onFullScreen: () => void;
  isPrivate?: boolean;
  verticalEditButtons?: boolean;
  onPrivate?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onCrop?: () => void;
  onProfilePic?: () => void;
  isAlbum?: boolean;
};

export function PhotoDeckControls(props: PhotoDeckControlsProps) {
  const cs = colorScheme(props.photoBackground);
  const b = props.hasBorders;
  const iconSize = props.isLargeDisplay ? "large" : "small";

  const wrap = (f?: () => void): (() => void) => {
    if (f) return f;
    else
      return () => {
        alert("undefiend action");
      };
  };

  if (!props.showEditControls) {
    return (
      <>
        <PrevNextButtons
          cs={cs}
          hasBorders={props.hasBorders}
          largeDisplay={props.isLargeDisplay}
          onPrev={props.onBackward}
          onNext={props.onForward}
        />
        <NavButton
          navtype={props.inFullscreen ? "exit" : "enter"}
          cs={cs}
          hasBorders={props.hasBorders}
          largeDisplay={props.isLargeDisplay}
          onClick={props.onFullScreen}
        />
      </>
    );
  }
  return (
    <>
      <NavButton
        navtype="prev"
        cs={cs}
        hasBorders={props.hasBorders}
        largeDisplay={props.isLargeDisplay}
        onClick={props.onBackward}
      />
      <NavButton
        navtype="next"
        cs={cs}
        hasBorders={props.hasBorders}
        largeDisplay={props.isLargeDisplay}
        onClick={props.onForward}
      />
      <NavButton
        navtype={props.inFullscreen ? "exit" : "enter"}
        cs={cs}
        hasBorders={props.hasBorders}
        largeDisplay={props.isLargeDisplay}
        onClick={props.onFullScreen}
      />

      <ButtonGroup
        vertical={props.verticalEditButtons}
        cs={cs}
        hasBorders={props.hasBorders}
      >
        {props.isAlbum ? (
          <EditIconButton
            hasBorders={b}
            cs={cs}
            tooltip="Set Album Cover"
            onClick={wrap(props.onProfilePic)}
          >
            <PhotoAlbum fontSize={iconSize} />
          </EditIconButton>
        ) : (
          <EditIconButton
            hasBorders={b}
            cs={cs}
            tooltip="Set Profile Picture"
            onClick={wrap(props.onProfilePic)}
          >
            <Face fontSize={iconSize} />
          </EditIconButton>
        )}
        {props.isPrivate ? (
          <EditIconButton
            hasBorders={b}
            cs={cs}
            tooltip="Set Public Photo"
            onClick={wrap(props.onPrivate)}
          >
            <Lock fontSize={iconSize} />
          </EditIconButton>
        ) : (
          <EditIconButton
            hasBorders={b}
            cs={cs}
            tooltip="Set Private Photo"
            onClick={wrap(props.onPrivate)}
          >
            <LockOpen fontSize={iconSize} />
          </EditIconButton>
        )}
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Edit Photo Description"
          onClick={wrap(props.onEdit)}
        >
          <Edit fontSize={iconSize} />
        </EditIconButton>
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Cropper & Rotate Photo"
          onClick={wrap(props.onCrop)}
        >
          <CropRotate fontSize={iconSize} />
        </EditIconButton>
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Delete Photo"
          onClick={wrap(props.onDelete)}
        >
          <DeleteForever fontSize={iconSize} />
        </EditIconButton>
      </ButtonGroup>
    </>
  );
}
