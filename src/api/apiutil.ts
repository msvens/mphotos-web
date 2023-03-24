import {
  Camera,
  CameraSettingDisplay,
  Colors,
  ColorScheme,
  SearchPhotoParams,
} from "./types";

const LightBackgroundText = "rgba(0, 0, 0, 0.87)";

export function createPhotoSearchParams(
  cameraModel: string
): SearchPhotoParams {
  return { cameraModel: cameraModel };
}

export function colorScheme(backroundColor: string): ColorScheme {
  switch (backroundColor) {
    case Colors.White:
    case Colors.Light:
    case Colors.Grey:
      return { backgroundColor: backroundColor, color: LightBackgroundText };
    case Colors.Dark:
    case Colors.Black:
      return { backgroundColor: backroundColor, color: Colors.White };
    default:
      return { backgroundColor: Colors.Light, color: LightBackgroundText };
  }
}

export function getCameraSettingDisplayName(
  setting: string,
  c: Camera
): CameraSettingDisplay {
  function r(
    display: string,
    value: string,
    raw?: string
  ): CameraSettingDisplay {
    return raw
      ? { displayName: display, displayValue: value, rawValue: raw }
      : { displayName: display, displayValue: value, rawValue: value };
  }
  switch (setting) {
    case "model":
      return r("Model", c.model);
    case "make":
      return r("Make", c.make);
    case "year":
      return r("Year", c.year.toString());
    case "effectivePixels":
      return r(
        "Effective Pixels",
        "" + c.effectivePixels / 1000000 + "M",
        c.effectivePixels.toString()
      );
    case "totalPixels":
      return r(
        "Total Pixels",
        "" + c.totalPixels / 1000000 + "M",
        c.totalPixels.toString()
      );
    case "sensorSize":
      return r("Sensor Size", c.sensorSize);
    case "sensorType":
      return r("Sensor Type", c.sensorType);
    case "sensorResolution":
      return r("Sensor Resolution", c.sensorResolution);
    case "imageResolution":
      return r("Image Resolution", c.imageResolution);
    case "cropFactor":
      return r("Crop Factor", c.cropFactor.toString());
    case "opticalZoom":
      return r("Optical Zoom", c.opticalZoom + "x", c.opticalZoom.toString());
    case "digitalZoom":
      return r(
        "Digital Zoom",
        c.digitalZoom ? "Yes" : "No",
        c.digitalZoom.toString()
      );
    case "iso":
      return r("ISO", c.iso);
    case "raw":
      return r("Supports Raw", c.raw ? "Yes" : "No", c.raw.toString());
    case "manualFocus":
      return r(
        "Manual Focus",
        c.manualFocus ? "Yes" : "No",
        c.manualFocus.toString()
      );
    case "focusRange":
      return r("Focus Range", c.focusRange + " cm", c.focusRange.toString());
    case "macroFocusRange":
      return r(
        "Macro Focus Range",
        c.macroFocusRange + " cm",
        c.macroFocusRange.toString()
      );
    case "focalLengthEquiv":
      return r("Focal Length (35mm)", c.focalLengthEquiv);
    case "aperturePriority":
      return r(
        "Aperture Priority",
        c.aperturePriority ? "Yes" : "No",
        c.aperturePriority.toString()
      );
    case "maxAperture":
      return r("Max Aperture", c.maxAperture);
    case "maxApertureEquiv":
      return r("Max Aperture (35mm)", c.maxApertureEquiv);
    case "metering":
      return r("Metering", c.metering);
    case "exposureComp":
      return r("Exposure Compensation", c.exposureComp);
    case "shutterPriority":
      return r(
        "Shutter Priority",
        c.shutterPriority ? "Yes" : "No",
        c.shutterPriority.toString()
      );
    case "minShutterSpeed":
      return r("Min Shutter Priority", c.minShutterSpeed);
    case "maxShutterSpeed":
      return r("Max Shutter Speed", c.maxShutterSpeed);
    case "builtInFlash":
      return r(
        "Built-in Flash",
        c.builtInFlash ? "Yes" : "No",
        c.builtInFlash.toString()
      );
    case "externalFlash":
      return r(
        "External Flash",
        c.externalFlash ? "Yes" : "No",
        c.externalFlash.toString()
      );
    case "viewFinder":
      return r("View Finder", c.viewFinder);
    case "videoCapture":
      return r(
        "Video Capture",
        c.videoCapture ? "Yes" : "No",
        c.videoCapture.toString()
      );
    case "maxVideoResolution":
      return r("Max Video Resolution", c.maxVideoResolution);
    case "gps":
      return r("GPS", c.gps ? "Yes" : "No", c.gps.toString());
    case "image":
      return r("Image", c.image);
    default:
      return r(setting, "not defined");
  }
}

