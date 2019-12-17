const path = require("path");

const src = (relativePath = "") => {
  return path.join(__dirname, "../src/", relativePath);
};
const dist = (relativePath = "") => {
  return path.join(__dirname, "../dist/", relativePath);
};

const configPath = {
  src: src(),
  dist: dist(),
  view: src("view")
};

module.exports = configPath;
