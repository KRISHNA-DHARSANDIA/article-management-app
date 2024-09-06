import { Article } from '../models/article.model.js';

// Create a new article
export const createArticle = async (req, res) => {
    const { article_id, title, content } = req.body;

    try {
        const newArticle = await Article.create({
            article_id: article_id,
            title: title,
            content: content
        });
        console.log("New article created:", newArticle);
        res.status(201).json(newArticle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating article', errormeg: error });
    }
};

// Get all articles
export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({});
        console.log(articles);
        res.status(200).json(articles[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching articles', error });
    }
};

// Get a single article by ID
export const getArticleById = async (req, res) => {
    const { article_id } = req.params;
    try {
        const article = await Article.findOne({ article_id: article_id });
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(article);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching article', error });
    }
};

// Update an article by ID
export const updateArticle = async (req, res) => {
    const { article_id } = req.params;
    const { title, content } = req.body;
    try {

        const article = await Article.findOne({ article_id: article_id });

        //64337501-55bc-45f9-a83e-bd11058884cf

        const updatedArticle = await Article.updateOne({ _id: article._id }, {
            $set: {
                article_id: article_id,
                title: title, content: content,
                new: true, runValidators: true
            }
        });

        console.log("updateArticle : " + JSON.stringify(updatedArticle));
        if (!updatedArticle) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json(updatedArticle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating article', error });
    }
};

// Delete an article by ID
export const deleteArticle = async (req, res) => {
    const { article_id } = req.params;
    try {
        const deletedArticle = await Article.findOneAndDelete(article_id);
        if (!deletedArticle) return res.status(404).json({ message: 'Article not found' });
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
};
