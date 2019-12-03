import * as mongoose from "mongoose";
import * as jwt from "jsonwebtoken";
import * as joi from "joi";
import { TOKEN_KEY } from "../util/secrets";

import { IUserDocument } from "../types/Models";

const UserSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255
	},
	adminType: {
		type: String,
		required: false,
		default: "ADMIN"
	},
	pending: {
		type: Boolean,
		required: false,
		default: true
	}
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
UserSchema.methods.generateToken = function(): string {
	const token = jwt.sign(
		{ _id: this._id, adminType: this.adminType },
		TOKEN_KEY
	);
	return token;
};

export const User = mongoose.model<IUserDocument>("User", UserSchema, "users");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateUser = (user: any) => {
	const schema: joi.SchemaLike = {
		name: joi
			.string()
			.min(3)
			.max(50)
			.required(),
		email: joi
			.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: joi
			.string()
			.min(3)
			.max(255)
			.required()
	};
	return joi.validate(user, schema);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateLogin = (user: any) => {
	const schema: joi.SchemaLike = {
		email: joi
			.string()
			.min(5)
			.max(255)
			.required()
			.email(),
		password: joi
			.string()
			.min(3)
			.max(255)
			.required()
	};
	return joi.validate(user, schema);
};
