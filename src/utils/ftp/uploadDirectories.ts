import { join, resolve } from "path";
import { AsyncClient } from "../../types";
import { getDirTree, ItemPool } from "../misc";
import { dirTreeToParallelBatches } from "./../misc/dirTreeToParallelBatches";

export const uploadDirectories = async (
  clientsPool: ItemPool<AsyncClient>,
  allDirs: string[],
  localDir: string,
  remoteDir: string
) => {
  const resolvedLocalDir = resolve(localDir);
  const tree = getDirTree(
    allDirs.map((a) =>
      join(
        remoteDir,
        resolve(a)
          .replaceAll(/\//g, "\\")
          .replace(resolvedLocalDir.replaceAll(/\//g, "\\"), "")
      ).replaceAll(/\\/g, "/")
    )
  );
  const parallel = dirTreeToParallelBatches(tree).reverse().slice(1);
  for (let batchIndex = 0; batchIndex < parallel.length; batchIndex++) {
    const batch = parallel[batchIndex];
    const clientsPromises: Promise<void>[] = [];
    for (let dirIndex = 0; dirIndex < batch.length; dirIndex++) {
      const dir = batch[dirIndex];
      console.log("Creating directory: ", dir);
      const client = await clientsPool.acquire();
      clientsPromises.push(
        client
          .mkdirAsync(dir)
          .catch((err) => {
            if (err && err.code !== 450) {
              console.error(err);
              throw err;
            }
          })
          .finally(() => {
            clientsPool.release(client);
          })
      );
    }
    await Promise.all(clientsPromises);
  }
  /*for (let index = 0; index < allDirs.length; index++) {
    const f = allDirs[index];
    const remotePath = join(
      remoteDir,
      f.replaceAll(/\//g, "\\").replace(localDir.replaceAll(/\//g, "\\"), "")
    ).replaceAll(/\\/g, "/");
    console.log("Creating directory: ", remotePath);
    await clients[0].mkdirAsync(remotePath).catch((err) => {
      if (err && err.code !== 450) {
        console.error(err);
        throw err;
      }
    });
  }*/
};
