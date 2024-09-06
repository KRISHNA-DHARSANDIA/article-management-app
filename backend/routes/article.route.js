import express from 'express';
import {
   createArticle,
   getArticles,
   getArticleById,
   updateArticle,
   deleteArticle,
} from '../controllers/article.controller.js'; 

const router = express.Router();

// Public routes
router.post('/create-article', createArticle);  
router.get('/getall-article', getArticles);

router.get('/get-article/:article_id',getArticleById);
router.put('/update-article/:article_id',updateArticle);
router.delete('/remove-article/:article_id',deleteArticle);

export default router;
