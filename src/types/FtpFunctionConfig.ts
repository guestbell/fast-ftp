import { WinstonLogLevel } from "../utils";

export type FtpFunctionConfig = {
  retries: number;
  logLevel: WinstonLogLevel;
  operationTimeout: number;
};
