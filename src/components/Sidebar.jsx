'use client'
import React, { useEffect, useState } from 'react';
import { useArticleContext } from '../context/ArticleContext'; // Use the context
import ArticleForm from './ArticleForm';

const Sidebar = () => {
    const { articles, setSelectedArticle, selectedArticle, setIsEditing } = useArticleContext(); // Get articles from the context

    useEffect(() => {
        console.log(articles)
    }, [articles])

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setIsEditing(true);
    };

    const handleAddArticleClick = () => {
        setSelectedArticle(null);
        setIsEditing(false);
    }

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <h3>Articles</h3>
                <ul>
                    {articles.map((article) => (
                        <li
                            key={article.id}
                            onClick={() => handleArticleClick(article)}
                            className={selectedArticle && article.id === selectedArticle.id ? 'selectedArtical' : ''}
                        >
                            <a href={`#articleId=${article.id}`}>{article.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebar-bottom-btn">
                <button
                    type="button"
                    onClick={handleAddArticleClick}
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 20 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    Add Article
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
