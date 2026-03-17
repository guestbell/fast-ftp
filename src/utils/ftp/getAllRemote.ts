import { AsyncClient, FtpFunctionConfig } from "../../types";
import { join } from "path";
import { ListingElement } from "ftp";
import {
  createLoggerFromPartialConfig,
  getFinalFtpConfig,
  ItemPool,
  withRetry,
} from "../misc";

export const getAllRemote =
  (config: Partial<FtpFunctionConfig>) =>
  async (itemPool: ItemPool<AsyncClient>, remoteDir: string) => {
    const { retries } = getFinalFtpConfig(config);
    const logger = createLoggerFromPartialConfig(config);
    logger.verbose("Listing directory " + remoteDir);

    const files = await withRetry(
      async () => {
        const client = await itemPool.acquire();
        try {
          return await client.listAsync(remoteDir.replaceAll(/\\/g, "/"));
        } finally {
          itemPool.release(client);
        }
      },
      retries,
      (retriesLeft) =>
        logger.warn(
          `Failed to list directory '${remoteDir}', retrying (${retriesLeft} attempts left)...`,
        ),
    );

    const arrayOfFiles: ListingElement[] = [];
    const arrayOfFilesPromises: Promise<ListingElement[]>[] = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      arrayOfFiles.push({
        ...file,
        name: join(remoteDir, file.name).replaceAll(/\\/g, "/"),
      });
      if (file.type === "d") {
        arrayOfFilesPromises.push(
          getAllRemote(config)(
            itemPool,
            join(remoteDir, file.name).replaceAll(/\\/g, "/"),
          ),
        );
      }
    }
    const allResolve = await Promise.all(arrayOfFilesPromises);
    return allResolve.reduce(
      (prev, current) => prev.concat(current),
      arrayOfFiles,
    );
  };
