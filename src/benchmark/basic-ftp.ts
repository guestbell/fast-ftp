import { Client } from "basic-ftp";
import { BenchmarkConfig, BenchmarkFtpConfig } from "./common";

export async function uploadToFTP(
  config: BenchmarkFtpConfig,
  { remoteRoot, localRoot }: BenchmarkConfig
) {
  const tmpRoot = `${remoteRoot}-tmp`;
  const oldRoot = `${remoteRoot}-old`;

  const client = new Client();
  try {
    await client.access(config);

    await client.removeDir(tmpRoot).catch((err) => {
      if (err?.code !== 550) {
        throw err;
      }
    });
    await client.removeDir(oldRoot).catch((err) => {
      if (err?.code !== 550) {
        throw err;
      }
    });

    await client.ensureDir(tmpRoot);
    await client.clearWorkingDir();

    await client.uploadFromDir(localRoot, tmpRoot);

    await client.rename(remoteRoot, oldRoot).catch((err) => {
      if (err?.code !== 550) {
        throw err;
      }
    });
    await client.rename(tmpRoot, remoteRoot);

    await client.removeDir(oldRoot).catch((err) => {
      if (err?.code !== 550) {
        throw err;
      }
    });
  } catch (err) {
    console.error("Error deploying using basic-ftp", err);
  } finally {
    client.close();
  }
}
