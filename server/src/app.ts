import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth";
import connectDB from "./config/db";
import cors from "cors";
import morgan from "morgan";
import "./types/index";
import profileRoutes from "./routes/profile";

const port = process.env.PORT;

const app = express();

// Connect to MongoDB
connectDB();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.listen(port, () => {
	console.log("Server running on port 5000");
});
