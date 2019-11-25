import { Request, Response } from "express";
import path from "path";

export const index = (req: Request, res: Response) => {
	res.sendFile(
		path.join(__dirname, "../", "src", "public", "build", "index.html")
	);
};
