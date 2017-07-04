import React, { Component } from "react"

export default class InputError extends Component {
  render() {
    return <span>{ this.props.errorMessage }</span>
  }
}
