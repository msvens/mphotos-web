import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MPContext } from "../../MPContext";
import { usePhotoService } from "../../service/mphotoservice";

export function Profile() {
  const ps = usePhotoService();
  const context = useContext(MPContext);

  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [pic, setPic] = useState<string>("");

  useEffect(() => {
    ps.getUser()
      .then((u) => {
        setName(u.name);
        setBio(u.bio);
        setPic(u.pic);
      })
      .catch((e) => alert(e.toString()));
  }, [ps]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };
  const handlePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPic(event.target.value);
  };

  const handleSubmit = () => {
    ps.updateUser(name, bio, pic)
      .then(() => context.checkUser())
      .catch((err) => alert(err.toString()));
  };

  return (
    <Box>
      <TextField
        id="nameField"
        label="Name"
        size="medium"
        margin="normal"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        fullWidth
      />
      <TextField
        id="picField"
        label="Profile Picture"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        margin="normal"
        value={pic}
        onChange={handlePicChange}
        fullWidth
      />
      <TextField
        sx={{ marginBottom: 4 }}
        id="bioField"
        label="Bio"
        multiline
        rows={4}
        size="medium"
        margin="normal"
        variant="outlined"
        value={bio}
        onChange={handleBioChange}
        fullWidth
      />
      <Button variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
