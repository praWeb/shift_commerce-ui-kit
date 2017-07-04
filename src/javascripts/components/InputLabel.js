import React, { Component } from "react"
import classNames from 'classnames'

export default class InputLabel extends Component {
  render() {
    let {
      label,
      inputId,
      className
    } = this.props

    let defaultClassName = 'c-input__group__label'

    // htmlFor used as 'for' not available
    return (
      <label className={ classNames(className, defaultClassName) } htmlFor={ inputId }>
        { label }
      </label>
    )
  }
}
