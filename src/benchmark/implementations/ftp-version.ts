import Client from "ftp";
import * as fs from "fs";
import * as path from "path";
import { ClientError } from "../../types";

function uploadDirRecursive(
  dir: string,
  ftpClient: Client,
  remoteDir: string,
  callback: (err?: Error) => void
) {
  ftpClient.mkdir(remoteDir, true, (err) => {
    if (err) {
      return callback(err);
    }

    fs.readdir(dir, (err, files) => {
      if (err) {
        return callback(err);
      }

      let count = files.length;

      if (count === 0) {
        return callback();
      }

      for (const file of files) {
        const filePath = path.join(dir, file);
        const remotePath = path.join(remoteDir, file).replaceAll(/\\/g, "/");

        fs.stat(filePath, (err, stats) => {
          if (err) {
            return callback(err);
          }

          if (stats.isDirectory()) {
            uploadDirRecursive(filePath, ftpClient, remotePath, (err) => {
              if (err) {
                return callback(err);
              }

              if (--count === 0) {
                callback();
              }
            });
          } else {
            ftpClient.put(filePath, remotePath, (err) => {
              if (err) {
                return callback(err);
              }

              if (--count === 0) {
                callback();
              }
            });
          }
        });
      }
    });
  });
}

export async function uploadToFTP(
  config: { host: string; user: string; password: string },
  { remoteRoot, localRoot }: { remoteRoot: string; localRoot: string }
) {
  const tmpRoot = `${remoteRoot}-tmp`;
  const oldRoot = `${remoteRoot}-old`;

  const client = new Client();
  try {
    await new Promise<void>((resolve, reject) => {
      client.on("ready", () => {
        resolve();
      });
      client.on("error", (err) => {
        reject(err);
      });
      client.connect(config);
    });

    await new Promise<void>((resolve, reject) => {
      client.rmdir(remoteRoot, true, (err) => {
        if (err) {
          if ((err as ClientError).code !== 450) {
            // Ignore "directory not found" errors
            reject(err);
            return;
          }
        }
        resolve();
      });
    });
    await new Promise<void>((resolve, reject) => {
      client.rmdir(oldRoot, true, (err) => {
        if (err) {
          if ((err as ClientError).code !== 450) {
            // Ignore "directory not found" errors
            reject(err);
            return;
          }
        }
        resolve();
      });
    });

    await new Promise<void>((resolve, reject) => {
      client.mkdir(tmpRoot, true, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
    await new Promise<void>((resolve, reject) =>
      uploadDirRecursive(localRoot, client, tmpRoot, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    );

    await new Promise<void>((resolve, reject) => {
      client.rename(remoteRoot, oldRoot, (err) => {
        if (err && (err as ClientError).code !== 550) {
          reject(err);
          return;
        }
        resolve();
      });
    });
    await new Promise<void>((resolve, reject) => {
      client.rename(tmpRoot, remoteRoot, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    await new Promise<void>((resolve, reject) => {
      client.rmdir(oldRoot, true, (err) => {
        if (err) {
          if ((err as ClientError).code !== 450) {
            // Ignore "directory not found" errors
            reject(err);
            return;
          }
        }
        resolve();
      });
    });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.end();
  }
}
