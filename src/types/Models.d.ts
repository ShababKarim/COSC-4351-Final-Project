import { Document } from 'mongoose';
export interface IUserDocument extends Document {
	name: string;
	email: string;
	password: string;
	adminType: string;
	pending: boolean;
	generateToken: () => string;
}

export interface ILinkDocument extends Document {
	adminType: string;
	url: string;
}
