import * as mongoose from "mongoose";

import { ILinkDocument } from "../types/Models";

const LinkSchema: mongoose.Schema<ILinkDocument> = new mongoose.Schema({
	adminType: {
		type: String,
		required: true,
		default: "ADMIN"
	},
	url: {
		type: String,
		required: true
	}
});

export const Link = mongoose.model<ILinkDocument>("Link", LinkSchema, "links");
