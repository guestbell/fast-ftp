import { deploy } from "./core";
import {
  getClientConfig,
  getDeployConfig,
  getFtpFunctionConfig,
} from "./utils";

console.time("Deployment");
deploy(getDeployConfig(), getClientConfig(), getFtpFunctionConfig())
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error("Unable to deploy due to an error: ", err);
    process.exit(1);
  })
  .finally(() => {
    console.time("Deployment");
  });
