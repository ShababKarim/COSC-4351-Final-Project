import app from "./app";

app.listen(app.get("port"), () =>
	console.log(`Server started on port ${app.get("port")}; use ctrl+c to stop`)
);
