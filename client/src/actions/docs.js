import axios from 'axios'

import { GET_ERRORS, SET_CURRENT_DOCUMENT, SET_CREATED_DOCUMENT, SET_SHARED_DOCUMENT } from './types'

export const create_docs = groupData => dispatch => {
  axios
    .post('/docs/create', groupData)
    .then(res => {
      window.location.href = '/' + res.data._id + '/edit'
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const load_docs = id => dispatch => {
  axios
    .post('/docs/get_info', id)
    .then(res => {
      dispatch(setCurrentDocument(res.data[0]))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const save_doc = data => dispatch => {
  axios
    .post('/docs/save', data)
    .then(res => {
      console.log(res.data)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const add_user = list_users => dispatch => {
  axios
    .post('/docs/add_user', list_users)
    .then(res => {
      console.log(list_users)
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const is_creator = data => dispatch => {
  axios
    .post('/docs/show_iscreator', data)
    .then(res => {
      dispatch(setCreatedDocument(res.data))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const is_collaborator = data => dispatch => {
  axios
    .post('/docs/show_iscollaborator', data)
    .then(res => {
      dispatch(setSharedDocument(res.data))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set current document
export const setCurrentDocument = data => {
  return {
    type: SET_CURRENT_DOCUMENT,
    payload: data
  }
}

export const setCreatedDocument = data => {
  return {
    type: SET_CREATED_DOCUMENT,
    payload: data
  }
}

export const setSharedDocument = data => {
  return {
    type: SET_SHARED_DOCUMENT,
    payload: data
  }
}
