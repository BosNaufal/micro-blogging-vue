
import VirtualElement, { h } from 'virtual-element-js';
import { createNode, insertHTML, setupSortable } from './utils.js';


/**
  CANVAS LIST element <canvas-list>
  the list
**/
VirtualElement.register('canvas-list',{

  onCreated() {
    setTimeout(() => {
      this.sortable = setupSortable(this)
    })
  },

  onDetached() {
    if(this.children.length === 0 && this.sortable.el) this.sortable.destroy()
  },

  // Add Numbering in list
  organizeListNumber() {
    // http://stackoverflow.com/questions/378365/finding-dom-node-index
    let listChildrens = this.childNodes
    let siblings = []
    for (var i = 0; i < listChildrens.length; i++) {
      let child = listChildrens[i]
      if(child.nodeName === "CANVAS-SUB-EDITOR" && child.nodeType === 1) siblings.push(child)
    }

    // Add Numbering
    siblings.forEach((node,i) => {
      let $number = node.querySelector('span.number')
      if(!$number) node.insertAdjacentHTML('afterbegin','<span class="number">'+(i+1)+'</span>')
      else $number.innerText = i+1
    })
  },

})
