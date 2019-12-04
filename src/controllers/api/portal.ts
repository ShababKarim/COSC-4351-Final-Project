import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { User, validateUser, validateLogin } from "../../models/user";

export const register = async (req: Request, res: Response) => {
	// validate the request body first
	const { error } = validateUser(req.body);
	if (error) return res.status(400).json(error.details[0].message);

	//find an existing user
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).json("User already registered.");

	user = new User({
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
		pending: true
	});
	user.password = await bcrypt.hash(user.password, 10);
	await user.save();

	res.json("Thanks for registering, please wait for approval");
};

export const login = async (req: Request, res: Response) => {
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).json(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).json("User does not exist");

	const match = await bcrypt.compare(req.body.password, user.password);
	if (!match) return res.status(400).json("Password invalid");

	if (user.pending) return res.status(400).json("You haven't been approved");

	const token = user.generateToken();
	res.header("x-auth-token", token).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		adminType: user.adminType
	});
};
