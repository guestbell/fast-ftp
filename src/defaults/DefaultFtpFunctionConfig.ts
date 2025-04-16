import { FtpFunctionConfig } from "../types";

export const DefaultFtpFunctionConfig: FtpFunctionConfig = {
  retries: 10,
  logLevel: "info",
  operationTimeout: 10000,
};
