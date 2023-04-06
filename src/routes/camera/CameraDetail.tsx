import { Camera, CameraImageSize } from "../../service/types";
import { Link as RouterLink } from "react-router-dom";
import {
  createPhotoSearchParams,
  getCameraSettingDisplayName,
  toQueryString,
} from "../../service/apiutil";
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { SmallImg } from "../../layouts/Images";
import { usePhotoService } from "../../service/mphotoservice";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";

type DetailProps = {
  camera: Camera;
  onUpdate: (c: Camera) => void;
  children: React.ReactNode;
};

export function CameraDetail({ camera, onUpdate, children }: DetailProps) {
  const theme = useTheme();
  const ps = usePhotoService();
  const largeScreen = useIsLargeScreen();

  function getQuery() {
    return toQueryString(createPhotoSearchParams(camera.model));
  }

  function row(key: string) {
    const disp = getCameraSettingDisplayName(key, camera);
    return (
      <TableRow key={key}>
        <TableCell component="th" scope="row">
          {disp.displayName}
        </TableCell>
        <TableCell>{disp.displayValue}</TableCell>
      </TableRow>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "wrap",
        margin: "auto",
        width: "100%",
      }}
    >
      <Box sx={{ margin: "auto" }}>
        <SmallImg
          sx={{ maxWidth: "400px" }}
          alt={camera.model}
          src={ps.getCameraImageUrl(camera, largeScreen ? CameraImageSize.Medium : CameraImageSize.Small)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexBasis: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: theme.spacing(2),
        }}
      >
        <Link
          color={"inherit"}
          component={RouterLink}
          to={`/photo?${getQuery()}`}
        >
          Photos
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexBasis: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography></Typography>
        {children}
      </Box>
      <Table sx={{ maxWidth: 600}} aria-label="Camera Specs" size={"small"}>
        <TableBody>
          {Object.getOwnPropertyNames(camera)
            .filter((v) => v !== "id" && v !== "image")
            .map((n, _) => {
              return row(n);
            })}
        </TableBody>
      </Table>
    </Box>
  );
}
