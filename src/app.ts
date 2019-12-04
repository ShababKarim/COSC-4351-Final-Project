import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import mongoose from "mongoose";

import * as Home from "./controllers/home";
import * as Admin from "./controllers/api/admin";
import * as Links from "./controllers/api/links";
import * as Portal from "./controllers/api/portal";
import { authenticate } from "./util/auth";
import { MONGODB_URI } from "./util/secrets";

const app = express();

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		dbName: "link_login"
	})
	.then(() => console.log("DB connected"))
	.catch(err => console.error(err));

app.set("port", process.env.PORT || 5000)
	.use(cors({ exposedHeaders: ["x-auth-token"] }))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(morgan(":method :url :status :response-time ms"))
	.use(express.static(path.join(__dirname, "../", "src", "public", "build")));

// Register routes and middleware here
app.get("/", Home.index);
app.get("/api/session-user", authenticate, Admin.sessionUser);
app.get("/api/links", authenticate, Links.links);
app.get("/api/pending", authenticate, Admin.pending);
app.get("/api/current", authenticate, Admin.current);
app.post("/api/register", Portal.register);
app.post("/api/login", Portal.login);
app.post("/api/add/link", authenticate, Links.addLink);
app.post("/api/update/link", authenticate, Links.updateLink);
app.post("/api/update/admin", authenticate, Admin.modifyOrApproveAdmin);
app.post("/api/update/admin-revoke", authenticate, Admin.revokeAdmin);
app.post("/api/remove/admin", authenticate, Admin.denyAdmin);
app.post("/api/remove/link", authenticate, Links.removeLink);

export default app;
