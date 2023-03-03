import * as consts from './constants.mjs';
import { createComments } from './comments.mjs';
import * as func from './utils.mjs';
import { createPhotos } from './photos.mjs';

createPhotos({
  consts,
  func,
  createComments,
});

