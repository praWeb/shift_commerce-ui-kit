import React, { Component } from 'react'

export default class PaginatorButton extends Component {
  render () {
    if (this.props.disabled) {
      return <button disabled>
        { this.props.label }
      </button>
    } else {
      return <button onClick={ this.props.onClick }>
        { this.props.label }
      </button>
    }
  }
}
