import { AsyncClient } from "../../types";

export const deleteFiles = async (
  clients: AsyncClient[],
  allFiles: string[]
) => {
  const totalLength = allFiles.length;
  const clientsCount = Math.min(clients.length, totalLength);
  let filesPromises: Promise<void>[] = [];
  let count = 0;
  const failedFiles: string[] = [];
  for (let index = 0; index < clientsCount; index++) {
    filesPromises = filesPromises.concat([
      new Promise(async (resolve, reject) => {
        const client = clients[index];
        for (let j = index; j < totalLength; j += clientsCount) {
          const file = allFiles[j];
          await client.deleteAsync(file).catch((err) => {
            console.error("Error uploading a file: ", err);
            failedFiles.push(file);
          });
          count++;
          console.log(`Deleting ${count}/${totalLength}...`);
        }
        resolve();
      }),
    ]);
  }
  await Promise.all(filesPromises);
  if (failedFiles.length) {
    throw new Error(
      "Some files were not uploaded. More details above this message."
    );
  }
};
