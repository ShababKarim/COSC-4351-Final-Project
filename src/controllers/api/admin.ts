import { Response } from "express";
import { User } from "../../models/user";

import { IAuthRequest } from "../../types/Express";

// get list of pending approvals
export const pending = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).send("You do not have permission");
	try {
		const pendingApprovals = await User.find({ pending: true }).select([
			"-password"
		]);
		res.send(pendingApprovals);
	} catch (err) {
		res.status(400).send("Something went wrong");
	}
};

// approve pending admins
export const modifyOrApproveAdmin = async (
	req: IAuthRequest,
	res: Response
) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).send("You do not have permission");
	const { email, adminType } = req.body;
	try {
		const result = await User.findOneAndUpdate(
			{ email },
			{
				adminType,
				pending: false
			}
		);
		res.send(`Updated ${result.email ? result.email : "0"}`);
	} catch (err) {
		res.status(400).send("Something went wrong");
	}
};

// revoke admin privilege - return to pending state
export const revokeAdmin = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).send("You do not have permission");
	try {
		const { email } = req.body;
		const result = await User.findOneAndUpdate(
			{ email },
			{ adminType: "ADMIN", pending: true }
		);
		res.send(`Revoked ${result.email ? result.email : "0"}`);
	} catch (err) {
		res.status(400).send("Something went wrong");
	}
};

// remove admin
export const denyAdmin = async (req: IAuthRequest, res: Response) => {
	if (req.user.adminType !== "SUPER_ADMIN")
		res.status(400).send("You do not have permission");
	try {
		const { email } = req.body;
		const result = await User.findOneAndRemove({ email });
		res.send(`Removed ${result.email ? result.email : "0"}`);
	} catch (err) {
		res.status(400).send("Something went wrong");
	}
};
