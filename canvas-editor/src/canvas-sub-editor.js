
import VirtualElement, { h } from 'virtual-element-js';
import {
  createNode,
  insertHTML,
  findParent,
  setupAllSortable,
  destroyAllSortable,
  isReadMode
} from './utils.js';


/**
  CANVAS SUB EDITOR element <canvas-sub-editor>
  the mini editor part
**/
VirtualElement.register('canvas-sub-editor', {

  onCreated(){
    this.activate()
  },

  activate() {

    // Set the main Content
    this.mainContent = this.querySelector('p')

    // Set Markup
    this.mainContent.insertAdjacentHTML('afterend','<canvas-actions></canvas-actions>')

    // Set Events
    this.mainContent.ondblclick = this.handleClick.bind(this)
    this.mainContent.onmousedown = (e) => {
      if(!this.editing) this.mainContent.contentEditable = false


      // // Prevent Mobile Selection
      // setTimeout(() => {
      //   e.preventDefault()
      //   console.log('long touch!', e)
      // },600)
    }
    this.mainContent.onblur = this.handleBlur.bind(this)
    this.mainContent.onkeydown = this.handleInput.bind(this)

    // Organize List Numbering
    this.organizeListNumber()

  },

  onAttached() {
    // Organize List Numbering
    this.organizeListNumber()
  },

  organizeListNumber() {
    setTimeout(() => {
      let $canvasList = findParent(this,'canvas-list')
      if($canvasList) {
        $canvasList.organizeListNumber()
      }
    })
  },

  handleClick(e){
    
      if(isReadMode()) return false

      this.mainContent.contentEditable = true

      setTimeout(() => {
        if(!this.editing){
          this.mainContent.focus()
          this.mainContent.className += "canvas-focus"
        }
        this.editing = true
      })

      destroyAllSortable()
  },

  handleInput(e) {
    // Make It Read Only and Should Edit via <canvas-popover>
    // let selection = document.getSelection()
    // console.log([selection.anchorNode.parentNode.parentNode.nodeName]);
    // if(selection.anchorNode !== null && selection.anchorNode.parentNode.parentNode.nodeName === 'CANVAS-EDITABLE') this.handleBlur()

    let enterIsPressed = e.which === 13;
    if(enterIsPressed){
      let selection = document.getSelection()
      let range = selection.getRangeAt(0)
      // console.log(selection,range);
      range.setStartAfter(selection.focusNode)
      // insertHTML(createNode('p',''))
    }
  },

  handleBlur(){
    this.editing = false
    this.mainContent.blur()
    this.mainContent.className = this.mainContent.className.replace('canvas-focus','')

    setupAllSortable()
  }

})
