import * as types from "../constants/actionTypes"

export const initialProccessingState = {
  loading: false,
  errored: false
}

export default function setProcessingState(state = initialProccessingState, action) {
  let newState = Object.assign({}, state)
  switch(action.type) {
    case types.SET_PROCESS_LOADING:
      newState["loading"] = action.loading
      return newState
    case types.SET_PROCESS_ERRORED:
      newState["errored"] = action.errored
      return newState
    case types.RESET_PROCESSES:
      return initialProccessingState
  }
  return newState
}
