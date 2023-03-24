import { Camera } from "../../api/types";
import { useState } from "react";
import PhotosApi from "../../api/photoapi";
import {
  getCameraSettingDisplayName,
  setCameraSetting,
} from "../../api/apiutil";
import { Input, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { MPDialog } from "../../components/MPDialog";

type UpdateProps = {
  onClose: (c?: Camera) => void;
  open: boolean;
  camera: Camera;
};

export function CameraUpdate({ onClose, open, camera }: UpdateProps) {
  const [c, setC] = useState<Camera>(camera);

  const handleOk = () => {
    const update = async () => {
      try {
        const res = await PhotosApi.updateCamera(c);
        onClose(res);
      } catch (e) {
        alert(e);
      }
    };
    update();
  };

  const handleCameraChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newC = setCameraSetting(c, key, event.target.value);
    setC(newC);
  };

  function row(key: string) {
    const disp = getCameraSettingDisplayName(key, c);
    return (
      <TableRow key={key}>
        <TableCell component="th" scope="row">
          {disp.displayName}
        </TableCell>
        <TableCell>{disp.displayValue}</TableCell>
      </TableRow>
    );
  }

  function editRow(key: string) {
    const disp = getCameraSettingDisplayName(key, c);
    return (
      <TableRow key={key}>
        <TableCell component="th" scope="row">
          {disp.displayName}
        </TableCell>
        <TableCell>
          <Input
            value={disp.rawValue}
            margin={"dense"}
            color={"secondary"}
            fullWidth
            sx={{
              padding: 0,
              border: "none",
              margin: 0,
              "&&&:before": {
                borderBottom: "none",
              },
              "&&:after": {
                borderBottom: "none",
              },
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleCameraChange(key, e)
            }
          />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <MPDialog
      open={open}
      onClose={() => onClose(undefined)}
      onOk={handleOk}
      title={"Update Camera"}
      text={"Update Camera Spec"}
      closeOnOk={false}
    >
      <Table sx={{ maxWidth: 600 }} aria-label="Camera Specs" size={"small"}>
        <TableBody>
          {Object.getOwnPropertyNames(c)
            .filter((v) => v !== "id" && v !== "image")
            .map((p, _i) => {
              if (p === "make" || p === "model") return row(p);
              else return editRow(p);
            })}
        </TableBody>
      </Table>
    </MPDialog>
  );
}
