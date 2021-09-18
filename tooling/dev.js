const esbuild = require("esbuild");
const env = require("dotenv");

const config = require("./config");

env.config();

if (!process.env.SUPABASE_KEY) {
  throw new Error("SUPABASE_KEY env must be set");
}

const HOST = "localhost";

esbuild
  .serve(
    { servedir: "www", host: HOST, port: 3000 },
    {
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
    }
  )
  .then((server) => {
    console.log(`Running on http://${HOST}:${server.port}`);
  });
