const express = require('express')
const router = express.Router()

// Load Document model
const Docs = require('../models/Document')
const User = require('../models/User')

// @route POST docs/create
// @desc Create document
// @access Public
router.post('/create', (req, res) => {
  const newdocs = new Docs({
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
  Docs
    .deleteOne(
      {
        _id: req.body._id
      })
    .then(docs => res.json(docs))
    .catch(err => console.log(err))
})

// @route POST docs/save
// @desc Save document
// @access Public
router.post('/save', (req, res) => {
  Docs
    .updateOne(
      {
        _id: req.body._id
      },
      {
        name: req.body.name,
        content: req.body.content,
        date_modif: Date.now()
      })
    .then(docs => res.json(docs))
    .catch(err => console.log(err))
})

// @route POST docs/add_user
// @desc Add an user to a document
// @access Public
router.post('/add_user', (req, res) => {
  // Check if the given mail adress owns to an user
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(400).json({ email: 'No user got this email' })
    } else {
      Docs
        .updateOne(
          {
            _id: req.body._id
          },
          {
            $addToSet: { list_users: user }
          })
        .then(docs => res.status(200).json(docs))
        .catch(err => res.status(400).json(err))
    }
  })
})

router.post('/get_info', (req, res) => {
  Docs
    .find({ _id: { $in: req.body.id } })
    .then(docs => res.json(docs))
    .catch(err => console.log(err))
})

// @route POST docs/show_iscreator
// @desc Show documents own by an user
// @access Public
router.post('/show_iscreator', (req, res) => {
  Docs
    .find({ creator: { $in: req.body.user } })
    .then(docs => res.json(docs))
    .catch(err => console.log(err))
})

// @route POST docs/show_iscollaborator
// @desc Show documents where the user has been added
// @access Public
router.post('/show_iscollaborator', (req, res) => {
  Docs
    .find({ 'list_users.email': req.body.useremail })
    .then(docs => res.json(docs))
    .catch(err => console.log(err))
})

module.exports = router
