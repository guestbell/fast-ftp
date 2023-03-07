import { join } from "path";
import { AsyncClient } from "../../types";
import { sortFilesBySize } from "../fs";

export const uploadFiles = async (
  clients: AsyncClient[],
  allFiles: string[],
  localDir: string,
  remoteDir: string
) => {
  allFiles = sortFilesBySize(allFiles);
  const totalLength = allFiles.length;
  const clientsCount = Math.min(clients.length, totalLength);
  let filesPromises: Promise<void>[] = [];
  let count = 0;
  const failedFiles: string[] = [];
  for (let index = 0; index < clientsCount; index++) {
    filesPromises.push(
      new Promise(async (resolve, reject) => {
        const client = clients[index];
        for (let j = index; j < totalLength; j += clientsCount) {
          const file = allFiles[j];
          const remotePath = join(
            remoteDir,
            file
              .replaceAll(/\//g, "\\")
              .replace(localDir.replaceAll(/\//g, "\\"), "")
          ).replaceAll(/\\/g, "/");
          await client.putAsync(file, remotePath).catch((err) => {
            console.error("Error uploading a file: ", err);
            failedFiles.push(file);
          });
          count++;
          console.log(`Uploading ${count}/${totalLength}...`);
        }
        resolve();
      })
    );
  }
  await Promise.all(filesPromises);
  if (failedFiles.length) {
    throw new Error(
      "Some files were not uploaded. More details above this message."
    );
  }
};
