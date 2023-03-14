import { getAllDirDirs, getAllDirFiles } from "../fs";
import { AsyncClient, FtpFunctionConfig } from "../../types";
import { uploadFiles } from "./uploadFiles";
import { uploadDirectories } from "./uploadDirectories";
import { ItemPool } from "../misc";

export const uploadDirectory =
  (config: Partial<FtpFunctionConfig>) =>
  async (
    clientsPool: ItemPool<AsyncClient>,
    remoteDir: string,
    localDir: string
  ) => {
    let allFiles = getAllDirFiles(localDir, []);
    const allDirs = getAllDirDirs(localDir, []);
    await uploadDirectories(config)(clientsPool, allDirs, localDir, remoteDir);
    await uploadFiles(config)(clientsPool, allFiles, localDir, remoteDir);
  };
