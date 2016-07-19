
import Sortable from 'sortablejs';

export let allSortable = []

/**
  Setup Sortable
  @param {Node} el
**/
export function setupSortable(el){
  let sortable = Sortable.create(el,{
    scroll: document.querySelector('canvas-editor'),
    scrollSensitivity: 15,
    scrollSpeed: 15,
    forceFallback: true,
    fallbackClass: "sortable-dragging",
    onStart(e) {
      setTimeout(() => {
        let $dragEl = document.querySelector('.sortable-dragging')
        if($dragEl) {
          $dragEl.style.opacity = 1
          $dragEl.style.height = "auto"
        }
      })
    },
  });

  let isLength = allSortable.find((item) => item === el)
  if(!isLength) allSortable.push(el)

  return sortable
};


/**
  Destroy All Sortable
**/
export function destroyAllSortable(){
  allSortable.forEach((el) => {
    if(el.sortable.el) el.sortable.destroy()
  })
};


/**
  Restart Sortable
  @param {Node} el
**/
export function restartSortable(el){
  if(el.sortable.el){
    el.sortable.destroy()
    el.sortable = setupSortable(el)
  }
};


/**
  Setup All Sortable
**/
export function setupAllSortable(){
  allSortable.forEach((el) => {
    el.sortable = setupSortable(el)
  })
};


/**
  To Create Node
  @param {String} tag
  @param {String} html
  @return {Node}
**/
export function createNode(tag, html){
  let node = document.createElement(tag)
  node.innerHTML = html
  return node
};



/**
  Insert Node to Current Caret Position
  @param {String} tag
  @param {String} html
  @return {Node}

  refs:
  http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
  http://stackoverflow.com/questions/2920150/insert-text-at-cursor-in-a-content-editable-div?lq=1
  The Easiest Concept:
  http://stackoverflow.com/questions/16601934/js-jquery-contenteditable-insert-text-and-move-cursor-to-end?lq=1
**/
export function insertHTML(node) {
  // Get Selection
  let selection = document.getSelection()
  // Get Caret
  let range = selection.getRangeAt(0)
  // Insert Node after Range or Caret
  range.insertNode(node)
  // Move the caret to front of new Node
  range.setStartAfter(node)
  // Remove Selection (Strange Firefox Behaviour)
  selection.removeAllRanges()
  // Add new Rage as reference which is in front of Node
  selection.addRange(range)
}

/**
  Find Closest Parent With Vanilla Javascript
  @param {Node} currentNode
  @param {String} target
  @return {Node}
**/
export function findParent(currentNode, target) {
  if(currentNode === document || currentNode.parentNode === null) return false
  if(currentNode.parentNode.nodeName == target.toUpperCase()) return currentNode.parentNode
  else return findParent(currentNode.parentNode,target)
}

/**
  Check whether in read mode?
  @return {Boolean}
**/
export function isReadMode() {
  let readMode = document.querySelector('.canvas-read-mode')
  if(readMode) return true
  else return false
}
