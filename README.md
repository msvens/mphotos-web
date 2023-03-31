# About

This project is the frontend for [mphotos](https://www.github.com/msvens/mphotos).

It is my personal [photo blog](https://www.mellowtech.org). The focus is to create
a simplified workflow from lightroom to a photo blog such that once you export
your edited images to Google Drive they will be automatically picked up by the
photo blog.

## Version 3

- Upload photos from Google Drive or Local Drive
- Automatic exif parsing and thumbnail creation
- Setting basic user profile information
- Create, delete and edit image meta information
- Crop, resize and rotate images
- Private photos - set photos to only be viewable if you are logged in
- Create photo albums
- Infinite scrolling of image grid
- Editable Camera Db - images, information, etc
- Mobile aware (swipes, etc)
- Fullscreen mode
- Comments, Likes
- Configurable UI (color theme, image grid settings, etc.)
- And more

## Develop

### Create
Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```console
$ yarn create react-app my-app --template typescript
```

### Dependencis

mui components
```console
$ yarn add @mui/material @emotion/react @emotion/styled
$ yarn add @mui/icons-material
$ yarn add react-infinite-scroll-component
$ yarn add react-image-crop
```



### Commands
* **yarn start** - run in development mode
* **yarn test** - launch tet runner
* **yarn build** - build for production
* **yarn eject** - use with care

## Thanks

