import { Album, Photo } from "../../api/types";
import { useEffect, useState } from "react";
import PhotosApi from "../../api/photoapi";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { MPDialog } from "../../components/MPDialog";

type EditMetaDataProps = {
  open: boolean;
  photo: Photo;
  onClose: (p?: Photo) => void;
};

export function EditMetaData({ open, photo, onClose }: EditMetaDataProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumNames, setAlbumNames] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");

  useEffect(() => {
    PhotosApi.getAlbums()
      .then((res) => setAlbums(res))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    //setP(photo)
    setTitle(photo.title);
    setDescription(photo.description);
    setKeywords(photo.keywords);
    setAlbumNames([]);
  }, [photo]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await PhotosApi.getPhotoAlbums(photo.id);
        const names: string[] = [];
        for (let i = 0; i < res.length; i++) {
          names.push(res[i].name);
        }
        setAlbumNames(names);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAlbums();
  }, [photo]);

  function getAlbumIds(): string[] {
    const ids: string[] = [];
    for (let i = 0; i < albumNames.length; i++) {
      for (let j = 0; j < albums.length; j++) {
        if (albumNames[i] === albums[j].name) {
          ids.push(albums[j].id);
          break;
        }
      }
    }
    return ids;
  }

  //event handlers:
  const handleUpdatePhoto = () => {
    PhotosApi.updatePhoto(photo.id, title, description, keywords, getAlbumIds())
      .then((res) => {
        onClose(res);
      })
      .catch((e) => console.log(e));
  };

  const handleAlbumChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setAlbumNames(typeof value === "string" ? value.split(",") : value);
  };

  const dialogText =
    "Update title, description and keywords. Observe that keywords should be comma separated";

  return (
    <MPDialog
      open={open}
      onClose={() => onClose(undefined)}
      onOk={handleUpdatePhoto}
      title={"Edit Photo"}
      text={dialogText}
      closeOnOk={false}
    >
      <TextField
        margin="dense"
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        margin="dense"
        id="keywords"
        label="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        fullWidth
      />
      <TextField
        margin="dense"
        id="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />
      <FormControl margin="dense" sx={{ minWidth: 300 }}>
        <InputLabel id="albums-label">Albums</InputLabel>
        <Select
          labelId="albums-label"
          id="select-albums"
          multiple
          value={albumNames}
          onChange={handleAlbumChange}
          input={<OutlinedInput label="Albums" />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
          renderValue={(selected) => selected.join(", ")}
        >
          {albums.map((album) => (
            <MenuItem key={album.name} value={album.name}>
              <Checkbox checked={albumNames.indexOf(album.name) > -1} />
              <ListItemText primary={album.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </MPDialog>
  );
}
