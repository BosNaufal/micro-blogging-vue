
import VirtualElement, { h } from 'virtual-element-js';
import { createNode, insertHTML, findParent, isReadMode } from './utils.js';

/**
  CANVAS EDITABLE element <canvas-editable>
  the Popoover to make spesific editing Element
**/
VirtualElement.register('canvas-editable', {

  onCreated() {
    this.onclick = this.handleClick.bind(this)
  },

  myPopover() {
    let popover = this.getAttribute('popover')
    return document.querySelector('canvas-popover[name='+popover+']')
  },

  handleClick(e) {

    if(isReadMode()) return false

    // Disable Edit Mode in parentNode a.k.a <canvas-editor>
    setTimeout(() => {
      let $subEditor = findParent(this,'canvas-sub-editor');
      $subEditor.parentNode.contentEditable = false
    })

    // Find for this popover
    let $popover = this.myPopover()

    let $popoverShow = $popover.attributes['show'].value
    $popover.setAttribute('show', $popoverShow === 'true' ? 'false' : 'true')
  }

})
