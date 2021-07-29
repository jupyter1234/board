const express = require('express');
const router = express.Router()
const Post = require('../models/Post');

router.get('/', (req, res) => {
    Post.find({}).sort('-createdAt').exec((err, posts) =>{
        if(err) return res.json(err);
        res.render('posts/index', {posts});
    });
});

router.get('/new', (req, res) => {
    res.render('posts/new');
});

router.post('/', (req, res) => {
    Post.create(req.body, (err, post) => {
        if(err) return res.json(err);
        res.redirect('/posts');
    });
});

router.get('/:id', (req,res)=>{
    Post.findOne({_id: req.params.id}, (err, post) => {
        if(err) return res.json(err);
        res.render('posts/show', {post});
    });
});

//Edit
router.get('/:id/edit', (req,res)=>{
    Post.findOne({_id: req.params.id}, (err, post) => {
        if(err) return res.json(err);
        res.render('posts/edit', {post});
    });
});

router.put('/:id', (req,res) => {
    req.body.updatedAt = Date.now();
    Post.findOneAndUpdate({_id: req.params.id}, req.body, (err, post) => {
        if(err) return res.json(err);
        res.redirect('/posts/' + req.params.id);
    });
});

//Destroy
router.delete('/:id', (req, res) => {
    Post.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.json(err);
        res.redirect('/posts');
    });
});

module.exports= router;