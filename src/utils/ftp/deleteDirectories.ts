import { AsyncClient, ClientError } from "../../types";
import { dirTreeToParallelBatches, getDirTree, ItemPool } from "../misc";

export const deleteDirectories = async (
  clientPool: ItemPool<AsyncClient>,
  allDirs: string[]
) => {
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
  const tree = getDirTree(allDirs);
  const parallel = dirTreeToParallelBatches(tree);
  for (let batchIndex = 0; batchIndex < parallel.length; batchIndex++) {
    const batch = parallel[batchIndex];
    const filesPromises: Promise<void>[] = [];
    for (let dirIndex = 0; dirIndex < batch.length; dirIndex++) {
      const dir = batch[dirIndex];
      console.log("Deleting directory: ", dir);
      const client = await clientPool.acquire();
      filesPromises.push(
        client
          .rmdirAsync(dir)
          .catch((err) => {
            if ((err as ClientError).code !== 550) {
              console.error("Error deleting directory ", dir, err);
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
