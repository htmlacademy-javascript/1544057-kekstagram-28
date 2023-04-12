import { renderUserPhotos } from './photo/userPhotosRenderer.mjs';
import { addPictureHandlers } from './photo/fullSizePhoto.js';
import { get } from './api.js';
import './form/form.js';

get().then((userPhotos) => {
  renderUserPhotos(userPhotos);
  addPictureHandlers(userPhotos);
});
