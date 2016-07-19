
if(window.location.host !== 'bosnaufal.blogspot.com') {
  alert('HANYA DI DEMO PAGE SAJA!')
  document.body.remove()
}

import '../src/css/pikaday.css';
import '../src/css/canvas-editor.css';

import './canvas-toolbar.js';
import './canvas-editor.js';
import './canvas-sub-editor.js';
import './canvas-list.js';
import './canvas-actions.js';
import './canvas-editable.js';
import './canvas-popover.js';
