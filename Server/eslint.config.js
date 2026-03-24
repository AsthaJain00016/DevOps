export default [
  {
    files: ["**/*.js"], // checks js related file in server
    rules: {
      semi: "error", // force semicolons
      "no-unused-vars": "warn", // warn if variables are unused
    },
  },
];
