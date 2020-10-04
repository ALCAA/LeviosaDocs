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
    creator_mail: req.body.creator_mail,
    content: req.body.content
  })
  newdocs
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

module.exports = router
