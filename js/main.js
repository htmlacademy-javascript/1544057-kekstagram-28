import * as consts from './constants.mjs';
import { createComments } from './comments.mjs';
import * as func from './utils.mjs';
import { createPhotos } from './photos.mjs';
import { renderUserPhotos } from './userPhotosRenderer.mjs';


const userPhotos = createPhotos({
  consts,
  func,
  createComments,
});

renderUserPhotos(userPhotos);
