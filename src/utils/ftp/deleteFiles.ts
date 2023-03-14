import { AsyncClient, FtpFunctionConfig } from "../../types";
import { createLoggerFromPartialConfig, ItemPool } from "../misc";
import { getFinalFtpConfig } from "./../misc/getFinalFtpConfig";

export const deleteFiles =
  (config: Partial<FtpFunctionConfig>) =>
  async (clientPool: ItemPool<AsyncClient>, allFiles: string[]) => {
    const { retries } = getFinalFtpConfig(config);
    const logger = createLoggerFromPartialConfig(config);
    const totalLength = allFiles.length;
    let filesPromises: Promise<void>[] = [];
    let count = 0;
    const failedFiles: string[] = [];
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
          })
      );
      count++;
      logger.verbose(`Deleting files ${count}/${totalLength}...`);
    }
    await Promise.all(filesPromises);
    if (failedFiles.length) {
      if (retries) {
        logger.warn("Some files failed deleting, retrying now ...");
        await deleteFiles({ ...config, retries: retries - 1 })(
          clientPool,
          failedFiles
        );
      } else {
        throw new Error(
          "Some files were not deleted. More details above this message."
        );
      }
    }
  };
