import { join, resolve as resolvePath } from "path";
import { AsyncClient } from "../../types";
import { sortFilesBySize } from "../fs";
import { ItemPool } from "../misc";

export const uploadFiles = async (
  clientsPool: ItemPool<AsyncClient>,
  allFiles: string[],
  localDir: string,
  remoteDir: string,
  retries: number = 10
) => {
  const resolvedLocalDir = resolvePath(localDir);
  allFiles = sortFilesBySize(allFiles);
  const totalLength = allFiles.length;
  // const clientsCount = Math.min(clients.length, totalLength);
  let filesPromises: Promise<void>[] = [];
  let count = 0;
  const failedFiles: string[] = [];
  /*for (let index = 0; index < clientsCount; index++) {
    filesPromises.push(
      new Promise(async (resolve, reject) => {
        const client = clients[index];
        for (let j = index; j < totalLength; j += clientsCount) {
          const file = allFiles[j];
          const remotePath = join(
            remoteDir,
            file
              .replaceAll(/\//g, "\\")
              .split(resolvedLocalDir.replaceAll(/\//g, "\\"))[1]
          ).replaceAll(/\\/g, "/");
          await client.putAsync(file, remotePath).catch((err) => {
            console.error("Error uploading a file: ", err);
            failedFiles.push(file);
          });
          count++;
          console.log(`Uploading files ${count}/${totalLength}...`);
        }
        resolve();
      })
    );
  }
  */
  for (let j = 0; j < totalLength; j++) {
    const client = await clientsPool.acquire();
    const file = allFiles[j];
    const remotePath = join(
      remoteDir,
      file
        .replaceAll(/\//g, "\\")
        .split(resolvedLocalDir.replaceAll(/\//g, "\\"))[1]
    ).replaceAll(/\\/g, "/");
    filesPromises.push(
      client
        .putAsync(file, remotePath)
        .catch((err) => {
          console.error("Error uploading a file: ", err);
          failedFiles.push(file);
        })
        .finally(() => {
          clientsPool.release(client);
        })
    );
    count++;
    console.log(`Uploading files ${count}/${totalLength}...`);
  }
  await Promise.all(filesPromises);
  if (failedFiles.length) {
    if (retries) {
      console.log("Some files failed uploading, retrying now ...");
      await uploadFiles(
        clientsPool,
        failedFiles,
        localDir,
        remoteDir,
        retries - 1
      );
    } else {
      throw new Error(
        "Some files were not uploaded. More details above this message."
      );
    }
  }
};
