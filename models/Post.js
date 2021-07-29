const mongoose = require("mongoose")

const postScheme = mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
});

const Post = mongoose.model('post', postScheme);

module.exports = Post;