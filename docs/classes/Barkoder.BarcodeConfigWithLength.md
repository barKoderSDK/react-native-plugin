[barkoder-react-native](../README.md) / [Exports](../modules.md) / [Barkoder](../modules/Barkoder.md) / BarcodeConfigWithLength

# Class: BarcodeConfigWithLength

[Barkoder](../modules/Barkoder.md).BarcodeConfigWithLength

## Table of contents

### Constructors

- [constructor](Barkoder.BarcodeConfigWithLength.md#constructor)

### Properties

- [enabled](Barkoder.BarcodeConfigWithLength.md#enabled)
- [maxLength](Barkoder.BarcodeConfigWithLength.md#maxlength)
- [minLength](Barkoder.BarcodeConfigWithLength.md#minlength)

### Methods

- [setLengthRange](Barkoder.BarcodeConfigWithLength.md#setlengthrange)
- [toMap](Barkoder.BarcodeConfigWithLength.md#tomap)

## Constructors

### constructor

• **new BarcodeConfigWithLength**(`config`): [`BarcodeConfigWithLength`](Barkoder.BarcodeConfigWithLength.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`BarcodeConfigWithLength`](Barkoder.BarcodeConfigWithLength.md)\> |

#### Returns

[`BarcodeConfigWithLength`](Barkoder.BarcodeConfigWithLength.md)

## Properties

### enabled

• `Optional` **enabled**: `boolean`

___

### maxLength

• `Private` `Optional` **maxLength**: `number`

___

### minLength

• `Private` `Optional` **minLength**: `number`

## Methods

### setLengthRange

▸ **setLengthRange**(`minLength`, `maxLength`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLength` | `number` |
| `maxLength` | `number` |

#### Returns

`void`

___

### toMap

▸ **toMap**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `enabled` | `undefined` \| `boolean` |
| `maximumLength` | `undefined` \| `number` |
| `minimumLength` | `undefined` \| `number` |
