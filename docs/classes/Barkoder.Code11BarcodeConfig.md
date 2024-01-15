[barkoder-react-native](../README.md) / [Exports](../modules.md) / [Barkoder](../modules/Barkoder.md) / Code11BarcodeConfig

# Class: Code11BarcodeConfig

[Barkoder](../modules/Barkoder.md).Code11BarcodeConfig

## Table of contents

### Constructors

- [constructor](Barkoder.Code11BarcodeConfig.md#constructor)

### Properties

- [checksum](Barkoder.Code11BarcodeConfig.md#checksum)
- [enabled](Barkoder.Code11BarcodeConfig.md#enabled)
- [maxLength](Barkoder.Code11BarcodeConfig.md#maxlength)
- [minLength](Barkoder.Code11BarcodeConfig.md#minlength)

### Methods

- [setLengthRange](Barkoder.Code11BarcodeConfig.md#setlengthrange)
- [toMap](Barkoder.Code11BarcodeConfig.md#tomap)

## Constructors

### constructor

• **new Code11BarcodeConfig**(`config`): [`Code11BarcodeConfig`](Barkoder.Code11BarcodeConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`Code11BarcodeConfig`](Barkoder.Code11BarcodeConfig.md)\> |

#### Returns

[`Code11BarcodeConfig`](Barkoder.Code11BarcodeConfig.md)

## Properties

### checksum

• `Optional` **checksum**: [`Code11ChecksumType`](../enums/Barkoder.Code11ChecksumType.md)

___

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
