import React, { Component } from "react"

export default class SubmitButton extends Component {
  render() {
    const label = this.props.label || "Submit"
    let {
      className,
      ...otherProps
    } = this.props

    return (
      <button className={ className } { ...otherProps }>
        { label }
      </button>
    )
  }
}
