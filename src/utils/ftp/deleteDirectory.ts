import { AsyncClient } from "../../types/AsyncClient";
import { getAllRemote } from "./getAllRemote";
import { deleteFiles } from "./deleteFiles";
import { deleteDirectories } from "./deleteDirectories";
import { ItemPool } from "../misc";

export async function deleteDirectory(
  clientPool: ItemPool<AsyncClient>,
  remoteDir: string
) {
  const allRemote = await getAllRemote(clientPool, remoteDir);
  const allFiles = allRemote.filter((a) => a.type === "-").map((a) => a.name);
  const allDirs = allRemote.filter((a) => a.type === "d").map((a) => a.name);
  await deleteFiles(clientPool, allFiles);
  await deleteDirectories(clientPool, allDirs);
}
