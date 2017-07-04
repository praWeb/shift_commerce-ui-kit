import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

const registeredComponents = []
const handlers = []

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function findParentNode(targetNode, componentNode) {
  if (targetNode === componentNode) {
    return true
  }

  while(targetNode.parentNode) {
    if (targetNode === componentNode) {
      return true
    }

    targetNode = targetNode.parentNode
  }
  return targetNode
}

function checkIfOutside(componentNode, eventHandler){
  return function(event){

    const targetNode = event.target

    if(findParentNode(targetNode, componentNode) !== document ){
      return
    }

    eventHandler(event)
  }
}

export default function OuterShellHOC(WrappedComponent) {

  class OuterShell extends Component {

    constructor(props){
      super(props)

      let _outsideClickHandler = null

      this.getRef = this.getRef.bind(this)
      this.getInstance = this.getInstance.bind(this)
    }

    static getClass() {
      WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent
    }

    getInstance() {
      if(!WrappedComponent.prototype.isReactComponent) {
        return this
      }
      const ref = this.instanceRef

      return ref.getInstance ? ref.getInstance() : ref
    }

    componentDidMount() {
      if ((typeof document === 'undefined') || !document.createElement) {
        return
      }

      const instance = this.getInstance()

      if (typeof instance.handleClickOutside === 'function') {
        if (Component.prototype.isPrototypeOf(instance)) {
          this.__clickOutsideHandlerProp = instance.handleClickOutside.bind(instance)
        } else {
          this.__clickOutsideHandlerProp = instance.handleClickOutside
        }
      } else {
        throw new Error(
          'WrappedComponent lacks a handleClickOutside(event)'
        )
      }
      this.addOutsideClickHandler()
    }

    componentWillUnmount() {
      this.removeOutsideClickHandler()
    }

    removeOutsideClickHandler() {
      this.disableOutSideClickHandler()
      this._outsideClickHandler = false

      let pos = registeredComponents.indexOf(this)

      if(pos > -1) {
        if(handlers[pos]) {
          handlers.splice(pos,1)
        }
        registeredComponents.splice(pos, 1)
      }
    }

    disableOutSideClickHandler() {
      const fn = this._outsideClickHandler
      if(fn && typeof document !== 'undefined'){
        let events = this.props.eventTypes
        if (!events.forEach) {
          events = [events]
        }
        events.forEach(eventName => {
          const handlerOptions = !this.props.preventDefault && ['touchstart', 'touchmove'].indexOf(eventName) !== -1
            ? { passive: true }
            : null
          document.removeEventListener(eventName, fn, handlerOptions)
        })
      }
    }

    enableOutSideClickHandler() {
      const fn = this._outsideClickHandler
      if(fn && typeof document !== 'undefined'){
        let events = this.props.eventTypes
        if (!events.forEach) {
          events = [events]
        }
        events.forEach(eventName => {
          const handlerOptions = !this.props.preventDefault && ['touchstart', 'touchmove'].indexOf(eventName) !== -1
            ? { passive: true }
            : null
          document.addEventListener(eventName, fn, handlerOptions)
        })
      }
    }

    addOutsideClickHandler() {

      const fn = (this._outsideClickHandler = checkIfOutside(findDOMNode(this.getInstance()), this.__clickOutsideHandlerProp))

      const pos = registeredComponents.length

      registeredComponents.push(this)
      handlers[pos] = fn

      this.enableOutSideClickHandler()
    }

    getRef(ref) {
      this.instanceRef = ref
    }

    render() {
      var props = Object.keys(this.props).reduce((props, prop) => {
        props[prop] = this.props[prop]
        return props
      }, {})

      if (WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef
      } else {
        props.wrappedRef = this.getRef
      }

      return <WrappedComponent { ...props }/>
    }
  }

  OuterShell.displayName = `OuterShell(${getDisplayName(WrappedComponent)})`

  OuterShell.defaultProps = {
    eventTypes: ['mousedown', 'touchstart']
  }

  return OuterShell
}

