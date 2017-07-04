// import libraries
import React, { Component } from "react"
import classNames from "classnames"

export default class Button extends Component {
  render() {
    let {
      className,
      status,
      children,
      ...otherProps
    } = this.props

    return <button
      className={ classNames('o-button', `o-button--${status}`, className) }
      tabIndex="0"
      { ...otherProps }
    >{ children }</button>
  }
}
