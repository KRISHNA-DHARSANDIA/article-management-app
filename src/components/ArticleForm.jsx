import React, { useState, useEffect, useRef } from 'react';
import { useArticleContext } from '../context/ArticleContext';
import ArticleEditor from './ArticleEditor'
import { v4 as uuidv4 } from 'uuid';

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

    const handleSave = () => {
        const newArticle = {
            id: uuidv4(),
            title,
            content
        };

        addArticle(newArticle);
        setTitle('');
        setContent('');
    };

    const handleUpdate = () => {
        if (isEditing && selectedArticle) {
            const updatedArticle = {
                ...selectedArticle,
                title,
                content
            };
            updateArticle(updatedArticle);
        }
    }

    const handleDelete = () => {
        deleteArticle(selectedArticle.id);
        setTitle('');
        setContent('');
        setIsEditing(false);
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
                            <button type="button" className='btnform btnSave' onClick={handleSave}>Save Article</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleForm;
