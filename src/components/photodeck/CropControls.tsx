import { colorScheme } from "../../api/apiutil";
import {
  ButtonGroup,
  EditIconButton,
  NavButton,
  PrevNextButtons,
} from "./buttons";
import {
  CropFree,
  CropLandscape,
  CropPortrait,
  CropSquare,
  Forward5,
  RestorePage,
  Rotate90DegreesCw,
  Save,
} from "@mui/icons-material";

export enum EditAction {
  CropPortrait,
  CropSquare,
  CropLandscape,
  CropFree,
  RotateLeft,
  Save,
  Restore,
  RotateRight,
  RotateRight5,
}

type CropControlsProps = {
  photoBackground: string;
  isLargeDisplay: boolean;
  hasBorders: boolean;
  navigationButtons?: boolean;
  onBackward: () => void;
  onForward: () => void;
  onClose: () => void;
  verticalEditButtons?: boolean;
  onEdit: (a: EditAction) => void;
};
export function CropControls(props: CropControlsProps) {
  const cs = colorScheme(props.photoBackground);
  const b = props.hasBorders;
  const iconSize = props.isLargeDisplay ? "large" : "small";

  const onSave = () => {
    props.onEdit(EditAction.Save);
  };
  const onLandscape = () => {
    props.onEdit(EditAction.CropLandscape);
  };
  const onSquare = () => {
    props.onEdit(EditAction.CropSquare);
  };
  const onPortrait = () => {
    props.onEdit(EditAction.CropPortrait);
  };
  const onRotateRight = () => {
    props.onEdit(EditAction.RotateRight);
  };
  const onRotateRight5 = () => {
    props.onEdit(EditAction.RotateRight5);
  };

  return (
    <>
      {props.navigationButtons && (
        <PrevNextButtons
          cs={cs}
          hasBorders={props.hasBorders}
          largeDisplay={props.isLargeDisplay}
          onPrev={props.onBackward}
          onNext={props.onForward}
        />
      )}
      <NavButton
        navtype="close"
        cs={cs}
        hasBorders={props.hasBorders}
        largeDisplay={props.isLargeDisplay}
        onClick={props.onClose}
      />

      <ButtonGroup
        vertical={props.verticalEditButtons}
        cs={cs}
        hasBorders={props.hasBorders}
      >
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Portrait Cropper"
          onClick={onPortrait}
        >
          <CropPortrait fontSize={iconSize} />
        </EditIconButton>
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Ladscape Cropper"
          onClick={onLandscape}
        >
          <CropLandscape fontSize={iconSize} />
        </EditIconButton>
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Square Cropper"
          onClick={onSquare}
        >
          <CropSquare fontSize={iconSize} />
        </EditIconButton>
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Free Cropper"
          onClick={() => props.onEdit(EditAction.CropFree)}
        >
          <CropFree fontSize={iconSize} />
        </EditIconButton>
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Rotate Image 90°"
          onClick={onRotateRight}
        >
          <Rotate90DegreesCw fontSize={iconSize} />
        </EditIconButton>
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Rotate Image 5°"
          onClick={onRotateRight5}
        >
          <Forward5 fontSize={iconSize} />
        </EditIconButton>
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Restore Original"
          onClick={() => props.onEdit(EditAction.Restore)}
        >
          <RestorePage fontSize={iconSize} />
        </EditIconButton>
        <EditIconButton
          hasBorders={b}
          cs={cs}
          tooltip="Save Image"
          onClick={onSave}
        >
          <Save fontSize={iconSize} />
        </EditIconButton>
      </ButtonGroup>
    </>
  );
}
