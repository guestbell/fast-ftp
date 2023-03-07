import { getAllDirDirs, getAllDirFiles } from "../fs";
import { AsyncClient } from "../../types/AsyncClient";
import { uploadFiles } from "./uploadFiles";
import { uploadDirectories } from "./uploadDirectories";

export async function uploadDirectory(
  clients: AsyncClient[],
  remoteDir: string,
  localDir: string
) {
  let allFiles = getAllDirFiles(localDir, []);
  const allDirs = getAllDirDirs(localDir, []);
  await uploadDirectories(clients, allDirs, localDir, remoteDir);
  await uploadFiles(clients, allFiles, localDir, remoteDir);
}
