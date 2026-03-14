import { join, resolve } from "path";
import { AsyncClient, ClientError, FtpFunctionConfig } from "../../types";
import {
  createLoggerFromPartialConfig,
  dirsToParallelBatches,
  getFinalFtpConfig,
  ItemPool,
  withRetry,
} from "../misc";

export const uploadDirectories =
  (config: Partial<FtpFunctionConfig>) =>
  async (
    clientsPool: ItemPool<AsyncClient>,
    allDirs: string[],
    localDir: string,
    remoteDir: string,
  ) => {
    const { retries } = getFinalFtpConfig(config);
    const logger = createLoggerFromPartialConfig(config);
    const resolvedLocalDir = resolve(localDir);
    const resolvedDirs = allDirs.map((a) =>
      join(
        remoteDir,
        resolve(a)
          .replaceAll(/\//g, "\\")
          .replace(resolvedLocalDir.replaceAll(/\//g, "\\"), ""),
      ).replaceAll(/\\/g, "/"),
    );
    const parallel = dirsToParallelBatches(resolvedDirs).reverse();
    for (let batchIndex = 0; batchIndex < parallel.length; batchIndex++) {
      const batch = parallel[batchIndex];
      await Promise.all(
        batch.map((dir) => {
          logger.verbose("Creating directory: " + dir);
          return withRetry(
            async () => {
              const client = await clientsPool.acquire();
              try {
                await client.mkdirAsync(dir);
              } catch (err) {
                if (err && (err as ClientError).code === 450) return; // already exists
                throw err;
              } finally {
                clientsPool.release(client);
              }
            },
            retries,
            (retriesLeft) =>
              logger.warn(
                `Failed to create directory '${dir}', retrying (${retriesLeft} attempts left)...`,
              ),
          );
        }),
      );
    }
  };
