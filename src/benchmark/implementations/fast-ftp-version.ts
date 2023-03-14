import { deploy } from "../../core";
import { BenchmarkConfig, BenchmarkFtpConfig } from "../common";

export const uploadToFtp = (
  config: BenchmarkFtpConfig,
  options: BenchmarkConfig
) =>
  deploy(
    {
      concurrency: 16,
      localRoot: options.localRoot,
      remoteRoot: options.remoteRoot,
      oldRoot: `${options.remoteRoot}-old`,
      tempRoot: `${options.remoteRoot}-tmp`,
    },
    config
  );
