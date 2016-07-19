
import VirtualElement, { h } from 'virtual-element-js';
import {
  createNode,
  insertHTML,
  findParent,
  setupAllSortable,
  destroyAllSortable,
} from './utils.js';


/**
  CANVAS TOOLBAR element <canvas-toolbar>
  the toolbar of editor
**/
VirtualElement.register('canvas-toolbar',{

  onCreated() {

    // Set Markup
    this.innerHTML = `
      <button bold class="btn btn-default" title="Bold"><b>B</b></button>
      <button underline class="btn btn-default" title="Underline"><u>U</u></button>
      <button italic class="btn btn-default" title="Italic"><i>I</i></button>
      <button removeFormat class="btn btn-default" title="Remove Format">X</button>
      <button readMode class="btn btn-default" title="Read Mode">R</button>
      <button editMode class="btn btn-default" title="Edit Mode">E</button>
    `

    // Selector
    let $mainEditor = document.querySelector('canvas-editor')
    let $bold = this.querySelector('button[bold]')
    let $italic = this.querySelector('button[italic]')
    let $underline = this.querySelector('button[underline]')
    let $removeFormat = this.querySelector('button[removeFormat]')
    let $editMode = this.querySelector('button[editMode]')
    let $readMode = this.querySelector('button[readMode]')


    // Read Mode button first
    $editMode.style.display = "none"


    // Add Events
    $bold.onclick = () => {
      this.stayOnEditingMode()
      document.execCommand('bold', false, '')
    }
    $italic.onclick = () => {
      this.stayOnEditingMode()
      document.execCommand('italic', false, '')
    }
    $underline.onclick = () => {
      this.stayOnEditingMode()
      document.execCommand('underline', false, '')
    }
    $removeFormat.onclick = () => {
      this.stayOnEditingMode()
      document.execCommand('removeFormat', false, '')
    }


    $editMode.onclick = () => {
      $mainEditor.className = $mainEditor.className.replace('canvas-read-mode','')
      $mainEditor.className += "canvas-edit-mode"
      $readMode.style.display = "inline-block"
      $editMode.style.display = "none"
      setupAllSortable()
    }

    $readMode.onclick = () => {
      $mainEditor.className = $mainEditor.className.replace('canvas-edit-mode','')
      $mainEditor.className += "canvas-read-mode"
      $editMode.style.display = "inline-block"
      $readMode.style.display = "none"
      destroyAllSortable()
    }
  },

  stayOnEditingMode() {
    // Get Selection
    let selection = document.getSelection()
    let $subEditor = findParent(selection.anchorNode,'canvas-sub-editor')
    $subEditor.handleClick()
  }

})
