import { getAllDirDirs, getAllDirFiles } from "../fs";
import { AsyncClient } from "../../types/AsyncClient";
import { uploadFiles } from "./uploadFiles";
import { uploadDirectories } from "./uploadDirectories";
import { ItemPool } from "../misc";

export async function uploadDirectory(
  clientsPool: ItemPool<AsyncClient>,
  remoteDir: string,
  localDir: string
) {
  let allFiles = getAllDirFiles(localDir, []);
  const allDirs = getAllDirDirs(localDir, []);
  await uploadDirectories(clientsPool, allDirs, localDir, remoteDir);
  await uploadFiles(clientsPool, allFiles, localDir, remoteDir);
}
