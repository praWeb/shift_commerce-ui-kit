import React, { Component } from 'react'

import OuterShell from "../components/OuterShell"

class Popover extends Component {

  constructor() {
    super()

    this.state = {
      openPopup: false
    }

    this.togglePopover = this.togglePopover.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  togglePopover() {
    let openPopover = !this.state.openPopover
    this.setState({ openPopover: openPopover })
  }

  handleClickOutside() {
    this.setState({ openPopover: false })
  }

  render() {

    let popoverContent = <div className="o-popover__body">
      <div className="o-popover__body__content">
        { this.props.children }
      </div>
    </div>

    let displayLabel = this.props.displaySearchTerm || this.props.displayLabel
    return (
      <section className="o-popover">
        <div className="u-cursor-pointer o-popover__label" onClick={ () => this.togglePopover() }>
          { displayLabel }
          <i className="o-icon o-icon--caret o-icon--caret--down"></i>
        </div>
        { this.state.openPopover ? popoverContent : null  }
      </section>
    )

  }
}

export default OuterShell(Popover)