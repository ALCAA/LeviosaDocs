import { SET_CREATED_DOCUMENT } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CREATED_DOCUMENT:
      return action.payload
    default:
      return state
  }
}
