import { join, resolve as resolvePath } from "path";
import { AsyncClient, FtpFunctionConfig } from "../../types";
import { sortFilesBySize } from "../fs";
import {
  createLoggerFromPartialConfig,
  getFinalFtpConfig,
  ItemPool,
} from "../misc";
import * as cliProgress from "cli-progress";

export const uploadFiles =
  (config: Partial<FtpFunctionConfig>) =>
  async (
    clientsPool: ItemPool<AsyncClient>,
    allFiles: string[],
    localDir: string,
    remoteDir: string,
  ) => {
    const { retries, showProgress } = getFinalFtpConfig(config);
    const logger = createLoggerFromPartialConfig(config);
    const resolvedLocalDir = resolvePath(localDir);
    allFiles = sortFilesBySize(allFiles);
    const totalLength = allFiles.length;
    let filesPromises: Promise<void>[] = [];
    let count = 0;
    const failedFiles: string[] = [];

    const bar =
      showProgress && totalLength > 0
        ? new cliProgress.SingleBar(
            {
              format: "Uploading |{bar}| {value}/{total} files",
              clearOnComplete: false,
              hideCursor: true,
            },
            cliProgress.Presets.shades_classic,
          )
        : null;
    if (bar) bar.start(totalLength, 0);

    for (let j = 0; j < totalLength; j++) {
      const client = await clientsPool.acquire();
      const file = allFiles[j];
      const remotePath = join(
        remoteDir,
        file
          .replaceAll(/\//g, "\\")
          .split(resolvedLocalDir.replaceAll(/\//g, "\\"))[1],
      ).replaceAll(/\\/g, "/");
      filesPromises.push(
        client
          .putAsync(file, remotePath)
          .catch((err) => {
            logger.error("Error uploading a file: ", err);
            failedFiles.push(file);
          })
          .finally(() => {
            clientsPool.release(client);
            if (bar) bar.increment();
          }),
      );
      count++;
      logger.verbose(`Uploading files ${count}/${totalLength}...`);
    }
    await Promise.all(filesPromises);
    if (bar) bar.stop();
    if (failedFiles.length) {
      if (retries) {
        logger.warn(
          `${failedFiles.length} file(s) failed uploading, retrying (${retries} attempts left)...`,
        );
        await uploadFiles({
          ...config,
          showProgress: false,
          retries: retries - 1,
        })(clientsPool, failedFiles, localDir, remoteDir);
      } else {
        throw new Error(
          "Some files were not uploaded. More details above this message.",
        );
      }
    }
  };
