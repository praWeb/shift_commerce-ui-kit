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

export function getAutoCompleteOptions(endpoint, headers, field) {
  return (dispatch) => {
    fetch(endpoint, { headers: headers }).
    then( (response) => { return(response.json()) }).
    then( (json) => {
      let options = json.data.map((opt) => {
        return opt.attributes[field]
      })
      dispatch(setAutoCompleteOptions(options))
    }).catch( (error) => { console.log(error) })
  }
}

export function setAutoCompleteOptions(options) {
  return {
    type: types.SET_AUTOCOMPLETE_OPTIONS,
    options: options
  }
}

export function setFlashMessage(options) {
  return {
    type: types.SET_FLASH_MESSAGE,
    flashMessage: options
  }
}

