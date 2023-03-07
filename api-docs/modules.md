[@guestbell/fast-ftp](README.md) / Exports

# @guestbell/fast-ftp

## Table of contents

### Interfaces

- [AsyncClient](interfaces/AsyncClient.md)
- [ClientConfig](interfaces/ClientConfig.md)
- [ClientError](interfaces/ClientError.md)
- [DeployConfig](interfaces/DeployConfig.md)

### Functions

- [deleteDirectories](modules.md#deletedirectories)
- [deleteDirectory](modules.md#deletedirectory)
- [deleteFiles](modules.md#deletefiles)
- [deploy](modules.md#deploy)
- [getAllDirDirs](modules.md#getalldirdirs)
- [getAllDirFiles](modules.md#getalldirfiles)
- [getAllRemote](modules.md#getallremote)
- [getClientConfig](modules.md#getclientconfig)
- [getClients](modules.md#getclients)
- [getDeployConfig](modules.md#getdeployconfig)
- [sortFilesBySize](modules.md#sortfilesbysize)
- [uploadDirectories](modules.md#uploaddirectories)
- [uploadDirectory](modules.md#uploaddirectory)
- [uploadFiles](modules.md#uploadfiles)

## Functions

### deleteDirectories

▸ **deleteDirectories**(`clients`, `allDirs`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clients` | [`AsyncClient`](interfaces/AsyncClient.md)[] |
| `allDirs` | `string`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/deleteDirectories.ts:3](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/ftp/deleteDirectories.ts#L3)

___

### deleteDirectory

▸ **deleteDirectory**(`clients`, `remoteDir`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clients` | [`AsyncClient`](interfaces/AsyncClient.md)[] |
| `remoteDir` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/deleteDirectory.ts:6](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/ftp/deleteDirectory.ts#L6)

___

### deleteFiles

▸ **deleteFiles**(`clients`, `allFiles`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clients` | [`AsyncClient`](interfaces/AsyncClient.md)[] |
| `allFiles` | `string`[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/deleteFiles.ts:3](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/ftp/deleteFiles.ts#L3)

___

### deploy

▸ **deploy**(`deployConfig`, `clientConfig`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployConfig` | [`DeployConfig`](interfaces/DeployConfig.md) |
| `clientConfig` | [`ClientConfig`](interfaces/ClientConfig.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/core/deploy.ts:4](https://github.com/guestbell/fast-ftp/blob/741530d/src/core/deploy.ts#L4)

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

[src/utils/fs/getAllDirDirs.ts:3](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/fs/getAllDirDirs.ts#L3)

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

[src/utils/fs/getAllDirFiles.ts:4](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/fs/getAllDirFiles.ts#L4)

___

### getAllRemote

▸ **getAllRemote**(`clients`, `remoteDir`, `arrayOfFiles?`): `Promise`<`ListingElement`[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `clients` | [`AsyncClient`](interfaces/AsyncClient.md)[] | `undefined` |
| `remoteDir` | `string` | `undefined` |
| `arrayOfFiles` | `ListingElement`[] | `[]` |

#### Returns

`Promise`<`ListingElement`[]\>

#### Defined in

[src/utils/ftp/getAllRemote.ts:5](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/ftp/getAllRemote.ts#L5)

___

### getClientConfig

▸ **getClientConfig**(): [`ClientConfig`](interfaces/ClientConfig.md)

#### Returns

[`ClientConfig`](interfaces/ClientConfig.md)

#### Defined in

[src/utils/misc/getClientConfig.ts:3](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/misc/getClientConfig.ts#L3)

___

### getClients

▸ **getClients**(`concurrency?`, `config`): `Promise`<[`AsyncClient`](interfaces/AsyncClient.md)[]\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `concurrency` | `number` | `30` |
| `config` | [`ClientConfig`](interfaces/ClientConfig.md) | `undefined` |

#### Returns

`Promise`<[`AsyncClient`](interfaces/AsyncClient.md)[]\>

#### Defined in

[src/utils/ftp/getClients.ts:5](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/ftp/getClients.ts#L5)

___

### getDeployConfig

▸ **getDeployConfig**(): [`DeployConfig`](interfaces/DeployConfig.md)

#### Returns

[`DeployConfig`](interfaces/DeployConfig.md)

#### Defined in

[src/utils/misc/getDeployConfig.ts:4](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/misc/getDeployConfig.ts#L4)

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

[src/utils/fs/sortFilesBySize.ts:3](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/fs/sortFilesBySize.ts#L3)

___

### uploadDirectories

▸ **uploadDirectories**(`clients`, `allDirs`, `localDir`, `remoteDir`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clients` | [`AsyncClient`](interfaces/AsyncClient.md)[] |
| `allDirs` | `string`[] |
| `localDir` | `string` |
| `remoteDir` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/uploadDirectories.ts:4](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/ftp/uploadDirectories.ts#L4)

___

### uploadDirectory

▸ **uploadDirectory**(`clients`, `remoteDir`, `localDir`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clients` | [`AsyncClient`](interfaces/AsyncClient.md)[] |
| `remoteDir` | `string` |
| `localDir` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/uploadDirectory.ts:6](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/ftp/uploadDirectory.ts#L6)

___

### uploadFiles

▸ **uploadFiles**(`clients`, `allFiles`, `localDir`, `remoteDir`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clients` | [`AsyncClient`](interfaces/AsyncClient.md)[] |
| `allFiles` | `string`[] |
| `localDir` | `string` |
| `remoteDir` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ftp/uploadFiles.ts:5](https://github.com/guestbell/fast-ftp/blob/741530d/src/utils/ftp/uploadFiles.ts#L5)
