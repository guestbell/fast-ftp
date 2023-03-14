import { AsyncClient } from "../../types/AsyncClient";
import { getAllRemote } from "./getAllRemote";
import { deleteFiles } from "./deleteFiles";
import { deleteDirectories } from "./deleteDirectories";
import { ItemPool } from "../misc";
import { FtpFunctionConfig } from "../../types";

export const deleteDirectory =
  (config: Partial<FtpFunctionConfig>) =>
  async (clientPool: ItemPool<AsyncClient>, remoteDir: string) => {
    const allRemote = await getAllRemote(config)(clientPool, remoteDir);
    const allFiles = allRemote.filter((a) => a.type === "-").map((a) => a.name);
    const allDirs = allRemote.filter((a) => a.type === "d").map((a) => a.name);
    await deleteFiles(config)(clientPool, allFiles);
    await deleteDirectories(config)(clientPool, allDirs);
  };
