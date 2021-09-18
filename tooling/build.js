const esbuild = require("esbuild");
const env = require("dotenv");

const config = require("./config");

env.config();

if (!process.env.SUPABASE_KEY) {
  throw new Error("SUPABASE_KEY env must be set");
}

esbuild.build({
  entryPoints: [config.JS_SRC],
  outfile: "www/app.js",
  bundle: true,
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
  },
  define: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
});
