import { getClientConfig } from "../utils";
import { uploadToFTP as uploadToFTPBasic } from "./implementations/basic-ftp";
import { benchmark } from "./benchmark";
import { BenchmarkFunction } from "./common";
import { uploadToFTP as uploadToFTPdeploy } from "./implementations/ftp-deploy-version";
import { uploadToFTP as uploadToFTPPromise } from "./implementations/promise-ftp";
import { resolve } from "path";
import { uploadToFTP } from "./implementations/ftp-version";
import { uploadToFtp as uploadToFtpFastFtp } from "./implementations/fast-ftp-version";
import { saveTableToFile } from "./utils/saveTableToFile";
import { createTable } from "./utils/createTable";

const functions: BenchmarkFunction[] = [
  { function: uploadToFTP, name: "ftp" },
  { function: uploadToFTPBasic, name: "basic-ftp" },
  { function: uploadToFTPdeploy, name: "ftp-deploy" },
  { function: uploadToFTPPromise, name: "promise-ftp" },
  {
    function: uploadToFtpFastFtp,
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
    localRoot: resolve("./exampleData/small"),
    remoteRoot: "/test",
  },
}).then((results) => {
  const table = createTable(results);
  saveTableToFile(table);
  console.log(results);
});
