[barkoder-react-native](../README.md) / [Modules](../modules.md) / [Barkoder](../modules/Barkoder.md) / GeneralSettings

# Class: GeneralSettings

[Barkoder](../modules/Barkoder.md).GeneralSettings

## Table of contents

### Constructors

- [constructor](Barkoder.GeneralSettings.md#constructor)

### Properties

- [decodingSpeed](Barkoder.GeneralSettings.md#decodingspeed)
- [enableMisshaped1D](Barkoder.GeneralSettings.md#enablemisshaped1d)
- [encodingCharacterSet](Barkoder.GeneralSettings.md#encodingcharacterset)
- [formattingType](Barkoder.GeneralSettings.md#formattingtype)
- [roiHeight](Barkoder.GeneralSettings.md#roiheight)
- [roiWidth](Barkoder.GeneralSettings.md#roiwidth)
- [roiX](Barkoder.GeneralSettings.md#roix)
- [roiY](Barkoder.GeneralSettings.md#roiy)
- [threadsLimit](Barkoder.GeneralSettings.md#threadslimit)
- [upcEanDeblur](Barkoder.GeneralSettings.md#upceandeblur)

### Methods

- [setROI](Barkoder.GeneralSettings.md#setroi)
- [toMap](Barkoder.GeneralSettings.md#tomap)

## Constructors

### constructor

• **new GeneralSettings**(`config`): [`GeneralSettings`](Barkoder.GeneralSettings.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`GeneralSettings`](Barkoder.GeneralSettings.md)\> |

#### Returns

[`GeneralSettings`](Barkoder.GeneralSettings.md)

## Properties

### decodingSpeed

• `Optional` **decodingSpeed**: [`DecodingSpeed`](../enums/Barkoder.DecodingSpeed.md)

___

### enableMisshaped1D

• `Optional` **enableMisshaped1D**: `number`

___

### encodingCharacterSet

• `Optional` **encodingCharacterSet**: `string`

___

### formattingType

• `Optional` **formattingType**: [`FormattingType`](../enums/Barkoder.FormattingType.md)

___

### roiHeight

• `Optional` **roiHeight**: `number`

___

### roiWidth

• `Optional` **roiWidth**: `number`

___

### roiX

• `Optional` **roiX**: `number`

___

### roiY

• `Optional` **roiY**: `number`

___

### threadsLimit

• `Optional` **threadsLimit**: `number`

___

### upcEanDeblur

• `Optional` **upcEanDeblur**: `number`

## Methods

### setROI

▸ **setROI**(`x`, `y`, `width`, `height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |

#### Returns

`void`

___

### toMap

▸ **toMap**(): `Object`

#### Returns

`Object`
