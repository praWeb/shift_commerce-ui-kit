// import libraries
import React, { Component } from "react"
import { connect } from 'react-redux'
import classNames from "classnames"
import { setAccessToken } from 'redux-json-api'

// import actions
// import { setApplicationConfiguration } from '../actions'

// import objects/components
import AuthenticationConfig from "./AuthenticationConfig"
import Button from "./Button"

// import assets
import defaultAvatar from "../../src/images/default-avatar.svg"
import iconCloseMenu from "../../src/images/icon-close-menu.svg"
import iconOpenMenu from "../../src/images/icon-open-menu.svg"

// import actions
import { resetAuthentication } from '../actions'

class AppShell extends Component {
  constructor() {
    super()
    this.state = { menuOpen: false }
    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  loginOptions() {
    if (this.props.authentication.token) {
      return <div className="o-user-menu">
        <img className="o-user-menu__avatar" src={ defaultAvatar } />
        <p className="o-user-menu__name">George Smith</p>
        <p className="o-user-menu__company">ABC Company</p>
        <Button onClick={ () => { this.props.dispatch(resetAuthentication()) } } >Logout</Button>
      </div>
    } else {
      const login_url = `${document.config.oauth.service_base_url}/oauth2/authorize?response_type=code&client_id=${encodeURIComponent(document.config.oauth.client_id)}&redirect_uri=${document.config.oauth.redirect_url}`

      return <div>
        <a href={ login_url }><Button>Login</Button></a>
      </div>
    }
  }

  childrenDisplay() {
    if (this.props.authentication.token) {
      return this.props.children
    }
  }

  render() {
    let {
      className,
      activeSection,
      children,
      ...otherProps
    } = this.props

    let menuOpenClassName = null

    if (this.state.menuOpen) {
      menuOpenClassName = "is-open"
    }

    return (
      <div className={ classNames("o-app-shell", className) }>
        <div className="o-app-shell__header">
          <button type="button"
            className="o-app-shell__open-menu-btn"
            onClick={ this.openMenu }
          >
            <img src={ iconOpenMenu } alt="Open Menu" />
          </button>

          <span className="o-app-shell__logo">
            <span className="o-logo">SHIFT</span>
          </span>

          <span className="o-app-shell__current-section">{ activeSection }</span>
        </div>

        <aside className={ classNames("o-app-shell__menu", "o-main-menu", menuOpenClassName) }>
          <button type="button"
            className="o-app-shell__close-menu-btn"
            onClick={ this.closeMenu }
          >
            <img src={ iconCloseMenu } alt="Close Menu" />
          </button>

          <nav className="o-main-menu__primary_menu">
            <a href="#" className="o-main-menu__link">Catalog</a>
            <a href="#" className="o-main-menu__link">Content</a>
            <a href="#" className="o-main-menu__link">Commerce</a>
            <a href="#" className="o-main-menu__link">Orders</a>
            <a href="#" className="o-main-menu__link o-main-menu__link--active">Inventory</a>
            <a href="#" className="o-main-menu__link">Deployment</a>
          </nav>

          <nav className="o-main-menu__secondary_menu">
            <a href="#" className="o-main-menu__link">Documentation</a>
            <a href="#" className="o-main-menu__link">Blog</a>
            <a href="#" className="o-main-menu__link">Need help?</a>
          </nav>

          <div className="o-app-shell__user">
            <AuthenticationConfig />
            { this.loginOptions() }
          </div>
        </aside>

        <div className="o-app-shell__body">
          { this.childrenDisplay() }
        </div>
      </div>
    )
  }

  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }
}

const mapStateToProps = (state) => {
  const authentication = state.authentication || {}

  return { authentication }
}

export default connect(mapStateToProps)(AppShell)
