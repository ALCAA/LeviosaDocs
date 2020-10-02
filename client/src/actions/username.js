const initialState = {
  username: ''
}

const NEW_USERNAME = 'USERNAME'

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case NEW_USERNAME:
      return Object.assign({}, state, { username: action.payload })
    default:
      break
  }
}

export function handleUsername (username) {
  return {
    type: NEW_USERNAME,
    payload: username
  }
}
