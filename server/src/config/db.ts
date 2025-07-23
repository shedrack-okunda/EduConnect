import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = process.env.MONGO_URI as string;

const connectDB = async () => {
	await mongoose
		.connect(db)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((error) => {
			console.error(error);
		});
};

export default connectDB;
