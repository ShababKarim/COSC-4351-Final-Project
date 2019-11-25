import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import morgan from "morgan";

import * as Home from "./controllers/Home";
import * as Api from "./controllers/Api";

const app = express();
app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(":method :url :status :response-time ms"));
app.use(express.static(path.join(__dirname, "../", "src", "public", "build")));

// Register routes and middleware here
app.get("/", Home.index);
app.get("/api", Api.index);

export default app;
