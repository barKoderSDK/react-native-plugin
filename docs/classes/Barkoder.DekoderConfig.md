[barkoder-react-native](../README.md) / [Exports](../modules.md) / [Barkoder](../modules/Barkoder.md) / DekoderConfig

# Class: DekoderConfig

[Barkoder](../modules/Barkoder.md).DekoderConfig

## Table of contents

### Constructors

- [constructor](Barkoder.DekoderConfig.md#constructor)

### Properties

- [aztec](Barkoder.DekoderConfig.md#aztec)
- [aztecCompact](Barkoder.DekoderConfig.md#azteccompact)
- [codabar](Barkoder.DekoderConfig.md#codabar)
- [code11](Barkoder.DekoderConfig.md#code11)
- [code128](Barkoder.DekoderConfig.md#code128)
- [code25](Barkoder.DekoderConfig.md#code25)
- [code32](Barkoder.DekoderConfig.md#code32)
- [code39](Barkoder.DekoderConfig.md#code39)
- [code93](Barkoder.DekoderConfig.md#code93)
- [coop25](Barkoder.DekoderConfig.md#coop25)
- [datalogic25](Barkoder.DekoderConfig.md#datalogic25)
- [datamatrix](Barkoder.DekoderConfig.md#datamatrix)
- [dotcode](Barkoder.DekoderConfig.md#dotcode)
- [ean13](Barkoder.DekoderConfig.md#ean13)
- [ean8](Barkoder.DekoderConfig.md#ean8)
- [general](Barkoder.DekoderConfig.md#general)
- [iata25](Barkoder.DekoderConfig.md#iata25)
- [interleaved25](Barkoder.DekoderConfig.md#interleaved25)
- [itf14](Barkoder.DekoderConfig.md#itf14)
- [matrix25](Barkoder.DekoderConfig.md#matrix25)
- [msi](Barkoder.DekoderConfig.md#msi)
- [pdf417](Barkoder.DekoderConfig.md#pdf417)
- [pdf417Micro](Barkoder.DekoderConfig.md#pdf417micro)
- [qr](Barkoder.DekoderConfig.md#qr)
- [qrMicro](Barkoder.DekoderConfig.md#qrmicro)
- [telepen](Barkoder.DekoderConfig.md#telepen)
- [upcA](Barkoder.DekoderConfig.md#upca)
- [upcE](Barkoder.DekoderConfig.md#upce)
- [upcE1](Barkoder.DekoderConfig.md#upce1)

### Methods

- [toMap](Barkoder.DekoderConfig.md#tomap)

## Constructors

### constructor

• **new DekoderConfig**(`config`): [`DekoderConfig`](Barkoder.DekoderConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`DekoderConfig`](Barkoder.DekoderConfig.md)\> |

#### Returns

[`DekoderConfig`](Barkoder.DekoderConfig.md)

## Properties

### aztec

• `Optional` **aztec**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### aztecCompact

• `Optional` **aztecCompact**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### codabar

• `Optional` **codabar**: [`BarcodeConfigWithLength`](Barkoder.BarcodeConfigWithLength.md)

___

### code11

• `Optional` **code11**: [`Code11BarcodeConfig`](Barkoder.Code11BarcodeConfig.md)

___

### code128

• `Optional` **code128**: [`BarcodeConfigWithLength`](Barkoder.BarcodeConfigWithLength.md)

___

### code25

• `Optional` **code25**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### code32

• `Optional` **code32**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### code39

• `Optional` **code39**: [`Code39BarcodeConfig`](Barkoder.Code39BarcodeConfig.md)

___

### code93

• `Optional` **code93**: [`BarcodeConfigWithLength`](Barkoder.BarcodeConfigWithLength.md)

___

### coop25

• `Optional` **coop25**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### datalogic25

• `Optional` **datalogic25**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### datamatrix

• `Optional` **datamatrix**: [`DatamatrixBarcodeConfig`](Barkoder.DatamatrixBarcodeConfig.md)

___

### dotcode

• `Optional` **dotcode**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### ean13

• `Optional` **ean13**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### ean8

• `Optional` **ean8**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### general

• `Optional` **general**: [`GeneralSettings`](Barkoder.GeneralSettings.md)

___

### iata25

• `Optional` **iata25**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### interleaved25

• `Optional` **interleaved25**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### itf14

• `Optional` **itf14**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### matrix25

• `Optional` **matrix25**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### msi

• `Optional` **msi**: [`MSIBarcodeConfig`](Barkoder.MSIBarcodeConfig.md)

___

### pdf417

• `Optional` **pdf417**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### pdf417Micro

• `Optional` **pdf417Micro**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### qr

• `Optional` **qr**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### qrMicro

• `Optional` **qrMicro**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### telepen

• `Optional` **telepen**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### upcA

• `Optional` **upcA**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### upcE

• `Optional` **upcE**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

___

### upcE1

• `Optional` **upcE1**: [`BarcodeConfig`](Barkoder.BarcodeConfig.md)

## Methods

### toMap

▸ **toMap**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `Aztec` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Aztec Compact` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `COOP 25` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Codabar` | `undefined` \| \{ `enabled`: `undefined` \| `boolean` ; `maximumLength`: `undefined` \| `number` ; `minimumLength`: `undefined` \| `number`  } |
| `Code 11` | `undefined` \| \{ `[key: string]`: `any`;  } |
| `Code 128` | `undefined` \| \{ `enabled`: `undefined` \| `boolean` ; `maximumLength`: `undefined` \| `number` ; `minimumLength`: `undefined` \| `number`  } |
| `Code 25` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Code 32` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Code 39` | `undefined` \| \{ `[key: string]`: `any`;  } |
| `Code 93` | `undefined` \| \{ `enabled`: `undefined` \| `boolean` ; `maximumLength`: `undefined` \| `number` ; `minimumLength`: `undefined` \| `number`  } |
| `Datalogic 25` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Datamatrix` | `undefined` \| \{ `[key: string]`: `any`;  } |
| `Dotcode` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Ean-13` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Ean-8` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `IATA 25` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `ITF 14` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Interleaved 2 of 5` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `MSI` | `undefined` \| \{ `[key: string]`: `any`;  } |
| `Matrix 25` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `PDF 417` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `PDF 417 Micro` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `QR` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `QR Micro` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Telepen` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Upc-A` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Upc-E` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `Upc-E1` | `undefined` \| \{ `enabled`: `undefined` \| `boolean`  } |
| `general` | `undefined` \| \{ `[key: string]`: `any`;  } |
