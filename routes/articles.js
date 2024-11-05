const express = require('express');
const Article = require('./../models/article');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.render('articles/show', { article: article });
    } catch (e) {
        console.error(e);
        res.status(500).send('Error fetching article');
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.render('articles/edit', { article: article });
    } catch (e) {
        console.log('Error fetching article for edit:', e.message);
        res.redirect('/');
    }
});

router.put('/:id', async (req, res) => {
    try {
        let article = await Article.findById(req.params.id);
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;

        await article.save();
        res.redirect(`/articles/${article._id}`);
    } catch (e) {
        console.log('Error updating article:', e.message);
        res.render('articles/edit', { article: article });
    }
});


router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
    article = await article.save()
    res.redirect(`/articles/${article._id}`)
    console.log('save successful')
    } catch (e) {
        console.log('save failed', e.message)
        res.render('articles/new', { article: article })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (e) {
        console.log('Delete failed:', e.message);
        res.redirect('/');
    }
});


module.exports = router;