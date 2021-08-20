// Based off of "Using Native Javascript Modules in Production Today" by Philip Walton:
//   - https://philipwalton.com/articles/using-native-javascript-modules-in-production-today/
//   - https://github.com/philipwalton/rollup-native-modules-boilerplate/blob/master/rollup.config.js
// import path from "path";

// import json from "rollup-plugin-json";
import svelte from "rollup-plugin-svelte";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import * as tscompile from "typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import { eslint } from "rollup-plugin-eslint";
import serve from "rollup-plugin-serve";

// import prettier from "rollup-plugin-prettier";

// The typescript plugin by Rollup does _not_ do any type checking (wtf?). This plugin seems to be
// the most standard alternative which supports all of the TypeScript goodness

export default {
  input: { app: "src/index.ts" },
  // input: "src/index.ts",
  output: {
    // file: "dist/index.js",
    // format: "iife",
    dir: "dist",
    format: "esm",
    entryFileNames: "bundle.js",
    chunkFileNames: "bundle.js",
    sourcemap: true
  },
  plugins: [
    // json(),
    commonjs(),
    typescript({ typescript: tscompile, clean: true }),
    svelte({
      dev: true,
      extensions: [".svelte"],
      preprocess: require("./svelte.config.js").preprocess,
      css: false
    }),
    nodeResolve({ browser: true }),
    eslint(),
    sourceMaps(),
    serve({
      contentBase: ["dist", "public"],
      port: 8080,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
  ]
  // manualChunks(id) {
  //   if (id.includes("node_modules")) {
  //     // The directory name following the last `node_modules`.
  //     // Usually this is the package, but it could also be the scope.
  //     const directories = id.split(path.sep);
  //     const name = directories[directories.lastIndexOf("node_modules") + 1];

  //     // Group `tslib` and `dynamic-import-polyfill` into the default bundle.
  //     // NOTE: This isn't strictly necessary for this app, but it's included
  //     // to show how to manually keep deps in the default chunk.
  //     // if (name === 'tslib' || name === 'dynamic-import-polyfill') {
  //     //   return;
  //     // }

  //     // Otherwise just return the name.
  //     return name;
  //   }
  // }
};
