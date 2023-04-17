[@guestbell/fast-ftp](README.md) / Exports

# @guestbell/fast-ftp

## Table of contents

### Classes

- [ItemPool](classes/ItemPool.md)

### Interfaces

- [AsyncClient](interfaces/AsyncClient.md)
- [ClientConfig](interfaces/ClientConfig.md)
- [ClientError](interfaces/ClientError.md)
- [DeployConfig](interfaces/DeployConfig.md)

### Type Aliases

- [FtpFunctionConfig](modules.md#ftpfunctionconfig)
- [WinstonLogLevel](modules.md#winstonloglevel)

### Variables

- [WinstonLogLevels](modules.md#winstonloglevels)

### Functions

- [createLogger](modules.md#createlogger)
- [createLoggerFromPartialConfig](modules.md#createloggerfrompartialconfig)
- [deleteDirectories](modules.md#deletedirectories)
- [deleteDirectory](modules.md#deletedirectory)
- [deleteFiles](modules.md#deletefiles)
- [deploy](modules.md#deploy)
- [dirTreeToParallelBatches](modules.md#dirtreetoparallelbatches)
- [getAllDirDirs](modules.md#getalldirdirs)
- [getAllDirFiles](modules.md#getalldirfiles)
- [getAllRemote](modules.md#getallremote)
- [getClientConfig](modules.md#getclientconfig)
- [getClients](modules.md#getclients)
- [getDeployConfig](modules.md#getdeployconfig)
- [getDirTree](modules.md#getdirtree)
- [getFinalFtpConfig](modules.md#getfinalftpconfig)
- [getFtpFunctionConfig](modules.md#getftpfunctionconfig)
- [removeKeys](modules.md#removekeys)
- [sortFilesBySize](modules.md#sortfilesbysize)
- [uploadDirectories](modules.md#uploaddirectories)
- [uploadDirectory](modules.md#uploaddirectory)
- [uploadFiles](modules.md#uploadfiles)

## Type Aliases

### FtpFunctionConfig

Ƭ **FtpFunctionConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `logLevel` | [`WinstonLogLevel`](modules.md#winstonloglevel) |
| `retries` | `number` |

#### Defined in

[src/types/FtpFunctionConfig.ts:3](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/types/FtpFunctionConfig.ts#L3)

___

### WinstonLogLevel

Ƭ **WinstonLogLevel**: ``"error"`` \| ``"warn"`` \| ``"info"`` \| ``"http"`` \| ``"verbose"`` \| ``"debug"`` \| ``"silly"``

#### Defined in

[src/utils/misc/logger.ts:22](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/logger.ts#L22)

## Variables

### WinstonLogLevels

• `Const` **WinstonLogLevels**: [`WinstonLogLevel`](modules.md#winstonloglevel)[]

#### Defined in

[src/utils/misc/logger.ts:31](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/logger.ts#L31)

## Functions

### createLogger

▸ **createLogger**(`level`): `Logger`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | [`WinstonLogLevel`](modules.md#winstonloglevel) |

#### Returns

`Logger`

#### Defined in

[src/utils/misc/logger.ts:5](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/logger.ts#L5)

___

### createLoggerFromPartialConfig

▸ **createLoggerFromPartialConfig**(`config`): `Logger`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`Logger`

#### Defined in

[src/utils/misc/logger.ts:18](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/logger.ts#L18)

___

### deleteDirectories

▸ **deleteDirectories**(`config`): (`clientPool`: [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\>, `allDirs`: `string`[]) => `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`fn`

▸ (`clientPool`, `allDirs`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `clientPool` | [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\> |
| `allDirs` | `string`[] |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/deleteDirectories.ts:11](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/ftp/deleteDirectories.ts#L11)

___

### deleteDirectory

▸ **deleteDirectory**(`config`): (`clientPool`: [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\>, `remoteDir`: `string`) => `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`fn`

▸ (`clientPool`, `remoteDir`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `clientPool` | [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\> |
| `remoteDir` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/deleteDirectory.ts:9](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/ftp/deleteDirectory.ts#L9)

___

### deleteFiles

▸ **deleteFiles**(`config`): (`clientPool`: [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\>, `allFiles`: `string`[]) => `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`fn`

▸ (`clientPool`, `allFiles`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `clientPool` | [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\> |
| `allFiles` | `string`[] |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/deleteFiles.ts:6](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/ftp/deleteFiles.ts#L6)

___

### deploy

▸ **deploy**(`deployConfig`, `clientConfig`, `ftpFunctionConfig`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployConfig` | [`DeployConfig`](interfaces/DeployConfig.md) |
| `clientConfig` | [`ClientConfig`](interfaces/ClientConfig.md) |
| `ftpFunctionConfig` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/deploy.ts:16](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/core/deploy.ts#L16)

___

### dirTreeToParallelBatches

▸ **dirTreeToParallelBatches**(`trees`): `string`[][]

#### Parameters

| Name | Type |
| :------ | :------ |
| `trees` | `Tree`[] |

#### Returns

`string`[][]

#### Defined in

[src/utils/misc/dirTreeToParallelBatches.ts:3](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/dirTreeToParallelBatches.ts#L3)

___

### getAllDirDirs

▸ **getAllDirDirs**(`dirPath`, `arrayOfFiles?`): `string`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dirPath` | `string` | `undefined` |
| `arrayOfFiles` | `string`[] | `[]` |

#### Returns

`string`[]

#### Defined in

[src/utils/fs/getAllDirDirs.ts:3](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/fs/getAllDirDirs.ts#L3)

___

### getAllDirFiles

▸ **getAllDirFiles**(`dirPath`, `arrayOfFiles?`): `string`[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dirPath` | `string` | `undefined` |
| `arrayOfFiles` | `string`[] | `[]` |

#### Returns

`string`[]

#### Defined in

[src/utils/fs/getAllDirFiles.ts:4](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/fs/getAllDirFiles.ts#L4)

___

### getAllRemote

▸ **getAllRemote**(`config`): (`itemPool`: [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\>, `remoteDir`: `string`) => `Promise`<`ListingElement`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`fn`

▸ (`itemPool`, `remoteDir`): `Promise`<`ListingElement`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `itemPool` | [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\> |
| `remoteDir` | `string` |

##### Returns

`Promise`<`ListingElement`[]\>

#### Defined in

[src/utils/ftp/getAllRemote.ts:7](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/ftp/getAllRemote.ts#L7)

___

### getClientConfig

▸ **getClientConfig**(): [`ClientConfig`](interfaces/ClientConfig.md)

#### Returns

[`ClientConfig`](interfaces/ClientConfig.md)

#### Defined in

[src/utils/misc/getClientConfig.ts:3](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/getClientConfig.ts#L3)

___

### getClients

▸ **getClients**(`config`): (`concurrency`: `number`, `config`: [`ClientConfig`](interfaces/ClientConfig.md)) => `Promise`<[`AsyncClient`](interfaces/AsyncClient.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`fn`

▸ (`concurrency?`, `config`): `Promise`<[`AsyncClient`](interfaces/AsyncClient.md)[]\>

##### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `concurrency` | `number` | `30` |
| `config` | [`ClientConfig`](interfaces/ClientConfig.md) | `undefined` |

##### Returns

`Promise`<[`AsyncClient`](interfaces/AsyncClient.md)[]\>

#### Defined in

[src/utils/ftp/getClients.ts:11](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/ftp/getClients.ts#L11)

___

### getDeployConfig

▸ **getDeployConfig**(): [`DeployConfig`](interfaces/DeployConfig.md)

#### Returns

[`DeployConfig`](interfaces/DeployConfig.md)

#### Defined in

[src/utils/misc/getDeployConfig.ts:4](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/getDeployConfig.ts#L4)

___

### getDirTree

▸ **getDirTree**(`directories`): `Tree`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `directories` | `string`[] |

#### Returns

`Tree`[]

#### Defined in

[src/utils/misc/getDirTree.ts:16](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/getDirTree.ts#L16)

___

### getFinalFtpConfig

▸ **getFinalFtpConfig**(`config`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `logLevel` | [`WinstonLogLevel`](modules.md#winstonloglevel) |
| `retries` | `number` |

#### Defined in

[src/utils/misc/getFinalFtpConfig.ts:4](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/getFinalFtpConfig.ts#L4)

___

### getFtpFunctionConfig

▸ **getFtpFunctionConfig**(): [`FtpFunctionConfig`](modules.md#ftpfunctionconfig)

#### Returns

[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)

#### Defined in

[src/utils/misc/getFtpFunctionConfig.ts:6](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/getFtpFunctionConfig.ts#L6)

___

### removeKeys

▸ **removeKeys**(`obj`, `keys`): `object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |
| `keys` | `string`[] |

#### Returns

`object`

#### Defined in

[src/utils/misc/removeKeys.ts:1](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/misc/removeKeys.ts#L1)

___

### sortFilesBySize

▸ **sortFilesBySize**(`files`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `files` | `string`[] |

#### Returns

`string`[]

#### Defined in

[src/utils/fs/sortFilesBySize.ts:3](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/fs/sortFilesBySize.ts#L3)

___

### uploadDirectories

▸ **uploadDirectories**(`config`): (`clientsPool`: [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\>, `allDirs`: `string`[], `localDir`: `string`, `remoteDir`: `string`) => `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`fn`

▸ (`clientsPool`, `allDirs`, `localDir`, `remoteDir`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `clientsPool` | [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\> |
| `allDirs` | `string`[] |
| `localDir` | `string` |
| `remoteDir` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/uploadDirectories.ts:11](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/ftp/uploadDirectories.ts#L11)

___

### uploadDirectory

▸ **uploadDirectory**(`config`): (`clientsPool`: [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\>, `remoteDir`: `string`, `localDir`: `string`) => `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`fn`

▸ (`clientsPool`, `remoteDir`, `localDir`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `clientsPool` | [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\> |
| `remoteDir` | `string` |
| `localDir` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/uploadDirectory.ts:8](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/ftp/uploadDirectory.ts#L8)

___

### uploadFiles

▸ **uploadFiles**(`config`): (`clientsPool`: [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\>, `allFiles`: `string`[], `localDir`: `string`, `remoteDir`: `string`) => `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`<[`FtpFunctionConfig`](modules.md#ftpfunctionconfig)\> |

#### Returns

`fn`

▸ (`clientsPool`, `allFiles`, `localDir`, `remoteDir`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `clientsPool` | [`ItemPool`](classes/ItemPool.md)<[`AsyncClient`](interfaces/AsyncClient.md)\> |
| `allFiles` | `string`[] |
| `localDir` | `string` |
| `remoteDir` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/uploadFiles.ts:11](https://github.com/guestbell/fast-ftp/blob/7c7a705/src/utils/ftp/uploadFiles.ts#L11)
