[barkoder-react-native](../README.md) / [Exports](../modules.md) / [Barkoder](../modules/Barkoder.md) / MSIBarcodeConfig

# Class: MSIBarcodeConfig

[Barkoder](../modules/Barkoder.md).MSIBarcodeConfig

## Table of contents

### Constructors

- [constructor](Barkoder.MSIBarcodeConfig.md#constructor)

### Properties

- [checksum](Barkoder.MSIBarcodeConfig.md#checksum)
- [enabled](Barkoder.MSIBarcodeConfig.md#enabled)
- [maxLength](Barkoder.MSIBarcodeConfig.md#maxlength)
- [minLength](Barkoder.MSIBarcodeConfig.md#minlength)

### Methods

- [setLengthRange](Barkoder.MSIBarcodeConfig.md#setlengthrange)
- [toMap](Barkoder.MSIBarcodeConfig.md#tomap)

## Constructors

### constructor

• **new MSIBarcodeConfig**(`config`): [`MSIBarcodeConfig`](Barkoder.MSIBarcodeConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`MSIBarcodeConfig`](Barkoder.MSIBarcodeConfig.md)\> |

#### Returns

[`MSIBarcodeConfig`](Barkoder.MSIBarcodeConfig.md)

## Properties

### checksum

• `Optional` **checksum**: [`MsiChecksumType`](../enums/Barkoder.MsiChecksumType.md)

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
