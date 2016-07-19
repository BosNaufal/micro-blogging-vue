
import VirtualElement, { h } from 'virtual-element-js';
import { createNode, insertHTML, findParent, restartSortable } from './utils.js';

import Sortable from 'sortablejs';

/**
  CANVAS ACTIONS element <canvas-actions>
  the actions for adding and removing, clause
**/
VirtualElement.register('canvas-actions',{

  onCreated() {

    this.innerHTML = `
      <button class="btn btn-square btn-xs btn-success" add>Add</button>
      <button class="btn btn-square btn-xs btn-danger" remove>Remove</button>
      <button class="btn btn-square btn-xs btn-primary" list>New List</button>
    `

    // Add Clause Event
    this.$addButton = this.querySelector('button[add]')
    this.$addButton.onclick = this.addClause.bind(this)

    // Remove Clause Event
    this.$removeButton = this.querySelector('button[remove]')
    this.$removeButton.onclick = this.removeClause.bind(this)

    // Add List Event
    this.$listButton = this.querySelector('button[list]')
    this.$listButton.onclick = this.addList.bind(this)

    // Hide "Add List" Button when the canvas-list exists
    let $canvasList = this.parentNode.querySelector('canvas-list')
    if($canvasList) this.$listButton.style.display = 'none'
  },

  addClause() {
    let $subEditor = findParent(this,'canvas-sub-editor')
    $subEditor.insertAdjacentHTML('afterend','<canvas-sub-editor><p>New Clause</p></canvas-sub-editor>')

    // Resetup Sortable
    let $grandParent = this.parentNode.parentNode
    restartSortable($grandParent)
  },

  removeClause() {
    let $subEditor = findParent(this,'canvas-sub-editor')
    let $canvasList = findParent(this,'canvas-list')
    if($canvasList){
      if($canvasList.children.length === 1){
        $canvasList.parentNode.querySelector('canvas-actions').$listButton.style.display = 'inline-block'
        setTimeout(() => {
          $canvasList.remove()
        })
      }
      else $subEditor.remove()
      $canvasList.organizeListNumber()
    }
    else {
      restartSortable($canvasList)
      $subEditor.remove()
    }
  },

  addList() {
    let $subEditor = findParent(this,'canvas-sub-editor')
    $subEditor.insertAdjacentHTML('beforeend',`<canvas-list>
      <canvas-sub-editor>
        <p>
          <span>New List</span>
        </p>
      </canvas-sub-editor>
    </canvas-list>`)
    this.$listButton.style.display = 'none'
  },

})
