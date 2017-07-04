import React, { Component } from "react"
import classNames from 'classnames'

export default class InputField extends Component {
  render() {
    let {
      className
    } = this.props
    let type = this.props.type || 'text'
    let defaultClassName = 'c-input__group__field'
    let typeClassName = `${defaultClassName}--${type}`

    return (
      <input
        className={ classNames(defaultClassName, typeClassName, className) }
        type={ type }
        { ...this.props }
      />
    )
  }
}
