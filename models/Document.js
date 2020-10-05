const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const DocumentSchema = new Schema({
	name : {
		type: String,
		required: true
	},
	creator: {
    	type: mongoose.ObjectId,
    	ref: 'users'
  	},
  	content: {
  		type: String,
  		default: ''
  	},
  	date_modif: {
  		type: Date,
  		default: Date.now
  	},
  	list_users: [{
  		type: mongoose.ObjectId,
  		ref: 'users'
  	}]
})

module.exports = Document = mongoose.model('document', DocumentSchema)