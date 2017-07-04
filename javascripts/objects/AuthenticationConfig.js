// import libraries
import React, { Component } from "react"
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import parseQueryString from '../lib/parseQueryString'

// import actions
import { setAuthenticationToken } from '../actions'

// import constants
import * as localStorageKeys from '../constants/localStorageKeys'

class AuthenticationConfig extends Component {
  constructor(props) {
    super(props)
    
    this.timeout = null
  }

  processAuthenticationDetails(accessToken, refreshTokenAt) {
    let refreshTokenIn = refreshTokenAt - new Date().getTime()

    if (refreshTokenIn > 0) {
      this.props.dispatch(setAuthenticationToken(accessToken))
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.refreshAuthentication()
      }, refreshTokenIn)
    } else {
      this.refreshAuthentication()
    }
  }

  processAuthorizationGrantCode(code) {
    let authUrl = `${document.config.oauth.service_base_url}/oauth2/token`
    let body = {
      data: {
        type: "oauth2/tokens",
        attributes: {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: document.config.oauth.redirect_url,
          client_id: document.config.oauth.client_id
        }
      }
    }

    this.fetchAuthenticationToken(authUrl, body)
  }

  refreshAuthentication() {
    let refreshToken = window.localStorage[localStorageKeys.REFRESH_TOKEN_KEY]

    if (refreshToken) {
      let authUrl = `${document.config.oauth.service_base_url}/oauth2/token_refresh`
      let body = {
        data: {
          type: "oauth2/token_refreshes",
          attributes: {
            grant_type: "refresh_token",
            refresh_token: window.localStorage[localStorageKeys.REFRESH_TOKEN_KEY],
            client_id: document.config.oauth.client_id
          }
        }
      }

      this.fetchAuthenticationToken(authUrl, body)
    }
  }

  fetchAuthenticationToken(url, body) {
    let response_ok = null

    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/vnd.api+json" }
    }).then((response) => {
      response_ok = response.ok
      return response.json()
    }).then((json) => {
      if (response_ok) {
        let refreshTokenAt = new Date().getTime() + parseInt(json.data.attributes.expires_in * (5 / 6) * 1000, 10)

        window.localStorage.setItem(localStorageKeys.ACCESS_TOKEN_KEY,     json.data.attributes.access_token)
        window.localStorage.setItem(localStorageKeys.REFRESH_TOKEN_AT_KEY, refreshTokenAt)
        if (json.data.attributes.refresh_token) {
          window.localStorage.setItem(localStorageKeys.REFRESH_TOKEN_KEY,  json.data.attributes.refresh_token)
        }

        this.processAuthenticationDetails(json.data.attributes.access_token, refreshTokenAt)

      } else if (json.data && json.data.attributes && json.data.attributes.error && json.data.attributes.error_description) {
        throw new Error(json.data.attributes.error + ": " + json.data.attributes.error_description)
      } else {
        throw new Error("Something went wrong logging in.")
      }
    }).catch((error) => { console.log(error) })
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  componentDidMount() {
    let queryString = parseQueryString(window.location.search)
    let code = queryString.get('code')

    if (window.localStorage[localStorageKeys.ACCESS_TOKEN_KEY] && window.localStorage[localStorageKeys.REFRESH_TOKEN_AT_KEY]) {
      this.processAuthenticationDetails(window.localStorage[localStorageKeys.ACCESS_TOKEN_KEY], window.localStorage[localStorageKeys.REFRESH_TOKEN_AT_KEY])
    } else if (code) {
      this.props.history.push({ search: "" })
      this.processAuthorizationGrantCode(code)
    }
  }

  render () {
    return null
  }
}

export default connect()(withRouter(AuthenticationConfig))