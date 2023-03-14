import winston from "winston";
import { FtpFunctionConfig } from "../../types";
import { getFinalFtpConfig } from "./getFinalFtpConfig";

export const createLogger = (level: WinstonLogLevel) =>
  winston.createLogger({
    level: level, // the minimum level of messages to log
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
      )
    ),
    transports: [new winston.transports.Console()],
  });

export const createLoggerFromPartialConfig = (
  config: Partial<FtpFunctionConfig>
) => createLogger(getFinalFtpConfig(config).logLevel);

export type WinstonLogLevel =
  | "error"
  | "warn"
  | "info"
  | "http"
  | "verbose"
  | "debug"
  | "silly";

export const WinstonLogLevels: WinstonLogLevel[] = [
  "error",
  "warn",
  "info",
  "http",
  "verbose",
  "debug",
  "silly",
];
