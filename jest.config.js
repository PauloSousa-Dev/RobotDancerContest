const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/src/",
});

module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
    "^.+\\.(css|scss)$": "jest-transform-css",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    ...moduleNameMapper,
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
