import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create the context
const ArticleContext = createContext(undefined);

// Provide the context
export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const addArticle = (article) => {
    setArticles((prevArticles) => [...prevArticles, article]);
  };

  const updateArticle = (ArticleData) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) => {
        return article.id === ArticleData.id ? ArticleData : article
      })
    );
  };

  const deleteArticle = (deleteid) => {
    //delete Artical form articles
    setArticles((prevArticles) =>
      prevArticles.filter((articles) =>
        articles.id !== deleteid
      )
    )
  }

  return (
    <ArticleContext.Provider value={{ articles, addArticle, setSelectedArticle, selectedArticle, updateArticle, setIsEditing, isEditing, deleteArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

// Create a custom hook to use the ArticleContext
export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticleContext must be used within an ArticleProvider');
  }
  return context;
};
