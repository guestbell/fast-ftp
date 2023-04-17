[@guestbell/fast-ftp](../README.md) / [Exports](../modules.md) / AsyncClient

# Interface: AsyncClient

## Hierarchy

- `Client`

  ↳ **`AsyncClient`**

## Table of contents

### Properties

- [deleteAsync](AsyncClient.md#deleteasync)
- [listAsync](AsyncClient.md#listasync)
- [mkdirAsync](AsyncClient.md#mkdirasync)
- [putAsync](AsyncClient.md#putasync)
- [renameAsync](AsyncClient.md#renameasync)
- [rmdirAsync](AsyncClient.md#rmdirasync)

### Methods

- [abort](AsyncClient.md#abort)
- [addListener](AsyncClient.md#addlistener)
- [append](AsyncClient.md#append)
- [ascii](AsyncClient.md#ascii)
- [binary](AsyncClient.md#binary)
- [cdup](AsyncClient.md#cdup)
- [connect](AsyncClient.md#connect)
- [cwd](AsyncClient.md#cwd)
- [delete](AsyncClient.md#delete)
- [destroy](AsyncClient.md#destroy)
- [emit](AsyncClient.md#emit)
- [end](AsyncClient.md#end)
- [eventNames](AsyncClient.md#eventnames)
- [get](AsyncClient.md#get)
- [getMaxListeners](AsyncClient.md#getmaxlisteners)
- [lastMod](AsyncClient.md#lastmod)
- [list](AsyncClient.md#list)
- [listSafe](AsyncClient.md#listsafe)
- [listenerCount](AsyncClient.md#listenercount)
- [listeners](AsyncClient.md#listeners)
- [logout](AsyncClient.md#logout)
- [mkdir](AsyncClient.md#mkdir)
- [off](AsyncClient.md#off)
- [on](AsyncClient.md#on)
- [once](AsyncClient.md#once)
- [prependListener](AsyncClient.md#prependlistener)
- [prependOnceListener](AsyncClient.md#prependoncelistener)
- [put](AsyncClient.md#put)
- [pwd](AsyncClient.md#pwd)
- [rawListeners](AsyncClient.md#rawlisteners)
- [removeAllListeners](AsyncClient.md#removealllisteners)
- [removeListener](AsyncClient.md#removelistener)
- [rename](AsyncClient.md#rename)
- [restart](AsyncClient.md#restart)
- [rmdir](AsyncClient.md#rmdir)
- [setMaxListeners](AsyncClient.md#setmaxlisteners)
- [site](AsyncClient.md#site)
- [size](AsyncClient.md#size)
- [status](AsyncClient.md#status)
- [system](AsyncClient.md#system)

## Properties

### deleteAsync

• **deleteAsync**: (`path`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`path`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/types/AsyncClient.ts:8](https://github.com/guestbell/fast-ftp/blob/a095c9c/src/types/AsyncClient.ts#L8)

___

### listAsync

• **listAsync**: (`path`: `string`) => `Promise`<`ListingElement`[]\>

#### Type declaration

▸ (`path`): `Promise`<`ListingElement`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

##### Returns

`Promise`<`ListingElement`[]\>

#### Defined in

[src/types/AsyncClient.ts:9](https://github.com/guestbell/fast-ftp/blob/a095c9c/src/types/AsyncClient.ts#L9)

___

### mkdirAsync

• **mkdirAsync**: (`path`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`path`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/types/AsyncClient.ts:6](https://github.com/guestbell/fast-ftp/blob/a095c9c/src/types/AsyncClient.ts#L6)

___

### putAsync

• **putAsync**: (`path`: `string`, `remotePath`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`path`, `remotePath`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `remotePath` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/types/AsyncClient.ts:7](https://github.com/guestbell/fast-ftp/blob/a095c9c/src/types/AsyncClient.ts#L7)

___

### renameAsync

• **renameAsync**: (`oldName`: `string`, `newName`: `string`) => `Promise`<`void`\>

#### Type declaration

▸ (`oldName`, `newName`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `oldName` | `string` |
| `newName` | `string` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/types/AsyncClient.ts:4](https://github.com/guestbell/fast-ftp/blob/a095c9c/src/types/AsyncClient.ts#L4)

___

### rmdirAsync

• **rmdirAsync**: (`path`: `string`, `recursive?`: `boolean`) => `Promise`<`void`\>

#### Type declaration

▸ (`path`, `recursive?`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `recursive?` | `boolean` |

##### Returns

`Promise`<`void`\>

#### Defined in

[src/types/AsyncClient.ts:5](https://github.com/guestbell/fast-ftp/blob/a095c9c/src/types/AsyncClient.ts#L5)

## Methods

### abort

▸ **abort**(`callback`): `void`

Aborts the current data transfer (e.g. from get(), put(), or list())

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.abort

#### Defined in

node_modules/@types/ftp/index.d.ts:217

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`AsyncClient`](AsyncClient.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.addListener

#### Defined in

node_modules/@types/node/events.d.ts:354

___

### append

▸ **append**(`input`, `destPath`, `useCompression`, `callback`): `void`

Same as put(), except if destPath already exists, it will be appended to instead of overwritten.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `Buffer` \| `ReadableStream` | can be a ReadableStream, a Buffer, or a path to a local file. |
| `destPath` | `string` |  |
| `useCompression` | `boolean` | defaults to false. |
| `callback` | (`error`: `Error`) => `void` | - |

#### Returns

`void`

#### Inherited from

Client.append

#### Defined in

node_modules/@types/ftp/index.d.ts:190

▸ **append**(`input`, `destPath`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` \| `Buffer` \| `ReadableStream` |
| `destPath` | `string` |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.append

#### Defined in

node_modules/@types/ftp/index.d.ts:191

___

### ascii

▸ **ascii**(`callback`): `void`

Sets the transfer data type to ASCII.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.ascii

#### Defined in

node_modules/@types/ftp/index.d.ts:233

___

### binary

▸ **binary**(`callback`): `void`

Sets the transfer data type to binary (default at time of connection).

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.binary

#### Defined in

node_modules/@types/ftp/index.d.ts:238

___

### cdup

▸ **cdup**(`callback`): `void`

Optional "standard" commands (RFC 959)
Changes the working directory to the parent of the current directory

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.cdup

#### Defined in

node_modules/@types/ftp/index.d.ts:258

___

### connect

▸ **connect**(`config?`): `void`

Connects to an FTP server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `Options` |

#### Returns

`void`

#### Inherited from

Client.connect

#### Defined in

node_modules/@types/ftp/index.d.ts:147

___

### cwd

▸ **cwd**(`path`, `callback`): `void`

Changes the current working directory to path. callback has 2 parameters: < Error >err, < string >currentDir.
Note: currentDir is only given if the server replies with the path in the response text.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback` | (`error`: `Error`, `currentDir?`: `string`) => `void` |

#### Returns

`void`

#### Inherited from

Client.cwd

#### Defined in

node_modules/@types/ftp/index.d.ts:212

___

### delete

▸ **delete**(`path`, `callback`): `void`

Delete a file on the server

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.delete

#### Defined in

node_modules/@types/ftp/index.d.ts:206

___

### destroy

▸ **destroy**(): `void`

Closes the connection to the server immediately.

#### Returns

`void`

#### Inherited from

Client.destroy

#### Defined in

node_modules/@types/ftp/index.d.ts:157

___

### emit

▸ **emit**(`eventName`, `...args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

Client.emit

#### Defined in

node_modules/@types/node/events.d.ts:610

___

### end

▸ **end**(): `void`

Closes the connection to the server after any/all enqueued commands have been executed.

#### Returns

`void`

#### Inherited from

Client.end

#### Defined in

node_modules/@types/ftp/index.d.ts:152

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

Client.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:669

___

### get

▸ **get**(`path`, `callback`): `void`

Retrieves a file at path from the server. useCompression defaults to false

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback` | (`error`: `Error`, `stream`: `ReadableStream`) => `void` |

#### Returns

`void`

#### Inherited from

Client.get

#### Defined in

node_modules/@types/ftp/index.d.ts:172

▸ **get**(`path`, `useCompression`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `useCompression` | `boolean` |
| `callback` | (`error`: `Error`, `stream`: `ReadableStream`) => `void` |

#### Returns

`void`

#### Inherited from

Client.get

#### Defined in

node_modules/@types/ftp/index.d.ts:173

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to defaultMaxListeners.

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

Client.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:526

___

### lastMod

▸ **lastMod**(`path`, `callback`): `void`

Extended commands (RFC 3659)
Retrieves the last modified date and time for path

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback` | (`error`: `Error`, `lastMod`: `Date`) => `void` |

#### Returns

`void`

#### Inherited from

Client.lastMod

#### Defined in

node_modules/@types/ftp/index.d.ts:293

___

### list

▸ **list**(`path`, `useCompression`, `callback`): `void`

Retrieves the directory listing of path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | defaults to the current working directory. |
| `useCompression` | `boolean` | defaults to false. |
| `callback` | (`error`: `Error`, `listing`: `ListingElement`[]) => `void` | - |

#### Returns

`void`

#### Inherited from

Client.list

#### Defined in

node_modules/@types/ftp/index.d.ts:164

▸ **list**(`path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback` | (`error`: `Error`, `listing`: `ListingElement`[]) => `void` |

#### Returns

`void`

#### Inherited from

Client.list

#### Defined in

node_modules/@types/ftp/index.d.ts:165

▸ **list**(`useCompression`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `useCompression` | `boolean` |
| `callback` | (`error`: `Error`, `listing`: `ListingElement`[]) => `void` |

#### Returns

`void`

#### Inherited from

Client.list

#### Defined in

node_modules/@types/ftp/index.d.ts:166

▸ **list**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`, `listing`: `ListingElement`[]) => `void` |

#### Returns

`void`

#### Inherited from

Client.list

#### Defined in

node_modules/@types/ftp/index.d.ts:167

___

### listSafe

▸ **listSafe**(`path`, `useCompression`, `callback`): `void`

Optional "standard" commands (RFC 959)
Similar to list(), except the directory is temporarily changed to path to retrieve the directory listing.
This is useful for servers that do not handle characters like spaces and quotes in directory names well for the LIST command.
This function is "optional" because it relies on pwd() being available.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `useCompression` | `boolean` |
| `callback` | (`error`: `Error`, `listing`: `ListingElement`[]) => `void` |

#### Returns

`void`

#### Inherited from

Client.listSafe

#### Defined in

node_modules/@types/ftp/index.d.ts:278

▸ **listSafe**(`path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback` | (`error`: `Error`, `listing`: `ListingElement`[]) => `void` |

#### Returns

`void`

#### Inherited from

Client.listSafe

#### Defined in

node_modules/@types/ftp/index.d.ts:279

▸ **listSafe**(`useCompression`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `useCompression` | `boolean` |
| `callback` | (`error`: `Error`, `listing`: `ListingElement`[]) => `void` |

#### Returns

`void`

#### Inherited from

Client.listSafe

#### Defined in

node_modules/@types/ftp/index.d.ts:280

▸ **listSafe**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`, `listing`: `ListingElement`[]) => `void` |

#### Returns

`void`

#### Inherited from

Client.listSafe

#### Defined in

node_modules/@types/ftp/index.d.ts:281

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`Since`**

v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

Client.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:616

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Client.listeners

#### Defined in

node_modules/@types/node/events.d.ts:539

___

### logout

▸ **logout**(`callback`): `void`

Logout the user from the server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.logout

#### Defined in

node_modules/@types/ftp/index.d.ts:201

___

### mkdir

▸ **mkdir**(`path`, `recursive`, `callback`): `void`

Optional "standard" commands (RFC 959)
Creates a new directory, path, on the server. recursive is for enabling a 'mkdir -p' algorithm and defaults to false

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `recursive` | `boolean` |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.mkdir

#### Defined in

node_modules/@types/ftp/index.d.ts:244

▸ **mkdir**(`path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.mkdir

#### Defined in

node_modules/@types/ftp/index.d.ts:245

___

### off

▸ **off**(`eventName`, `listener`): [`AsyncClient`](AsyncClient.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.off

#### Defined in

node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**(`event`, `listener`): [`AsyncClient`](AsyncClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`error`: `Error`) => `void` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.on

#### Defined in

node_modules/@types/ftp/index.d.ts:119

▸ **on**(`event`, `listener`): [`AsyncClient`](AsyncClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"greeting"`` |
| `listener` | (`msg`: `string`) => `void` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.on

#### Defined in

node_modules/@types/ftp/index.d.ts:120

▸ **on**(`event`, `listener`): [`AsyncClient`](AsyncClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"ready"`` |
| `listener` | () => `void` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.on

#### Defined in

node_modules/@types/ftp/index.d.ts:121

▸ **on**(`event`, `listener`): [`AsyncClient`](AsyncClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"end"`` |
| `listener` | () => `void` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.on

#### Defined in

node_modules/@types/ftp/index.d.ts:122

▸ **on**(`event`, `listener`): [`AsyncClient`](AsyncClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | (`hadErr`: `boolean`) => `void` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.on

#### Defined in

node_modules/@types/ftp/index.d.ts:123

▸ **on**(`event`, `listener`): [`AsyncClient`](AsyncClient.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` |
| `listener` | () => `void` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.on

#### Defined in

node_modules/@types/ftp/index.d.ts:124

___

### once

▸ **once**(`eventName`, `listener`): [`AsyncClient`](AsyncClient.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.once

#### Defined in

node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`AsyncClient`](AsyncClient.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`AsyncClient`](AsyncClient.md)

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:650

___

### put

▸ **put**(`input`, `destPath`, `useCompression`, `callback`): `void`

Sends data to the server to be stored as destPath.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `string` \| `Buffer` \| `ReadableStream` | can be a ReadableStream, a Buffer, or a path to a local file. |
| `destPath` | `string` |  |
| `useCompression` | `boolean` | defaults to false. |
| `callback` | (`error`: `Error`) => `void` | - |

#### Returns

`void`

#### Inherited from

Client.put

#### Defined in

node_modules/@types/ftp/index.d.ts:181

▸ **put**(`input`, `destPath`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` \| `Buffer` \| `ReadableStream` |
| `destPath` | `string` |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.put

#### Defined in

node_modules/@types/ftp/index.d.ts:182

___

### pwd

▸ **pwd**(`callback`): `void`

Optional "standard" commands (RFC 959)
Retrieves the current working directory

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`, `path`: `string`) => `void` |

#### Returns

`void`

#### Inherited from

Client.pwd

#### Defined in

node_modules/@types/ftp/index.d.ts:264

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`Since`**

v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Client.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:569

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`AsyncClient`](AsyncClient.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`AsyncClient`](AsyncClient.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:494

___

### rename

▸ **rename**(`oldPath`, `newPath`, `callback`): `void`

Renames oldPath to newPath on the server

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldPath` | `string` |
| `newPath` | `string` |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.rename

#### Defined in

node_modules/@types/ftp/index.d.ts:196

___

### restart

▸ **restart**(`byteOffset`, `callback`): `void`

Extended commands (RFC 3659)
Sets the file byte offset for the next file transfer action (get/put) to byteOffset

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteOffset` | `number` |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.restart

#### Defined in

node_modules/@types/ftp/index.d.ts:299

___

### rmdir

▸ **rmdir**(`path`, `recursive`, `callback`): `void`

Optional "standard" commands (RFC 959)
Removes a directory, path, on the server. If recursive, this call will delete the contents of the directory if it is not empty

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `recursive` | `boolean` |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.rmdir

#### Defined in

node_modules/@types/ftp/index.d.ts:251

▸ **rmdir**(`path`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback` | (`error`: `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Client.rmdir

#### Defined in

node_modules/@types/ftp/index.d.ts:252

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`AsyncClient`](AsyncClient.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`AsyncClient`](AsyncClient.md)

#### Inherited from

Client.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:520

___

### site

▸ **site**(`command`, `callback`): `void`

Sends command (e.g. 'CHMOD 755 foo', 'QUOTA') using SITE. callback has 3 parameters:
< Error >err, < _string >responseText, < integer >responseCode.

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `string` |
| `callback` | (`error`: `Error`, `responseText`: `string`, `responseCode`: `number`) => `void` |

#### Returns

`void`

#### Inherited from

Client.site

#### Defined in

node_modules/@types/ftp/index.d.ts:223

___

### size

▸ **size**(`path`, `callback`): `void`

Extended commands (RFC 3659)
Retrieves the size of path

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `callback` | (`error`: `Error`, `size`: `number`) => `void` |

#### Returns

`void`

#### Inherited from

Client.size

#### Defined in

node_modules/@types/ftp/index.d.ts:287

___

### status

▸ **status**(`callback`): `void`

Retrieves human-readable information about the server's status.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`, `status`: `string`) => `void` |

#### Returns

`void`

#### Inherited from

Client.status

#### Defined in

node_modules/@types/ftp/index.d.ts:228

___

### system

▸ **system**(`callback`): `void`

Optional "standard" commands (RFC 959)
Retrieves the server's operating system.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error`: `Error`, `OS`: `string`) => `void` |

#### Returns

`void`

#### Inherited from

Client.system

#### Defined in

node_modules/@types/ftp/index.d.ts:270
