import Client, { ListingElement } from "ftp";
import { promisify } from "util";
import {
  AsyncClient,
  ClientConfig,
  ClientError,
  FtpFunctionConfig,
} from "../../types";

export const getClients =
  (config: Partial<FtpFunctionConfig>) =>
  async (concurrency = 30, config: ClientConfig) => {
    let clientsPromises: Promise<AsyncClient>[] = [];
    for (let index = 0; index < concurrency; index++) {
      const client = new Client() as AsyncClient;
      clientsPromises = clientsPromises.concat([
        new Promise((resolve, reject) => {
          client.on("ready", () => {
            client.renameAsync = promisify(client.rename).bind(client);
            client.mkdirAsync = promisify(client.mkdir).bind(client);
            client.rmdirAsync = promisify(client.rmdir).bind(client);
            client.putAsync = promisify(client.put).bind(client);
            client.deleteAsync = promisify(client.delete).bind(client);
            client.listAsync = async (remoteDir: string) =>
              (await new Promise<ListingElement[]>((resolve, reject) =>
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
              )) ?? [];
            // client.listAsync = util.promisify(client.listAsync).bind(client);
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
