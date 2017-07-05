import React, { Component } from "react"
import { connect } from 'react-redux'

// import libraries
import PusherMessaging from '../lib/PusherMessaging'

// import actions
import { setApplicationConfiguration } from '../actions'

class PusherConfig extends Component {
  
  configurePusher() {
    console.log("configuring pusher")
    const services = [ PusherMessaging ]
    const account_reference = JSON.parse(atob(this.props.authentication.token.split('.')[1])).data.account_reference
    console.log(account_reference)
    const config_with_account_reference = {...document.config, account_reference }
    console.log(config_with_account_reference)
    this.props.dispatch(setApplicationConfiguration(config_with_account_reference, services))
  }

  componentDidUpdate(oldProps) {
    if (oldProps.authentication.token !== this.props.authentication.token) {
      this.configurePusher()
    }
  }

  componentDidMount() {
    console.log(this.props.authentication)
    if (this.props.authentication && this.props.authentication.token) {
      this.configurePusher()
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => {
  console.log("in map State to Props")
  console.log(state)
  const authentication = state.authentication || {}

  return { authentication }
}

export default connect(mapStateToProps)(PusherConfig)
