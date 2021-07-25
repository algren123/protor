require('dotenv').config();
var express = require('express');
const cors = require('cors');
var app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

var mongoose = require('mongoose');
var mongoDB = process.env.DATABASE_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB connection established successfully');
});

const postsRouter = require('./backend/routes/posts');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/posts', postsRouter);

app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist.")
});

app.listen(PORT, function() {
    console.log(`Protor is listening on Port ${PORT}`);
});