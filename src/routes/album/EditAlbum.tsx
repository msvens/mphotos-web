import { Album } from "../../api/types";
import { useEffect, useState } from "react";
import PhotosApi from "../../api/photoapi";
import { MPDialog } from "../../components/MPDialog";
import { TextField } from "@mui/material";

type EditAlbumProps = {
  open: boolean;
  album: Album;
  onClose: (a?: Album) => void;
};

export function EditAlbum({ open, album, onClose }: EditAlbumProps) {
  const [name, setName] = useState<string>(album.name);
  const [description, setDescription] = useState<string>(album.description);

  useEffect(() => {
    setName(album.name);
    setDescription(album.description);
  }, [album]);

  const handleOk = () => {
    const updateAlbum = async () => {
      const id = album.id;
      const coverPic = album.coverPic;
      try {
        const a = await PhotosApi.updateAlbum({
          id,
          name,
          description,
          coverPic,
        });
        onClose(a);
      } catch (e) {
        alert(e);
      }
    };
    updateAlbum();
  };

  return (
    <MPDialog
      open={open}
      onClose={() => onClose(undefined)}
      onOk={handleOk}
      closeOnOk={false}
      title="Edit Album"
      text={"Change album name or description"}
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
