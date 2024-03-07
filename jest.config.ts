import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  // Other Jest configuration options
  preset: "ts-jest",
  testEnvironment: "jsdom",
};

export default config;
