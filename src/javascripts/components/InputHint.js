import React, { Component } from "react"
import classNames from 'classnames'

export default class InputHint extends Component {
  render() {
    let defaultClassName = 'c-input__group__hint'
    let {
      className,
      otherProps
    } = this.props

    return (
      <span
        className={ classNames(defaultClassName, className) }
        { ...otherProps }
      >
        { this.props.hint }
      </span>
    )
  }
}
