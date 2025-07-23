import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import connectDB from "./config/db";
import cors from "cors";
import morgan from "morgan";
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

connectDB();

app.listen(port, () => {
	console.log("Server running on port 5000");
});
