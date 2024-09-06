import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import articleRoute from "./routes/article.route.js"
import connectDB from "./utils/db.js";
dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true,
}

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/articleroute",articleRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started on port ${PORT}`);
});
