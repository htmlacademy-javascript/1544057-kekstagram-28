import { renderUserPhotos } from './photo/userPhotosRenderer.js';
import { addPictureHandlers } from './photo/fullSizePhoto.js';
import { get } from './api.js';
import './form/form.js';

get().then((userPhotos) => {
  renderUserPhotos(userPhotos);
  addPictureHandlers(userPhotos);
});
