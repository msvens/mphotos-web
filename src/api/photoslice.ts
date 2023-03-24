import { Photo } from "./types";

export class Photoslice {
  private photos: Photo[];
  private idx: number;

  constructor(photos?: Photo[], idx?: number) {
    this.photos = photos ? photos : [];
    this.idx = idx ? idx : 0;
  }

  isEmpty(): boolean {
    return this.photos.length === 0;
  }

  hasPhotos(): boolean {
    return this.photos.length > 0;
  }

  get(): Photo {
    if (this.isEmpty()) throw new Error("no photo");
    return this.photos[this.idx];
  }

  id(): string {
    return this.get().id;
  }

  delete(): Photoslice {
    const id = this.get().id;
    const newPhotos = this.photos.filter((p) => p.id !== id);
    const newIdx = this.idx >= newPhotos.length ? 0 : this.idx;
    return new Photoslice(newPhotos, newIdx);
  }

  update(p: Photo): Photoslice {
    const newPhotos = this.photos.map((photo) => {
      if (photo.id === p.id) {
        return p;
      } else return photo;
    });
    return new Photoslice(newPhotos, this.idx);
  }

  next(): Photoslice {
    const newIdx = this.idx + 1 >= this.photos.length ? 0 : this.idx + 1;
    return new Photoslice(this.photos, newIdx);
  }

  previous(): Photoslice {
    const newIdx = this.idx - 1 < 0 ? this.photos.length - 1 : this.idx - 1;
    return new Photoslice(this.photos, newIdx);
  }
}
