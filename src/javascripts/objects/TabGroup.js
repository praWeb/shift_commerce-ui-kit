// import libraries
import React, { Component } from "react"
import classNames from "classnames"

export default class TabGroup extends Component {

  render() {

    let {
      className,
      children,
      ...otherProps
    } = this.props

    return (
      <div
        className={ classNames('o-tabgroup', className) }
        { ...otherProps }
      >
        { children }
      </div>
    )

  }

}
