import * as types from '../constants/actionTypes'

export const initialFlashMessage = {
  "error" : false,
  "message": ""
}

export default function setFlashMessage(state = initialFlashMessage, action) {
  let newState = Object.assign({}, state)
  switch(action.type) {
    case types.SET_FLASH_MESSAGE:
      newState['error'] = action.flashMessage.error
      newState['message'] = action.flashMessage.message
      return newState
  }
  return newState
}