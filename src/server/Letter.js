const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Letter = new Schema({
  letter: {
    type: String,
    required: true,
    maxlength: 1,
    minlength: 1
  },
  desc: {
    type: String,
    required: true,
    maxlength: 60,
    minlength: 1
  },
  author: {
    type: String,
    required: true,
    maxlength: 12,
    minlength: 1
  },
  stars: {
    type: Number,
    default: 0
  }
}, {timestamps: true})

module.exports = mongoose.model('Letter', Letter)
