import * as types from "../constants/actionTypes"

const initialAutoCompleteState = {
  autoCompleteOptions: []
}

export default function setAutoCompleteOptions(state = initialAutoCompleteState, action) {
  let newState = Object.assign({}, state)
  switch(action.type) {
    case types.SET_AUTOCOMPLETE_OPTIONS:
      newState['autoCompleteOptions'] = action.options
      return newState
  }
  return newState
}
