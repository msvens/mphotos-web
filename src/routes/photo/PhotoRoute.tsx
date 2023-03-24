import { PhotoLayout } from "../../layouts/PhotoLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { PhotoList } from "../../api/types";
import { parseSearchParams } from "../../api/apiutil";
import PhotosApi from "../../api/photoapi";
import { MPContext } from "../../MPContext";
import { MPPhotoDeck } from "../../components/photodeck/MPPhotoDeck";

type PhotoParams = {
  photoId: any;
};

export function PhotoRoute() {
  const { photoId } = useParams<PhotoParams>();
  const location = useLocation();
  const context = useContext(MPContext);
  const navigate = useNavigate();

  const [photoList, setPhotoList] = useState<PhotoList>({
    length: 0,
    photos: [],
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        if (location.search) {
          const res = await PhotosApi.searchPhotos(
            parseSearchParams(location.search)
          );
          setPhotoList(res);
        } else {
          const res = await PhotosApi.getPhotos(
            context.uxConfig.photoSortOrder
          );
          setPhotoList(res);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);

  return (
    <PhotoLayout>
      {photoList.length > 0 && (
        <MPPhotoDeck
          photos={photoList.photos}
          urlPrefix={"/photo/"}
          editControls={context.isUser}
          startPhotoId={photoId}
          searchQuery={location.search}
          onClearSearchQuery={(id) => navigate("/photo/" + id)}
        />
      )}
    </PhotoLayout>
  );
}
