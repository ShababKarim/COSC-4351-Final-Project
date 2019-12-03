import { Response } from "express";
import { Link } from "../../models/link";

import { IAuthRequest } from "../../types/Express";
import { ILinkDocument } from "Models";

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

		const viewable = [...globalLinks, ...adminSpecificLinks];
		res.send(viewable);
	} catch (err) {
		res.status(400).send("Something went wrong");
	}
};

// add link
export const addLink = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).send("You are not authorized");
	try {
		const { url, adminType } = req.body;
		if (!url || !adminType) res.status(400).send("Link fields missing");

		let link = await Link.findOne({ url, adminType });
		if (link) res.status(400).send("Link already exists");

		link = new Link({ url, adminType });
		await link.save();
		res.send(`${url} for ${adminType} added`);
	} catch (err) {
		res.status(400).send("Something went wrong");
	}
};

// remove link
export const removeLink = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).send("You are not authorized");
	try {
		const { url } = req.body;
		const result = await Link.deleteMany({ url });
		res.send(`Removed ${result.deletedCount} link(s)`);
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
