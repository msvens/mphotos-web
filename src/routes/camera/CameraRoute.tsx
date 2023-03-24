import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { MPContext } from "../../MPContext";
import { Camera } from "../../api/types";
import PhotosApi from "../../api/photoapi";
import Grid2 from "@mui/material/Unstable_Grid2";
import { IconButton, TextField, Box } from "@mui/material";
import { CameraDetail } from "./CameraDetail";
import { Edit, ImageOutlined } from "@mui/icons-material";
import { MPDialog } from "../../components/MPDialog";
import { MPFileInput } from "../../components/MPFileInput";
import { CameraUpdate } from "./CameraUpdate";
import { MenuItem, MI, MPMenuList } from "../../components/MPMenuList";
import { FullWidthLayout } from "../../layouts/FullWidthLayout";
import { MenuListLayout } from "../../layouts/MenuListLayout";

export function CameraRoute() {
  const { cameraId } = useParams<any>();
  const context = useContext(MPContext);
  const navigate = useNavigate();
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [cameraMenu, setCameraMenu] = useState<Map<string, MenuItem>>(
    new Map()
  );
  const [camera, setCamera] = useState<Camera>();
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File>();

  useEffect(() => {
    PhotosApi.getCameras()
      .then((c) => {
        setCameras(c);
        const cm = new Map<string, MenuItem>();
        let didSet = false;
        for (var cc of c) {
          cm.set(cc.id, MI(cc.model, "/camera/" + cc.id));
          if (cc.id === (cameraId && cameraId)) {
            setCamera(cc);
            didSet = true;
          }
        }
        setCameraMenu(cm);
        if (!didSet) setCamera(c[0]);
      })
      .catch((err) => alert(err));
  }, [cameraId]);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleFileChange = (event: FileList | null) => {
    if (event) setFile(event[0]);
  };

  const onUpdateCamera = (u?: Camera) => {
    if (u) {
      PhotosApi.getCameras().then((c) => {
        setCameras(c);
        for (var cc of c) {
          if (cc.id === u.id) {
            setCamera(cc);
          }
        }
      });
    }
    setShowUpdateDialog(false);
  };

  const onUpdateImage = () => {
    const update = async () => {
      try {
        if (camera) {
          if (file) {
            await PhotosApi.uploadCameraImage(camera.id, file);
          } else if (url) {
            await PhotosApi.updateCameraImage(camera.id, url);
          } else {
            alert("Neither file or image url was provided");
            return;
          }
          const newCams = await PhotosApi.getCameras();
          for (var cc of newCams) {
            if (cc.id === camera.id) setCamera(cc);
          }
          setCameras(newCams);
        }
      } catch (e) {
        alert(e);
      }
    };
    setShowImageDialog(false);
    update();
  };

  function editButtons() {
    return (
      <Box>
        <IconButton
          aria-label="Edit Camera Image"
          color="inherit"
          onClick={() => setShowImageDialog(true)}
        >
          <ImageOutlined fontSize={"small"} />
        </IconButton>
        <IconButton
          aria-label="Edit Camera Spec"
          color="inherit"
          onClick={() => setShowUpdateDialog(true)}
        >
          <Edit fontSize={"small"} />
        </IconButton>
      </Box>
    );
  }

  function imageDialog() {
    return (
      <MPDialog
        open={showImageDialog}
        closeOnOk={false}
        onClose={() => setShowImageDialog(false)}
        onOk={() => onUpdateImage()}
        title={"Image URL"}
        text={"Choose Image for this Camera"}
      >
        <TextField
          margin="dense"
          id="name"
          label="Url"
          value={url}
          onChange={handleUrlChange}
          fullWidth
        />
        <MPFileInput
          multi={false}
          iconButton={false}
          onChange={handleFileChange}
        />
      </MPDialog>
    );
  }

  return (
    <MenuListLayout
      items={cameraMenu}
      isSelected={(item) => {
        return item === (camera && camera.id);
      }}
    >
      {camera && (
        <CameraDetail camera={camera} onUpdate={onUpdateCamera}>
          {context.isUser && editButtons()}
        </CameraDetail>
      )}

      {context.isUser && camera && (
        <>
          {imageDialog()}
          <CameraUpdate
            open={showUpdateDialog}
            onClose={onUpdateCamera}
            camera={camera}
          />
        </>
      )}
    </MenuListLayout>
  );
}
