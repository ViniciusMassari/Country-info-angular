module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["./src/setup-jest.ts"],
  testPathIgnorePatterns: ["./src/cypress/"],
  globalSetup: "jest-preset-angular/global-setup",
};
