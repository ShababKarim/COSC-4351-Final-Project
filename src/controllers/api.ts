import { Request, Response } from "express";
import { User, validateUser } from "../models/user";
import * as bcrypt from "bcrypt";

export const index = (req: Request, res: Response) => {
	res.json({
		Default: "route"
	});
};

export const register = async (req: Request, res: Response) => {
	// validate the request body first
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//find an existing user
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User already registered.");

	user = new User({
		name: req.body.name,
		password: req.body.password,
		email: req.body.email
	});
	user.password = await bcrypt.hash(user.password, 10);
	await user.save();

	const token = user.generateToken();
	res.header("x-auth-token", token).send({
		_id: user._id,
		name: user.name,
		email: user.email
	});
};
