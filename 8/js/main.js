import { createEventFormHandlers } from './form.js';
import { renderPhotoCards} from './picture.js';
import { getData } from './network.js';
import { showAlert } from './util.js';

getData(renderPhotoCards, showAlert);
createEventFormHandlers();
