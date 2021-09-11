const esbuild = require("esbuild");

const config = require("./config");

esbuild.build({
  entryPoints: [config.JS_SRC],
  outfile: "www/app.js",
  bundle: true,
});
