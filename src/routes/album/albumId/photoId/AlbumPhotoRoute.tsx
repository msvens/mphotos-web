import { PhotoLayout } from "../../../../layouts/PhotoLayout";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Album, PhotoList } from "../../../../service/types";
import { MPPhotoDeck } from "../../../../components/photodeck/MPPhotoDeck";
import { MPContext } from "../../../../MPContext";
import { usePhotoService } from "../../../../service/mphotoservice";

type AlbumParams = {
  albumId: any;
  photoId: any;
};

export function AlbumPhotoRoute() {
  const ps = usePhotoService();
  const context = useContext(MPContext);
  const { albumId, photoId } = useParams<AlbumParams>();
  const [album, setAlbum] = useState<Album>();
  const [photoList, setPhotoList] = useState<PhotoList>({
    length: 0,
    photos: [],
  });

  useEffect(() => {
    ps.getAlbum(albumId)
      .then((res) => {
        setAlbum(res.info);
        setPhotoList(res.photos);
      })
      .catch((e) => console.log(e));
  }, [albumId, ps]);

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
