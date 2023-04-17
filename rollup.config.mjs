import { babel } from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";
import commonjs from "@rollup/plugin-commonjs";
import shebang from "rollup-plugin-add-shebang";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
      {
        file: "dist/index.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      del({ targets: "dist" }),
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: [],
      }),
      external(),
      resolve(),
      commonjs(),
      typescript(),
      json(),
      shebang({
        // A single or an array of filename patterns. Defaults to ['**/cli.js', '**/bin.js'].
        include: "dist/index.js",
        // you could also 'exclude' here
        // or specify a special shebang (or a function returning one) using the 'shebang' option
      }),
      //terser(),
    ],
  },
  {
    input: "./src/lib.ts",
    output: [
      {
        file: "dist/lib.js",
        format: "cjs",
      },
      {
        file: "dist/lib.es.js",
        format: "es",
        exports: "named",
      },
    ],
    plugins: [
      babel({
        babelHelpers: "bundled",
        exclude: "node_modules/**",
        presets: [],
      }),
      external(),
      resolve(),
      commonjs(),
      typescript(),
      json(),
      //terser(),
    ],
  },
  {
    // path to your declaration files root
    input: "./dist/dts/lib.d.ts",
    output: [{ file: "dist/lib.d.ts", format: "es" }],
    plugins: [dts(), del({ targets: "dist/dts", hook: "buildEnd" })],
  },
];
