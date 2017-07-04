import { readEndpoint } from 'redux-json-api'
import * as types from './constants/actionTypes'
import * as localStorageKeys from './constants/localStorageKeys'


export function resetAuthentication() {
  return (dispatch) => {
    dispatch(setAuthenticationToken(null))
    window.localStorage.removeItem(localStorageKeys.ACCESS_TOKEN_KEY)
    window.localStorage.removeItem(localStorageKeys.REFRESH_TOKEN_KEY)
    window.localStorage.removeItem(localStorageKeys.REFRESH_TOKEN_AT_KEY)
  }
}


export function setAuthenticationToken(token) {
  return {
    type: types.SET_AUTHENTICATION_TOKEN,
    token: token
  }
}
