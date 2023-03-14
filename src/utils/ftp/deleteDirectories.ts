import { AsyncClient, ClientError } from "../../types";
import {
  createLoggerFromPartialConfig,
  dirTreeToParallelBatches,
  getDirTree,
  ItemPool,
} from "../misc";
import { FtpFunctionConfig } from "../../types";

export const deleteDirectories =
  (config: Partial<FtpFunctionConfig>) =>
  async (clientPool: ItemPool<AsyncClient>, allDirs: string[]) => {
    /*allDirs.sort((a, b) => {
    const aNumSlashes = a.split("/").length;
    const bNumSlashes = b.split("/").length;

    return bNumSlashes - aNumSlashes;
  });
  for (let index = 0; index < allDirs.length; index++) {
    const dir = allDirs[index];
    await clients[0].rmdirAsync(dir, true).catch((err) => {
      if (err && err.code !== 450) {
        console.error(err);
        throw err;
      }
    });
  }*/
    const logger = createLoggerFromPartialConfig(config);
    const tree = getDirTree(allDirs);
    const parallel = dirTreeToParallelBatches(tree);
    for (let batchIndex = 0; batchIndex < parallel.length; batchIndex++) {
      const batch = parallel[batchIndex];
      const filesPromises: Promise<void>[] = [];
      for (let dirIndex = 0; dirIndex < batch.length; dirIndex++) {
        const dir = batch[dirIndex];
        logger.verbose("Deleting directory: " + dir);
        const client = await clientPool.acquire();
        filesPromises.push(
          client
            .rmdirAsync(dir)
            .catch((err) => {
              if ((err as ClientError).code !== 550) {
                logger.error("Error deleting directory " + dir, err);
              }
              throw err;
            })
            .finally(() => {
              clientPool.release(client);
            })
        );
      }
      await Promise.all(filesPromises);
    }
  };
