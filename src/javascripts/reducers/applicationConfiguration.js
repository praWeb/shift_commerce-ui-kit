import * as types from '../constants/actionTypes'

const initialState = {
  messaging_configured: false
}

export default function applicationConfiguration(state = initialState, action) {
  switch(action.type) {
    case types.LIVE_MESSAGING_CONFIGURED:
      return {...state, messaging_configured: true}
      break
  }
  return state
}
