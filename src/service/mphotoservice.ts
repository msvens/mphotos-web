import * as mt from "./types";
import {PhotoList} from "./types";

type MPhotosResponse<T> = {
  error?: mt.ApiError;
  data?: T;
};

class MPhotosService {
  /*  private idCounter = 0;

  nextId(): number {
    let ret = this.idCounter;
    this.idCounter++;
    return ret;
  }*/

  private static convert<T>(resp: MPhotosResponse<T>): T {
    if (resp.data) return resp.data;
    else if (resp.error)
      throw new Error(resp.error.code + ": " + resp.error.message);
    else throw new Error("no payload");
  }

  private static req(url: string, method: string = "GET"): Promise<any> {
    return fetch(url, { method: method }).then((res) => res.json());
  }

  private static reqMPBody(
    url: string,
    data: FormData,
    method: string = "PUT"
  ): Promise<any> {
    return fetch(url, { method: method, body: data }).then((res) => res.json());
  }

  private static reqBody(
    url: string,
    data: any,
    method: string = "PUT"
  ): Promise<any> {
    return fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  //authGoogle(callback: string = "/login") {}

  landscapeURL(p: mt.Photo): string {
    return "/api/landscapes/".concat(p.fileName);
  }

  toDate(ts: string): Date {
    return new Date(ts);
  }

  portraitURL(p: mt.Photo): string {
    return "/api/portraits/".concat(p.fileName);
  }

  squareURL(p: mt.Photo): string {
    return "/api/squares/".concat(p.fileName);
  }

  resizeURL(p: mt.Photo): string {
    return "/api/resizes/".concat(p.fileName);
  }

  orignialURL(p: mt.Photo): string {
    return "/api/images/".concat(p.fileName);
  }

  aspect(p: mt.Photo): mt.ImageAspect {
    const rat = p.width / p.height;
    if (rat >= 1.25) return mt.ImageAspect.LANDSCAPE;
    else if (rat >= 0.8) return mt.ImageAspect.SQUARE;
    else return mt.ImageAspect.PORTRAIT;
  }

  imagePath(p: mt.Photo): string {
    switch (this.aspect(p)) {
      case mt.ImageAspect.PORTRAIT:
        return this.portraitURL(p);
      case mt.ImageAspect.SQUARE:
        return this.squareURL(p);
      case mt.ImageAspect.LANDSCAPE:
        return this.landscapeURL(p);
    }
  }

  addAlbum(
    name: string,
    description: string,
    coverPic: string
  ): Promise<mt.Album> {
    const data = { description: description, coverPic: coverPic, name: name };
    return MPhotosService.reqBody("/api/albums", data)
      .then((res) => res as MPhotosResponse<mt.Album>)
      .then((res) => MPhotosService.convert(res));
  }

  checkDrive(): Promise<mt.DriveFiles> {
    return MPhotosService.req("/api/drive/check")
      .then((res) => res as MPhotosResponse<mt.DriveFiles>)
      .then((res) => MPhotosService.convert(res));
  }

  commentPhoto(photoId: string, comment: string): Promise<mt.PhotoComment> {
    return MPhotosService.reqBody(
      `/api/comments/${photoId}`,
      { body: comment },
      "POST"
    )
      .then((res) => res as MPhotosResponse<mt.PhotoComment>)
      .then((res) => MPhotosService.convert(res));
  }

  deleteAlbum(id: string): Promise<mt.Album> {
    return MPhotosService.req(`/api/albums/${id}`, "DELETE")
      .then((res) => res as MPhotosResponse<mt.Album>)
      .then((res) => MPhotosService.convert(res));
  }

  deletePhoto(photoId: string, removeFiles: boolean): Promise<mt.Photo> {
    return MPhotosService.reqBody(
      `/api/photos/${photoId}`,
      { removeFiles: removeFiles },
      "DELETE"
    )
      .then((res) => res as MPhotosResponse<mt.Photo>)
      .then((res) => MPhotosService.convert(res));
  }

  deletePhotos(removeFiles: boolean): Promise<mt.PhotoList> {
    return MPhotosService.reqBody(
      "/api/photo",
      { removeFiles: removeFiles },
      "DELETE"
    )
      .then((res) => res as MPhotosResponse<mt.PhotoList>)
      .then((res) => MPhotosService.convert(res));
  }

  getEditPreviewURL(p: mt.Photo, params: mt.EditPhotoParams): string {
    const urlParams = new URLSearchParams();
    if (params.rotation)
      urlParams.append("rotation", params.rotation.toString());
    if (params.x) urlParams.append("x", params.x.toString());
    if (params.y) urlParams.append("y", params.y.toString());
    if (params.width) urlParams.append("width", params.width.toString());
    if (params.height) urlParams.append("height", params.height.toString());
    const queryStr = urlParams.toString();
    return `/api/photos/${p.id}/edit/preview?${queryStr}`;
  }

  getImageUrl(
    p: mt.Photo,
    type: mt.PhotoType,
    portraitView: boolean,
    largeDisplay: boolean
  ): string {
    switch (type) {
      case mt.PhotoType.Thumb:
        return "/api/thumbs/".concat(p.fileName);
      case mt.PhotoType.Landscape:
        return this.landscapeURL(p);
      case mt.PhotoType.Portrait:
        return this.portraitURL(p);
      case mt.PhotoType.Square:
        return this.squareURL(p);
      case mt.PhotoType.Resize:
        return this.resizeURL(p);
      case mt.PhotoType.Original:
        return this.orignialURL(p);
      case mt.PhotoType.Dynamic:
        if (largeDisplay) {
          //dont use any specifics
          return this.resizeURL(p);
        }
        if (portraitView) {
          const a = this.aspect(p);
          return a === mt.ImageAspect.PORTRAIT
            ? this.portraitURL(p)
            : this.squareURL(p);
        } else {
          return "/api/landscapes/".concat(p.fileName);
        }
    }
  }

  getUXConfig(): Promise<mt.UXConfig> {
    return MPhotosService.req("/api/user/config")
      .then((res) => res as MPhotosResponse<mt.UXConfig>)
      .then((res) => MPhotosService.convert(res));
    //return this.uxConfig
  }

  getAlbums(): Promise<mt.Album[]> {
    return MPhotosService.req(`/api/albums`)
      .then((res) => res as MPhotosResponse<mt.Album[]>)
      .then((res) => MPhotosService.convert(res));
  }

  getAlbum(id: number): Promise<mt.AlbumCollection> {
    return MPhotosService.req(`/api/albums/${id}`)
      .then((res) => res as MPhotosResponse<mt.AlbumCollection>)
      .then((res) => MPhotosService.convert(res));
  }

  getCamera(id: string): Promise<mt.Camera> {
    return MPhotosService.req(`/api/cameras/${id}`)
      .then((res) => res as MPhotosResponse<mt.Camera>)
      .then((res) => MPhotosService.convert(res));
  }

  getCameraId(p: mt.Photo): string {
    return p.cameraModel.toLowerCase().replace(/\s+/g, "-");
  }

  getCameraImageUrl(camera: mt.Camera,
    size: mt.CameraImageSize = mt.CameraImageSize.Original
  ) {
    if (camera.image === "") {
      return "/camera-outline.png";
    } else if (size === mt.CameraImageSize.Original)
      return `/api/cameras/${camera.id}/image`;
    else{
      return `/api/cameras/${camera.id}/image/${size}`;
    }
  }

  getCameras(): Promise<mt.Camera[]> {
    return MPhotosService.req(`/api/cameras`)
      .then((res) => res as MPhotosResponse<mt.Camera[]>)
      .then((res) => MPhotosService.convert(res));
  }

  getThumbUrlId(id: string): string {
    return "/api/thumbs/".concat(id);
  }

  getProfilePicUrl(u: mt.User): string {
    return u.pic !== "" ? "/api/thumbs/".concat(u.pic) : u.pic;
  }

  getPhotoComments(photoId: string): Promise<mt.PhotoComment[]> {
    return MPhotosService.req(`/api/comments/${photoId}`)
      .then((res) => res as MPhotosResponse<mt.PhotoComment[]>)
      .then((res) => MPhotosService.convert(res));
  }

  getPhotoLikes(photoId: string): Promise<mt.GuestReaction[]> {
    return MPhotosService.req(`/api/likes/${photoId}`)
      .then((res) => res as MPhotosResponse<mt.GuestReaction[]>)
      .then((res) => MPhotosService.convert(res));
  }

  getGuest(): Promise<mt.Guest> {
    return MPhotosService.req("/api/guest")
      .then((res) => res as MPhotosResponse<mt.Guest>)
      .then((res) => MPhotosService.convert(res));
  }

  getGuestLikes(): Promise<string[]> {
    return MPhotosService.req("/api/guest/likes")
      .then((res) => res as MPhotosResponse<string[]>)
      .then((res) => MPhotosService.convert(res));
  }

  getGuestLike(photoId: string): Promise<boolean> {
    return MPhotosService.req(`/api/guest/likes/${photoId}`)
      .then((res) => res as MPhotosResponse<mt.GuestLike>)
      .then((res) => MPhotosService.convert(res).like);
  }

  getPhotoAlbums(photoId: string): Promise<mt.Album[]> {
    return MPhotosService.req(`/api/photos/${photoId}/albums`)
      .then((res) => res as MPhotosResponse<mt.Album[]>)
      .then((res) => MPhotosService.convert(res));
  }

  getPhotos(order?: string): Promise<mt.PhotoList> {
    return this.getPagedPhotos(0, 0, order);
  }
  getPagedPhotos(
    limit: number,
    offset: number,
    order?: string
  ): Promise<mt.PhotoList> {
    let url = offset
      ? `/api/photos?limit=${limit}&offset=${offset}`
      : `/api/photos?limit=${limit}`;
    if (order !== "") {
      url = url + "&order=" + order;
    }
    return MPhotosService.req(url)
      .then((res) => res as MPhotosResponse<mt.PhotoList>)
      .then((res) => MPhotosService.convert(res));
  }

  getPhoto(photoId: string): Promise<mt.Photo> {
    return MPhotosService.req(`/api/photos/${photoId}`)
      .then((res) => res as MPhotosResponse<mt.Photo>)
      .then((res) => MPhotosService.convert(res));
  }

  getUser(): Promise<mt.User> {
    return MPhotosService.req("/api/user")
      .then((res) => res as MPhotosResponse<mt.User>)
      .then((res) => MPhotosService.convert(res));
  }

  isGoogleAuth(): Promise<boolean> {
    return MPhotosService.req("/api/drive/authenticated")
      .then((res) => res as MPhotosResponse<mt.AuthUser>)
      .then((res) => MPhotosService.convert(res).authenticated);
  }

  isGuest(): Promise<boolean> {
    return MPhotosService.req("/api/guest/is")
      .then((res) => res as MPhotosResponse<mt.AuthUser>)
      .then((res) => MPhotosService.convert(res).authenticated);
  }

  isLoggedIn(): Promise<boolean> {
    return MPhotosService.req("/api/loggedin")
      .then((res) => res as MPhotosResponse<mt.AuthUser>)
      .then((res) => MPhotosService.convert(res).authenticated);
  }

  likePhoto(photoId: string): Promise<string> {
    return MPhotosService.req(`/api/likes/${photoId}`, "POST")
      .then((res) => res as MPhotosResponse<string>)
      .then((res) => MPhotosService.convert(res));
  }

  listDrive(): Promise<mt.DriveFiles> {
    return MPhotosService.req("/api/drive")
      .then((res) => res as MPhotosResponse<mt.DriveFiles>)
      .then((res) => MPhotosService.convert(res));
  }

  login(password: string): Promise<mt.AuthUser> {
    return MPhotosService.reqBody("/api/login", { password: password }, "POST")
      .then((res) => res as MPhotosResponse<mt.AuthUser>)
      .then((res) => MPhotosService.convert(res));
  }

  logout(): Promise<mt.AuthUser> {
    return MPhotosService.req("/api/logout")
      .then((res) => res as MPhotosResponse<mt.AuthUser>)
      .then((res) => MPhotosService.convert(res));
  }

  logoutGuest(): Promise<mt.AuthUser> {
    return MPhotosService.req("/api/guest/logout")
      .then((res) => res as MPhotosResponse<mt.AuthUser>)
      .then((res) => MPhotosService.convert(res));
  }

  registerGuest(name: string, email: string): Promise<mt.Guest> {
    const data = { name: name, email: email };
    return MPhotosService.reqBody("/api/guest", data, "POST")
      .then((res) => res as MPhotosResponse<mt.Guest>)
      .then((res) => MPhotosService.convert(res));
  }

  searchPhotos(query: mt.SearchPhotoParams): Promise<mt.PhotoList> {
    return MPhotosService.req(`/api/photos/search?${this.toQueryString(query)}`)
      .then((res) => res as MPhotosResponse<mt.PhotoList>)
      .then((res) => MPhotosService.convert(res));
  }

  statusDriveAddPhotosJob(id: string): Promise<mt.Job> {
    return MPhotosService.req(`/api/drive/job/${id}`)
      .then((res) => res as MPhotosResponse<mt.Job>)
      .then((res) => MPhotosService.convert(res));
  }

  scheduleDriveAddPhotosJob(): Promise<mt.Job> {
    return MPhotosService.req("/api/drive/job/schedule", "POST")
      .then((res) => res as MPhotosResponse<mt.Job>)
      .then((res) => MPhotosService.convert(res));
  }

  togglePrivate(photoId: string): Promise<mt.Photo> {
    return MPhotosService.req(`/api/photos/${photoId}/private`, "POST")
      .then((res) => res as MPhotosResponse<mt.Photo>)
      .then((res) => MPhotosService.convert(res));
  }

  toQueryString(params: mt.SearchPhotoParams): string {
    const urlParams = new URLSearchParams();
    if (params.cameraModel) urlParams.append("cameraModel", params.cameraModel);
    return urlParams.toString();
  }

  unlikePhoto(photoId: string): Promise<string> {
    return MPhotosService.req(`/api/likes/${photoId}`, "DELETE")
      .then((res) => res as MPhotosResponse<string>)
      .then((res) => MPhotosService.convert(res));
  }

  updateAlbum(album: mt.Album): Promise<mt.Album> {
    return MPhotosService.reqBody(`/api/albums/${album.id}`, album)
      .then((res) => res as MPhotosResponse<mt.Album>)
      .then((res) => MPhotosService.convert(res));
  }

  updateAlbumOrder(album: mt.Album, pl: PhotoList): Promise<mt.Album> {
    //might not be the nicest solution but will do for now
    if(pl.length < 2) {
      return Promise.resolve(album)
    }
    const photoIds = pl.photos.map((p) => p.id)
    const data = { photos: photoIds };
    return MPhotosService.reqBody(`/api/albums/${album.id}/order`, data)
      .then((res) => res as MPhotosResponse<mt.Album>)
      .then((res) => MPhotosService.convert(res));
  }

  updateCamera(camera: mt.Camera): Promise<mt.Camera> {
    return MPhotosService.reqBody(`/api/cameras/${camera.id}`, camera)
      .then((res) => res as MPhotosResponse<mt.Camera>)
      .then((res) => MPhotosService.convert(res));
  }

  updateCameraImage(cameraId: string, imageURL: string): Promise<mt.Camera> {
    return MPhotosService.reqBody(`/api/cameras/${cameraId}/image`, {
      url: imageURL,
    })
      .then((res) => res as MPhotosResponse<mt.Camera>)
      .then((res) => MPhotosService.convert(res));
  }

  uploadCameraImage(cameraId: string, file: File): Promise<mt.Camera> {
    console.log(file.name)
    const formData = new FormData();
    formData.append("cameraImage", file, file.name);
    return MPhotosService.reqMPBody(
      `/api/cameras/${cameraId}/image/upload`,
      formData
    )
      .then((res) => res as MPhotosResponse<mt.Camera>)
      .then((res) => MPhotosService.convert(res));
  }

  updateGuest(name: string, email: string): Promise<mt.Guest> {
    const data = { name: name, email: email };
    return MPhotosService.reqBody("/api/guest/update", data, "POST")
      .then((res) => res as MPhotosResponse<mt.Guest>)
      .then((res) => MPhotosService.convert(res));
  }

  uploadDrivePhotos(): Promise<mt.DriveFiles> {
    return MPhotosService.req("/api/drive/upload", "PUT")
      .then((res) => res as MPhotosResponse<mt.DriveFiles>)
      .then((res) => MPhotosService.convert(res));
  }

  uploadLocalPhoto(file: File): Promise<mt.Photo> {
    const formData = new FormData();
    formData.append("sourceId", file.name);
    formData.append("sourceDate", new Date(file.lastModified).toISOString());
    formData.append("image", file, file.name);
    return MPhotosService.reqMPBody(`/api/local/upload`, formData)
      .then((res) => res as MPhotosResponse<mt.Photo>)
      .then((res) => MPhotosService.convert(res));
  }

  updatePhoto(
    photoId: string,
    title: string,
    description: string,
    keywords: string,
    albums: string[]
  ): Promise<mt.Photo> {
    const data = {
      id: photoId,
      title: title,
      description: description,
      keywords: keywords.split(","),
      albums: albums,
    };
    return MPhotosService.reqBody(`/api/photos/${photoId}`, data)
      .then((res) => res as MPhotosResponse<mt.Photo>)
      .then((res) => MPhotosService.convert(res));
  }

  updateUXConfig(uxConfig: mt.UXConfig): Promise<mt.UXConfig> {
    return MPhotosService.reqBody("/api/user/config", uxConfig, "POST")
      .then((res) => res as MPhotosResponse<mt.UXConfig>)
      .then((res) => MPhotosService.convert(res));
  }

  updateUserDrive(name: string): Promise<mt.User> {
    //alert("change folder name to " + name);
    return MPhotosService.reqBody("/api/user/gdrive", { driveFolderName: name })
      .then((res) => res as MPhotosResponse<mt.User>)
      .then((res) => MPhotosService.convert(res));
  }

  updateUserPic(pic: string): Promise<mt.User> {
    return MPhotosService.reqBody("/api/user/pic", { pic: pic })
      .then((res) => res as MPhotosResponse<mt.User>)
      .then((res) => MPhotosService.convert(res));
  }

  updateUser(name: string, bio: string, pic: string): Promise<mt.User> {
    return MPhotosService.reqBody("/api/user", {
      name: name,
      bio: bio,
      pic: pic,
    })
      .then((res) => res as MPhotosResponse<mt.User>)
      .then((res) => MPhotosService.convert(res));
  }

  verifyGuest(query: string): Promise<boolean> {
    return MPhotosService.req(`/api/guest/verify${query}`)
      .then((res) => res as MPhotosResponse<mt.Guest>)
      .then((res) => MPhotosService.convert(res).verified);
  }
}

const PhotosService = new MPhotosService();

export function usePhotoService(): MPhotosService {
  return PhotosService;
}
//export default PhotosService;
