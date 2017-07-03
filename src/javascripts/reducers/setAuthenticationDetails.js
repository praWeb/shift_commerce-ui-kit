import * as types from "../constants/actionTypes"

export const initialAuthenticationState = {
  token: null
}

export default function setAuthenticationDetails(state = initialAuthenticationState, action) {
  let newState = Object.assign({}, state)
  switch(action.type) {
    case types.SET_AUTHENTICATION_TOKEN:
      newState["token"] = action.token
      return newState
  }
  return newState
}
