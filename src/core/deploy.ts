import { ClientConfig, DeployConfig } from "../types";
import { deleteDirectory, uploadDirectory, getClients } from "../utils";

export async function deploy(
  deployConfig: DeployConfig,
  clientConfig: ClientConfig
) {
  const { remoteRoot, tempRoot, oldRoot, localRoot } = deployConfig;

  const clients = await getClients(15, clientConfig);
  const client = clients[0];

  console.log("Starting to delete '" + oldRoot + "'.");

  // Delete existing old deployment
  return deleteDirectory(clients, oldRoot)
    .then(() => {
      console.log("Starting to delete '" + tempRoot + "'.");
      // Delete existing temp deployment
      return deleteDirectory(clients, tempRoot);
    })
    .then(async () => {
      try {
        await client.mkdirAsync(tempRoot);
        console.log("Successfully created '" + tempRoot + "'.");
      } catch (err) {
        if (err.code !== 550) {
          console.error("Error when creating '" + tempRoot + "'.");
          throw err;
        }
      }
    })
    .then(() => {
      console.log("Starting to upload.");
      const outTotalPath = __dirname + localRoot;
      return uploadDirectory(clients, tempRoot, outTotalPath);
    })
    .then(async () => {
      try {
        await client.renameAsync(remoteRoot, oldRoot);
        console.log("Renamed '" + remoteRoot + "' => '" + oldRoot + "'.");
      } catch (err) {
        console.error(
          "Error when renaming '" + remoteRoot + "' => '" + oldRoot + "'."
        );
        throw err;
      }
    })
    .then(async () => {
      try {
        await client.renameAsync(tempRoot, remoteRoot);
        console.log("Renamed '" + tempRoot + "' => '" + remoteRoot + "'.");
      } catch (err) {
        console.error(
          "Error when renaming " + tempRoot + "' => '" + remoteRoot + "'."
        );
        throw err;
      }
    })
    .then(() => {
      console.log("Starting to delete '" + oldRoot + "'.");
      return deleteDirectory(clients, oldRoot);
    })
    .finally(() => {
      clients.forEach((client) => {
        client.end();
      });
    });
}
