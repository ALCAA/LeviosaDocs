import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import docReducer from './docReducer'
import createddocReducer from './createddocReducer'
import shareddocReducer from './shareddocReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  doc: docReducer,
  createddoc: createddocReducer,
  shareddoc: shareddocReducer
})
