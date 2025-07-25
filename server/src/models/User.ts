import { UserRole, UserStatus } from "../types";
import type { IUser } from "../types";
import mongoose, {
	Schema,
	Document,
	CallbackWithoutResultAndOptionalError,
} from "mongoose";
import bcrypt from "bcryptjs";

// Extend IUser with Document for Mongoose
export interface IUserDocument extends IUser, Document {
	_id: string;
	isModified(path: string): boolean;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.STUDENT,
			required: true,
		},
		status: {
			type: String,
			enum: Object.values(UserStatus),
			default: UserStatus.ACTIVE,
			required: true,
		},
		profile: {
			firstName: { type: String, required: true, trim: true },
			lastName: { type: String, required: true, trim: true },
			avatar: { type: String },
			bio: { type: String, maxlength: 500 },
			skills: [{ type: String, trim: true }],
			interests: [{ type: String, trim: true }],
			education: [
				{
					institution: { type: String, required: true },
					degree: { type: String, required: true },
					fieldOfStudy: { type: String, required: true },
					startDate: { type: Date, required: true },
					endDate: { type: Date },
					current: { type: Boolean, default: false },
				},
			],
			experience: [
				{
					company: { type: String, required: true },
					position: { type: String, required: true },
					description: { type: String },
					startDate: { type: Date, required: true },
					endDate: { type: Date },
					current: { type: Boolean, default: false },
				},
			],
			socialLinks: {
				linkedin: { type: String },
				github: { type: String },
				twitter: { type: String },
				website: { type: String },
			},
			preferences: {
				notifications: {
					email: { type: Boolean, default: true },
					push: { type: Boolean, default: true },
					marketing: { type: Boolean, default: false },
				},
				privacy: {
					profileVisibility: {
						type: String,
						enum: ["public", "private", "connections"],
						default: "public",
					},
					showEmail: { type: Boolean, default: false },
				},
				theme: {
					type: String,
					enum: ["light", "dark", "system"],
					default: "system",
				},
			},
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (_doc: IUserDocument, ret: any) => {
				delete ret.password;
				return ret;
			},
		},
	}
);

// Indexes for better performance
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ "profile.skills": 1 });
UserSchema.index({ "profile.interests": 1 });

// Pre-save middleware to hash password
UserSchema.pre<IUserDocument>(
	"save",
	async function (
		this: IUserDocument,
		next: CallbackWithoutResultAndOptionalError
	) {
		if (!this.isModified("password")) return next();

		try {
			const salt = await bcrypt.genSalt(12);
			this.password = await bcrypt.hash(this.password, salt);
			next();
		} catch (error) {
			next(error as Error);
		}
	}
);

// Instance method to compare password
UserSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUserDocument>("User", UserSchema);
