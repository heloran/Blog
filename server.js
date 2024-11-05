if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
};
const express = require('express');
const ejs = require('ejs');
const connectDB = require('./config/db')
const app = express();
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//view engine
app.set('view engine', 'ejs');

//static routes
app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'));

//routes
app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: 'desc' }); // Fetch articles from the DB
        res.render('articles/index', { articles: articles });
    } catch (e) {
        console.error('Error fetching articles:', e.message);
        res.status(500).send('Error fetching articles');
    }
});

app.use('/new', articleRouter);

//connect to db
connectDB()

//server
if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
} else {
    app.listen(PORT, () =>{
        console.log(`listening on http://localhost:${PORT}`);
    });
}