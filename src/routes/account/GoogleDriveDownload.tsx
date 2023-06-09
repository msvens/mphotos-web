import { useEffect, useState } from "react";
import { Job, JobState } from "../../service/types";
import { useInterval } from "../../hooks/useInterval";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { MPProgress } from "../../components/MPProgress";
import { usePhotoService } from "../../service/mphotoservice";

type GoogleDriveDownloadProps = {
  open: boolean;
  onClose: () => void;
};

const delay = 500;
export function GoogleDriveDownload({
  open,
  onClose,
}: GoogleDriveDownloadProps) {
  const ps = usePhotoService();
  const [job, setJob] = useState<Job>();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [numPhotos, setNumPhotos] = useState<number>(0);

  const checkJob = () => {
    const check = async () => {
      if (job) {
        const res = await ps.statusDriveAddPhotosJob(job.id);
        switch (res.state) {
          case JobState.FINISHED:
            setIsRunning(false);
            break;
          case JobState.ABORTED:
            setIsRunning(false);
            alert("Job Aborted " + job.error);
            break;
        }
        setJob(res);
      } else {
        setIsRunning(false);
        alert("no job defined");
      }
    };
    void check();
  };

  useInterval(checkJob, isRunning ? delay : null);

  useEffect(() => {
    if (job === undefined) {
      ps.checkDrive()
        .then((res) => setNumPhotos(res.length))
        .catch((err) => console.log(err));
    }
  }, [job, ps]);

  //event handlers
  const handleDownload = () => {
    const scheduleJob = async () => {
      const res = await ps.scheduleDriveAddPhotosJob();
      if (res.state === JobState.STARTED || res.state === JobState.SCHEDULED) {
        setIsRunning(true);
        setJob(res);
      } else {
        alert(res.state);
      }
    };
    void scheduleJob();
  };

  if (job) {
    return (
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="dialog-title">Download Progress</DialogTitle>
        <DialogContent>
          <MPProgress value={job.percent} />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isRunning}
            onClick={() => {
              onClose();
              setJob(undefined);
            }}
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return (
      <Dialog
        open={open}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="dialog-title">
          Download Photos From Your Drive Folder
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-content">
            There are currently {numPhotos} photos to download from your drive
            folder
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={numPhotos === 0}
            onClick={handleDownload}
            color="primary"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
