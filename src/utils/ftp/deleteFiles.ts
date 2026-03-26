import { AsyncClient, FtpFunctionConfig } from "../../types";
import { createLoggerFromPartialConfig, ItemPool } from "../misc";
import { getFinalFtpConfig } from "./../misc/getFinalFtpConfig";
import * as cliProgress from "cli-progress";

export const deleteFiles =
  (config: Partial<FtpFunctionConfig>) =>
  async (clientPool: ItemPool<AsyncClient>, allFiles: string[]) => {
    const { retries, showProgress } = getFinalFtpConfig(config);
    const logger = createLoggerFromPartialConfig(config);
    const totalLength = allFiles.length;
    let filesPromises: Promise<void>[] = [];
    let count = 0;
    const failedFiles: string[] = [];

    const bar =
      showProgress && totalLength > 0
        ? new cliProgress.SingleBar(
            {
              format: "Deleting files |{bar}| {value}/{total} files",
              clearOnComplete: false,
              hideCursor: true,
            },
            cliProgress.Presets.shades_classic,
          )
        : null;
    if (bar) bar.start(totalLength, 0);

    for (let j = 0; j < totalLength; j++) {
      const file = allFiles[j];
      const client = await clientPool.acquire();
      filesPromises.push(
        client
          .deleteAsync(file)
          .catch((err) => {
            if (err.code !== 550) {
              logger.error("Error deleting a file: " + file, err);
              failedFiles.push(file);
            }
          })
          .finally(() => {
            clientPool.release(client);
            if (bar) bar.increment();
          }),
      );
      count++;
      logger.verbose(`Deleting files ${count}/${totalLength}...`);
    }
    await Promise.all(filesPromises);
    if (bar) bar.stop();
    if (failedFiles.length) {
      if (retries) {
        logger.warn(
          `${failedFiles.length} file(s) failed deleting, retrying (${retries} attempts left)...`,
        );
        await deleteFiles({ ...config, showProgress: false, retries: retries - 1 })(
          clientPool,
          failedFiles,
        );
      } else {
        throw new Error(
          "Some files were not deleted. More details above this message.",
        );
      }
    }
  };
