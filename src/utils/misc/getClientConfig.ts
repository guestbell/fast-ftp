import { ClientConfig } from "../../types/ClientConfig";

export const getClientConfig = (): ClientConfig => {
  if (
    !process.env.FTP_USERNAME ||
    !process.env.FTP_PASSWORD ||
    !process.env.FTP_HOST
  ) {
    require("dotenv").config({ path: "deploy.env" });
  }
  if (
    !process.env.FTP_USERNAME ||
    !process.env.FTP_PASSWORD ||
    !process.env.FTP_HOST
  ) {
    throw new Error(
      `Config not found. These environment variables are required: FTP_USERNAME, FTP_PASSWORD and FTP_HOST setup. You can use deploy.env to configure them.`
    );
  }
  return {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    port: process.env.FTP_PORT ?? 21,
    secure: process.env.FTP_SECURE ?? false,
  };
};
