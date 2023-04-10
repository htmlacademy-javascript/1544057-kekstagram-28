import { createPhotos } from './photos.mjs';
import { renderUserPhotos } from './userPhotosRenderer.mjs';
import { addPictureHandlers } from './fullSizePhoto.js';

const userPhotos = createPhotos();

renderUserPhotos(userPhotos);
addPictureHandlers(userPhotos);
