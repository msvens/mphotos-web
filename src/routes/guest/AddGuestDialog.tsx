import { useContext, useEffect, useState } from "react";
import { Guest } from "../../service/types";
import { MPContext } from "../../MPContext";
import { MPDialog } from "../../components/MPDialog";
import { TextField } from "@mui/material";
import { usePhotoService } from "../../service/mphotoservice";

type AddGuestDialogProps = {
  open: boolean;
  onClose: () => void;
  update: boolean;
  email?: string;
  name?: string;
};

export function AddGuestDialog({
  open,
  onClose,
  update,
  email,
  name,
}: AddGuestDialogProps) {
  const ps = usePhotoService();
  const [newEmail, setNewEmail] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [registered, setRegistered] = useState<Guest>();
  const context = useContext(MPContext);

  useEffect(() => {
    if (email) setNewEmail(email);
    if (name) setNewName(name);
  }, [email, name]);

  const handleRegister = () => {
    const register = async () => {
      try {
        var res: Guest;
        if (update) res = await ps.updateGuest(newName, newEmail);
        else res = await ps.registerGuest(newName, newEmail);
        setRegistered(res);
      } catch (error) {
        if (email) setNewEmail(email);
        if (name) setNewName(name);
        alert(error);
      }
    };
    register();
  };

  const handleOnClose = () => {
    if (registered) {
      context.checkGuest();
    }
    onClose();
    setRegistered(undefined);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const regText = `In order to be able to comment and like photos you need to register as a guest by providing
    a nickname and your email address. To update your nickname you can simply register the same
    email with a different name`;

  function didReg() {
    return `Thank you for registring ${
      registered!.name
    }. Dont forget to verify your email with
        Mellowtech by clicking the link in the email we just sent to ${
          registered!.email
        }.`;
  }

  if (registered === undefined)
    return (
      <MPDialog
        title={update ? "Update User" : "Register User"}
        text={regText}
        open={open}
        onClose={handleOnClose}
        onOk={handleRegister}
        closeOnOk={false}
      >
        <TextField
          margin="dense"
          id="newName"
          label="Name"
          value={newName}
          onChange={handleNameChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="newEmail"
          label="Email"
          value={newEmail}
          onChange={handleEmailChange}
          fullWidth
        />
      </MPDialog>
    );
  else
    return (
      <MPDialog
        text={didReg()}
        open={open}
        onClose={handleOnClose}
        closeText={"Ok"}
      />
    );
}
