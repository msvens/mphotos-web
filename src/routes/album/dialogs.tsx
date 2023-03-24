import { Album } from "../../api/types";
import { MPDialog } from "../../components/MPDialog";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

type AlbumDialogProps = {
  onClose: (a?: Album) => void;
  open: boolean;
  album?: Album;
};

export function AlbumDelete({ onClose, open, album }: AlbumDialogProps) {
  return (
    <MPDialog
      open={open}
      onClose={() => onClose(undefined)}
      onOk={() => onClose(album)}
      title={"Delete Album"}
      text="Deleting an album will not remove the associated images"
    />
  );
}

export function AlbumUpdate({ onClose, open, album }: AlbumDialogProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (album) {
      setName(album.name);
      setDescription(album.description);
    }
  }, [album]);

  /*
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
*/
  function handleOk() {
    if (album) {
      onClose({
        id: album.id,
        name: name,
        description: description,
        coverPic: album?.coverPic,
      });
    } else {
      onClose(undefined);
    }
  }

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

type AlbumAddProps = {
  onClose: (a?: Album) => void;
  open: boolean;
};
export function AlbumAdd({ onClose, open }: AlbumAddProps) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //handlers
  const handleOk = () => {
    onClose({ id: "", name: name, description: description, coverPic: "" });
    /*const update = async () => {
      try {
        const res = await PhotosApi.addAlbum(name, description, "");
        alert(res);
        onClose(res);
      } catch (e) {
        alert(e);
      }
    };
    update();*/
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
