import { Client, ListFile } from "ftp";

export interface AsyncClient extends Client {
  renameAsync: (oldName: string, newName: string) => Promise<void>;
  rmdirAsync: (path: string, recursive?: boolean) => Promise<void>;
  mkdirAsync: (path: string) => Promise<void>;
  putAsync: (path: string, remotePath: string) => Promise<void>;
  deleteAsync: (path: string) => Promise<void>;
  listAsync: (path: string) => Promise<ListFile>;
}
