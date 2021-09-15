const esbuild = require("esbuild");

const config = require("./config");

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
    }
  )
  .then((server) => {
    console.log(`Running on http://${HOST}:${server.port}`);
  });
