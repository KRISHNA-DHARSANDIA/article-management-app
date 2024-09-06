import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient('mongodb+srv://krishna:9044123@cluster0.00qrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://krishna:9044123@cluster0.00qrx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDB;