import {
  ClientConfig,
  ClientError,
  DeployConfig,
  FtpFunctionConfig,
} from "../types";
import { resolve as pathResolve } from "path";
import {
  deleteDirectory,
  uploadDirectory,
  getClients,
  ItemPool,
  createLoggerFromPartialConfig,
  getFinalFtpConfig,
  withRetry,
} from "../utils";

export async function deploy(
  deployConfig: DeployConfig,
  clientConfig: ClientConfig,
  ftpFunctionConfig: Partial<FtpFunctionConfig>,
) {
  const {
    remoteRoot,
    tempRoot,
    oldRoot,
    localRoot,
    concurrency = 16,
  } = deployConfig;
  const logger = createLoggerFromPartialConfig(ftpFunctionConfig);
  const { retries } = getFinalFtpConfig(ftpFunctionConfig);

  const clients = await getClients(ftpFunctionConfig)(
    concurrency,
    clientConfig,
  );
  const clientPool = new ItemPool(clients);
  const client = clients[0];

  logger.info(
    `Starting to deploy '${remoteRoot}' from '${localRoot}' using ${clients.length} connections.`,
  );

  try {
    // Tasks 1 & 2: Delete any leftover temp and old directories from a previous run
    logger.info(`Task 1/7: Delete '${tempRoot}'.`);
    logger.info(`Task 2/7: Delete '${oldRoot}'.`);
    const noProgressConfig = { ...ftpFunctionConfig, showProgress: false };
    await Promise.all([
      deleteDirectory(noProgressConfig)(clientPool, tempRoot),
      deleteDirectory(noProgressConfig)(clientPool, oldRoot),
    ]);

    // Task 3: Create fresh temp directory
    logger.info(`Task 3/7: Create '${tempRoot}'.`);
    await withRetry(
      async () => {
        try {
          await client.mkdirAsync(tempRoot);
        } catch (err) {
          if ((err as ClientError).code === 550) return; // already exists, fine
          throw err;
        }
      },
      retries,
      (retriesLeft) =>
        logger.warn(
          `Task 3/7: Failed to create '${tempRoot}', retrying (${retriesLeft} attempts left)...`,
        ),
    );

    // Task 4: Upload new files into temp directory
    logger.info(`Task 4/7: Upload '${remoteRoot}' from '${localRoot}'.`);
    await uploadDirectory(ftpFunctionConfig)(
      clientPool,
      tempRoot,
      pathResolve(localRoot),
    );

    // Task 5: Move the live directory aside so we can swap in the new one
    logger.info(`Task 5/7: Rename '${remoteRoot}' => '${oldRoot}'.`);
    await withRetry(
      async () => {
        try {
          await client.renameAsync(remoteRoot, oldRoot);
        } catch (err) {
          if ((err as ClientError).code === 550) return; // remoteRoot absent (first deploy), skip
          throw err;
        }
      },
      retries,
      (retriesLeft) =>
        logger.warn(
          `Task 5/7: Failed to rename '${remoteRoot}' => '${oldRoot}', retrying (${retriesLeft} attempts left)...`,
        ),
    );

    // Task 6: Promote new upload to the live path — most critical step
    logger.info(`Task 6/7: Rename '${tempRoot}' => '${remoteRoot}'.`);
    await withRetry(
      () => client.renameAsync(tempRoot, remoteRoot),
      retries,
      (retriesLeft) =>
        logger.warn(
          `Task 6/7: Failed to rename '${tempRoot}' => '${remoteRoot}', retrying (${retriesLeft} attempts left)...`,
        ),
    );

    // Task 7: Clean up the old directory
    logger.info(`Task 7/7: Delete '${oldRoot}'.`);
    await deleteDirectory(ftpFunctionConfig)(clientPool, oldRoot);

    logger.info(`Successfully deployed '${localRoot}' to '${remoteRoot}'.`);
  } finally {
    clients.forEach((c) => c.end());
  }
}
