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

router.post('/delete', (req, res) => {
	return docs.deleteOne(req.body)
		.then(docs => res.json(docs))
		.catch(err => console.log(err))
})


module.exports = router
