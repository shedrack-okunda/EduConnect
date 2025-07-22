import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(port, () => {
	console.log("Server running on port 5000");
});
