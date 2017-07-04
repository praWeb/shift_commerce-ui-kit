// import libraries
import React, { Component } from "react"
import classNames from "classnames"

export default class PillBadge extends Component {
  render() {
    let {
      className,
      status,
      label,
  ...otherProps
  } = this.props

    return <span
    className={ classNames('o-pill-badge', `o-pill-badge--${status}`, className) }
    { ...otherProps }
  >{ label }</span>
  }
}
