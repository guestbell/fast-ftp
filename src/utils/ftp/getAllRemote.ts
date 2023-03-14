import { AsyncClient, FtpFunctionConfig } from "../../types";
import { join } from "path";
import { ListingElement } from "ftp";
import { createLoggerFromPartialConfig, ItemPool } from "../misc";

export const getAllRemote =
  (config: Partial<FtpFunctionConfig>) =>
  async (itemPool: ItemPool<AsyncClient>, remoteDir: string) => {
    const logger = createLoggerFromPartialConfig(config);
    const client = await itemPool.acquire();
    logger.verbose("Listing directory " + remoteDir);
    const files = await client.listAsync(remoteDir.replaceAll(/\\/g, "/"));
    itemPool.release(client);
    const arrayOfFiles: ListingElement[] = [];
    let arrayOfFilesPromises: Promise<ListingElement[]>[] = [];
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
            join(remoteDir, file.name).replaceAll(/\\/g, "/")
          )
        );
      }
    }
    const allResolve = await Promise.all(arrayOfFilesPromises);
    return allResolve.reduce(
      (prev, current) => prev.concat(current),
      arrayOfFiles
    );
  };
