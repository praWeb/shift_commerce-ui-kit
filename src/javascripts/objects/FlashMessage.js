import React, { Component } from "react"
import { connect } from "react-redux"
import classNames from "classnames"
import { setFlashMessage } from "../actions"

class FlashMessage extends Component {
  constructor(props) {
    super(props)
    this.closeMessage = this.closeMessage.bind(this)
  }

  closeMessage() {
    this.props.dispatch(setFlashMessage({ error: false, message: "" }))
  }

  render() {
    let {
      message,
      error
    } = this.props

    if(message === '' || message === undefined) {
      return null
    } else {

      let state = error === true ? 'error' : 'success'
      let flash_icon = error === false ? 'o-icon--ok' : ''

      return (
        <div className={ classNames('c-flash__body', `c-flash__body--${ state }` ) }>
          <div className="c-flash__message">
            <div className={ classNames('o-icon', flash_icon) }> </div>
            { message }
          </div>
          <div className="c-flash__close-icon" onClick={ this.closeMessage }>
            <div className="o-icon o-icon--close"></div>
          </div>
        </div>
      )

    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.flashMessage
  }
}

export default connect(mapStateToProps)(FlashMessage)