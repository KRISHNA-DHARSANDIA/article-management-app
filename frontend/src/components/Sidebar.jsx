'use client'
import React, { useEffect, useState } from 'react';
import { useArticleContext } from '../context/ArticleContext';
import axios from 'axios';


const Sidebar = () => {
    const { articles, setSelectedArticle, selectedArticle, setIsEditing, addArticle, setArticles } = useArticleContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getallArticle = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/articleRoute/getall-article');
                const articles = response.data;
                await setArticles((prev) => [...prev, articles]);
                setLoading(false);
            }
            catch (error) {
                console.error('Error updating article:', error);
                setLoading(false);
            }
        }
        getallArticle();
    }, []);

    if (loading) {
        return <p>Loading articles...</p>; // Render loading state
    }

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
                    {articles.length > 0 && articles.map((article) => (
                        <li
                            key={article.article_id}
                            onClick={() => handleArticleClick(article)}
                            className={articles.article_id && article.article_id === selectedArticle.article_id ? 'selectedArtical' : ''}
                        >
                            <a href={`#articleId=${article.article_id}`}>{article.title}</a>
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
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    Add Article
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
