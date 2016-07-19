
import VirtualElement, { h } from 'virtual-element-js';
import { createNode, insertHTML, setupSortable } from './utils.js';

import Sortable from 'sortablejs';

/**
  CANVAS EDITOR element <canvas-editor>
  the mini editor part
**/
VirtualElement.register('canvas-editor',{

  onCreated() {

    this.sortable = setupSortable(this)

    // Prevent Copy
    this.oncopy = (e) => {
      e.preventDefault()
    }
  }

})
