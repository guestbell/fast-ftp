export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        extends: "./tsconfig",
        compilerOptions: {
          jsx: "react-jsx",
        },
      },
    ],
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
