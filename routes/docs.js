const express = require('express')
const router = express.Router()

// Load Document model
const docs = require('../models/Document')

// @route POST docs/create
// @desc Create document
// @access Public
router.post('/create', (req, res) => {
	const newdocs = new Document({
		name: req.body.name,
		creator: req.body.creator,
		content: req.body.content
	})
	newdocs
		.save()
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

// @route POST docs/delete
// @desc Delete document
// @access Public
router.post('/delete', (req, res) => {
	docs
		.deleteOne(req.body)
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

// @route POST docs/save
// @desc Save document
// @access Public
router.post('/save', (req, res) => 
{
	docs
		.updateOne(req.body)
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

// @route POST docs/show
// @desc Show documents owns by a user
// @access Public
router.post('/show', (req, res) => 
{
	docs
		.find({ creator: { $in: req.body.user } })
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})


module.exports = router
