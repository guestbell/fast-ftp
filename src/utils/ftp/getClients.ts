import Client, { ListingElement } from "ftp";
import { promisify } from "util";
import {
  AsyncClient,
  ClientConfig,
  ClientError,
  FtpFunctionConfig,
} from "../../types";
import { withTimeoutFunction } from "utils/misc/withTimeout";

export const getClients =
  (config: Partial<FtpFunctionConfig>) =>
  async (concurrency = 30, config: ClientConfig) => {
    let clientsPromises: Promise<AsyncClient>[] = [];
    for (let index = 0; index < concurrency; index++) {
      const client = new Client() as AsyncClient;
      clientsPromises = clientsPromises.concat([
        new Promise((resolve, reject) => {
          client.on("ready", () => {
            const { operationTimeout = 10_000 } = config;

            client.renameAsync = withTimeoutFunction(
              promisify(client.rename).bind(client),
              operationTimeout,
              "renameAsync timed out"
            );

            client.mkdirAsync = withTimeoutFunction(
              promisify(client.mkdir).bind(client),
              operationTimeout,
              "mkdirAsync timed out"
            );

            client.rmdirAsync = withTimeoutFunction(
              promisify(client.rmdir).bind(client),
              operationTimeout,
              "rmdirAsync timed out"
            );

            client.putAsync = withTimeoutFunction(
              promisify(client.put).bind(client),
              operationTimeout,
              "putAsync timed out"
            );

            client.deleteAsync = withTimeoutFunction(
              promisify(client.delete).bind(client),
              operationTimeout,
              "deleteAsync timed out"
            );

            client.listAsync = withTimeoutFunction(
              (remoteDir: string) =>
                new Promise<ListingElement[]>((resolve, reject) =>
                  client.list(
                    remoteDir.replaceAll(/\\/g, "/"),
                    (err: Error, data: ListingElement[]) => {
                      if (err && (err as ClientError).code !== 450) {
                        reject(err);
                      } else {
                        resolve(
                          (data ?? []).filter(
                            (a) => a.name !== "." && a.name !== ".."
                          )
                        );
                      }
                    }
                  )
                ),
              operationTimeout,
              "listAsync timed out"
            );
            resolve(client);
          });
          client.on("error", (err) => {
            client.end();
            reject(err);
          });
          client.connect(config);
        }),
      ]);
    }

    const clients = await Promise.allSettled(clientsPromises).then((values) =>
      values
        .filter((o) => o.status === "fulfilled")
        .map((o) => (o as PromiseFulfilledResult<AsyncClient>).value)
    );
    return clients;
  };
