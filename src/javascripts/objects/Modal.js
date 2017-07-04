import React, { Component } from "react"

export default class Modal extends Component {

  render() {

    if (this.props.isModalOpen === false){
      return null
    }

    return (
      <div>
        <div className="o-modal">
          { this.props.children }
        </div>
        <div className="o-modal-backdrop" onClick={ this.props.toggleModal }></div>
      </div>
    )
  }
}