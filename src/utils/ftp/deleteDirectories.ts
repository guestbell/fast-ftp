import { AsyncClient, ClientError } from "../../types";
import {
  createLoggerFromPartialConfig,
  dirsToParallelBatches,
  getFinalFtpConfig,
  ItemPool,
  withRetry,
} from "../misc";
import { FtpFunctionConfig } from "../../types";
import * as cliProgress from "cli-progress";

export const deleteDirectories =
  (config: Partial<FtpFunctionConfig>) =>
  async (clientPool: ItemPool<AsyncClient>, allDirs: string[]) => {
    const { retries, showProgress } = getFinalFtpConfig(config);
    const logger = createLoggerFromPartialConfig(config);
    const parallel = dirsToParallelBatches(allDirs);
    const totalDirs = allDirs.length;

    const bar =
      showProgress && totalDirs > 0
        ? new cliProgress.SingleBar(
            {
              format: "Deleting dirs  |{bar}| {value}/{total} dirs",
              clearOnComplete: false,
              hideCursor: true,
            },
            cliProgress.Presets.shades_classic,
          )
        : null;
    if (bar) bar.start(totalDirs, 0);

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
          ).finally(() => {
            if (bar) bar.increment();
          });
        }),
      );
    }
    if (bar) bar.stop();
  };
