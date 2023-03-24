import { Button, IconButton, InputBase, Paper, styled } from "@mui/material";
import { useState } from "react";
import { AttachFile } from "@mui/icons-material";

type MPFileInputProps = {
  multi?: boolean;
  onChange: (files: FileList | null) => void;
  iconButton?: boolean;
  showSelectedFile?: boolean;
  buttonText?: string;
  acceptMimeTypes?: string;
};

const Input = styled("input")({
  display: "none",
});

export function MPFileInput(props: MPFileInputProps) {
  const [fnames, setFnames] = useState<string>("selected files");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) {
      setFnames("selected files");
      props.onChange(fileList);
      return;
    }
    if (fileList.length > 1) {
      let fn = "";
      for (let i = 0; i < fileList.length && i < 5; i++) {
        fn = fn.concat(fileList[i].name + "\n");
      }
      setFnames(fn.substring(0, fn.length - 1));
    } else {
      setFnames(fileList[0].name);
    }
    props.onChange(fileList);
  };

  function createButton() {
    let bText = props.multi ? "Choose Files" : "Choose File";
    if (props.buttonText) bText = props.buttonText;
    return (
      <label htmlFor="btn-upload">
        <Input
          id="btn-upload"
          name="btn-upload"
          type="file"
          accept={props.acceptMimeTypes}
          onChange={handleFileChange}
          multiple={props.multi}
        />
        {props.iconButton ? (
          <IconButton
            aria-label={props.buttonText}
            color="inherit"
            component="span"
          >
            <AttachFile fontSize={"small"} />
          </IconButton>
        ) : (
          <Button color="inherit" component="span">
            {bText}
          </Button>
        )}
      </label>
    );
  }

  if (props.showSelectedFile) {
    return (
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
          sx={{ marginLeft: 1, flex: 1, fontSize: "0.9rem" }}
          placeholder="selected files"
          multiline={true}
          fullWidth={true}
          disabled={true}
          value={fnames}
          inputProps={{ "aria-label": "Selected Files" }}
        />
        {createButton()}
      </Paper>
    );
  } else {
    return <>{createButton()}</>;
  }
}

MPFileInput.defaultProps = {
  iconButton: false,
  multi: false,
  showSelectedFile: true,
  acceptMimeTypes: "image/png, image/jpeg",
} as Partial<MPFileInputProps>;
