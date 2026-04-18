module.exports = {
  presets: ["react-app"],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ],
  overrides: [
    {
      test: "./src/components/**/*.js",
      plugins: []
    }
  ]
};
