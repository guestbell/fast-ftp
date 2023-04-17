[@guestbell/fast-ftp](../README.md) / [Exports](../modules.md) / ItemPool

# Class: ItemPool<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](ItemPool.md#constructor)

### Properties

- [items](ItemPool.md#items)
- [waiting](ItemPool.md#waiting)

### Methods

- [acquire](ItemPool.md#acquire)
- [acquireAll](ItemPool.md#acquireall)
- [release](ItemPool.md#release)
- [releaseMany](ItemPool.md#releasemany)

## Constructors

### constructor

• **new ItemPool**<`T`\>(`items`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |

#### Defined in

[src/utils/misc/ItemPool.ts:5](https://github.com/guestbell/fast-ftp/blob/2f0859c/src/utils/misc/ItemPool.ts#L5)

## Properties

### items

• `Private` **items**: `T`[] = `[]`

#### Defined in

[src/utils/misc/ItemPool.ts:2](https://github.com/guestbell/fast-ftp/blob/2f0859c/src/utils/misc/ItemPool.ts#L2)

___

### waiting

• `Private` **waiting**: (`item`: `T`) => `void`[] = `[]`

#### Defined in

[src/utils/misc/ItemPool.ts:3](https://github.com/guestbell/fast-ftp/blob/2f0859c/src/utils/misc/ItemPool.ts#L3)

## Methods

### acquire

▸ **acquire**(): `Promise`<`T`\>

#### Returns

`Promise`<`T`\>

#### Defined in

[src/utils/misc/ItemPool.ts:9](https://github.com/guestbell/fast-ftp/blob/2f0859c/src/utils/misc/ItemPool.ts#L9)

___

### acquireAll

▸ **acquireAll**(): `Promise`<`T`[]\>

#### Returns

`Promise`<`T`[]\>

#### Defined in

[src/utils/misc/ItemPool.ts:20](https://github.com/guestbell/fast-ftp/blob/2f0859c/src/utils/misc/ItemPool.ts#L20)

___

### release

▸ **release**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |

#### Returns

`void`

#### Defined in

[src/utils/misc/ItemPool.ts:37](https://github.com/guestbell/fast-ftp/blob/2f0859c/src/utils/misc/ItemPool.ts#L37)

___

### releaseMany

▸ **releaseMany**(`items`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |

#### Returns

`void`

#### Defined in

[src/utils/misc/ItemPool.ts:46](https://github.com/guestbell/fast-ftp/blob/2f0859c/src/utils/misc/ItemPool.ts#L46)
