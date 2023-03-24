import { Album } from "../../api/types";
import { useState } from "react";
import PhotosApi from "../../api/photoapi";
import { MPDialog } from "../../components/MPDialog";
import { TextField } from "@mui/material";

type AddAlbumProps = {
  open: boolean;
  onClose: (a?: Album) => void;
};

export function AddAlbum({ open, onClose }: AddAlbumProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //handlers
  const handleOk = () => {
    const update = async () => {
      try {
        const res = await PhotosApi.addAlbum(name, description, "");
        alert(res);
        onClose(res);
      } catch (e) {
        alert(e);
      }
    };
    update();
  };

  return (
    <MPDialog
      open={open}
      onClose={() => {
        onClose(undefined);
      }}
      onOk={handleOk}
      title={"Add Album"}
      text={"Create album. You can later add photo to it"}
      closeOnOk={false}
    >
      <TextField
        margin="dense"
        id="name"
        label="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        fullWidth
      />
      <TextField
        margin="dense"
        id="description"
        label="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        fullWidth
        multiline
        rows={2}
      />
    </MPDialog>
  );
}
