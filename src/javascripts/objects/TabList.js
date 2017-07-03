// import libraries
import React, { Component } from "react"
import classNames from "classnames"

export default class TabList extends Component {

  render() {

    let {
      className,
      children,
      ...otherProps
    } = this.props

    return (
      <ul
        className={ classNames('o-tab-list', className) }
        role="tablist"
        { ...otherProps }
      >
        { children }
      </ul>
    )
    
  }

}
