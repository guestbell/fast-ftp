import minimist from "minimist";
import { DeployConfig } from "../../types/DeployConfig";

export const getDeployConfig = (): DeployConfig => {
  const args = minimist(process.argv.slice(2));
  const remoteRoot = args["remote-root"];
  const localRoot = args["local-root"];
  if (!remoteRoot || !localRoot) {
    throw new Error(
      `We expect these parameters to be provided: --remote-root=examplePath --local-root=exampleTmpPath`
    );
  }
  const oldRoot = args["old-root"] ?? remoteRoot + "-old";
  const tempRoot = args["tmp-root"] ?? remoteRoot + "-tmp";
  const concurrency = args["concurrency"] ?? 10;
  return {
    localRoot,
    oldRoot,
    remoteRoot,
    tempRoot,
    concurrency,
  };
};
