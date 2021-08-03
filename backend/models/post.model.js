const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: { type: String, required: true},
    email: String,
    profilePic: String,
    type: String,
    profession: String,
    description: String,
    budget: Number,
    location: String
}, {
    timestamps: true,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;