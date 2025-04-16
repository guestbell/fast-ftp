import minimist from "minimist";
import { FtpFunctionConfig } from "../../types";
import { WinstonLogLevel, WinstonLogLevels } from "./logger";
import { DefaultFtpFunctionConfig } from "../../defaults";

export const getFtpFunctionConfig = (): FtpFunctionConfig => {
  const args = minimist(process.argv.slice(2));
  const retries =
    (args["retries"] && Number(args["retries"])) ??
    DefaultFtpFunctionConfig.retries;
  const logLevel: WinstonLogLevel =
    args["log-level"] ?? DefaultFtpFunctionConfig.logLevel;
  const operationTimeout =
    (args["operation-timeout"] && Number(args["operation-timeout"])) ??
    DefaultFtpFunctionConfig.operationTimeout;
  if (logLevel && !WinstonLogLevels.some((a) => a === logLevel)) {
    throw new Error(
      `--log-level parameter only supports these values: [${WinstonLogLevels}] , [${logLevel}] was provided instead.`
    );
  }
  if (isNaN(retries)) {
    throw new Error(`--retries parameter only supports integers.`);
  }
  return {
    retries,
    logLevel,
    operationTimeout,
  };
};
