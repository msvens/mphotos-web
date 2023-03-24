import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { Header } from "./header/Header";
import { Footer } from "./Footer";
import { AboutRoute } from "./routes/about/AboutRoute";
import { AccountRoute } from "./routes/account/AccountRoute";
import { HomeRoute } from "./routes/home/HomeRoute";
import { ResumeRoute } from "./routes/resume/ResumeRoute";
import { AlbumRoute } from "./routes/album/AlbumRoute";
import { CameraRoute } from "./routes/camera/CameraRoute";
import { AlbumIdRoute } from "./routes/album/albumId/AlbumIdRoute";
import { AlbumPhotoRoute } from "./routes/album/albumId/photoId/AlbumPhotoRoute";
import { PhotoRoute } from "./routes/photo/PhotoRoute";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function MPhotos() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 0,
          minHeight: "100vh",
        }}
      >
        <Header />
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/album/:albumId" element={<AlbumIdRoute />} />
            <Route
              path="/album/:albumId/:photoId"
              element={<AlbumPhotoRoute />}
            />
            <Route path="/album" element={<AlbumRoute />} />
            <Route path="/camera/:cameraId" element={<CameraRoute />} />
            <Route path="/camera" element={<CameraRoute />} />
            <Route path="/resume" element={<ResumeRoute />} />
            <Route path="/photo/:photoId" element={<PhotoRoute />} />
            <Route path="/photo" element={<PhotoRoute />} />
            <Route path="/about" element={<AboutRoute />} />
            <Route path="/account/:setting" element={<AccountRoute />} />
            <Route path="/account" element={<AccountRoute />} />
            <Route path="/" element={<HomeRoute />} />
            {/*<Route path="/about" render={() => <About/>}/>
              <Route path="/" render={() => <About/>}/>*/}
            {/*<Route path="/account/:setting"><UserPage/></Route>
              <Route path="/account" render={() => <UserPage/>}/>
              <Route path="/guest"><GuestPage/></Route>
              <Route path="/" render={() => <HomePage/>}/>*/}
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}
