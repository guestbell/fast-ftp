import { AsyncClient, ClientError } from "../../types";
import {
  createLoggerFromPartialConfig,
  dirsToParallelBatches,
  getFinalFtpConfig,
  ItemPool,
  withRetry,
} from "../misc";
import { FtpFunctionConfig } from "../../types";

export const deleteDirectories =
  (config: Partial<FtpFunctionConfig>) =>
  async (clientPool: ItemPool<AsyncClient>, allDirs: string[]) => {
    const { retries } = getFinalFtpConfig(config);
    const logger = createLoggerFromPartialConfig(config);
    const parallel = dirsToParallelBatches(allDirs);
    for (let batchIndex = 0; batchIndex < parallel.length; batchIndex++) {
      const batch = parallel[batchIndex];
      await Promise.all(
        batch.map((dir) => {
          logger.verbose("Deleting directory: " + dir);
          return withRetry(
            async () => {
              const client = await clientPool.acquire();
              try {
                await client.rmdirAsync(dir);
              } catch (err) {
                if ((err as ClientError).code === 550) return; // already gone, nothing to do
                throw err;
              } finally {
                clientPool.release(client);
              }
            },
            retries,
            (retriesLeft) =>
              logger.warn(
                `Failed to delete directory '${dir}', retrying (${retriesLeft} attempts left)...`,
              ),
          );
        }),
      );
    }
  };
