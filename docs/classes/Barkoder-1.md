[barkoder-react-native](../README.md) / [Modules](../modules.md) / Barkoder

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
- [isMisshaped1DEnabled](Barkoder-1.md#ismisshaped1denabled)
- [isPinchToZoomEnabled](Barkoder-1.md#ispinchtozoomenabled)
- [isRegionOfInterestVisible](Barkoder-1.md#isregionofinterestvisible)
- [isUpcEanDeblurEnabled](Barkoder-1.md#isupceandeblurenabled)
- [isVINRestrictionsEnabled](Barkoder-1.md#isvinrestrictionsenabled)
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
- [setEnableVINRestrictions](Barkoder-1.md#setenablevinrestrictions)
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

Configures the Barkoder functionality based on the provided configuration.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `barkoderConfig` | [`BarkoderConfig`](Barkoder.BarkoderConfig.md) | The configuration parameters for the Barkoder. |

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the configuration was successful.

___

### getBarcodeTypeLengthRange

▸ **getBarcodeTypeLengthRange**(`barcodeType`): `Promise`\<`number`[]\>

Retrieves the length range of the specified barcode type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `barcodeType` | [`BarcodeType`](../enums/Barkoder.BarcodeType.md) | The barcode type to get the length range for. |

#### Returns

`Promise`\<`number`[]\>

A promise that resolves with an array representing the length range of the barcode type.

___

### getBarkoderResolution

▸ **getBarkoderResolution**(): `Promise`\<[`BarkoderResolution`](../enums/Barkoder.BarkoderResolution.md)\>

Gets the resolution for barcode scanning.

#### Returns

`Promise`\<[`BarkoderResolution`](../enums/Barkoder.BarkoderResolution.md)\>

A promise that resolves with the Barkoder resolution.

___

### getCode11ChecksumType

▸ **getCode11ChecksumType**(): `Promise`\<[`Code11ChecksumType`](../enums/Barkoder.Code11ChecksumType.md)\>

Gets the checksum type for Code 11 barcodes.

#### Returns

`Promise`\<[`Code11ChecksumType`](../enums/Barkoder.Code11ChecksumType.md)\>

A promise that resolves with the checksum type for Code 11 barcodes.

___

### getCode39ChecksumType

▸ **getCode39ChecksumType**(): `Promise`\<[`Code39ChecksumType`](../enums/Barkoder.Code39ChecksumType.md)\>

Gets the checksum type for Code 39 barcodes.

#### Returns

`Promise`\<[`Code39ChecksumType`](../enums/Barkoder.Code39ChecksumType.md)\>

A promise that resolves with the checksum type for Code 39 barcodes.

___

### getDecodingSpeed

▸ **getDecodingSpeed**(): `Promise`\<[`DecodingSpeed`](../enums/Barkoder.DecodingSpeed.md)\>

Gets the decoding speed for barcode scanning.

#### Returns

`Promise`\<[`DecodingSpeed`](../enums/Barkoder.DecodingSpeed.md)\>

A promise that resolves with the decoding speed configuration.

___

### getDuplicatesDelayMs

▸ **getDuplicatesDelayMs**(): `Promise`\<`number`\>

Gets the delay in milliseconds for considering duplicate barcodes during scanning.

#### Returns

`Promise`\<`number`\>

A promise that resolves with the delay (in milliseconds) for detecting duplicate results.

___

### getEncodingCharacterSet

▸ **getEncodingCharacterSet**(): `Promise`\<`string`\>

Gets the character set used for encoding.

#### Returns

`Promise`\<`string`\>

A promise that resolves with the encoding character set.

___

### getFormattingType

▸ **getFormattingType**(): `Promise`\<[`FormattingType`](../enums/Barkoder.FormattingType.md)\>

Gets the formatting type for barcode scanning.

#### Returns

`Promise`\<[`FormattingType`](../enums/Barkoder.FormattingType.md)\>

A promise that resolves with the formatting type configuration.

___

### getLocationLineColorHex

▸ **getLocationLineColorHex**(): `Promise`\<`string`\>

Gets the hexadecimal representation of the location line color.

#### Returns

`Promise`\<`string`\>

A promise that resolves with the location line color in hexadecimal format.

___

### getLocationLineWidth

▸ **getLocationLineWidth**(): `Promise`\<`number`\>

Gets the width of the location line.

#### Returns

`Promise`\<`number`\>

A promise that resolves with the location line width.

___

### getMaxZoomFactor

▸ **getMaxZoomFactor**(): `Promise`\<`number`\>

Gets the maximum zoom factor.

#### Returns

`Promise`\<`number`\>

A promise that resolves with the maximum zoom factor.

___

### getMaximumResultsCount

▸ **getMaximumResultsCount**(): `Promise`\<`number`\>

Gets the maximum number of results to be returned from barcode scanning.

#### Returns

`Promise`\<`number`\>

A promise that resolves with the maximum number of results to return.

___

### getMsiChecksumType

▸ **getMsiChecksumType**(): `Promise`\<[`MsiChecksumType`](../enums/Barkoder.MsiChecksumType.md)\>

Gets the checksum type for MSI barcodes.

#### Returns

`Promise`\<[`MsiChecksumType`](../enums/Barkoder.MsiChecksumType.md)\>

A promise that resolves with the checksum type for MSI barcodes.

___

### getMulticodeCachingDuration

▸ **getMulticodeCachingDuration**(): `Promise`\<`number`\>

Retrieves the caching duration (in milliseconds) for multi-code results.

#### Returns

`Promise`\<`number`\>

A promise that resolves with the caching duration (in milliseconds) for multi-code results.

___

### getMulticodeCachingEnabled

▸ **getMulticodeCachingEnabled**(): `Promise`\<`boolean`\>

Retrieves whether multi-code caching is enabled.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether multi-code caching is enabled.

___

### getRegionOfInterest

▸ **getRegionOfInterest**(): `Promise`\<`number`[]\>

Gets the region of interest (ROI) for barcode scanning.

#### Returns

`Promise`\<`number`[]\>

A promise that resolves with an array representing the region of interest (ROI).

___

### getRoiLineColorHex

▸ **getRoiLineColorHex**(): `Promise`\<`string`\>

Retrieves the region of interest (ROI) line color in hexadecimal format.

#### Returns

`Promise`\<`string`\>

A promise that resolves with the ROI line color in hexadecimal format.

___

### getRoiLineWidth

▸ **getRoiLineWidth**(): `Promise`\<`number`\>

Gets the width of the region of interest (ROI) line..

#### Returns

`Promise`\<`number`\>

A promise that resolves with the ROI line width.

___

### getRoiOverlayBackgroundColorHex

▸ **getRoiOverlayBackgroundColorHex**(): `Promise`\<`string`\>

Gets the hexadecimal representation of the region of interest (ROI) overlay background color.

#### Returns

`Promise`\<`string`\>

A promise that resolves with the ROI overlay background color in hexadecimal format.

___

### getThreadsLimit

▸ **getThreadsLimit**(): `Promise`\<`number`\>

Retrieves the threads limit.

#### Returns

`Promise`\<`number`\>

A promise that resolves with the threads limit.

___

### getThresholdBetweenDuplicatesScans

▸ **getThresholdBetweenDuplicatesScans**(): `Promise`\<`number`\>

Retrieves the threshold between duplicate scans.

#### Returns

`Promise`\<`number`\>

A promise that resolves with the threshold between duplicate scans.

___

### getVersion

▸ **getVersion**(): `Promise`\<`string`\>

Retrieves the version of the Barkoder library.

#### Returns

`Promise`\<`string`\>

A promise that resolves with the version of the Barkoder library.

___

### isAndroid

▸ **isAndroid**(): `boolean`

#### Returns

`boolean`

___

### isBarcodeThumbnailOnResultEnabled

▸ **isBarcodeThumbnailOnResultEnabled**(): `Promise`\<`boolean`\>

Checks if the barcode thumbnail on result is enabled.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the barcode thumbnail on result is enabled.

___

### isBarcodeTypeEnabled

▸ **isBarcodeTypeEnabled**(`barcodeType`): `Promise`\<`boolean`\>

Checks if a specific barcode type is enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `barcodeType` | [`BarcodeType`](../enums/Barkoder.BarcodeType.md) | The barcode type to check. |

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the barcode type is enabled.

___

### isBeepOnSuccessEnabled

▸ **isBeepOnSuccessEnabled**(): `Promise`\<`boolean`\>

Gets the value indicating whether a beep sound is played on successful barcode scanning.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the beep on success is enabled.

___

### isCloseSessionOnResultEnabled

▸ **isCloseSessionOnResultEnabled**(): `Promise`\<`boolean`\>

Gets the value indicating whether the session is closed upon detecting a result during barcode scanning.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether close session on result is enabled.

___

### isFlashAvailable

▸ **isFlashAvailable**(): `Promise`\<`boolean`\>

Checks if flash is available.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether flash is available.

___

### isImageResultEnabled

▸ **isImageResultEnabled**(): `Promise`\<`boolean`\>

Gets the value indicating whether image results are enabled.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether image result is enabled.

___

### isIos

▸ **isIos**(): `boolean`

#### Returns

`boolean`

___

### isLocationInImageResultEnabled

▸ **isLocationInImageResultEnabled**(): `Promise`\<`boolean`\>

Gets or sets a value indicating whether the location is displayed in image results.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether location in image result is enabled.

___

### isLocationInPreviewEnabled

▸ **isLocationInPreviewEnabled**(): `Promise`\<`boolean`\>

Gets the value indicating whether the location is displayed in the camera preview.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether location in preview is enabled.

___

### isMisshaped1DEnabled

▸ **isMisshaped1DEnabled**(): `Promise`\<`boolean`\>

Checks if the detection of misshaped 1D barcodes is enabled.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the detection of misshaped 1D barcodes is enabled.

___

### isPinchToZoomEnabled

▸ **isPinchToZoomEnabled**(): `Promise`\<`boolean`\>

Gets the value indicating whether pinch-to-zoom functionality is enabled.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether pinch to zoom is enabled.

___

### isRegionOfInterestVisible

▸ **isRegionOfInterestVisible**(): `Promise`\<`boolean`\>

Gets the value indicating whether the region of interest (ROI) overlay is visible.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the ROI is visible.

___

### isUpcEanDeblurEnabled

▸ **isUpcEanDeblurEnabled**(): `Promise`\<`boolean`\>

Gets the value indicating whether deblurring is enabled for UPC/EAN barcodes.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the deblurring feature for UPC/EAN barcodes is enabled.

___

### isVINRestrictionsEnabled

▸ **isVINRestrictionsEnabled**(): `Promise`\<`boolean`\>

Checks if Vehicle Identification Number (VIN) restrictions are enabled.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether VIN restrictions are enabled.

___

### isVibrateOnSuccessEnabled

▸ **isVibrateOnSuccessEnabled**(): `Promise`\<`boolean`\>

Gets the value indicating whether vibration is enabled on successful barcode scanning.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether vibrate on success is enabled.

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

Pauses the barcode scanning process.

#### Returns

`void`

___

### setBarcodeThumbnailOnResultEnabled

▸ **setBarcodeThumbnailOnResultEnabled**(`enabled`): `void`

Sets whether the barcode thumbnail on result is enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | A boolean indicating whether to enable the barcode thumbnail on result. |

#### Returns

`void`

___

### setBarcodeTypeEnabled

▸ **setBarcodeTypeEnabled**(`barcodeType`, `enabled`): `void`

Enables or disables the specified barcode type for scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `barcodeType` | [`BarcodeType`](../enums/Barkoder.BarcodeType.md) | The barcode type to enable or disable. |
| `enabled` | `boolean` | True to enable the barcode type, false to disable it. |

#### Returns

`void`

___

### setBarcodeTypeLengthRange

▸ **setBarcodeTypeLengthRange**(`barcodeType`, `min`, `max`): `Promise`\<`boolean`\>

Sets the length range for the specified barcode type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `barcodeType` | [`BarcodeType`](../enums/Barkoder.BarcodeType.md) | The barcode type to set the length range for. |
| `min` | `number` | The minimum length of the barcode type. |
| `max` | `number` | The maximum length of the barcode type. |

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the length range was successfully set.

___

### setBarkoderResolution

▸ **setBarkoderResolution**(`barkoderResolution`): `void`

Sets the resolution for barcode scanning.

#### Parameters

| Name | Type |
| :------ | :------ |
| `barkoderResolution` | [`BarkoderResolution`](../enums/Barkoder.BarkoderResolution.md) |

#### Returns

`void`

___

### setBeepOnSuccessEnabled

▸ **setBeepOnSuccessEnabled**(`enabled`): `void`

Enables or disables the beep sound on successful barcode scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | True to enable beep sound, false to disable it. |

#### Returns

`void`

___

### setCloseSessionOnResultEnabled

▸ **setCloseSessionOnResultEnabled**(`enabled`): `void`

Sets whether the session should be closed upon detecting a result during barcode scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | A boolean indicating whether to enable close session on result. |

#### Returns

`void`

___

### setCode11ChecksumType

▸ **setCode11ChecksumType**(`code11ChecksumType`): `void`

Sets the checksum type for Code 11 barcodes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code11ChecksumType` | [`Code11ChecksumType`](../enums/Barkoder.Code11ChecksumType.md) | The checksum type to set for Code 11 barcodes. |

#### Returns

`void`

___

### setCode39ChecksumType

▸ **setCode39ChecksumType**(`code39ChecksumType`): `void`

Sets the checksum type for Code 39 barcodes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `code39ChecksumType` | [`Code39ChecksumType`](../enums/Barkoder.Code39ChecksumType.md) | The checksum type to set for Code 39 barcodes. |

#### Returns

`void`

___

### setDatamatrixDpmModeEnabled

▸ **setDatamatrixDpmModeEnabled**(`enabled`): `void`

Sets whether the Direct Part Marking (DPM) mode for Datamatrix barcodes is enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | True to enable DPM mode, false to disable it. |

#### Returns

`void`

___

### setDecodingSpeed

▸ **setDecodingSpeed**(`decodingSpeed`): `void`

Sets the decoding speed for barcode scanning.

#### Parameters

| Name | Type |
| :------ | :------ |
| `decodingSpeed` | [`DecodingSpeed`](../enums/Barkoder.DecodingSpeed.md) |

#### Returns

`void`

___

### setDuplicatesDelayMs

▸ **setDuplicatesDelayMs**(`duplicatesDelayMs`): `void`

Sets the delay in milliseconds for considering duplicate barcodes during scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `duplicatesDelayMs` | `number` | The delay in milliseconds for duplicate detection. |

#### Returns

`void`

___

### setEnableMisshaped1DEnabled

▸ **setEnableMisshaped1DEnabled**(`enabled`): `void`

Sets whether the detection of misshaped 1D barcodes is enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | A boolean indicating whether to enable the detection of misshaped 1D barcodes. |

#### Returns

`void`

___

### setEnableVINRestrictions

▸ **setEnableVINRestrictions**(`enabled`): `void`

Sets whether Vehicle Identification Number (VIN) restrictions are enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | A boolean indicating whether to enable VIN restrictions. |

#### Returns

`void`

___

### setEncodingCharacterSet

▸ **setEncodingCharacterSet**(`encodingCharacterSet`): `void`

Sets the encoding character set for barcode scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `encodingCharacterSet` | `String` | The encoding character set to be set. |

#### Returns

`void`

___

### setFlashEnabled

▸ **setFlashEnabled**(`enabled`): `void`

Sets whether flash is enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | A boolean indicating whether flash should be enabled. |

#### Returns

`void`

___

### setFormattingType

▸ **setFormattingType**(`formatting`): `void`

Sets the formatting type for barcode scanning.

#### Parameters

| Name | Type |
| :------ | :------ |
| `formatting` | [`FormattingType`](../enums/Barkoder.FormattingType.md) |

#### Returns

`void`

___

### setImageResultEnabled

▸ **setImageResultEnabled**(`enabled`): `void`

Enables or disables the display of image results during barcode scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | True to enable image result display, false to disable it. |

#### Returns

`void`

___

### setLocationInImageResultEnabled

▸ **setLocationInImageResultEnabled**(`enabled`): `void`

Enables or disables displaying the barcode location in the image result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | True to display the location, false to hide it. |

#### Returns

`void`

___

### setLocationInPreviewEnabled

▸ **setLocationInPreviewEnabled**(`enabled`): `void`

Enables or disables displaying the barcode location in the camera preview.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | True to display the location, false to hide it. |

#### Returns

`void`

___

### setLocationLineColor

▸ **setLocationLineColor**(`hexColor`): `Promise`\<`boolean`\>

Sets the location line color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hexColor` | `String` | The hexadecimal color value to set. |

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the color was successfully set.

___

### setLocationLineWidth

▸ **setLocationLineWidth**(`lineWidth`): `void`

Sets the location line width.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lineWidth` | `number` | The width of the location line to set. |

#### Returns

`void`

___

### setMaximumResultsCount

▸ **setMaximumResultsCount**(`maximumResultsCount`): `void`

Sets the maximum number of results to be returned from barcode scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maximumResultsCount` | `number` | The maximum number of results to return. |

#### Returns

`void`

___

### setMsiChecksumType

▸ **setMsiChecksumType**(`msiChecksumType`): `void`

Set the MSI checksum type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msiChecksumType` | [`MsiChecksumType`](../enums/Barkoder.MsiChecksumType.md) | The MSI checksum type to set. |

#### Returns

`void`

___

### setMulticodeCachingDuration

▸ **setMulticodeCachingDuration**(`multicodeCachingDuration`): `any`

Sets the caching duration (in milliseconds) for multi-code results.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multicodeCachingDuration` | `number` | The caching duration (in milliseconds) for multi-code results. |

#### Returns

`any`

___

### setMulticodeCachingEnabled

▸ **setMulticodeCachingEnabled**(`multicodeCachingEnabled`): `any`

Sets whether multi-code caching is enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multicodeCachingEnabled` | `boolean` | A boolean indicating whether to enable multi-code caching. |

#### Returns

`any`

___

### setPinchToZoomEnabled

▸ **setPinchToZoomEnabled**(`enabled`): `void`

Enables or disables pinch-to-zoom functionality for the camera used in barcode scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | True to enable pinch-to-zoom, false to disable it. |

#### Returns

`void`

___

### setRegionOfInterest

▸ **setRegionOfInterest**(`left`, `top`, `width`, `height`): `Promise`\<`boolean`\>

Sets the region of interest (ROI) for barcode scanning within the camera preview.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `left` | `number` | The left coordinate of the ROI. |
| `top` | `number` | The top coordinate of the ROI. |
| `width` | `number` | The width of the ROI. |
| `height` | `number` | The height of the ROI. |

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the ROI was successfully set.

___

### setRegionOfInterestVisible

▸ **setRegionOfInterestVisible**(`visible`): `void`

Sets the visibility of the region of interest (ROI) overlay for barcode scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `visible` | `boolean` | True to make the ROI visible, false to hide it. |

#### Returns

`void`

___

### setRoiLineColor

▸ **setRoiLineColor**(`hexColor`): `Promise`\<`boolean`\>

Sets the color of the line indicating the region of interest (ROI) in the camera preview.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hexColor` | `String` | The hexadecimal representation of the color. |

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the color was successfully set.

___

### setRoiLineWidth

▸ **setRoiLineWidth**(`lineWidth`): `void`

Sets the width of the region of interest (ROI) line.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lineWidth` | `number` | The width of the ROI line to set. |

#### Returns

`void`

___

### setRoiOverlayBackgroundColor

▸ **setRoiOverlayBackgroundColor**(`hexColor`): `Promise`\<`boolean`\>

Sets the region of interest (ROI) overlay background color.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hexColor` | `String` | The hexadecimal color value to set for the ROI overlay background. |

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the color was successfully set.

___

### setThreadsLimit

▸ **setThreadsLimit**(`threadsLimit`): `Promise`\<`boolean`\>

Sets the threads limit.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `threadsLimit` | `number` | The limit for the number of threads to set. |

#### Returns

`Promise`\<`boolean`\>

A promise that resolves with a boolean indicating whether the threads limit was successfully set.

___

### setThresholdBetweenDuplicatesScans

▸ **setThresholdBetweenDuplicatesScans**(`thresholdBetweenDuplicatesScans`): `void`

Sets the threshold between duplicate scans.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thresholdBetweenDuplicatesScans` | `number` | The threshold between duplicate scans. |

#### Returns

`void`

___

### setUpcEanDeblurEnabled

▸ **setUpcEanDeblurEnabled**(`enabled`): `void`

Sets whether the deblurring feature for UPC/EAN barcodes is enabled.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | A boolean indicating whether to enable the deblurring feature for UPC/EAN barcodes. |

#### Returns

`void`

___

### setVibrateOnSuccessEnabled

▸ **setVibrateOnSuccessEnabled**(`enabled`): `void`

Enables or disables the vibration on successful barcode scanning.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | True to enable vibration, false to disable it. |

#### Returns

`void`

___

### setZoomFactor

▸ **setZoomFactor**(`zoomFactor`): `void`

Sets the zoom factor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `zoomFactor` | `number` | The zoom factor to set. |

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

Starts the camera for barcode scanning.

#### Returns

`void`

___

### startScanning

▸ **startScanning**(`resultsCallback`): `void`

Starts scanning for barcodes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resultsCallback` | `ResultCallback` | The callback function to handle barcode scanning events. |

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

Stops the barcode scanning process.

#### Returns

`void`
