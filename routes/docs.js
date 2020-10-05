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
		.deleteOne(
			{
				"_id": req.body._id
			})
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

// @route POST docs/save
// @desc Save document
// @access Public
router.post('/save', (req, res) => 
{
	docs
		.updateOne(
			{
				"_id": req.body._id
			},
			{
				"name": req.body.name,
				"content": req.body.content,
				"date_modif": Date.now()
			})
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

// @route POST docs/add_user
// @desc Add an user to a document
// @access Public
router.post('/add_user', (req, res) =>
{
	docs
		.updateOne(
			{
				"_id": req.body._id
			},
			{
				$push: {list_users : req.body.user_id }
			})
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

// @route POST docs/show
// @desc Show documents own by an user
// @access Public
router.post('/show', (req, res) => 
{
	docs
		.find({ creator: { $in: req.body.user } })
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})



module.exports = router
