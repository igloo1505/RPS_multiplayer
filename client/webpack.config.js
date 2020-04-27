module.exports = {
  entry: {
    index: ["./index.js", "./socketio.js"],
    noSocket: "./index.js",
  },
  output: {
    filename: "[name].bundle.js",
  },
};