export function parseSearchParams(queryString: string): SearchPhotoParams {
  const urlParams = new URLSearchParams(queryString);
  const cm = urlParams.get("cameraModel");
  return { cameraModel: cm === null ? undefined : cm };
}

const searchSpace = new RegExp(/\s+/g);

export function toCameraId(cameraModel: string): string {
  return cameraModel.toLowerCase().replaceAll(searchSpace, "-");
}

export function toQueryString(params: SearchPhotoParams): string {
  const urlParams = new URLSearchParams();
  if (params.cameraModel) urlParams.append("cameraModel", params.cameraModel);
  return urlParams.toString();
}

export function setCameraSetting(
  c: Camera,
  key: string,
  value: string
): Camera {
  function getNumber(current: number, newValue: string): number {
    let v = Number(newValue);
    return Number.isNaN(v) ? current : v;
  }

  function getBoolean(newValue: string): boolean {
    let n = newValue.trim().toLowerCase();
    return !n || n === "false" || n === "f" || n === "no" || n === "0"
      ? false
      : true;
  }

  const cc: Camera = { ...c };
  switch (key) {
    case "model":
      cc.model = value;
      break;
    case "make":
      cc.make = value;
      break;
    case "year":
      cc.year = getNumber(cc.year, value);
      break;
    case "effectivePixels":
      cc.effectivePixels = getNumber(cc.effectivePixels, value);
      break;
    case "totalPixels":
      cc.totalPixels = getNumber(cc.totalPixels, value);
      break;
    case "sensorSize":
      cc.sensorSize = value;
      break;
    case "sensorType":
      cc.sensorType = value;
      break;
    case "sensorResolution":
      cc.sensorResolution = value;
      break;
    case "imageResolution":
      cc.imageResolution = value;
      break;
    case "cropFactor":
      cc.cropFactor = getNumber(cc.cropFactor, value);
      break;
    case "opticalZoom":
      cc.opticalZoom = getNumber(cc.opticalZoom, value);
      break;
    case "digitalZoom":
      cc.digitalZoom = getBoolean(value);
      break;
    case "iso":
      cc.iso = value;
      break;
    case "raw":
      cc.raw = getBoolean(value);
      break;
    case "manualFocus":
      cc.manualFocus = getBoolean(value);
      break;
    case "focusRange":
      cc.focusRange = getNumber(cc.focusRange, value);
      break;
    case "macroFocusRange":
      cc.macroFocusRange = getNumber(cc.macroFocusRange, value);
      break;
    case "focalLengthEquiv":
      cc.focalLengthEquiv = value;
      break;
    case "maxAperture":
      cc.maxAperture = value;
      break;
    case "maxApertureEquiv":
      cc.maxApertureEquiv = value;
      break;
    case "metering":
      cc.metering = value;
      break;
    case "exposureComp":
      cc.exposureComp = value;
      break;
    case "shutterPriority":
      cc.shutterPriority = getBoolean(value);
      break;
    case "minShutterSpeed":
      cc.minShutterSpeed = value;
      break;
    case "maxShutterSpeed":
      cc.maxShutterSpeed = value;
      break;
    case "builtInFlash":
      cc.builtInFlash = getBoolean(value);
      break;
    case "externalFlash":
      cc.externalFlash = getBoolean(value);
      break;
    case "viewFinder":
      cc.viewFinder = value;
      break;
    case "videoCapture":
      cc.videoCapture = getBoolean(value);
      break;
    case "maxVideoResolution":
      cc.maxVideoResolution = value;
      break;
    case "gps":
      cc.gps = getBoolean(value);
      break;
    case "image":
      cc.image = value;
      break;
  }
  return cc;
}
