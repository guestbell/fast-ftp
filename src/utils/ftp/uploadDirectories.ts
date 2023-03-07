import { join } from "path";
import { AsyncClient } from "../../types";

export const uploadDirectories = async (
  clients: AsyncClient[],
  allDirs: string[],
  localDir: string,
  remoteDir: string
) => {
  for (let index = 0; index < allDirs.length; index++) {
    const f = allDirs[index];
    const remotePath = join(
      remoteDir,
      f.replaceAll(/\//g, "\\").replace(localDir.replaceAll(/\//g, "\\"), "")
    ).replaceAll(/\\/g, "/");
    await clients[0].mkdirAsync(remotePath).catch((err) => {
      if (err && err.code !== 450) {
        console.error(err);
        throw err;
      }
    });
  }
};
