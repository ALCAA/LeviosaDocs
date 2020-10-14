import { SET_SHARED_DOCUMENT } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SHARED_DOCUMENT:
      return action.payload
    default:
      return state
  }
}
