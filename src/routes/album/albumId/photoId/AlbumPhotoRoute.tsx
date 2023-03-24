import { PhotoLayout } from "../../../../layouts/PhotoLayout";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PhotosApi from "../../../../api/photoapi";
import { Album, PhotoList } from "../../../../api/types";
import { MPPhotoDeck } from "../../../../components/photodeck/MPPhotoDeck";
import { MPContext } from "../../../../MPContext";

type AlbumParams = {
  albumId: any;
  photoId: any;
};

export function AlbumPhotoRoute() {
  const context = useContext(MPContext);
  const { albumId, photoId } = useParams<AlbumParams>();
  const [album, setAlbum] = useState<Album>();
  const [photoList, setPhotoList] = useState<PhotoList>({
    length: 0,
    photos: [],
  });

  useEffect(() => {
    PhotosApi.getAlbum(albumId)
      .then((res) => {
        setAlbum(res.info);
        setPhotoList(res.photos);
      })
      .catch((e) => console.log(e));
  }, [albumId]);

  return (
    <PhotoLayout>
      {photoList.length > 0 && (
        <MPPhotoDeck
          photos={photoList.photos}
          urlPrefix={"/album/" + albumId + "/"}
          editControls={context.isUser}
          startPhotoId={photoId}
        />
      )}
    </PhotoLayout>
  );
}
