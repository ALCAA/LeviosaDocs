import axios from 'axios'

export default {
  signup: function (Registerdata) {
    	return axios.post('/users/register', Registerdata)
  	}
}
