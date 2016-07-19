
import VirtualElement, { h } from 'virtual-element-js';
import { createNode, insertHTML, findParent } from './utils.js';

import dragula from 'dragula';
import autoScroll from 'dom-autoscroller';
import Sortable from 'sortablejs';


/**
  CANVAS DRAG element <canvas-drag>
  Dragable Element
**/
VirtualElement.register('canvas-drag',{

  onCreated() {
    setTimeout(() => {
      Sortable.create(this,{
        forceFallback: true,
        fallbackClass: "sortable-dragging"
      });

      // https://github.com/bevacqua/dragula/issues/121
      // let drake = dragula([this],{
      //   moves(el, container, handle) {
      //     let $handleParent = findParent(handle,'canvas-drag').parentNode
      //     let $containerParent = container.parentNode
      //     return $containerParent === $handleParent
      //   }
      // })
      // let scroll = autoScroll([window],{
      //   direction: 'vertical',
      //   margin: 20,
      //   pixels: 10,
      //   autoScroll: function(){
      //     return this.down && drake.dragging;
      //   }
      // })
    })
  }

})
