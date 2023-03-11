import { getClientConfig } from "../utils";
import { uploadToFTP as uploadToFTPBasic } from "./basic-ftp";
import { benchmark } from "./benchmark";
import { BenchmarkFunction, BenchmarkResult } from "./common";
import { uploadToFTP as uploadToFTPdeploy } from "./ftp-deploy-version";
import { uploadToFTP as uploadToFTPPromise } from "./promise-ftp";
import * as fs from "fs";
import { deploy } from "../core";
import { resolve } from "path";
import { uploadToFTP } from "./ftp-version";

function createTable(results: BenchmarkResult[]): string {
  const tableHeader =
    "| Function | Average Time (ms) | Max Time (ms) | Min Time (ms) | Avg Time vs shortest | Min Time vs shortest | Max Time vs shortest |\n| --- | --- | --- | --- | --- |\n";
  const tableRows = results.map(
    (result) =>
      `| ${result.name} | ${result.averageTime.toFixed(
        2
      )}ms | ${result.maxTime.toFixed(2)}ms | ${result.minTime.toFixed(
        2
      )}ms | ${result.averageDif.toFixed(2)} | ${result.minDif.toFixed(
        2
      )} | ${result.maxDif.toFixed(2)} |\n`
  );
  return tableHeader + tableRows.join("");
}

function saveTableToFile(table: string) {
  fs.writeFile("result.txt", table, (err) => {
    if (err) throw err;
    console.log("Table saved to result.txt");
  });
}

const functions: BenchmarkFunction[] = [
  { function: uploadToFTP, name: "ftp" },
  { function: uploadToFTPBasic, name: "basic-ftp" },
  { function: uploadToFTPdeploy, name: "ftp-deploy" },
  { function: uploadToFTPPromise, name: "promise-ftp" },
  {
    function: (config, options) =>
      deploy(
        {
          concurrency: 16,
          localRoot: options.localRoot,
          remoteRoot: options.remoteRoot,
          oldRoot: `${options.remoteRoot}-old`,
          tempRoot: `${options.remoteRoot}-tmp`,
        },
        config
      ),
    name: "fast-ftp",
  },
];

const clientConfig = getClientConfig();

benchmark({
  repetitions: 2,
  functions,
  config: {
    host: clientConfig.host!,
    password: clientConfig.password!,
    user: clientConfig.user!,
  },
  options: {
    localRoot: resolve("./exampleDataSmall"),
    remoteRoot: "/test",
  },
}).then((results) => {
  const table = createTable(results);
  saveTableToFile(table);
  console.log(results);
});
