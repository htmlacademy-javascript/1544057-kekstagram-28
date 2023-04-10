import { createPhotos } from './photos.mjs';
import { renderUserPhotos } from './userPhotosRenderer.mjs';


const userPhotos = createPhotos();


renderUserPhotos(userPhotos);
