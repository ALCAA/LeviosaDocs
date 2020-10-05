const express = require('express')
const router = express.Router()

// Load Document model
const docs = require('../models/Document')
const User = require('../models/User')

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
	// Check if the given mail adress owns to an user
	User.findOne({ email: req.body.email }).then(user => {
    	if (!user) {
    		return res.status(400).json({ email: 'No user got this email' })
  		}
  		else {
		docs
			.updateOne(
				{
					"_id": req.body._id
				},
				{
					$push: {list_users : user._id }
				})
			.then(docs => res.status(200).json(docs))
			.catch(err => res.status(400).json(err))
		}
	})
})

// @route POST docs/show_iscreator
// @desc Show documents own by an user
// @access Public
router.post('/show_iscreator', (req, res) => 
{
	docs
		.find({ creator: { $in: req.body.user } })
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})

// @route POST docs/show_iscollaborator
// @desc Show documents where the user has been added
// @access Public
router.post('/show_iscollaborator', (req, res) => 
{
	docs
		.find({ list_users: { $in: req.body.user } })
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})


module.exports = router
