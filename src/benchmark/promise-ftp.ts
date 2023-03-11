import * as path from "path";
import * as fs from "fs";
import PromiseFtp from "promise-ftp";
import { BenchmarkConfig, BenchmarkFtpConfig } from "./common";

async function uploadDirRecursive(
  dir: string,
  ftpClient: PromiseFtp,
  remoteDir: string
) {
  // Make sure remote directory exists
  await ftpClient.mkdir(remoteDir, true);

  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const remotePath = path.join(remoteDir, file).replaceAll(/\\/g, "/");
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      await uploadDirRecursive(filePath, ftpClient, remotePath);
    } else {
      await ftpClient.put(filePath, remotePath);
    }
  }
}

export async function uploadToFTP(
  config: BenchmarkFtpConfig,
  { remoteRoot, localRoot }: BenchmarkConfig
) {
  const tmpRoot = `${remoteRoot}-tmp`;
  const oldRoot = `${remoteRoot}-old`;

  const client = new PromiseFtp();
  try {
    await client.connect(config);

    await client.rmdir(tmpRoot, true).catch((err) => {
      if (err?.code !== 450) {
        throw err;
      }
    });
    await client.rmdir(oldRoot, true).catch((err) => {
      if (err?.code !== 450) {
        throw err;
      }
    });

    await client.mkdir(tmpRoot);

    await uploadDirRecursive(localRoot, client, tmpRoot);

    await client.rename(remoteRoot, oldRoot).catch((err) => {
      if (err?.code !== 550) {
        throw err;
      }
    });
    await client.rename(tmpRoot, remoteRoot);

    await client.rmdir(oldRoot, true).catch((err) => {
      if (err?.code !== 450) {
        throw err;
      }
    });
  } catch (err) {
    console.error("Error deploying using promise-ftp", err);
  } finally {
    client.end();
  }
}
