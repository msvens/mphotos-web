import { useEffect, useRef, useState } from "react";

//From: https://levelup.gitconnected.com/how-to-rotate-an-image-in-javascript-and-keep-its-aspect-ratio-e42060190889

type RotatedImage = {
  src: string;
  width: number;
  height: number;
} | null;

let canvas: HTMLCanvasElement | null = null;
let canvasCtx2D: CanvasRenderingContext2D | null = null;

function getRotatedImage(
  image: HTMLImageElement | null,
  rotation: number
): RotatedImage {
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvasCtx2D = canvas.getContext("2d");
  }
  if (!image || !canvasCtx2D) return null;

  const { width: imageWidth, height: imageHeight, currentSrc } = image;
  const degree = rotation % 360;
  if (!degree) {
    return {
      src: currentSrc,
      width: imageWidth,
      height: imageHeight,
    };
  }
  const { PI, sin, cos, abs } = Math;
  const angle = (degree * PI) / 180;
  const sinAngle = sin(angle);
  const cosAngle = cos(angle);

  canvas.width = abs(imageWidth * cosAngle) + abs(imageHeight * sinAngle);
  canvas.height = abs(imageWidth * sinAngle) + abs(imageHeight * cosAngle);

  // The width and height of the canvas will be automatically rounded.
  const { width: canvasWidth, height: canvasHeight } = canvas;

  canvasCtx2D.clearRect(0, 0, canvasWidth, canvasHeight);
  canvasCtx2D.translate(canvasWidth / 2, canvasHeight / 2);
  canvasCtx2D.rotate(angle);

  canvasCtx2D.drawImage(
    image,
    -imageWidth / 2,
    -imageHeight / 2,
    imageWidth,
    imageHeight
  );

  const src = canvas.toDataURL("image/png");
  canvas.width = 0;
  canvas.height = 0;

  return {
    src,
    width: canvasWidth,
    height: canvasHeight,
  };
}

export function useRotateImage(
  imageSrc: string,
  rotation?: number
): RotatedImage {
  const imageEle = useRef<HTMLImageElement | null>(null);
  const [rotatedImage, setRotatedImage] = useState<RotatedImage>(null);

  useEffect(() => {
    if (typeof rotation === "number") {
      let currImage = imageEle.current;

      if (currImage?.currentSrc !== imageSrc) {
        currImage = new Image();
        imageEle.current = currImage;

        currImage.src = imageSrc;
      }

      currImage.decode().then(
        () => setRotatedImage(getRotatedImage(currImage, rotation)),
        () => setRotatedImage(null)
      );
    }
  }, [imageSrc, rotation]);

  return rotatedImage;
}
