import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { User, validateUser, validateLogin } from "../models/user";
import { Link } from "../models/link";

import { IAuthRequest } from "../types/Express";
import { ILinkDocument } from "Models";

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
		email: req.body.email,
		pending: true
	});
	user.password = await bcrypt.hash(user.password, 10);
	await user.save();

	res.send("Thanks for registering, please wait for approval");
};

export const login = async (req: Request, res: Response) => {
	const { error } = validateLogin(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("User does not exist");

	const match = await bcrypt.compare(req.body.password, user.password);
	if (!match) return res.status(400).send("Password invalid");

	if (user.pending) return res.status(400).send("You haven't been approved");

	const token = user.generateToken();
	res.header("x-auth-token", token).send({
		_id: user._id,
		name: user.name,
		email: user.email,
		adminType: user.adminType
	});
};

// get list of links
export const links = async (req: IAuthRequest, res: Response) => {
	const { adminType } = req.user;
	try {
		const globalLinks = await Link.find({ adminType: "ADMIN" });

		let adminSpecificLinks: ILinkDocument[] = [];
		if (adminType === "SUPER_ADMIN") {
			adminSpecificLinks = await Link.find({
				adminType: { $ne: "ADMIN" }
			});
		} else if (adminType !== "ADMIN") {
			adminSpecificLinks = await Link.find({
				adminType
			});
		}

		const viewable = globalLinks
			.map(link => link.url)
			.concat(adminSpecificLinks.map(link => link.url));
		res.send(viewable);
	} catch (err) {
		res.status(400).send("Something went wrong");
	}
};

// update link's admin role
export const updateLink = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).send("You do not have permission");
	const { url, adminType } = req.body;
	try {
		const result = await Link.updateOne({ url }, { adminType });
		res.send(`Updated ${result.nModified} links`);
	} catch (err) {
		res.status(400).send("Something went wrong");
	}
};
