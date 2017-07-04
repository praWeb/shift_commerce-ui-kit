// import libraries
import React, { Component } from "react"
import classNames from "classnames"


export default class Tab extends Component {

  render() {

    let defaultClassName =  'o-tab-list__tab'
    let selectedClassName = `${defaultClassName}--selected`
    let {
      className,
      children,
      selected,
      ...otherProps
    } = this.props

    return (
      <li
        className={ classNames({ [selectedClassName]: selected }, defaultClassName, className ) }
        { ...otherProps }
      >
        { children }
      </li>
    )

  }

}
