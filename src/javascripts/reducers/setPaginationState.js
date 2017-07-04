import * as types from "../constants/actionTypes"

export const initialPaginationState = {
  current_page: 1,
  record_count: 10,
  page_size: 10
}

export default function setPaginationState(state = initialPaginationState, action) {
  let newState = Object.assign({}, state)
  switch(action.type) {
    case types.SET_PAGINATION_PAGE:
      newState["current_page"] = action.current_page
      return newState
    case types.SET_RECORD_COUNT:
      newState["record_count"] = action.record_count
      return newState
  }
  return newState
}
