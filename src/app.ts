import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import mongoose from "mongoose";

import * as Home from "./controllers/home";
import * as Api from "./controllers/api";
import { authenticate } from "./util/auth";
import { MONGODB_URI } from "./util/secrets";

const app = express();

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		dbName: "link_login"
	})
	.then(() => console.log("DB connected"))
	.catch(err => console.error(err));

app.set("port", process.env.PORT || 5000)
	.use(cors())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: true }))
	.use(morgan(":method :url :status :response-time ms"))
	.use(express.static(path.join(__dirname, "../", "src", "public", "build")));

// Register routes and middleware here
app.get("/", Home.index);
app.get("/api", authenticate, Api.index);
app.post("/api/register", Api.register);

export default app;
