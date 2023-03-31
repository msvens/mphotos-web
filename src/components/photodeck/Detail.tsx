import { GuestReaction, Photo, PhotoComment } from "../../service/types";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MPContext } from "../../MPContext";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { toCameraId } from "../../service/apiutil";
import { AddGuest } from "../AddGuest";
import { usePhotoService } from "../../service/mphotoservice";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getLikesText(likesPhoto: boolean, guests: Array<GuestReaction>) {
  if (guests.length === 0) {
    return "Be the first to like this picture";
  }
  if (likesPhoto) {
    switch (guests.length) {
      case 1:
        return "Liked by you";
      case 2:
        return "liked by you and " + (guests.length - 1) + " other";
      default:
        return "liked by you and " + (guests.length - 1) + " others";
    }
  } else {
    switch (guests.length) {
      case 1:
        return "Liked by " + guests[0].name;
      case 2:
        return (
          "liked by " +
          guests[0].name +
          " and " +
          (guests.length - 1) +
          " other"
        );
      default:
        return (
          "liked by " +
          guests[0].name +
          " and " +
          (guests.length - 1) +
          " others"
        );
    }
  }
}

type CommentProps = {
  comment: PhotoComment;
};

function Comment({ comment }: CommentProps) {
  const ps = usePhotoService();
  const d = ps.toDate(comment.time);
  const dStr = d.toDateString();
  return (
    <Box sx={{ marginTop: 2, marginRight: 2 }}>
      <Typography variant="body2" color={"secondary"}>
        {comment.name}, {dStr}
      </Typography>
      <Typography variant="body2">{comment.body}</Typography>
    </Box>
  );
}

type DetailProps = {
  photo: Photo;
  showDate?: boolean;
  showKeywords?: boolean;
  showDescription?: boolean;
  showLens?: boolean;
};

export function Detail(props: DetailProps) {
  const ps = usePhotoService();
  const context = useContext(MPContext);
  const [guests, setGuests] = useState<GuestReaction[]>([]);
  const [comments, setComments] = useState<PhotoComment[]>([]);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [newComment, setNewComment] = useState<string>("");
  const [likesPhoto, setLikesPhoto] = useState<boolean>(false);

  const date = () => {
    const d = new Date(props.photo.originalDate);
    return (
      "Taken on " +
      months[d.getMonth()] +
      " " +
      d.getDate() +
      ", " +
      d.getFullYear() +
      ". "
    );
  };

  const focalLength =
    props.photo.focalLength35 !== ""
      ? props.photo.focalLength + " (" + props.photo.focalLength35 + "). "
      : props.photo.focalLength + ". ";

  const cameraSetting =
    "f" +
    props.photo.fNumber +
    ". iso" +
    props.photo.iso +
    ". " +
    props.photo.exposure +
    " secs.";

  useEffect(() => {
    if (context.isGuest) {
      ps.getGuestLike(props.photo.id)
        .then((res) => setLikesPhoto(res))
        .catch((e) => alert("error: " + e.toString()));
    } else {
      setLikesPhoto(false);
    }
  }, [props.photo, context.isGuest, ps]);

  useEffect(() => {
    ps.getPhotoLikes(props.photo.id)
      .then((res) => setGuests(res))
      .catch((e) => alert("error: " + e.toString()));
  }, [props.photo, likesPhoto, ps]);

  useEffect(() => {
    ps.getPhotoComments(props.photo.id)
      .then((res) => setComments(res))
      .catch((e) => alert("error: " + e.toString()));
  }, [props.photo, ps]);

  //event handlers
  const handleAddComment = () => {
    if (!context.isGuest) {
      setShowAddGuest(true);
    } else {
      ps.commentPhoto(props.photo.id, newComment)
        .then((_res) => {
          setNewComment("");
          ps.getPhotoComments(props.photo.id).then((res) => setComments(res));
        })
        .catch((err) => alert(err));
    }
  };

  const handleClickLike = () => {
    const handle = async () => {
      try {
        if (likesPhoto) {
          await ps.unlikePhoto(props.photo.id);
          setLikesPhoto(false);
        } else if (!context.isGuest) {
          setShowAddGuest(true);
        } else {
          await ps.likePhoto(props.photo.id);
          setLikesPhoto(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handle();
  };

  //Components
  function LikesIconButton() {
    if (likesPhoto)
      return (
        <IconButton
          sx={{ color: "#b5043c" }}
          edge={"start"}
          aria-label={"like"}
          size={"small"}
          onClick={handleClickLike}
        >
          <Favorite fontSize={"large"} />
        </IconButton>
      );
    return (
      <IconButton
        edge={"start"}
        aria-label={"like"}
        color="inherit"
        size={"small"}
        onClick={handleClickLike}
      >
        <FavoriteBorder fontSize={"large"} />
      </IconButton>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: 1,
        marginLeft: 2,
        marginRight: 2,
      }}
    >
      <Grid2 container spacing={2} sx={{ width: "100%" }}>
        <Grid2 xs={12} sm={6}>
          <LikesIconButton />
          <Typography variant="body2" display={"inline"}>
            {getLikesText(likesPhoto, guests)}
          </Typography>
          <Paper
            sx={{
              marginTop: 3,
              padding: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
            component="form"
            variant="outlined"
          >
            <InputBase
              sx={{ marginLeft: 1, flexGrow: 1, fontSize: "0.9rem" }}
              placeholder="Add comment..."
              multiline={true}
              fullWidth={true}
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
              inputProps={{ "aria-label": "Add comment..." }}
            />
            <Button color="inherit" onClick={handleAddComment}>
              Post
            </Button>
          </Paper>
          {comments.map((comment, _) => (
            <Comment comment={comment} />
          ))}
        </Grid2>
        <Grid2 xs={12} sm={6}>
          <Typography sx={{ fontWeight: "bold" }} variant="subtitle1">
            {props.photo.title === "" ? "Untitled" : props.photo.title}
          </Typography>
          <Typography variant="body2">
            {date()}
            <br />
            Camera:
            <Link
              component={RouterLink}
              to={`/camera/${toCameraId(props.photo.cameraModel)}`}
            >
              {props.photo.cameraModel}
            </Link>
            <br />
            Focal length: {focalLength}
            <br />
            Settings: {cameraSetting}
            <br />
            Lens: {props.photo.lensModel}
          </Typography>
        </Grid2>
      </Grid2>
      <AddGuest
        open={showAddGuest}
        update={false}
        onClose={() => setShowAddGuest(false)}
      />
    </Box>
  );
}

Detail.defaultProps = {
  showDate: true,
  showKeywords: false,
  showDescription: false,
  showLens: true,
} as Partial<DetailProps>;
