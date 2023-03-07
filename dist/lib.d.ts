import Client, { ListingElement, Options } from 'ftp';

interface AsyncClient extends Client {
    renameAsync: (oldName: string, newName: string) => Promise<void>;
    rmdirAsync: (path: string, recursive?: boolean) => Promise<void>;
    mkdirAsync: (path: string) => Promise<void>;
    putAsync: (path: string, remotePath: string) => Promise<void>;
    deleteAsync: (path: string) => Promise<void>;
    listAsync: (path: string) => Promise<ListingElement[]>;
}

interface ClientConfig extends Options {
}

interface DeployConfig {
    remoteRoot: string;
    tempRoot: string;
    oldRoot: string;
    localRoot: string;
    concurrency: number;
}

interface ClientError extends Error {
    code: number;
}

declare function deploy(deployConfig: DeployConfig, clientConfig: ClientConfig): Promise<void>;

declare const getAllDirDirs: (dirPath: string, arrayOfFiles?: string[]) => string[];

declare const getAllDirFiles: (dirPath: string, arrayOfFiles?: string[]) => string[];

declare const sortFilesBySize: (files: string[]) => string[];

declare function deleteDirectory(clients: AsyncClient[], remoteDir: string): Promise<void>;

declare function uploadDirectory(clients: AsyncClient[], remoteDir: string, localDir: string): Promise<void>;

declare function getClients(concurrency: number | undefined, config: ClientConfig): Promise<AsyncClient[]>;

declare const uploadDirectories: (clients: AsyncClient[], allDirs: string[], localDir: string, remoteDir: string) => Promise<void>;

declare const uploadFiles: (clients: AsyncClient[], allFiles: string[], localDir: string, remoteDir: string) => Promise<void>;

declare const getAllRemote: (clients: AsyncClient[], remoteDir: string, arrayOfFiles?: ListingElement[]) => Promise<ListingElement[]>;

declare const deleteFiles: (clients: AsyncClient[], allFiles: string[]) => Promise<void>;

declare const deleteDirectories: (clients: AsyncClient[], allDirs: string[]) => Promise<void>;

declare const getClientConfig: () => ClientConfig;

declare const getDeployConfig: () => DeployConfig;

export { AsyncClient, ClientConfig, ClientError, DeployConfig, deleteDirectories, deleteDirectory, deleteFiles, deploy, getAllDirDirs, getAllDirFiles, getAllRemote, getClientConfig, getClients, getDeployConfig, sortFilesBySize, uploadDirectories, uploadDirectory, uploadFiles };
