[barkoder-react-native](../README.md) / [Exports](../modules.md) / Barkoder

# Class: Barkoder

## Table of contents

### Constructors

- [constructor](Barkoder-1.md#constructor)

### Properties

- [\_barkoderViewRef](Barkoder-1.md#_barkoderviewref)
- [\_eventEmitter](Barkoder-1.md#_eventemitter)
- [\_promiseRequestId](Barkoder-1.md#_promiserequestid)
- [\_promisesMap](Barkoder-1.md#_promisesmap)
- [\_resultCallback](Barkoder-1.md#_resultcallback)

### Methods

- [\_dispatchCommand](Barkoder-1.md#_dispatchcommand)
- [configureBarkoder](Barkoder-1.md#configurebarkoder)
- [getBarcodeTypeLengthRange](Barkoder-1.md#getbarcodetypelengthrange)
- [getBarkoderResolution](Barkoder-1.md#getbarkoderresolution)
- [getCode11ChecksumType](Barkoder-1.md#getcode11checksumtype)
- [getCode39ChecksumType](Barkoder-1.md#getcode39checksumtype)
- [getDecodingSpeed](Barkoder-1.md#getdecodingspeed)
- [getDuplicatesDelayMs](Barkoder-1.md#getduplicatesdelayms)
- [getEncodingCharacterSet](Barkoder-1.md#getencodingcharacterset)
- [getFormattingType](Barkoder-1.md#getformattingtype)
- [getLocationLineColorHex](Barkoder-1.md#getlocationlinecolorhex)
- [getLocationLineWidth](Barkoder-1.md#getlocationlinewidth)
- [getMaxZoomFactor](Barkoder-1.md#getmaxzoomfactor)
- [getMaximumResultsCount](Barkoder-1.md#getmaximumresultscount)
- [getMsiChecksumType](Barkoder-1.md#getmsichecksumtype)
- [getMulticodeCachingDuration](Barkoder-1.md#getmulticodecachingduration)
- [getMulticodeCachingEnabled](Barkoder-1.md#getmulticodecachingenabled)
- [getRegionOfInterest](Barkoder-1.md#getregionofinterest)
- [getRoiLineColorHex](Barkoder-1.md#getroilinecolorhex)
- [getRoiLineWidth](Barkoder-1.md#getroilinewidth)
- [getRoiOverlayBackgroundColorHex](Barkoder-1.md#getroioverlaybackgroundcolorhex)
- [getThreadsLimit](Barkoder-1.md#getthreadslimit)
- [getThresholdBetweenDuplicatesScans](Barkoder-1.md#getthresholdbetweenduplicatesscans)
- [getVersion](Barkoder-1.md#getversion)
- [isAndroid](Barkoder-1.md#isandroid)
- [isBarcodeThumbnailOnResultEnabled](Barkoder-1.md#isbarcodethumbnailonresultenabled)
- [isBarcodeTypeEnabled](Barkoder-1.md#isbarcodetypeenabled)
- [isBeepOnSuccessEnabled](Barkoder-1.md#isbeeponsuccessenabled)
- [isCloseSessionOnResultEnabled](Barkoder-1.md#isclosesessiononresultenabled)
- [isFlashAvailable](Barkoder-1.md#isflashavailable)
- [isImageResultEnabled](Barkoder-1.md#isimageresultenabled)
- [isIos](Barkoder-1.md#isios)
- [isLocationInImageResultEnabled](Barkoder-1.md#islocationinimageresultenabled)
- [isLocationInPreviewEnabled](Barkoder-1.md#islocationinpreviewenabled)
- [isPinchToZoomEnabled](Barkoder-1.md#ispinchtozoomenabled)
- [isRegionOfInterestVisible](Barkoder-1.md#isregionofinterestvisible)
- [isVibrateOnSuccessEnabled](Barkoder-1.md#isvibrateonsuccessenabled)
- [onDataReturned](Barkoder-1.md#ondatareturned)
- [pauseScanning](Barkoder-1.md#pausescanning)
- [setBarcodeThumbnailOnResultEnabled](Barkoder-1.md#setbarcodethumbnailonresultenabled)
- [setBarcodeTypeEnabled](Barkoder-1.md#setbarcodetypeenabled)
- [setBarcodeTypeLengthRange](Barkoder-1.md#setbarcodetypelengthrange)
- [setBarkoderResolution](Barkoder-1.md#setbarkoderresolution)
- [setBeepOnSuccessEnabled](Barkoder-1.md#setbeeponsuccessenabled)
- [setCloseSessionOnResultEnabled](Barkoder-1.md#setclosesessiononresultenabled)
- [setCode11ChecksumType](Barkoder-1.md#setcode11checksumtype)
- [setCode39ChecksumType](Barkoder-1.md#setcode39checksumtype)
- [setDatamatrixDpmModeEnabled](Barkoder-1.md#setdatamatrixdpmmodeenabled)
- [setDecodingSpeed](Barkoder-1.md#setdecodingspeed)
- [setDuplicatesDelayMs](Barkoder-1.md#setduplicatesdelayms)
- [setEnableMisshaped1DEnabled](Barkoder-1.md#setenablemisshaped1denabled)
- [setEncodingCharacterSet](Barkoder-1.md#setencodingcharacterset)
- [setFlashEnabled](Barkoder-1.md#setflashenabled)
- [setFormattingType](Barkoder-1.md#setformattingtype)
- [setImageResultEnabled](Barkoder-1.md#setimageresultenabled)
- [setLocationInImageResultEnabled](Barkoder-1.md#setlocationinimageresultenabled)
- [setLocationInPreviewEnabled](Barkoder-1.md#setlocationinpreviewenabled)
- [setLocationLineColor](Barkoder-1.md#setlocationlinecolor)
- [setLocationLineWidth](Barkoder-1.md#setlocationlinewidth)
- [setMaximumResultsCount](Barkoder-1.md#setmaximumresultscount)
- [setMsiChecksumType](Barkoder-1.md#setmsichecksumtype)
- [setMulticodeCachingDuration](Barkoder-1.md#setmulticodecachingduration)
- [setMulticodeCachingEnabled](Barkoder-1.md#setmulticodecachingenabled)
- [setPinchToZoomEnabled](Barkoder-1.md#setpinchtozoomenabled)
- [setRegionOfInterest](Barkoder-1.md#setregionofinterest)
- [setRegionOfInterestVisible](Barkoder-1.md#setregionofinterestvisible)
- [setRoiLineColor](Barkoder-1.md#setroilinecolor)
- [setRoiLineWidth](Barkoder-1.md#setroilinewidth)
- [setRoiOverlayBackgroundColor](Barkoder-1.md#setroioverlaybackgroundcolor)
- [setThreadsLimit](Barkoder-1.md#setthreadslimit)
- [setThresholdBetweenDuplicatesScans](Barkoder-1.md#setthresholdbetweenduplicatesscans)
- [setUpcEanDeblurEnabled](Barkoder-1.md#setupceandeblurenabled)
- [setVibrateOnSuccessEnabled](Barkoder-1.md#setvibrateonsuccessenabled)
- [setZoomFactor](Barkoder-1.md#setzoomfactor)
- [showLogMessages](Barkoder-1.md#showlogmessages)
- [startCamera](Barkoder-1.md#startcamera)
- [startScanning](Barkoder-1.md#startscanning)
- [startScanningEventEmmitter](Barkoder-1.md#startscanningeventemmitter)
- [stopScanning](Barkoder-1.md#stopscanning)

## Constructors

### constructor

• **new Barkoder**(`barkoderViewRef`): [`Barkoder`](Barkoder-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `barkoderViewRef` | `RefObject`\<[`BarkoderView`](BarkoderView.md)\> |

#### Returns

[`Barkoder`](Barkoder-1.md)

## Properties

### \_barkoderViewRef

• `Private` **\_barkoderViewRef**: `RefObject`\<[`BarkoderView`](BarkoderView.md)\>

___

### \_eventEmitter

• `Private` **\_eventEmitter**: `NativeEventEmitter`

___

### \_promiseRequestId

• `Private` **\_promiseRequestId**: `number`

___

### \_promisesMap

• `Private` **\_promisesMap**: `Map`\<`number`, [(`value`: `any`) => `void`, (`error`: ``null`` \| [`BarkoderError`](Barkoder.BarkoderError.md)) => `void`]\>

___

### \_resultCallback

• `Private` **\_resultCallback**: `undefined` \| ``null`` \| `ResultCallback`

## Methods

### \_dispatchCommand

▸ **_dispatchCommand**(`commandID`, `commandArgs?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `commandID` | `string` |
| `commandArgs?` | `any`[] |

#### Returns

`void`

___

### configureBarkoder

▸ **configureBarkoder**(`barkoderConfig`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `barkoderConfig` | [`BarkoderConfig`](Barkoder.BarkoderConfig.md) |

#### Returns

`Promise`\<`boolean`\>

___

### getBarcodeTypeLengthRange

▸ **getBarcodeTypeLengthRange**(`barcodeType`): `Promise`\<`number`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `barcodeType` | [`BarcodeType`](../enums/Barkoder.BarcodeType.md) |

#### Returns

`Promise`\<`number`[]\>

___

### getBarkoderResolution

▸ **getBarkoderResolution**(): `Promise`\<[`BarkoderResolution`](../enums/Barkoder.BarkoderResolution.md)\>

#### Returns

`Promise`\<[`BarkoderResolution`](../enums/Barkoder.BarkoderResolution.md)\>

___

### getCode11ChecksumType

▸ **getCode11ChecksumType**(): `Promise`\<[`Code11ChecksumType`](../enums/Barkoder.Code11ChecksumType.md)\>

#### Returns

`Promise`\<[`Code11ChecksumType`](../enums/Barkoder.Code11ChecksumType.md)\>

___

### getCode39ChecksumType

▸ **getCode39ChecksumType**(): `Promise`\<[`Code39ChecksumType`](../enums/Barkoder.Code39ChecksumType.md)\>

#### Returns

`Promise`\<[`Code39ChecksumType`](../enums/Barkoder.Code39ChecksumType.md)\>

___

### getDecodingSpeed

▸ **getDecodingSpeed**(): `Promise`\<[`DecodingSpeed`](../enums/Barkoder.DecodingSpeed.md)\>

#### Returns

`Promise`\<[`DecodingSpeed`](../enums/Barkoder.DecodingSpeed.md)\>

___

### getDuplicatesDelayMs

▸ **getDuplicatesDelayMs**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### getEncodingCharacterSet

▸ **getEncodingCharacterSet**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

___

### getFormattingType

▸ **getFormattingType**(): `Promise`\<[`FormattingType`](../enums/Barkoder.FormattingType.md)\>

#### Returns

`Promise`\<[`FormattingType`](../enums/Barkoder.FormattingType.md)\>

___

### getLocationLineColorHex

▸ **getLocationLineColorHex**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

___

### getLocationLineWidth

▸ **getLocationLineWidth**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### getMaxZoomFactor

▸ **getMaxZoomFactor**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### getMaximumResultsCount

▸ **getMaximumResultsCount**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### getMsiChecksumType

▸ **getMsiChecksumType**(): `Promise`\<[`MsiChecksumType`](../enums/Barkoder.MsiChecksumType.md)\>

#### Returns

`Promise`\<[`MsiChecksumType`](../enums/Barkoder.MsiChecksumType.md)\>

___

### getMulticodeCachingDuration

▸ **getMulticodeCachingDuration**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### getMulticodeCachingEnabled

▸ **getMulticodeCachingEnabled**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### getRegionOfInterest

▸ **getRegionOfInterest**(): `Promise`\<`number`[]\>

#### Returns

`Promise`\<`number`[]\>

___

### getRoiLineColorHex

▸ **getRoiLineColorHex**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

___

### getRoiLineWidth

▸ **getRoiLineWidth**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### getRoiOverlayBackgroundColorHex

▸ **getRoiOverlayBackgroundColorHex**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

___

### getThreadsLimit

▸ **getThreadsLimit**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### getThresholdBetweenDuplicatesScans

▸ **getThresholdBetweenDuplicatesScans**(): `Promise`\<`number`\>

#### Returns

`Promise`\<`number`\>

___

### getVersion

▸ **getVersion**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

___

### isAndroid

▸ **isAndroid**(): `boolean`

#### Returns

`boolean`

___

### isBarcodeThumbnailOnResultEnabled

▸ **isBarcodeThumbnailOnResultEnabled**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### isBarcodeTypeEnabled

▸ **isBarcodeTypeEnabled**(`barcodeType`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `barcodeType` | [`BarcodeType`](../enums/Barkoder.BarcodeType.md) |

#### Returns

`Promise`\<`boolean`\>

___

### isBeepOnSuccessEnabled

▸ **isBeepOnSuccessEnabled**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### isCloseSessionOnResultEnabled

▸ **isCloseSessionOnResultEnabled**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### isFlashAvailable

▸ **isFlashAvailable**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### isImageResultEnabled

▸ **isImageResultEnabled**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### isIos

▸ **isIos**(): `boolean`

#### Returns

`boolean`

___

### isLocationInImageResultEnabled

▸ **isLocationInImageResultEnabled**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### isLocationInPreviewEnabled

▸ **isLocationInPreviewEnabled**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### isPinchToZoomEnabled

▸ **isPinchToZoomEnabled**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### isRegionOfInterestVisible

▸ **isRegionOfInterestVisible**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### isVibrateOnSuccessEnabled

▸ **isVibrateOnSuccessEnabled**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

___

### onDataReturned

▸ **onDataReturned**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `any` |

#### Returns

`void`

___

### pauseScanning

▸ **pauseScanning**(): `void`

#### Returns

`void`

___

### setBarcodeThumbnailOnResultEnabled

▸ **setBarcodeThumbnailOnResultEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setBarcodeTypeEnabled

▸ **setBarcodeTypeEnabled**(`barcodeType`, `enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `barcodeType` | [`BarcodeType`](../enums/Barkoder.BarcodeType.md) |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setBarcodeTypeLengthRange

▸ **setBarcodeTypeLengthRange**(`barcodeType`, `min`, `max`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `barcodeType` | [`BarcodeType`](../enums/Barkoder.BarcodeType.md) |
| `min` | `number` |
| `max` | `number` |

#### Returns

`Promise`\<`boolean`\>

___

### setBarkoderResolution

▸ **setBarkoderResolution**(`barkoderResolution`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `barkoderResolution` | [`BarkoderResolution`](../enums/Barkoder.BarkoderResolution.md) |

#### Returns

`void`

___

### setBeepOnSuccessEnabled

▸ **setBeepOnSuccessEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setCloseSessionOnResultEnabled

▸ **setCloseSessionOnResultEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setCode11ChecksumType

▸ **setCode11ChecksumType**(`code11ChecksumType`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code11ChecksumType` | [`Code11ChecksumType`](../enums/Barkoder.Code11ChecksumType.md) |

#### Returns

`void`

___

### setCode39ChecksumType

▸ **setCode39ChecksumType**(`code39ChecksumType`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code39ChecksumType` | [`Code39ChecksumType`](../enums/Barkoder.Code39ChecksumType.md) |

#### Returns

`void`

___

### setDatamatrixDpmModeEnabled

▸ **setDatamatrixDpmModeEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setDecodingSpeed

▸ **setDecodingSpeed**(`decodingSpeed`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `decodingSpeed` | [`DecodingSpeed`](../enums/Barkoder.DecodingSpeed.md) |

#### Returns

`void`

___

### setDuplicatesDelayMs

▸ **setDuplicatesDelayMs**(`duplicatesDelayMs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `duplicatesDelayMs` | `number` |

#### Returns

`void`

___

### setEnableMisshaped1DEnabled

▸ **setEnableMisshaped1DEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setEncodingCharacterSet

▸ **setEncodingCharacterSet**(`encodingCharacterSet`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `encodingCharacterSet` | `String` |

#### Returns

`void`

___

### setFlashEnabled

▸ **setFlashEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setFormattingType

▸ **setFormattingType**(`formatting`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `formatting` | [`FormattingType`](../enums/Barkoder.FormattingType.md) |

#### Returns

`void`

___

### setImageResultEnabled

▸ **setImageResultEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setLocationInImageResultEnabled

▸ **setLocationInImageResultEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setLocationInPreviewEnabled

▸ **setLocationInPreviewEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setLocationLineColor

▸ **setLocationLineColor**(`hexColor`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexColor` | `String` |

#### Returns

`Promise`\<`boolean`\>

___

### setLocationLineWidth

▸ **setLocationLineWidth**(`lineWidth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lineWidth` | `number` |

#### Returns

`void`

___

### setMaximumResultsCount

▸ **setMaximumResultsCount**(`maximumResultsCount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `maximumResultsCount` | `number` |

#### Returns

`void`

___

### setMsiChecksumType

▸ **setMsiChecksumType**(`msiChecksumType`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msiChecksumType` | [`MsiChecksumType`](../enums/Barkoder.MsiChecksumType.md) |

#### Returns

`void`

___

### setMulticodeCachingDuration

▸ **setMulticodeCachingDuration**(`multicodeCachingDuration`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `multicodeCachingDuration` | `number` |

#### Returns

`any`

___

### setMulticodeCachingEnabled

▸ **setMulticodeCachingEnabled**(`multicodeCachingEnabled`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `multicodeCachingEnabled` | `boolean` |

#### Returns

`any`

___

### setPinchToZoomEnabled

▸ **setPinchToZoomEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setRegionOfInterest

▸ **setRegionOfInterest**(`left`, `top`, `width`, `height`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `left` | `number` |
| `top` | `number` |
| `width` | `number` |
| `height` | `number` |

#### Returns

`Promise`\<`boolean`\>

___

### setRegionOfInterestVisible

▸ **setRegionOfInterestVisible**(`visible`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible` | `boolean` |

#### Returns

`void`

___

### setRoiLineColor

▸ **setRoiLineColor**(`hexColor`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexColor` | `String` |

#### Returns

`Promise`\<`boolean`\>

___

### setRoiLineWidth

▸ **setRoiLineWidth**(`lineWidth`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lineWidth` | `number` |

#### Returns

`void`

___

### setRoiOverlayBackgroundColor

▸ **setRoiOverlayBackgroundColor**(`hexColor`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `hexColor` | `String` |

#### Returns

`Promise`\<`boolean`\>

___

### setThreadsLimit

▸ **setThreadsLimit**(`threadsLimit`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `threadsLimit` | `number` |

#### Returns

`Promise`\<`boolean`\>

___

### setThresholdBetweenDuplicatesScans

▸ **setThresholdBetweenDuplicatesScans**(`thresholdBetweenDuplicatesScans`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `thresholdBetweenDuplicatesScans` | `number` |

#### Returns

`void`

___

### setUpcEanDeblurEnabled

▸ **setUpcEanDeblurEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setVibrateOnSuccessEnabled

▸ **setVibrateOnSuccessEnabled**(`enabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

___

### setZoomFactor

▸ **setZoomFactor**(`zoomFactor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `zoomFactor` | `number` |

#### Returns

`void`

___

### showLogMessages

▸ **showLogMessages**(`show`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `show` | `boolean` |

#### Returns

`void`

___

### startCamera

▸ **startCamera**(): `void`

#### Returns

`void`

___

### startScanning

▸ **startScanning**(`resultsCallback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resultsCallback` | `ResultCallback` |

#### Returns

`void`

___

### startScanningEventEmmitter

▸ **startScanningEventEmmitter**(): `void`

#### Returns

`void`

___

### stopScanning

▸ **stopScanning**(): `void`

#### Returns

`void`
