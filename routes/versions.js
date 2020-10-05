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

// @route POST version/create_with_tag
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

// @route POST version/find_all_versions
// @desc Find all versions of a document
// @access Public
router.post('/find_all_versions', (req, res) => {
	version
		.find({document_id : { $in : req.body.document } })
		.then(version => res.json(version))
		.catch(err => console.log(err))
})

// @route POST version/find_all_versions
// @desc Find all untagged versions of a document
// @access Public
router.post('/find_all_untagged_versions', (req, res) => {
	version
		.find({document_id : { $in : req.body.document}, tag : {"$exists" : false}})
		.then(version => res.json(version))
		.catch(err => console.log(version))
})

// @route POST version/find_all_versions
// @desc Find all tagged versions of a document
// @access Public
router.post('/find_all_tagged_versions', (req, res) => {
	version
		.find({document_id : { $in : req.body.document}, tag : {"$exists" : true}})
		.then(version => res.json(version))
		.catch(err => console.log(version))
})

module.exports = router
