import {
  ClientConfig,
  ClientError,
  DeployConfig,
  FtpFunctionConfig,
} from "../types";
import { resolve } from "path";
import {
  deleteDirectory,
  uploadDirectory,
  getClients,
  ItemPool,
  createLoggerFromPartialConfig,
} from "../utils";

export async function deploy(
  deployConfig: DeployConfig,
  clientConfig: ClientConfig,
  ftpFunctionConfig: Partial<FtpFunctionConfig>
) {
  const {
    remoteRoot,
    tempRoot,
    oldRoot,
    localRoot,
    concurrency = 16,
  } = deployConfig;
  const logger = createLoggerFromPartialConfig(ftpFunctionConfig);

  const clients = await getClients(ftpFunctionConfig)(
    concurrency,
    clientConfig
  );
  const clientPool = new ItemPool(clients);
  const client = clients[0];

  logger.info(
    `Starting to deploy '${remoteRoot}' from '${localRoot}' using ${clients.length} connections.`
  );

  // Delete existing old deployment
  return new Promise<void>(async (resolve) => {
    logger.info("Task 1/7: Delete '" + tempRoot + "'.");
    logger.info("Task 2/7: Delete '" + oldRoot + "'.");
    const deleteTmp = deleteDirectory(ftpFunctionConfig)(clientPool, tempRoot);
    const deleteOld = deleteDirectory(ftpFunctionConfig)(clientPool, oldRoot);
    await Promise.all([deleteTmp, deleteOld]);
    resolve();
  })
    .then(async () => {
      try {
        logger.info("Task 3/7: Create '" + tempRoot + "'.");
        await client.mkdirAsync(tempRoot);
      } catch (err) {
        if (err && (err as ClientError).code !== 550) {
          logger.error("Error when creating '" + tempRoot + "'.", err);
          throw err;
        }
      }
    })
    .then(() => {
      logger.info(`Task 4/7: Upload '${remoteRoot}' from '${localRoot}'.`);
      const outTotalPath = resolve(localRoot);
      return uploadDirectory(ftpFunctionConfig)(
        clientPool,
        tempRoot,
        outTotalPath
      );
    })
    .then(async () => {
      try {
        logger.info(
          "Task 5/7: Rename '" + remoteRoot + "' => '" + oldRoot + "'."
        );
        await client.renameAsync(remoteRoot, oldRoot);
      } catch (err) {
        if (err && (err as ClientError).code !== 550) {
          logger.error(
            "Error when renaming '" + remoteRoot + "' => '" + oldRoot + "'."
          );
          throw err;
        }
      }
    })
    .then(async () => {
      try {
        logger.info(
          "Task 6/7: Rename '" + tempRoot + "' => '" + remoteRoot + "'."
        );
        await client.renameAsync(tempRoot, remoteRoot);
      } catch (err) {
        logger.error(
          "Error when renaming " + tempRoot + "' => '" + remoteRoot + "'."
        );
        throw err;
      }
    })
    .then(() => {
      logger.info("Task 7/7: Delete '" + oldRoot + "'.");
      return deleteDirectory(ftpFunctionConfig)(clientPool, oldRoot);
    })
    .finally(() => {
      clients.forEach((client) => {
        client.end();
      });
    });
}
