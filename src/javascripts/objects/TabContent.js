import React, { Component } from 'react'
import classNames from "classnames"

export default class TabContent extends Component {

  render() {

    let {
      children,
      selected,
      ...otherProps
    } = this.props

    return (
      <div
        role="tabcontent"
        { ...otherProps }
      >
        { selected ? children : null }
      </div>
    )
  }

}