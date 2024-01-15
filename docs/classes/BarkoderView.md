[barkoder-react-native](../README.md) / [Exports](../modules.md) / BarkoderView

# Class: BarkoderView

## Hierarchy

- `Component`\<`BarkoderReactNativeProps`\>

  ↳ **`BarkoderView`**

## Table of contents

### Constructors

- [constructor](BarkoderView.md#constructor)

### Properties

- [\_barkoder](BarkoderView.md#_barkoder)
- [\_eventEmitter](BarkoderView.md#_eventemitter)
- [\_myRef](BarkoderView.md#_myref)

### Methods

- [\_onBarkoderConfigCreated](BarkoderView.md#_onbarkoderconfigcreated)
- [\_onDataReturned](BarkoderView.md#_ondatareturned)
- [render](BarkoderView.md#render)
- [startConfigurationEmitter](BarkoderView.md#startconfigurationemitter)

## Constructors

### constructor

• **new BarkoderView**(`props`): [`BarkoderView`](BarkoderView.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `BarkoderReactNativeProps` |

#### Returns

[`BarkoderView`](BarkoderView.md)

#### Overrides

React.Component\&lt;BarkoderReactNativeProps\&gt;.constructor

## Properties

### \_barkoder

• `Private` **\_barkoder**: [`Barkoder`](Barkoder-1.md)

___

### \_eventEmitter

• `Private` **\_eventEmitter**: `NativeEventEmitter`

___

### \_myRef

• `Private` **\_myRef**: `RefObject`\<[`BarkoderView`](BarkoderView.md)\>

## Methods

### \_onBarkoderConfigCreated

▸ **_onBarkoderConfigCreated**(`_event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_event` | `any` |

#### Returns

`void`

___

### \_onDataReturned

▸ **_onDataReturned**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `any` |

#### Returns

`void`

___

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

___

### startConfigurationEmitter

▸ **startConfigurationEmitter**(): `void`

#### Returns

`void`
