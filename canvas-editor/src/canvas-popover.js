
import VirtualElement, { h } from 'virtual-element-js';
import { createNode, insertHTML } from './utils.js';

import Pikaday from './lib/pikaday.js';

/**
  CANVAS POPOVER element <canvas-popover>
  the mini editor part
**/
VirtualElement.register('canvas-popover',{

  onCreated() {
    this.setAttribute('show','false')
  },

  onAttributeChanged(attr, old, val) {
    if(attr === 'show'){

      switch (val) {
        case 'true':
          // Show Popover
          this.toggleShow(true)
          setTimeout(this.showPopover.bind(this))
          break;

        case 'false':
          // Hide It!
          this.toggleShow(false)
          break;
      }
    }
  },

  hide() {
    document.removeEventListener('click',this.evt, false)
    this.setAttribute('show',false)
    this.myInput().value = ""
  },

  toggleShow(show) {
    if(show) this.className = this.className.replace(' hide','')
    else this.className += ' hide'
  },

  myInput() {
    return this.querySelector('[popover-input]')
  },

  myEditable() {
    let name = this.getAttribute('name')
    return document.querySelector('canvas-editable[popover='+name+']')
  },

  showPopover() {
    // make a event handler for click outside event
    this.evt = (e) => {
      let itsChildren = this.contains(e.target)
      if(e.target !== this && !itsChildren) this.hide()
    }

    // Add click outside event
    document.addEventListener('click',this.evt,false)

    // Prepare the input
    this.prepareInput()
  },

  prepareInput(){
    // Prepare the input
    let $editable = this.myEditable()
    let $input = this.myInput()

    // Make an update
    $input.oninput = (e) => {
      $editable.children[0].innerHTML = e.target.value
    }

    // Close Popover when enter or esc is pressed
    $input.onkeydown = (e) => {
      let enterIsPressed = e.which === 13
      let escIsPressed = e.which === 27
      if(enterIsPressed || escIsPressed) this.hide()
    }

    // Default Value
    $input.value = $editable.children[0].innerHTML

    // Focus On Input
    setTimeout(() => {
      // http://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
      if(typeof $input.select === 'function')$input.select()
    })

    this.prepareDateInput()

    this.prepareRadioCheck()

  },

  prepareDateInput() {
    let $editable = this.myEditable()
    let $input = this.myInput()
    if($input.getAttribute('popover-input') !== 'date') return false
    else {
      if(!this.picker){
        var field = $input
        this.picker = new Pikaday({
          bound: false,
          field: $input,
          format: $input.getAttribute('format'),
          onSelect(date) {
            $editable.children[0].innerHTML = $input.value
          }
        });
        this.picker.setDate($input.value)
        field.parentNode.insertBefore(this.picker.el, field.nextSibling);
      }
    }
  },

  prepareRadioCheck() {
    let $editable = this.myEditable()

    // If Radio Check is Length
    let $radioCheck = this.querySelector('[popover-radio-check]')
    if($radioCheck){

      // Set Default Value
      let inputType = $radioCheck.querySelector('input').type

      let defaultValue;
      if(inputType === 'checkbox') {
        defaultValue = $editable.children[0].innerHTML.split(', ')
        defaultValue.forEach((val) => {
          $radioCheck.querySelector('[value="'+val+'"]').checked = true
        })
      }
      else if(inputType === 'radio') {
        defaultValue = $editable.children[0].innerHTML
        $radioCheck.querySelector('[value="'+defaultValue+'"]').checked = true
      }

      let allInput = $radioCheck.querySelectorAll('input')

      for (var i = 0; i < allInput.length; i++) {
        let input = allInput[i]
        input.onchange = (e) => {
          if(inputType === 'checkbox') this.setCheckValue(allInput)
          else if(inputType === 'radio') this.setRadioValue(allInput,e)
        }
      }
    }
  },

  setCheckValue(allInput) {
    let allValue = []
    for (var i = 0; i < allInput.length; i++) {
      let input = allInput[i]
      if(input.checked) allValue.push(input.value)
    }
    let theValue = allValue.join(', ')
    this.myInput().value = theValue
    this.myEditable().children[0].innerHTML = theValue
  },

  setRadioValue(allInput,e) {
    let theValue = e.target.value
    this.myInput().value = theValue
    this.myEditable().children[0].innerHTML = theValue

    for (var i = 0; i < allInput.length; i++) {
      let input = allInput[i]
      if(input !== e.target) input.checked = false
    }
  }

})
