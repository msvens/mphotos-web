export type Album = {
  id: string;
  name: string;
  description: string;
  coverPic: string;
};

export type AlbumCollection = {
  info: Album;
  photos: PhotoList;
};

export type ApiError = {
  code: number;
  message: string;
};

export type AuthUser = {
  authenticated: boolean;
};

export type Camera = {
  id: string;
  model: string;
  make: string;
  year: number;
  effectivePixels: number;
  totalPixels: number;
  sensorSize: string;
  sensorType: string;
  sensorResolution: string;
  imageResolution: string;
  cropFactor: number;
  opticalZoom: number;
  digitalZoom: boolean;
  iso: string;
  raw: boolean;
  manualFocus: boolean;
  focusRange: number;
  macroFocusRange: number;
  focalLengthEquiv: string;
  aperturePriority: boolean;
  maxAperture: string;
  maxApertureEquiv: string;
  metering: string;
  exposureComp: string;
  shutterPriority: boolean;
  minShutterSpeed: string;
  maxShutterSpeed: string;
  builtInFlash: boolean;
  externalFlash: boolean;
  viewFinder: string;
  videoCapture: boolean;
  maxVideoResolution: string;
  gps: boolean;
  image: string;
};

export type CameraSettingDisplay = {
  displayName: string;
  displayValue: string;
  rawValue: string;
};

export enum CameraImageSize {
  Tiny = "48",
  Small = "192",
  Medium = "512",
  Original = "O0",
}

export type ColorScheme = {
  backgroundColor: string;
  color: string;
};

export enum Colors {
  White = "#fff",
  Light = "#fafafa",
  Grey = "#bdbdbd",
  Dark = "#303030",
  Black = "#000000",
}

export type DriveFile = {
  id: string;
  name: string;
  kind: string;
  mimeType: string;
  md5Checksum: string;
};

export type DriveFiles = {
  length: number;
  files: DriveFile[];
};

export type Guest = {
  email: string;
  name: string;
  verified: boolean;
  time: string;
};

export type GuestReaction = {
  email: string;
  name: string;
  kind: string;
};

export type GuestLike = {
  like: boolean;
};

export enum ImageAspect {
  LANDSCAPE,
  PORTRAIT,
  SQUARE,
}

export type Job = {
  id: string;
  state: JobState;
  percent: number;
  numFiles: number;
  numProcessed: number;
  error?: ApiError;
};

export enum JobState {
  SCHEDULED = "SCHEDULED",
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  ABORTED = "ABORTED",
}

export type EditPhotoParams = {
  rotation?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type Photo = {
  id: string;
  md5: string;
  source: string;
  sourceDate: string;
  uploadDate: string;
  originalDate: string;
  fileName: string;
  title: string;
  keywords: string;
  description: string;
  cameraMake: string;
  cameraModel: string;
  lensMake?: string;
  lensModel?: string;
  focalLength: string;
  focalLength35: string;
  iso: number;
  exposure: string;
  fNumber: number;
  width: number;
  height: number;
  private: boolean;
  likes: number;
};

export type PhotoComment = {
  id: number;
  photoId: string;
  name: string;
  time: string;
  body: string;
};

export interface PhotoList {
  length: number;
  photos: Photo[];
}

export enum PhotoType {
  Square = 0,
  Landscape,
  Portrait,
  Resize,
  Original,
  Thumb,
  Dynamic,
}

export type SearchPhotoParams = {
  cameraModel?: string;
};

export type User = {
  name: string;
  bio: string;
  pic: string;
  driveFolderId?: string;
  driveFolderName?: string;
};

export type UXConfig = {
  photoGridCols: number;
  photoItemsLoad: number;
  photoGridSpacing: number;
  showBio: boolean;
  photoBackgroundColor: string;
  photoBorders: "none" | "all" | "left-right";
  colorTheme: "light" | "dark";
  denseTopBar: boolean;
  denseBottomBar: boolean;

  photoSortOrder: "original" | "upload";
};
