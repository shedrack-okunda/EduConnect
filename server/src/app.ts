import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import connectDB from "./config/db";
import cors from "cors";
import morgan from "morgan";
import "./types/index";
import profileRoutes from "./routes/profile";
import courseRoutes from "./routes/course";
import courseModuleRoutes from "./routes/courseModule";
import lessonsRoutes from "./routes/lessons";
import adminRoutes from "./routes/admin";

dotenv.config();

const port = process.env.PORT;

const app = express();

// Connect to MongoDB
connectDB();

// middleware
app.use(express.json());
app.use(
	cors({
		origin: process.env.ORIGIN,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/modules", courseModuleRoutes);
app.use("/api/lessons", lessonsRoutes);
app.use("/", (req: Request, res: Response) => {
	res.send("Wow EduConnect is running!");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
