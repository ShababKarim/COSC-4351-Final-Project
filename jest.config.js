module.exports = {
	globals: {
		"ts-jest": {
			tsConfig: "tsconfig.json",
			diagnostics: {
				ignoreCodes: ["TS1192", "TS1259", "TS7006"],
				warnOnly: true
			}
		}
	},
	moduleFileExtensions: ["ts", "js"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	testMatch: ["**/test/**/*.test.(ts|js)"],
	testEnvironment: "node"
};
