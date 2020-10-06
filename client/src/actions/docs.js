import axios from 'axios'

import { GET_ERRORS } from './types'

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