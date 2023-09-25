const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: {
    tailwindcss: require("./tailwind.config.js"),
    autoprefixer: require("autoprefixer"),
  },
};
