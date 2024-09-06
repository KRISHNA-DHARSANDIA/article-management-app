import React, { useState, useEffect, useRef, memo } from 'react';
import { useArticleContext } from '../context/ArticleContext';
import ArticleEditor from './ArticleEditor'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const ArticleForm = () => {
    const { addArticle, selectedArticle, updateArticle, isEditing, deleteArticle, setIsEditing } = useArticleContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const editorContainerRef = useRef(null);

    useEffect(() => {
        if (isEditing && selectedArticle) {
            setTitle(selectedArticle.title);
            setContent(selectedArticle.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [isEditing, selectedArticle]);

    useEffect(() => {
        if (selectedArticle) {
            setContent(selectedArticle.content);
        }
    }, [selectedArticle]);

    const handleSave = async () => {

        try {
            const newArticle = {
                article_id: uuidv4(),
                title: title,
                content: content
            };

            const res = await axios.post('http://localhost:8000/api/v1/articleRoute/create-article', newArticle);
            addArticle(newArticle);
            setTitle('');
            setContent('');
        }
        catch (error) {
            console.error('Error updating article:', error);
        }
    };

    const handleUpdate = async () => {
        if (isEditing && selectedArticle) {
            const updatedArticle = {
                ...selectedArticle,
                title,
                content
            };

            try {
                const res = await axios.put(`http://localhost:8000/api/v1/articleRoute/update-article/${selectedArticle.article_id}`, updatedArticle);
                await updateArticle(updatedArticle);
            }
            catch (error) {
                console.error('Error updating article:', error);
            }
        }
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/articleRoute/remove-article/${selectedArticle.article_id}`);
            deleteArticle(selectedArticle.article_id);
            setTitle('');
            setContent('');
            setIsEditing(false);
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    }

    return (
        <div className="article-container">
            <div
                className="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-block-toolbar"
                ref={editorContainerRef}
            >
                <div className="editor-container__editor">
                    <ArticleEditor
                        value={content}
                        setArticleldata={(e) => setContent(e)}
                        setTitle={setTitle}
                    />
                    <div className='btnsubmit'>
                        {isEditing === true ? (
                            <div>
                                <button type="button" className='btnform btnDelete' onClick={handleDelete}>Delete Article</button>
                                <button type="button" className='btnform btnUpdate' onClick={handleUpdate}>Update Article</button>
                            </div>
                        ) : (
                            <button type="button" className='btnform btnSave' onClick={() => handleSave()}>Save Article</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ArticleForm);
