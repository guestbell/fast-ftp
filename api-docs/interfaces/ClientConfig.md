[@guestbell/fast-ftp](../README.md) / [Exports](../modules.md) / ClientConfig

# Interface: ClientConfig

## Hierarchy

- `Options`

  ↳ **`ClientConfig`**

## Table of contents

### Properties

- [connTimeout](ClientConfig.md#conntimeout)
- [debug](ClientConfig.md#debug)
- [host](ClientConfig.md#host)
- [keepalive](ClientConfig.md#keepalive)
- [operationTimeout](ClientConfig.md#operationtimeout)
- [password](ClientConfig.md#password)
- [pasvTimeout](ClientConfig.md#pasvtimeout)
- [port](ClientConfig.md#port)
- [secure](ClientConfig.md#secure)
- [secureOptions](ClientConfig.md#secureoptions)
- [user](ClientConfig.md#user)

## Properties

### connTimeout

• `Optional` **connTimeout**: `number`

How long (in milliseconds) to wait for the control connection to be established. Default: 10000

#### Inherited from

Options.connTimeout

#### Defined in

node_modules/@types/ftp/index.d.ts:45

___

### debug

• `Optional` **debug**: (`message`: `string`) => `void`

#### Type declaration

▸ (`message`): `void`

Debug function to invoke to enable debug logging.

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

##### Returns

`void`

#### Inherited from

Options.debug

#### Defined in

node_modules/@types/ftp/index.d.ts:57

___

### host

• `Optional` **host**: `string`

The hostname or IP address of the FTP server. Default: 'localhost'

#### Inherited from

Options.host

#### Defined in

node_modules/@types/ftp/index.d.ts:20

___

### keepalive

• `Optional` **keepalive**: `number`

How often (in milliseconds) to send a 'dummy' (NOOP) command to keep the connection alive. Default: 10000

#### Inherited from

Options.keepalive

#### Defined in

node_modules/@types/ftp/index.d.ts:53

___

### operationTimeout

• `Optional` **operationTimeout**: `number`

#### Defined in

[src/types/ClientConfig.ts:4](https://github.com/guestbell/fast-ftp/blob/beffefa/src/types/ClientConfig.ts#L4)

___

### password

• `Optional` **password**: `string`

Password for authentication. Default: 'anonymous@'

#### Inherited from

Options.password

#### Defined in

node_modules/@types/ftp/index.d.ts:41

___

### pasvTimeout

• `Optional` **pasvTimeout**: `number`

How long (in milliseconds) to wait for a PASV data connection to be established. Default: 10000

#### Inherited from

Options.pasvTimeout

#### Defined in

node_modules/@types/ftp/index.d.ts:49

___

### port

• `Optional` **port**: `number`

The port of the FTP server. Default: 21

#### Inherited from

Options.port

#### Defined in

node_modules/@types/ftp/index.d.ts:24

___

### secure

• `Optional` **secure**: `string` \| `boolean`

Set to true for both control and data connection encryption, 'control' for control connection encryption only, or 'implicit' for
implicitly encrypted control connection (this mode is deprecated in modern times, but usually uses port 990) Default: false

#### Inherited from

Options.secure

#### Defined in

node_modules/@types/ftp/index.d.ts:29

___

### secureOptions

• `Optional` **secureOptions**: `ConnectionOptions`

Additional options to be passed to tls.connect(). Default: (none)

#### Inherited from

Options.secureOptions

#### Defined in

node_modules/@types/ftp/index.d.ts:33

___

### user

• `Optional` **user**: `string`

Username for authentication. Default: 'anonymous'

#### Inherited from

Options.user

#### Defined in

node_modules/@types/ftp/index.d.ts:37
