module.exports = {
    preset: "jest-preset-angular",
    globals: {
        "ts-jest": {
            tsConfig: "<rootDir>/src/tsconfig.spec.json",
            stringifyContentPathRegex: "\\.html",
            astTransformers: [
                "<rootDir>/node_modules/jest-preset-angular/build/InlineFilesTransformer",
                "<rootDir>/node_modules/jest-preset-angular/build/StripStylesTransformer",
            ]
        }
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"],
    testRegex: "\\.spec\\.ts",
    collectCoverage: true
}