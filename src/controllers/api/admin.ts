import { Response } from "express";
import { User } from "../../models/user";

import { IAuthRequest } from "../../types/Express";

export const sessionUser = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).json("Not a super admin");
	try {
		const superAdmin = await User.findById(req.user._id).select([
			"-password",
			"-pending"
		]);
		res.json(superAdmin);
	} catch (err) {
		res.status(400).json("Something went wrong");
	}
};

// get list of pending approvals
export const current = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).json("You do not have permission");
	try {
		const currentUsers = await User.find({
			pending: false,
			adminType: { $ne: "SUPER_ADMIN" }
		}).select(["-password"]);
		res.json(currentUsers);
	} catch (err) {
		res.status(400).json("Something went wrong");
	}
};

// get list of pending approvals
export const pending = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).json("You do not have permission");
	try {
		const pendingApprovals = await User.find({ pending: true }).select([
			"-password"
		]);
		res.json(pendingApprovals);
	} catch (err) {
		res.status(400).json("Something went wrong");
	}
};

// approve pending admins
export const modifyOrApproveAdmin = async (
	req: IAuthRequest,
	res: Response
) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).json("You do not have permission");
	const { email, adminType } = req.body;
	try {
		const result = await User.findOneAndUpdate(
			{ email },
			{
				adminType,
				pending: false
			}
		);
		res.json(`Updated ${result.email ? result.email : "0"}`);
	} catch (err) {
		res.status(400).json("Something went wrong");
	}
};

// revoke admin privilege - return to pending state
export const revokeAdmin = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).json("You do not have permission");
	try {
		const { email } = req.body;
		const result = await User.findOneAndUpdate(
			{ email },
			{ adminType: "ADMIN", pending: true }
		);
		res.json(`Revoked ${result.email ? result.email : "0"}`);
	} catch (err) {
		res.status(400).json("Something went wrong");
	}
};

// remove admin
export const denyAdmin = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).json("You do not have permission");
	try {
		const { email } = req.body;
		const result = await User.findOneAndRemove({ email });
		res.json(`Removed ${result.email ? result.email : "0"}`);
	} catch (err) {
		res.status(400).json("Something went wrong");
	}
};
