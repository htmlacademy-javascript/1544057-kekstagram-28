import { renderUserPhotos } from './photo/user-photos-renderer.js';
import { addPictureHandlers } from './photo/full-size-photo.js';
import { get } from './api.js';
import './form/form.js';

get().then((userPhotos) => {
  renderUserPhotos(userPhotos);
  addPictureHandlers(userPhotos);
});
