import { DefaultFtpFunctionConfig } from "../../defaults";
import { FtpFunctionConfig } from "../../types";

export const getFinalFtpConfig = (config: Partial<FtpFunctionConfig>) => ({
  ...DefaultFtpFunctionConfig,
  ...config,
});
