import * as jwt from "jsonwebtoken";
import { TOKEN_KEY } from "./secrets";

import { Response, NextFunction } from "express";
import { IAuthRequest } from "../types/Express";

export const authenticate = (
	req: IAuthRequest,
	res: Response,
	next: NextFunction
) => {
	//get the token from the header if present
	const token = (req.headers["x-access-token"] ||
		req.headers["authorization"]) as string;
	//if no token found, return response (without going to the next middelware)
	if (!token)
		return res.status(401).json("Access denied. No token provided.");

	try {
		//if can verify the token, set req.user and pass to next middleware
		const decoded = jwt.verify(token, TOKEN_KEY);
		req.user = decoded;
		next();
	} catch (ex) {
		//if invalid token
		res.status(400).json("Invalid token.");
	}
};
