import merge from "deepmerge"
import * as types from "../constants/actionTypes"

export const initialSearchState = {}

export const baseSearchState = {
  term: "",
  display_search_term: ""
}

export default function setSearchState(state = initialSearchState, action) {
  let newState = Object.assign({}, state)

  switch(action.type) {
    case types.SET_SEARCH_TERM:
      if (!newState[action.namespace]) { newState = merge(newState, { [action.namespace]: baseSearchState }) }
      newState = merge(newState, { [action.namespace]: { term: action.term } })

      return newState
    case types.SET_DISPLAY_SEARCH_TERM:
      if (!newState[action.namespace]) { newState = merge(newState, { [action.namespace]: baseSearchState }) }
      newState = merge(newState, { [action.namespace]: { display_search_term: action.display_search_term } })

      return newState
    case types.RESET_SEARCH:
      if (action.namespace) {
        newState[action.namespace] = baseSearchState
        return newState
      } else {
        return initialSearchState
      }
  }
  return newState
}
