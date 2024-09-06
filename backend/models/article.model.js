import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    article_id: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true }); // managing createdAt and updatedAt fields

export const Article = mongoose.model('Article', articleSchema);
