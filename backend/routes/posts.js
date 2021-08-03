const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
    Post.find()
        .sort({ updatedAt: -1 })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/addpost').post((req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const profilePic = req.body.profilePic;
    const type = req.body.type;
    const profession = req.body.profession;
    const description = req.body.description;
    const budget = Number(req.body.budget);
    const location = req.body.location;

    const newPost = new Post({
        user,
        email,
        profilePic,
        type,
        profession,
        description,
        budget,
        location
    });

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch((err) => res.status(400).json('Error ' + err));
});

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.username = req.body.username;
            post.email = req.body.email;
            post.profilePic = req.body.profilePic;
            post.type = req.body.type;
            post.profession = req.body.profession;
            post.description = req.body.description;
            post.budget = req.body.budget;
            post.location = req.body.location;

            post.save()
                .then(() => res.json('Post updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        });
})

module.exports = router;