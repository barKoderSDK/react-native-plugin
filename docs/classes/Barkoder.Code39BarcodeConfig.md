[barkoder-react-native](../README.md) / [Modules](../modules.md) / [Barkoder](../modules/Barkoder.md) / Code39BarcodeConfig

# Class: Code39BarcodeConfig

[Barkoder](../modules/Barkoder.md).Code39BarcodeConfig

## Table of contents

### Constructors

- [constructor](Barkoder.Code39BarcodeConfig.md#constructor)

### Properties

- [checksum](Barkoder.Code39BarcodeConfig.md#checksum)
- [enabled](Barkoder.Code39BarcodeConfig.md#enabled)
- [maxLength](Barkoder.Code39BarcodeConfig.md#maxlength)
- [minLength](Barkoder.Code39BarcodeConfig.md#minlength)

### Methods

- [setLengthRange](Barkoder.Code39BarcodeConfig.md#setlengthrange)
- [toMap](Barkoder.Code39BarcodeConfig.md#tomap)

## Constructors

### constructor

• **new Code39BarcodeConfig**(`config`): [`Code39BarcodeConfig`](Barkoder.Code39BarcodeConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`Code39BarcodeConfig`](Barkoder.Code39BarcodeConfig.md)\> |

#### Returns

[`Code39BarcodeConfig`](Barkoder.Code39BarcodeConfig.md)

## Properties

### checksum

• `Optional` **checksum**: [`Code39ChecksumType`](../enums/Barkoder.Code39ChecksumType.md)

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
