import { createPhotos } from './photo/photos.mjs';
import { renderUserPhotos } from './photo/userPhotosRenderer.mjs';
import { addPictureHandlers } from './photo/fullSizePhoto.js';
import './form/form.js';

const userPhotos = createPhotos();

renderUserPhotos(userPhotos);
addPictureHandlers(userPhotos);
