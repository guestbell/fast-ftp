import { Client } from "basic-ftp";
import FtpDeploy from "ftp-deploy";
import { BenchmarkConfig, BenchmarkFtpConfig } from "../common";

export async function uploadToFTP(
  config: BenchmarkFtpConfig,
  { remoteRoot, localRoot }: BenchmarkConfig
) {
  const tmpRoot = `${remoteRoot}-tmp`;
  const oldRoot = `${remoteRoot}-old`;

  const ftpClient = new Client();
  const ftpDeploy = new FtpDeploy();

  try {
    await ftpClient.access(config);

    await ftpClient.removeDir(tmpRoot).catch((err) => {
      if (err?.code !== 550) {
        throw err;
      }
    });
    await ftpClient.removeDir(oldRoot).catch((err) => {
      if (err?.code !== 550) {
        throw err;
      }
    });
    await ftpClient.ensureDir(tmpRoot);

    // use ftp-deploy to upload the local directory to tmpRoot
    const deployOptions = {
      user: config.user,
      password: config.password,
      host: config.host,
      localRoot: localRoot,
      remoteRoot: tmpRoot,
      include: ["**/*"],
      deleteRemote: true,
    };
    await new Promise<void>((resolve, reject) => {
      ftpDeploy.deploy(deployOptions, (err: Error) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    await ftpClient.rename(remoteRoot, oldRoot).catch((err) => {
      if (err?.code !== 550) {
        throw err;
      }
    });
    await ftpClient.rename(tmpRoot, remoteRoot);
    await ftpClient.removeDir(oldRoot).catch((err) => {
      if (err?.code !== 550) {
        throw err;
      }
    });
  } catch (err) {
    console.error("Error deploying using ftp-deploy", err);
    throw err;
  } finally {
    ftpClient.close();
  }
}
