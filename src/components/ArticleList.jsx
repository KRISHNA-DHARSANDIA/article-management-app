import React from 'react';
import { useArticleContext } from '../context/ArticleContext';

const ArticleList = () => {
    const { articles } = useArticleContext();

    return (
        <div className="article-list">
            {articles.map((article) => (
                <div key={article.id} id={`${article.id}`}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
