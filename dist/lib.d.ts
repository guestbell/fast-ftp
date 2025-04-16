import Client, { ListingElement, Options } from 'ftp';
import winston from 'winston';

interface AsyncClient extends Client {
    renameAsync: (oldName: string, newName: string) => Promise<void>;
    rmdirAsync: (path: string, recursive?: boolean) => Promise<void>;
    mkdirAsync: (path: string) => Promise<void>;
    putAsync: (path: string, remotePath: string) => Promise<void>;
    deleteAsync: (path: string) => Promise<void>;
    listAsync: (path: string) => Promise<ListingElement[]>;
}

interface ClientConfig extends Options {
    operationTimeout?: number;
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

declare const getAllDirDirs: (dirPath: string, arrayOfFiles?: string[]) => string[];

declare const getAllDirFiles: (dirPath: string, arrayOfFiles?: string[]) => string[];

declare const sortFilesBySize: (files: string[]) => string[];

declare const getClientConfig: () => ClientConfig;

declare const getDeployConfig: () => DeployConfig;

declare const getFtpFunctionConfig: () => FtpFunctionConfig;

declare const removeKeys: (obj: any, keys: string[]) => object;

declare const dirsToParallelBatches: (dirs: string[]) => string[][];

declare class ItemPool<T> {
    private items;
    private waiting;
    constructor(items: T[]);
    acquire(): Promise<T>;
    acquireAll(): Promise<T[]>;
    release(item: T): void;
    releaseMany(items: T[]): void;
}

declare const createLogger: (level: WinstonLogLevel) => winston.Logger;
declare const createLoggerFromPartialConfig: (config: Partial<FtpFunctionConfig>) => winston.Logger;
type WinstonLogLevel = "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
declare const WinstonLogLevels: WinstonLogLevel[];

declare const getFinalFtpConfig: (config: Partial<FtpFunctionConfig>) => {
    retries: number;
    logLevel: WinstonLogLevel;
    operationTimeout: number;
};

declare const deleteDirectory: (config: Partial<FtpFunctionConfig>) => (clientPool: ItemPool<AsyncClient>, remoteDir: string) => Promise<void>;

declare const uploadDirectory: (config: Partial<FtpFunctionConfig>) => (clientsPool: ItemPool<AsyncClient>, remoteDir: string, localDir: string) => Promise<void>;

declare const getClients: (config: Partial<FtpFunctionConfig>) => (concurrency: number | undefined, config: ClientConfig) => Promise<AsyncClient[]>;

declare const uploadDirectories: (config: Partial<FtpFunctionConfig>) => (clientsPool: ItemPool<AsyncClient>, allDirs: string[], localDir: string, remoteDir: string) => Promise<void>;

declare const uploadFiles: (config: Partial<FtpFunctionConfig>) => (clientsPool: ItemPool<AsyncClient>, allFiles: string[], localDir: string, remoteDir: string) => Promise<void>;

declare const getAllRemote: (config: Partial<FtpFunctionConfig>) => (itemPool: ItemPool<AsyncClient>, remoteDir: string) => Promise<ListingElement[]>;

declare const deleteFiles: (config: Partial<FtpFunctionConfig>) => (clientPool: ItemPool<AsyncClient>, allFiles: string[]) => Promise<void>;

declare const deleteDirectories: (config: Partial<FtpFunctionConfig>) => (clientPool: ItemPool<AsyncClient>, allDirs: string[]) => Promise<void>;

type FtpFunctionConfig = {
    retries: number;
    logLevel: WinstonLogLevel;
    operationTimeout: number;
};

declare function deploy(deployConfig: DeployConfig, clientConfig: ClientConfig, ftpFunctionConfig: Partial<FtpFunctionConfig>): Promise<void>;

export { AsyncClient, ClientConfig, ClientError, DeployConfig, FtpFunctionConfig, ItemPool, WinstonLogLevel, WinstonLogLevels, createLogger, createLoggerFromPartialConfig, deleteDirectories, deleteDirectory, deleteFiles, deploy, dirsToParallelBatches, getAllDirDirs, getAllDirFiles, getAllRemote, getClientConfig, getClients, getDeployConfig, getFinalFtpConfig, getFtpFunctionConfig, removeKeys, sortFilesBySize, uploadDirectories, uploadDirectory, uploadFiles };
