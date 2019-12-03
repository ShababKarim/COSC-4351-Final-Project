import * as request from "supertest";
import app from "../../src/app";

describe("GET /", () => {
	it("returns a 200 ok response", () => {
		return request(app)
			.get("/")
			.expect(200);
	});
});
