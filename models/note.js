const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/notes")

const noteSchema = mongoose.Schema({
    title: String,
    desc: String,
})

module.exports = mongoose.model('note', noteSchema);