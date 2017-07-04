// import libraries
import React, { Component } from "react"
import classNames from "classnames"

export default class Panel extends Component {
  render() {
    let {
      className,
      children,
      ...otherProps
    } = this.props

    return <div
      className={ classNames('o-panel', className) }
      { ...otherProps }
    >{ children }</div>
  }
}
