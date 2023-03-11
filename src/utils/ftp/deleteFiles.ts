import { AsyncClient } from "../../types";
import { ItemPool } from "../misc";

export const deleteFiles = async (
  clientPool: ItemPool<AsyncClient>,
  allFiles: string[]
) => {
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
            console.error("Error deleting a file: ", file, err);
            failedFiles.push(file);
          }
        })
        .finally(() => {
          clientPool.release(client);
        })
    );
    count++;
    console.log(`Deleting files ${count}/${totalLength}...`);
  }
  await Promise.all(filesPromises);
  if (failedFiles.length) {
    throw new Error(
      "Some files were not uploaded. More details above this message."
    );
  }
};
