const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
    Post.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/addpost').post((req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const profilePic = req.body.profilePic;
    const type = req.body.type;
    const description = req.body.description;
    const budget = Number(req.body.budget);
    const location = req.body.location;

    const newPost = new Post({
        user,
        email,
        profilePic,
        type,
        description,
        budget,
        location
    });

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch((err) => res.status(400).json('Error ' + err));
});

module.exports = router;