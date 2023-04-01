import Grid2 from "@mui/material/Unstable_Grid2";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteForever, Edit } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Album } from "../../service/types";
import { MPContext } from "../../MPContext";
import { AlbumAdd, AlbumDelete, AlbumUpdate } from "./dialogs";
import { usePhotoService } from "../../service/mphotoservice";

type AlbumItemProps = {
  a: Album;
  onEdit: (a: Album) => void;
  onDelete: (a: Album) => void;
};

type AddItemProps = {
  onAdd: () => void;
};

function AddItem({ onAdd }: AddItemProps) {
  return (
    <Grid2 xs={6} sm={4} display={"flex"}>
      <Card
        sx={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image="/photo-album.jpg"
          title="photo album"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Create a new Photo album. After you can add photos to it from the
            photo view
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onAdd}>
            Add Album
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
}
function AlbumItem({ a, onEdit, onDelete }: AlbumItemProps) {
  const context = useContext(MPContext);
  const getAlbumCover = () => {
    if (a.coverPic === "") {
      return "/photo-album.jpg";
    } else {
      return a.coverPic;
    }
  };

  return (
    <Grid2 xs={6} sm={4} display={"flex"}>
      <Card
        sx={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CardActionArea component={RouterLink} to={`/album/${a.id}`}>
          <CardMedia
            component="img"
            height="194"
            image={getAlbumCover()}
            title="photo album"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {a.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {a.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {context.isUser && (
          <CardActions disableSpacing>
            <IconButton aria-label="Edit Album" onClick={() => onEdit(a)}>
              <Edit />
            </IconButton>
            <IconButton aria-label="Delete Album" onClick={() => onDelete(a)}>
              <DeleteForever />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </Grid2>
  );
}

export function AlbumGrid() {
  const ps = usePhotoService();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [album, setAlbum] = useState<Album | undefined>(undefined);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const context = useContext(MPContext);

  useEffect(() => {
    ps.getAlbums()
      .then((res) => setAlbums(res))
      .catch((e) => alert(e.toString()));
  }, [ps]);

  function onAdd() {
    setShowAdd(true);
  }

  function onEdit(a: Album) {
    setAlbum(a);
    setShowUpdate(true);
  }

  function onDelete(a: Album) {
    setAlbum(a);
    setShowDelete(true);
  }

  function closeDelete(a?: Album) {
    const del = async () => {
      if (a) {
        try {
          await ps.deleteAlbum(a.id);
          const newAlbums = await ps.getAlbums();
          setAlbums(newAlbums);
          setAlbum(undefined);
        } catch (e) {
          console.log(e);
        }
      }
      setShowDelete(false);
    };
    void del();
  }

  function closeUpdate(a?: Album) {
    const update = async () => {
      if (a) {
        try {
          await ps.updateAlbum(a);
          const newAlbums = await ps.getAlbums();
          setAlbums(newAlbums);
          setShowUpdate(false);
        } catch (e) {
          console.log(e);
        }
      }
    };
    void update();
  }
  const closeAdd = (a?: Album) => {
    const add = async () => {
      if (a) {
        try {
          await ps.addAlbum(a.name, a.description, "");
          const newAlbums = await ps.getAlbums();
          setAlbums(newAlbums);
          setAlbum(undefined);
        } catch (e) {
          console.log(e);
        }
      }
      setShowAdd(false);
    };
    void add();
  };

  return (
    <>
    <Grid2 container spacing={2}>
        {context.isUser && <AddItem onAdd={onAdd} />}
        {albums.map((album, _) => (
          <AlbumItem
            a={album}
            onDelete={onDelete}
            onEdit={onEdit}
            key={album.id}
          />
        ))}
      </Grid2>
      {context.isUser && (
        <>
          <AlbumDelete onClose={closeDelete} open={showDelete} album={album} />
          <AlbumAdd onClose={closeAdd} open={showAdd} />
          <AlbumUpdate onClose={closeUpdate} open={showUpdate} album={album} />
        </>
      )}
    </>
  );
}
