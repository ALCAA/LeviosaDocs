const express = require('express')
const router = express.Router()

// Load Version & Document models
const version = require('../models/Version')
const docs = require('../models/Document')

// @route POST version/create
// @desc Creating a version of a document
// @access Public
router.post('/create', (req, res) => {
	const newversion = new Version({
		document_id : req.body.document_id,
		name: req.body.name,
		content: req.body.content,
	})
	newversion
		.save()
		.then(version => res.json(version))
		.catch(err => console.log(err))
})

// @route POST version/create
// @desc Creating a tagged version of a document
// @access Public
router.post('/create_with_tag', (req, res) => {
	const newversion = new Version({
		document_id : req.body.document_id,
		name: req.body.name,
		content: req.body.content,
		tag: req.body.tag
	})
	newversion
		.save()
		.then(version => res.json(version))
		.catch(err => console.log(err))
})

module.exports = router
