import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
	dotenv.config({ path: ".env" });
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production";

// add error checking to make sure mongo uri exists
export const MONGODB_URI = prod
	? process.env["MONGODB_URI"]
	: process.env["MONGODB_URI_LOCAL"];
