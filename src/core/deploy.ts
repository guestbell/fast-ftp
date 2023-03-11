import { ClientConfig, ClientError, DeployConfig } from "../types";
import { resolve } from "path";
import {
  deleteDirectory,
  uploadDirectory,
  getClients,
  ItemPool,
} from "../utils";

export async function deploy(
  deployConfig: DeployConfig,
  clientConfig: ClientConfig
) {
  const {
    remoteRoot,
    tempRoot,
    oldRoot,
    localRoot,
    concurrency = 16,
  } = deployConfig;

  const clients = await getClients(concurrency, clientConfig);
  const clientPool = new ItemPool(clients);
  const client = clients[0];

  console.log(`Using ${clients.length} connections.`);

  // Delete existing old deployment
  return new Promise<void>(async (resolve) => {
    console.log("Starting to delete '" + tempRoot + "'.");
    console.log("Starting to delete '" + oldRoot + "'.");
    const deleteTmp = deleteDirectory(clientPool, tempRoot);
    const deleteOld = deleteDirectory(clientPool, oldRoot);
    await Promise.all([deleteTmp, deleteOld]);
    resolve();
  })
    .then(async () => {
      try {
        console.log("Starting to create '" + tempRoot + "'.");
        await client.mkdirAsync(tempRoot);
      } catch (err) {
        if (err && (err as ClientError).code !== 550) {
          console.error("Error when creating '" + tempRoot + "'.", err);
          throw err;
        }
      }
    })
    .then(() => {
      console.log("Starting to upload.");
      const outTotalPath = resolve(localRoot);
      return uploadDirectory(clientPool, tempRoot, outTotalPath);
    })
    .then(async () => {
      try {
        console.log(
          "Starting to rename '" + remoteRoot + "' => '" + oldRoot + "'."
        );
        await client.renameAsync(remoteRoot, oldRoot);
      } catch (err) {
        if (err && (err as ClientError).code !== 550) {
          console.error(
            "Error when renaming '" + remoteRoot + "' => '" + oldRoot + "'."
          );
          throw err;
        }
      }
    })
    .then(async () => {
      try {
        console.log(
          "Starting to rename '" + tempRoot + "' => '" + remoteRoot + "'."
        );
        await client.renameAsync(tempRoot, remoteRoot);
      } catch (err) {
        console.error(
          "Error when renaming " + tempRoot + "' => '" + remoteRoot + "'."
        );
        throw err;
      }
    })
    .then(() => {
      console.log("Starting to delete '" + oldRoot + "'.");
      return deleteDirectory(clientPool, oldRoot);
    })
    .finally(() => {
      clients.forEach((client) => {
        client.end();
      });
    });
}
