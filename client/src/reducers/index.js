import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import docReducer from './docReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  doc: docReducer
})
