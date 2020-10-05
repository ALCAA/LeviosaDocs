const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const VersionSchema = new Schema({
  document_id: {
    type: mongoose.ObjectId,
    ref: 'document'
  },
  content: {
    type: String,
    required: true
  },
  tag: {
  	type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Version = mongoose.model('version', VersionSchema)