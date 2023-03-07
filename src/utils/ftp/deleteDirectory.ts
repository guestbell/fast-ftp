import { AsyncClient } from "../../types/AsyncClient";
import { getAllRemote } from "./getAllRemote";
import { deleteFiles } from "./deleteFiles";
import { deleteDirectories } from "./deleteDirectories";

export async function deleteDirectory(
  clients: AsyncClient[],
  remoteDir: string
) {
  const allRemote = await getAllRemote(clients, remoteDir);
  const allFiles = allRemote.filter((a) => a.type === "-").map((a) => a.name);
  const allDirs = allRemote.filter((a) => a.type === "d").map((a) => a.name);

  await deleteFiles(clients, allFiles);
  await deleteDirectories(clients, allDirs);
}
