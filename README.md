<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [README](#readme)
  - [barKoder Barcode Scanner SDK for React Native](#barkoder-barcode-scanner-sdk-for-react-native)
- [READMEALL](#readmeall)
- [Classes](#classes)
  - [Barkoder 1](#barkoder-1)
    - [Class: Barkoder](#class-barkoder)
  - [Barkoder Barcode Config](#barkoder-barcode-config)
    - [Class: BarcodeConfig](#class-barcodeconfig)
  - [Barkoder Barcode Config With Length](#barkoder-barcode-config-with-length)
    - [Class: BarcodeConfigWithLength](#class-barcodeconfigwithlength)
  - [Barkoder Barkoder Config](#barkoder-barkoder-config)
    - [Class: BarkoderConfig](#class-barkoderconfig)
  - [Barkoder Barkoder Error](#barkoder-barkoder-error)
    - [Class: BarkoderError](#class-barkodererror)
  - [Barkoder Barkoder Result](#barkoder-barkoder-result)
    - [Class: BarkoderResult](#class-barkoderresult)
  - [Barkoder Code 11 Barcode Config](#barkoder-code-11-barcode-config)
    - [Class: Code11BarcodeConfig](#class-code11barcodeconfig)
  - [Barkoder Code 39 Barcode Config](#barkoder-code-39-barcode-config)
    - [Class: Code39BarcodeConfig](#class-code39barcodeconfig)
  - [Barkoder Datamatrix Barcode Config](#barkoder-datamatrix-barcode-config)
    - [Class: DatamatrixBarcodeConfig](#class-datamatrixbarcodeconfig)
  - [Barkoder Dekoder Config](#barkoder-dekoder-config)
    - [Class: DekoderConfig](#class-dekoderconfig)
  - [Barkoder General Settings](#barkoder-general-settings)
    - [Class: GeneralSettings](#class-generalsettings)
  - [Barkoder MSI Barcode Config](#barkoder-msi-barcode-config)
    - [Class: MSIBarcodeConfig](#class-msibarcodeconfig)
  - [Barkoder View](#barkoder-view)
    - [Class: BarkoderView](#class-barkoderview)
- [Enums](#enums)
  - [Barkoder Barcode Type](#barkoder-barcode-type)
    - [Enumeration: BarcodeType](#enumeration-barcodetype)
  - [Barkoder Barkoder Resolution](#barkoder-barkoder-resolution)
    - [Enumeration: BarkoderResolution](#enumeration-barkoderresolution)
  - [Barkoder Code 11 Checksum Type](#barkoder-code-11-checksum-type)
    - [Enumeration: Code11ChecksumType](#enumeration-code11checksumtype)
  - [Barkoder Code 39 Checksum Type](#barkoder-code-39-checksum-type)
    - [Enumeration: Code39ChecksumType](#enumeration-code39checksumtype)
  - [Barkoder Decoding Speed](#barkoder-decoding-speed)
    - [Enumeration: DecodingSpeed](#enumeration-decodingspeed)
  - [Barkoder Formatting Type](#barkoder-formatting-type)
    - [Enumeration: FormattingType](#enumeration-formattingtype)
  - [Barkoder Msi Checksum Type](#barkoder-msi-checksum-type)
    - [Enumeration: MsiChecksumType](#enumeration-msichecksumtype)
- [Modules](#modules)
  - [barkoder-react-native](#barkoder-react-native)
    - [Table of contents](#table-of-contents)
- [Modules](#modules-1)
  - [Barkoder](#barkoder)
    - [Namespace: Barkoder](#namespace-barkoder)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# README

barkoder-react-native / [Exports](#modules)

## barKoder Barcode Scanner SDK for React Native 

#### Add an enterprise-grade barcode scanning engine in your React Native app 

The barKoder SDK React Native plugin grants an easy to use React Native solution with a great interface that can be integrated in both iOS and Android apps.

Integrating the [barKoder Barcode Scanner SDK](https://barkoder.com/barcode-scanner-sdk) into your Enterprise or Consumer-facing mobile apps will instantly transform your user's smarphones and tablets into rugged barcode scanning devices without the need to procure and maintain expensive and sluggish hardware devices that have a very short life span.

The barKoder barcode scanner SDK is a relatively new product in an established market, already developed to be as advanced if not more than other competitor API's. Its robust barcode reading engine can be used to read the content of the most widely used barcodes with lightning fast speed and unprecended recognition rate: 

1D - [Codabar](https://barkoder.com/barcode-types/codaba), [Code 11](https://barkoder.com/barcode-types/code-11), [Code 25](https://barkoder.com/barcode-types/code-25), [Code 39](https://barkoder.com/barcode-types/code-39), [Code 93](https://barkoder.com/barcode-types/code-93), [Code 128](https://barkoder.com/barcode-types/code-128), [EAN-8](https://barkoder.com/barcode-types/ean-upc-code), [EAN-13](https://barkoder.com/barcode-types/ean-upc-code), [Interleaved 2 of 5](https://barkoder.com/barcode-types/code-25), [ITF-14](https://barkoder.com/barcode-types/code-25), [MSI Plessey](https://barkoder.com/barcode-types/msi-plessey), Pharmacode, [Telepen](https://barkoder.com/barcode-types/telepen), [UPC-A](https://barkoder.com/barcode-types/ean-upc-code) & [UPC-E](https://barkoder.com/barcode-types/ean-upc-code)

2D - [Aztec Code](https://barkoder.com/barcode-types/aztec), [Aztec Compact](https://barkoder.com/barcode-types/aztec), [Data Matrix](https://barkoder.com/barcode-types/data-matrix), [PDF417](https://barkoder.com/barcode-types/pdf417), [Micro PDF417](https://barkoder.com/barcode-types/pdf417), [DotCode](https://barkoder.com/barcode-types/dotcode), [QR Code](https://barkoder.com/barcode-types/qr-code) & [Micro QR Code](https://barkoder.com/barcode-types/qr-code)

You can check out our free demo app Barcode Scanner by barKoder available both via [Apple App Store](https://apps.apple.com/us/app/barkoder-scanner/id6443715409?uo=2) & [Google Play Store](https://play.google.com/store/apps/details?id=com.barkoder.demoscanner).

#### Documentation

You can find full documentation about the barKoder Barcode Reader SDK plugin for React Native here: https://docs.barkoder.com/en/v1/react-installation

#### Trial License

If you run the barKoder Barcode Scanner SDK without a valid trial or production license, all results upon successful barcode scans will be partially masked by asterisks (*). You can get a trial license simply by [registering on the barKoder Portal](https://barkoder.com/register) and utilizing the self-service for [Evaluation License Generation](https://barkoder.com/spr/new)! Each trial license will be good for an initial duration of 30 days and can be deployed to up to 50 devices. For any custom requirements, contact our sales team via sales@barkoder.com

Note that a trial license is only supposed to be utilized in a development or staging environment. IF you decide to publish a trial license along with your app to the App Store, Play Store or any public store we won't be held accountable for any potential consequences. 

#### Free Developer Support

Our support is completely free for integration or testing purposes and granted through the [barKoder Developer Portal](https://barkoder.com/login). After registering and logging into your account, you only need to submit a [Support Issue](https://barkoder.com/issues). Alternatively, you can contact us by email via support@barkoder.com

#### How to use barkoder-react-native package in your project

##### 1. Prepare environment
Install the dependencies and [setup your environment](https://reactnative.dev/docs/environment-setup)

##### 2. Add our barkoder-react-native package
To add the **barkoder-react-native** package to your project, you have two options. You can either use the **barkoder-react-native** package from **npm** or from a local path.

To use the package from [npm](https://www.npmjs.com/package/barkoder-react-native) run this command:
    
   ```
    yarn add barkoder-react-native
   ```

   if you are using **YARN** in your project or

   ```
    npm install barkoder-react-native
   ```
   
   if you are using **NPM** in your project.

If you prefer to use a local package, download the package from [https://barkoder.com](https://barkoder.com/repository), unzip the archive and add the package with setting the package path    
   

   ```
    yarn add <path to barkoder-react-native package>
   ```

   if you are using **YARN** in your project or

   ``` 
    npm install <path to barkoder-react-native package>
   ```
   
   if you are using **NPM** in your project.

If you are having trouble with iOS, try to reinstall the dependencies by running **pod install** command **inside ios folder**:

   ``` 
    cd ios
    pod install
   ```

##### 3. Import package
Import the **barkoder-react-native** package in your project with:
   ``` 
    import { Barkoder, BarkoderView } from 'barkoder-react-native';
   ```
##### 4. BarkoderView
At this point the **barkoder-react-native** package is installed and imported in your project. Next step is to add the **BarkoderView** in your layout and set the **licenseKey** parameter and **onBarkoderViewCreated** callback.
   ``` 
   <SafeAreaView style={styles.container}>
      ...

      <BarkoderView
          style={styles.barkoderView}
          licenseKey="KEY"
          onBarkoderViewCreated={(barkoder: Barkoder) => onBarkoderViewCreated(barkoder)} />

      ...

   ```
   The license key is a string that concists of alphanumerical characters. See the Trial License Section to learn how to get a valid license. 
##### 5. Ready to Scan Event
Inside **onBarkoderViewCreated** callback function the SDK is fully initialized and ready for configuration or to start the scanning process
   ``` 
    async function onBarkoderViewCreated(_barkoder: Barkoder) {

      barkoder.setBarcodeTypeEnabled(Barkoder.BarcodeType.qr, true);
      barkoder.setRegionOfInterestVisible(true);
    
      ...

      setBarkoder(barkoder);
    }

    function scanPressed() {
      barkoder.startScanning((result) {
        // The result from successful scan is received here
      });
    }
   ```
   For the complete usage of the **barkoder-react-native** package please check our sample.
   
##### 6. Camera permissions
Our SDK requires camera permission to be granted in order to use scanning features. For Android, the permission is set in the manifest from the package. For iOS you need to specify camera permission in **Info.plist** file inside your project
   ``` 
    <key>NSCameraUsageDescription</key>
 	 <string>Camera permission</string>
   ```

# READMEALL


# Classes

## Barkoder 1

[barkoder-react-native](#readme) / [Exports](#modules) / Barkoder

### Class: Barkoder

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [\_barkoderViewRef](#_barkoderviewref)
- [\_eventEmitter](#_eventemitter)
- [\_promiseRequestId](#_promiserequestid)
- [\_promisesMap](#_promisesmap)
- [\_resultCallback](#_resultcallback)

##### Methods

- [\_dispatchCommand](#_dispatchcommand)
- [configureBarkoder](#configurebarkoder)
- [getBarcodeTypeLengthRange](#getbarcodetypelengthrange)
- [getBarkoderResolution](#getbarkoderresolution)
- [getCode11ChecksumType](#getcode11checksumtype)
- [getCode39ChecksumType](#getcode39checksumtype)
- [getDecodingSpeed](#getdecodingspeed)
- [getDuplicatesDelayMs](#getduplicatesdelayms)
- [getEncodingCharacterSet](#getencodingcharacterset)
- [getFormattingType](#getformattingtype)
- [getLocationLineColorHex](#getlocationlinecolorhex)
- [getLocationLineWidth](#getlocationlinewidth)
- [getMaxZoomFactor](#getmaxzoomfactor)
- [getMaximumResultsCount](#getmaximumresultscount)
- [getMsiChecksumType](#getmsichecksumtype)
- [getMulticodeCachingDuration](#getmulticodecachingduration)
- [getMulticodeCachingEnabled](#getmulticodecachingenabled)
- [getRegionOfInterest](#getregionofinterest)
- [getRoiLineColorHex](#getroilinecolorhex)
- [getRoiLineWidth](#getroilinewidth)
- [getRoiOverlayBackgroundColorHex](#getroioverlaybackgroundcolorhex)
- [getThreadsLimit](#getthreadslimit)
- [getThresholdBetweenDuplicatesScans](#getthresholdbetweenduplicatesscans)
- [getVersion](#getversion)
- [isAndroid](#isandroid)
- [isBarcodeThumbnailOnResultEnabled](#isbarcodethumbnailonresultenabled)
- [isBarcodeTypeEnabled](#isbarcodetypeenabled)
- [isBeepOnSuccessEnabled](#isbeeponsuccessenabled)
- [isCloseSessionOnResultEnabled](#isclosesessiononresultenabled)
- [isFlashAvailable](#isflashavailable)
- [isImageResultEnabled](#isimageresultenabled)
- [isIos](#isios)
- [isLocationInImageResultEnabled](#islocationinimageresultenabled)
- [isLocationInPreviewEnabled](#islocationinpreviewenabled)
- [isPinchToZoomEnabled](#ispinchtozoomenabled)
- [isRegionOfInterestVisible](#isregionofinterestvisible)
- [isVibrateOnSuccessEnabled](#isvibrateonsuccessenabled)
- [onDataReturned](#ondatareturned)
- [pauseScanning](#pausescanning)
- [setBarcodeThumbnailOnResultEnabled](#setbarcodethumbnailonresultenabled)
- [setBarcodeTypeEnabled](#setbarcodetypeenabled)
- [setBarcodeTypeLengthRange](#setbarcodetypelengthrange)
- [setBarkoderResolution](#setbarkoderresolution)
- [setBeepOnSuccessEnabled](#setbeeponsuccessenabled)
- [setCloseSessionOnResultEnabled](#setclosesessiononresultenabled)
- [setCode11ChecksumType](#setcode11checksumtype)
- [setCode39ChecksumType](#setcode39checksumtype)
- [setDatamatrixDpmModeEnabled](#setdatamatrixdpmmodeenabled)
- [setDecodingSpeed](#setdecodingspeed)
- [setDuplicatesDelayMs](#setduplicatesdelayms)
- [setEnableMisshaped1DEnabled](#setenablemisshaped1denabled)
- [setEncodingCharacterSet](#setencodingcharacterset)
- [setFlashEnabled](#setflashenabled)
- [setFormattingType](#setformattingtype)
- [setImageResultEnabled](#setimageresultenabled)
- [setLocationInImageResultEnabled](#setlocationinimageresultenabled)
- [setLocationInPreviewEnabled](#setlocationinpreviewenabled)
- [setLocationLineColor](#setlocationlinecolor)
- [setLocationLineWidth](#setlocationlinewidth)
- [setMaximumResultsCount](#setmaximumresultscount)
- [setMsiChecksumType](#setmsichecksumtype)
- [setMulticodeCachingDuration](#setmulticodecachingduration)
- [setMulticodeCachingEnabled](#setmulticodecachingenabled)
- [setPinchToZoomEnabled](#setpinchtozoomenabled)
- [setRegionOfInterest](#setregionofinterest)
- [setRegionOfInterestVisible](#setregionofinterestvisible)
- [setRoiLineColor](#setroilinecolor)
- [setRoiLineWidth](#setroilinewidth)
- [setRoiOverlayBackgroundColor](#setroioverlaybackgroundcolor)
- [setThreadsLimit](#setthreadslimit)
- [setThresholdBetweenDuplicatesScans](#setthresholdbetweenduplicatesscans)
- [setUpcEanDeblurEnabled](#setupceandeblurenabled)
- [setVibrateOnSuccessEnabled](#setvibrateonsuccessenabled)
- [setZoomFactor](#setzoomfactor)
- [showLogMessages](#showlogmessages)
- [startCamera](#startcamera)
- [startScanning](#startscanning)
- [startScanningEventEmmitter](#startscanningeventemmitter)
- [stopScanning](#stopscanning)

#### Constructors

##### constructor

• **new Barkoder**(`barkoderViewRef`): [`Barkoder`](#barkoder-1)

###### Parameters

| Name | Type |
| :------ | :------ |
| `barkoderViewRef` | `RefObject`\<[`BarkoderView`](#barkoder-view)\> |

###### Returns

[`Barkoder`](#barkoder-1)

#### Properties

##### \_barkoderViewRef

• `Private` **\_barkoderViewRef**: `RefObject`\<[`BarkoderView`](#barkoder-view)\>

___

##### \_eventEmitter

• `Private` **\_eventEmitter**: `NativeEventEmitter`

___

##### \_promiseRequestId

• `Private` **\_promiseRequestId**: `number`

___

##### \_promisesMap

• `Private` **\_promisesMap**: `Map`\<`number`, [(`value`: `any`) => `void`, (`error`: ``null`` \| [`BarkoderError`](#barkoder-barkoder-error)) => `void`]\>

___

##### \_resultCallback

• `Private` **\_resultCallback**: `undefined` \| ``null`` \| `ResultCallback`

#### Methods

##### \_dispatchCommand

▸ **_dispatchCommand**(`commandID`, `commandArgs?`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `commandID` | `string` |
| `commandArgs?` | `any`[] |

###### Returns

`void`

___

##### configureBarkoder

▸ **configureBarkoder**(`barkoderConfig`): `Promise`\<`boolean`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `barkoderConfig` | [`BarkoderConfig`](#barkoder-barkoder-config) |

###### Returns

`Promise`\<`boolean`\>

___

##### getBarcodeTypeLengthRange

▸ **getBarcodeTypeLengthRange**(`barcodeType`): `Promise`\<`number`[]\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `barcodeType` | [`BarcodeType`](#barkoder-barcode-type) |

###### Returns

`Promise`\<`number`[]\>

___

##### getBarkoderResolution

▸ **getBarkoderResolution**(): `Promise`\<[`BarkoderResolution`](#barkoder-barkoder-resolution)\>

###### Returns

`Promise`\<[`BarkoderResolution`](#barkoder-barkoder-resolution)\>

___

##### getCode11ChecksumType

▸ **getCode11ChecksumType**(): `Promise`\<[`Code11ChecksumType`](#barkoder-code-11-checksum-type)\>

###### Returns

`Promise`\<[`Code11ChecksumType`](#barkoder-code-11-checksum-type)\>

___

##### getCode39ChecksumType

▸ **getCode39ChecksumType**(): `Promise`\<[`Code39ChecksumType`](#barkoder-code-39-checksum-type)\>

###### Returns

`Promise`\<[`Code39ChecksumType`](#barkoder-code-39-checksum-type)\>

___

##### getDecodingSpeed

▸ **getDecodingSpeed**(): `Promise`\<[`DecodingSpeed`](#barkoder-decoding-speed)\>

###### Returns

`Promise`\<[`DecodingSpeed`](#barkoder-decoding-speed)\>

___

##### getDuplicatesDelayMs

▸ **getDuplicatesDelayMs**(): `Promise`\<`number`\>

###### Returns

`Promise`\<`number`\>

___

##### getEncodingCharacterSet

▸ **getEncodingCharacterSet**(): `Promise`\<`string`\>

###### Returns

`Promise`\<`string`\>

___

##### getFormattingType

▸ **getFormattingType**(): `Promise`\<[`FormattingType`](#barkoder-formatting-type)\>

###### Returns

`Promise`\<[`FormattingType`](#barkoder-formatting-type)\>

___

##### getLocationLineColorHex

▸ **getLocationLineColorHex**(): `Promise`\<`string`\>

###### Returns

`Promise`\<`string`\>

___

##### getLocationLineWidth

▸ **getLocationLineWidth**(): `Promise`\<`number`\>

###### Returns

`Promise`\<`number`\>

___

##### getMaxZoomFactor

▸ **getMaxZoomFactor**(): `Promise`\<`number`\>

###### Returns

`Promise`\<`number`\>

___

##### getMaximumResultsCount

▸ **getMaximumResultsCount**(): `Promise`\<`number`\>

###### Returns

`Promise`\<`number`\>

___

##### getMsiChecksumType

▸ **getMsiChecksumType**(): `Promise`\<[`MsiChecksumType`](#barkoder-msi-checksum-type)\>

###### Returns

`Promise`\<[`MsiChecksumType`](#barkoder-msi-checksum-type)\>

___

##### getMulticodeCachingDuration

▸ **getMulticodeCachingDuration**(): `Promise`\<`number`\>

###### Returns

`Promise`\<`number`\>

___

##### getMulticodeCachingEnabled

▸ **getMulticodeCachingEnabled**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### getRegionOfInterest

▸ **getRegionOfInterest**(): `Promise`\<`number`[]\>

###### Returns

`Promise`\<`number`[]\>

___

##### getRoiLineColorHex

▸ **getRoiLineColorHex**(): `Promise`\<`string`\>

###### Returns

`Promise`\<`string`\>

___

##### getRoiLineWidth

▸ **getRoiLineWidth**(): `Promise`\<`number`\>

###### Returns

`Promise`\<`number`\>

___

##### getRoiOverlayBackgroundColorHex

▸ **getRoiOverlayBackgroundColorHex**(): `Promise`\<`string`\>

###### Returns

`Promise`\<`string`\>

___

##### getThreadsLimit

▸ **getThreadsLimit**(): `Promise`\<`number`\>

###### Returns

`Promise`\<`number`\>

___

##### getThresholdBetweenDuplicatesScans

▸ **getThresholdBetweenDuplicatesScans**(): `Promise`\<`number`\>

###### Returns

`Promise`\<`number`\>

___

##### getVersion

▸ **getVersion**(): `Promise`\<`string`\>

###### Returns

`Promise`\<`string`\>

___

##### isAndroid

▸ **isAndroid**(): `boolean`

###### Returns

`boolean`

___

##### isBarcodeThumbnailOnResultEnabled

▸ **isBarcodeThumbnailOnResultEnabled**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### isBarcodeTypeEnabled

▸ **isBarcodeTypeEnabled**(`barcodeType`): `Promise`\<`boolean`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `barcodeType` | [`BarcodeType`](#barkoder-barcode-type) |

###### Returns

`Promise`\<`boolean`\>

___

##### isBeepOnSuccessEnabled

▸ **isBeepOnSuccessEnabled**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### isCloseSessionOnResultEnabled

▸ **isCloseSessionOnResultEnabled**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### isFlashAvailable

▸ **isFlashAvailable**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### isImageResultEnabled

▸ **isImageResultEnabled**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### isIos

▸ **isIos**(): `boolean`

###### Returns

`boolean`

___

##### isLocationInImageResultEnabled

▸ **isLocationInImageResultEnabled**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### isLocationInPreviewEnabled

▸ **isLocationInPreviewEnabled**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### isPinchToZoomEnabled

▸ **isPinchToZoomEnabled**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### isRegionOfInterestVisible

▸ **isRegionOfInterestVisible**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### isVibrateOnSuccessEnabled

▸ **isVibrateOnSuccessEnabled**(): `Promise`\<`boolean`\>

###### Returns

`Promise`\<`boolean`\>

___

##### onDataReturned

▸ **onDataReturned**(`event`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `any` |

###### Returns

`void`

___

##### pauseScanning

▸ **pauseScanning**(): `void`

###### Returns

`void`

___

##### setBarcodeThumbnailOnResultEnabled

▸ **setBarcodeThumbnailOnResultEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setBarcodeTypeEnabled

▸ **setBarcodeTypeEnabled**(`barcodeType`, `enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `barcodeType` | [`BarcodeType`](#barkoder-barcode-type) |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setBarcodeTypeLengthRange

▸ **setBarcodeTypeLengthRange**(`barcodeType`, `min`, `max`): `Promise`\<`boolean`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `barcodeType` | [`BarcodeType`](#barkoder-barcode-type) |
| `min` | `number` |
| `max` | `number` |

###### Returns

`Promise`\<`boolean`\>

___

##### setBarkoderResolution

▸ **setBarkoderResolution**(`barkoderResolution`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `barkoderResolution` | [`BarkoderResolution`](#barkoder-barkoder-resolution) |

###### Returns

`void`

___

##### setBeepOnSuccessEnabled

▸ **setBeepOnSuccessEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setCloseSessionOnResultEnabled

▸ **setCloseSessionOnResultEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setCode11ChecksumType

▸ **setCode11ChecksumType**(`code11ChecksumType`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `code11ChecksumType` | [`Code11ChecksumType`](#barkoder-code-11-checksum-type) |

###### Returns

`void`

___

##### setCode39ChecksumType

▸ **setCode39ChecksumType**(`code39ChecksumType`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `code39ChecksumType` | [`Code39ChecksumType`](#barkoder-code-39-checksum-type) |

###### Returns

`void`

___

##### setDatamatrixDpmModeEnabled

▸ **setDatamatrixDpmModeEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setDecodingSpeed

▸ **setDecodingSpeed**(`decodingSpeed`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `decodingSpeed` | [`DecodingSpeed`](#barkoder-decoding-speed) |

###### Returns

`void`

___

##### setDuplicatesDelayMs

▸ **setDuplicatesDelayMs**(`duplicatesDelayMs`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `duplicatesDelayMs` | `number` |

###### Returns

`void`

___

##### setEnableMisshaped1DEnabled

▸ **setEnableMisshaped1DEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setEncodingCharacterSet

▸ **setEncodingCharacterSet**(`encodingCharacterSet`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `encodingCharacterSet` | `String` |

###### Returns

`void`

___

##### setFlashEnabled

▸ **setFlashEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setFormattingType

▸ **setFormattingType**(`formatting`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `formatting` | [`FormattingType`](#barkoder-formatting-type) |

###### Returns

`void`

___

##### setImageResultEnabled

▸ **setImageResultEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setLocationInImageResultEnabled

▸ **setLocationInImageResultEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setLocationInPreviewEnabled

▸ **setLocationInPreviewEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setLocationLineColor

▸ **setLocationLineColor**(`hexColor`): `Promise`\<`boolean`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `hexColor` | `String` |

###### Returns

`Promise`\<`boolean`\>

___

##### setLocationLineWidth

▸ **setLocationLineWidth**(`lineWidth`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `lineWidth` | `number` |

###### Returns

`void`

___

##### setMaximumResultsCount

▸ **setMaximumResultsCount**(`maximumResultsCount`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `maximumResultsCount` | `number` |

###### Returns

`void`

___

##### setMsiChecksumType

▸ **setMsiChecksumType**(`msiChecksumType`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `msiChecksumType` | [`MsiChecksumType`](#barkoder-msi-checksum-type) |

###### Returns

`void`

___

##### setMulticodeCachingDuration

▸ **setMulticodeCachingDuration**(`multicodeCachingDuration`): `any`

###### Parameters

| Name | Type |
| :------ | :------ |
| `multicodeCachingDuration` | `number` |

###### Returns

`any`

___

##### setMulticodeCachingEnabled

▸ **setMulticodeCachingEnabled**(`multicodeCachingEnabled`): `any`

###### Parameters

| Name | Type |
| :------ | :------ |
| `multicodeCachingEnabled` | `boolean` |

###### Returns

`any`

___

##### setPinchToZoomEnabled

▸ **setPinchToZoomEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setRegionOfInterest

▸ **setRegionOfInterest**(`left`, `top`, `width`, `height`): `Promise`\<`boolean`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `left` | `number` |
| `top` | `number` |
| `width` | `number` |
| `height` | `number` |

###### Returns

`Promise`\<`boolean`\>

___

##### setRegionOfInterestVisible

▸ **setRegionOfInterestVisible**(`visible`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `visible` | `boolean` |

###### Returns

`void`

___

##### setRoiLineColor

▸ **setRoiLineColor**(`hexColor`): `Promise`\<`boolean`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `hexColor` | `String` |

###### Returns

`Promise`\<`boolean`\>

___

##### setRoiLineWidth

▸ **setRoiLineWidth**(`lineWidth`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `lineWidth` | `number` |

###### Returns

`void`

___

##### setRoiOverlayBackgroundColor

▸ **setRoiOverlayBackgroundColor**(`hexColor`): `Promise`\<`boolean`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `hexColor` | `String` |

###### Returns

`Promise`\<`boolean`\>

___

##### setThreadsLimit

▸ **setThreadsLimit**(`threadsLimit`): `Promise`\<`boolean`\>

###### Parameters

| Name | Type |
| :------ | :------ |
| `threadsLimit` | `number` |

###### Returns

`Promise`\<`boolean`\>

___

##### setThresholdBetweenDuplicatesScans

▸ **setThresholdBetweenDuplicatesScans**(`thresholdBetweenDuplicatesScans`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `thresholdBetweenDuplicatesScans` | `number` |

###### Returns

`void`

___

##### setUpcEanDeblurEnabled

▸ **setUpcEanDeblurEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setVibrateOnSuccessEnabled

▸ **setVibrateOnSuccessEnabled**(`enabled`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

###### Returns

`void`

___

##### setZoomFactor

▸ **setZoomFactor**(`zoomFactor`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `zoomFactor` | `number` |

###### Returns

`void`

___

##### showLogMessages

▸ **showLogMessages**(`show`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `show` | `boolean` |

###### Returns

`void`

___

##### startCamera

▸ **startCamera**(): `void`

###### Returns

`void`

___

##### startScanning

▸ **startScanning**(`resultsCallback`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `resultsCallback` | `ResultCallback` |

###### Returns

`void`

___

##### startScanningEventEmmitter

▸ **startScanningEventEmmitter**(): `void`

###### Returns

`void`

___

##### stopScanning

▸ **stopScanning**(): `void`

###### Returns

`void`

## Barkoder Barcode Config

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / BarcodeConfig

### Class: BarcodeConfig

[Barkoder](#barkoder).BarcodeConfig

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [enabled](#enabled)

##### Methods

- [toMap](#tomap)

#### Constructors

##### constructor

• **new BarcodeConfig**(`config`): [`BarcodeConfig`](#barkoder-barcode-config)

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`BarcodeConfig`](#barkoder-barcode-config)\> |

###### Returns

[`BarcodeConfig`](#barkoder-barcode-config)

#### Properties

##### enabled

• `Optional` **enabled**: `boolean`

#### Methods

##### toMap

▸ **toMap**(): `Object`

###### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `enabled` | `undefined` \| `boolean` |

## Barkoder Barcode Config With Length

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / BarcodeConfigWithLength

### Class: BarcodeConfigWithLength

[Barkoder](#barkoder).BarcodeConfigWithLength

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [enabled](#enabled)
- [maxLength](#maxlength)
- [minLength](#minlength)

##### Methods

- [setLengthRange](#setlengthrange)
- [toMap](#tomap)

#### Constructors

##### constructor

• **new BarcodeConfigWithLength**(`config`): [`BarcodeConfigWithLength`](#barkoder-barcode-config-with-length)

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`BarcodeConfigWithLength`](#barkoder-barcode-config-with-length)\> |

###### Returns

[`BarcodeConfigWithLength`](#barkoder-barcode-config-with-length)

#### Properties

##### enabled

• `Optional` **enabled**: `boolean`

___

##### maxLength

• `Private` `Optional` **maxLength**: `number`

___

##### minLength

• `Private` `Optional` **minLength**: `number`

#### Methods

##### setLengthRange

▸ **setLengthRange**(`minLength`, `maxLength`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `minLength` | `number` |
| `maxLength` | `number` |

###### Returns

`void`

___

##### toMap

▸ **toMap**(): `Object`

###### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `enabled` | `undefined` \| `boolean` |
| `maximumLength` | `undefined` \| `number` |
| `minimumLength` | `undefined` \| `number` |

## Barkoder Barkoder Config

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / BarkoderConfig

### Class: BarkoderConfig

[Barkoder](#barkoder).BarkoderConfig

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [barkoderResolution](#barkoderresolution)
- [beepOnSuccessEnabled](#beeponsuccessenabled)
- [closeSessionOnResultEnabled](#closesessiononresultenabled)
- [decoder](#decoder)
- [imageResultEnabled](#imageresultenabled)
- [locationInImageResultEnabled](#locationinimageresultenabled)
- [locationInPreviewEnabled](#locationinpreviewenabled)
- [locationLineColor](#locationlinecolor)
- [locationLineWidth](#locationlinewidth)
- [pinchToZoomEnabled](#pinchtozoomenabled)
- [regionOfInterestVisible](#regionofinterestvisible)
- [roiLineColor](#roilinecolor)
- [roiLineWidth](#roilinewidth)
- [roiOverlayBackgroundColor](#roioverlaybackgroundcolor)
- [vibrateOnSuccessEnabled](#vibrateonsuccessenabled)

##### Methods

- [toJsonString](#tojsonstring)

#### Constructors

##### constructor

• **new BarkoderConfig**(`config`): [`BarkoderConfig`](#barkoder-barkoder-config)

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`BarkoderConfig`](#barkoder-barkoder-config)\> |

###### Returns

[`BarkoderConfig`](#barkoder-barkoder-config)

#### Properties

##### barkoderResolution

• `Optional` **barkoderResolution**: [`BarkoderResolution`](#barkoder-barkoder-resolution)

___

##### beepOnSuccessEnabled

• `Optional` **beepOnSuccessEnabled**: `boolean`

___

##### closeSessionOnResultEnabled

• `Optional` **closeSessionOnResultEnabled**: `boolean`

___

##### decoder

• `Optional` **decoder**: [`DekoderConfig`](#barkoder-dekoder-config)

___

##### imageResultEnabled

• `Optional` **imageResultEnabled**: `boolean`

___

##### locationInImageResultEnabled

• `Optional` **locationInImageResultEnabled**: `boolean`

___

##### locationInPreviewEnabled

• `Optional` **locationInPreviewEnabled**: `boolean`

___

##### locationLineColor

• `Optional` **locationLineColor**: `string`

___

##### locationLineWidth

• `Optional` **locationLineWidth**: `number`

___

##### pinchToZoomEnabled

• `Optional` **pinchToZoomEnabled**: `boolean`

___

##### regionOfInterestVisible

• `Optional` **regionOfInterestVisible**: `boolean`

___

##### roiLineColor

• `Optional` **roiLineColor**: `string`

___

##### roiLineWidth

• `Optional` **roiLineWidth**: `number`

___

##### roiOverlayBackgroundColor

• `Optional` **roiOverlayBackgroundColor**: `string`

___

##### vibrateOnSuccessEnabled

• `Optional` **vibrateOnSuccessEnabled**: `boolean`

#### Methods

##### toJsonString

▸ **toJsonString**(): `string`

###### Returns

`string`

## Barkoder Barkoder Error

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / BarkoderError

### Class: BarkoderError

[Barkoder](#barkoder).BarkoderError

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [code](#code)
- [message](#message)

#### Constructors

##### constructor

• **new BarkoderError**(`jsonString`): [`BarkoderError`](#barkoder-barkoder-error)

###### Parameters

| Name | Type |
| :------ | :------ |
| `jsonString` | `string` |

###### Returns

[`BarkoderError`](#barkoder-barkoder-error)

#### Properties

##### code

• **code**: `string`

___

##### message

• **message**: `string`

## Barkoder Barkoder Result

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / BarkoderResult

### Class: BarkoderResult

[Barkoder](#barkoder).BarkoderResult

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [barcodeType](#barcodetype)
- [barcodeTypeName](#barcodetypename)
- [binaryDataAsBase64](#binarydataasbase64)
- [characterSet](#characterset)
- [extra](#extra)
- [resultImageAsBase64](#resultimageasbase64)
- [textualData](#textualdata)

#### Constructors

##### constructor

• **new BarkoderResult**(`jsonString`): [`BarkoderResult`](#barkoder-barkoder-result)

###### Parameters

| Name | Type |
| :------ | :------ |
| `jsonString` | `string` |

###### Returns

[`BarkoderResult`](#barkoder-barkoder-result)

#### Properties

##### barcodeType

• **barcodeType**: [`BarcodeType`](#barkoder-barcode-type)

___

##### barcodeTypeName

• **barcodeTypeName**: `string`

___

##### binaryDataAsBase64

• **binaryDataAsBase64**: `string`

___

##### characterSet

• `Optional` **characterSet**: ``null`` \| `string`

___

##### extra

• `Optional` **extra**: ``null`` \| `Record`\<`string`, `any`\>

___

##### resultImageAsBase64

• `Optional` **resultImageAsBase64**: ``null`` \| `string`

___

##### textualData

• **textualData**: `string`

## Barkoder Code 11 Barcode Config

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / Code11BarcodeConfig

### Class: Code11BarcodeConfig

[Barkoder](#barkoder).Code11BarcodeConfig

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [checksum](#checksum)
- [enabled](#enabled)
- [maxLength](#maxlength)
- [minLength](#minlength)

##### Methods

- [setLengthRange](#setlengthrange)
- [toMap](#tomap)

#### Constructors

##### constructor

• **new Code11BarcodeConfig**(`config`): [`Code11BarcodeConfig`](#barkoder-code-11-barcode-config)

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`Code11BarcodeConfig`](#barkoder-code-11-barcode-config)\> |

###### Returns

[`Code11BarcodeConfig`](#barkoder-code-11-barcode-config)

#### Properties

##### checksum

• `Optional` **checksum**: [`Code11ChecksumType`](#barkoder-code-11-checksum-type)

___

##### enabled

• `Optional` **enabled**: `boolean`

___

##### maxLength

• `Private` `Optional` **maxLength**: `number`

___

##### minLength

• `Private` `Optional` **minLength**: `number`

#### Methods

##### setLengthRange

▸ **setLengthRange**(`minLength`, `maxLength`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `minLength` | `number` |
| `maxLength` | `number` |

###### Returns

`void`

___

##### toMap

▸ **toMap**(): `Object`

###### Returns

`Object`

## Barkoder Code 39 Barcode Config

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / Code39BarcodeConfig

### Class: Code39BarcodeConfig

[Barkoder](#barkoder).Code39BarcodeConfig

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [checksum](#checksum)
- [enabled](#enabled)
- [maxLength](#maxlength)
- [minLength](#minlength)

##### Methods

- [setLengthRange](#setlengthrange)
- [toMap](#tomap)

#### Constructors

##### constructor

• **new Code39BarcodeConfig**(`config`): [`Code39BarcodeConfig`](#barkoder-code-39-barcode-config)

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`Code39BarcodeConfig`](#barkoder-code-39-barcode-config)\> |

###### Returns

[`Code39BarcodeConfig`](#barkoder-code-39-barcode-config)

#### Properties

##### checksum

• `Optional` **checksum**: [`Code39ChecksumType`](#barkoder-code-39-checksum-type)

___

##### enabled

• `Optional` **enabled**: `boolean`

___

##### maxLength

• `Private` `Optional` **maxLength**: `number`

___

##### minLength

• `Private` `Optional` **minLength**: `number`

#### Methods

##### setLengthRange

▸ **setLengthRange**(`minLength`, `maxLength`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `minLength` | `number` |
| `maxLength` | `number` |

###### Returns

`void`

___

##### toMap

▸ **toMap**(): `Object`

###### Returns

`Object`

## Barkoder Datamatrix Barcode Config

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / DatamatrixBarcodeConfig

### Class: DatamatrixBarcodeConfig

[Barkoder](#barkoder).DatamatrixBarcodeConfig

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [dpmMode](#dpmmode)
- [enabled](#enabled)
- [maxLength](#maxlength)
- [minLength](#minlength)

##### Methods

- [setLengthRange](#setlengthrange)
- [toMap](#tomap)

#### Constructors

##### constructor

• **new DatamatrixBarcodeConfig**(`config`): [`DatamatrixBarcodeConfig`](#barkoder-datamatrix-barcode-config)

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`DatamatrixBarcodeConfig`](#barkoder-datamatrix-barcode-config)\> |

###### Returns

[`DatamatrixBarcodeConfig`](#barkoder-datamatrix-barcode-config)

#### Properties

##### dpmMode

• `Optional` **dpmMode**: `number`

___

##### enabled

• `Optional` **enabled**: `boolean`

___

##### maxLength

• `Private` `Optional` **maxLength**: `number`

___

##### minLength

• `Private` `Optional` **minLength**: `number`

#### Methods

##### setLengthRange

▸ **setLengthRange**(`minLength`, `maxLength`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `minLength` | `number` |
| `maxLength` | `number` |

###### Returns

`void`

___

##### toMap

▸ **toMap**(): `Object`

###### Returns

`Object`

## Barkoder Dekoder Config

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / DekoderConfig

### Class: DekoderConfig

[Barkoder](#barkoder).DekoderConfig

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [aztec](#aztec)
- [aztecCompact](#azteccompact)
- [codabar](#codabar)
- [code11](#code11)
- [code128](#code128)
- [code25](#code25)
- [code32](#code32)
- [code39](#code39)
- [code93](#code93)
- [coop25](#coop25)
- [datalogic25](#datalogic25)
- [datamatrix](#datamatrix)
- [dotcode](#dotcode)
- [ean13](#ean13)
- [ean8](#ean8)
- [general](#general)
- [iata25](#iata25)
- [interleaved25](#interleaved25)
- [itf14](#itf14)
- [matrix25](#matrix25)
- [msi](#msi)
- [pdf417](#pdf417)
- [pdf417Micro](#pdf417micro)
- [qr](#qr)
- [qrMicro](#qrmicro)
- [telepen](#telepen)
- [upcA](#upca)
- [upcE](#upce)
- [upcE1](#upce1)

##### Methods

- [toMap](#tomap)

#### Constructors

##### constructor

• **new DekoderConfig**(`config`): [`DekoderConfig`](#barkoder-dekoder-config)

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`DekoderConfig`](#barkoder-dekoder-config)\> |

###### Returns

[`DekoderConfig`](#barkoder-dekoder-config)

#### Properties

##### aztec

• `Optional` **aztec**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### aztecCompact

• `Optional` **aztecCompact**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### codabar

• `Optional` **codabar**: [`BarcodeConfigWithLength`](#barkoder-barcode-config-with-length)

___

##### code11

• `Optional` **code11**: [`Code11BarcodeConfig`](#barkoder-code-11-barcode-config)

___

##### code128

• `Optional` **code128**: [`BarcodeConfigWithLength`](#barkoder-barcode-config-with-length)

___

##### code25

• `Optional` **code25**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### code32

• `Optional` **code32**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### code39

• `Optional` **code39**: [`Code39BarcodeConfig`](#barkoder-code-39-barcode-config)

___

##### code93

• `Optional` **code93**: [`BarcodeConfigWithLength`](#barkoder-barcode-config-with-length)

___

##### coop25

• `Optional` **coop25**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### datalogic25

• `Optional` **datalogic25**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### datamatrix

• `Optional` **datamatrix**: [`DatamatrixBarcodeConfig`](#barkoder-datamatrix-barcode-config)

___

##### dotcode

• `Optional` **dotcode**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### ean13

• `Optional` **ean13**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### ean8

• `Optional` **ean8**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### general

• `Optional` **general**: [`GeneralSettings`](#barkoder-general-settings)

___

##### iata25

• `Optional` **iata25**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### interleaved25

• `Optional` **interleaved25**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### itf14

• `Optional` **itf14**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### matrix25

• `Optional` **matrix25**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### msi

• `Optional` **msi**: [`MSIBarcodeConfig`](#barkoder-msi-barcode-config)

___

##### pdf417

• `Optional` **pdf417**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### pdf417Micro

• `Optional` **pdf417Micro**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### qr

• `Optional` **qr**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### qrMicro

• `Optional` **qrMicro**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### telepen

• `Optional` **telepen**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### upcA

• `Optional` **upcA**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### upcE

• `Optional` **upcE**: [`BarcodeConfig`](#barkoder-barcode-config)

___

##### upcE1

• `Optional` **upcE1**: [`BarcodeConfig`](#barkoder-barcode-config)

#### Methods

##### toMap

▸ **toMap**(): `Object`

###### Returns

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

## Barkoder General Settings

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / GeneralSettings

### Class: GeneralSettings

[Barkoder](#barkoder).GeneralSettings

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [decodingSpeed](#decodingspeed)
- [enableMisshaped1D](#enablemisshaped1d)
- [encodingCharacterSet](#encodingcharacterset)
- [formattingType](#formattingtype)
- [roiHeight](#roiheight)
- [roiWidth](#roiwidth)
- [roiX](#roix)
- [roiY](#roiy)
- [threadsLimit](#threadslimit)
- [upcEanDeblur](#upceandeblur)

##### Methods

- [setROI](#setroi)
- [toMap](#tomap)

#### Constructors

##### constructor

• **new GeneralSettings**(`config`): [`GeneralSettings`](#barkoder-general-settings)

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`GeneralSettings`](#barkoder-general-settings)\> |

###### Returns

[`GeneralSettings`](#barkoder-general-settings)

#### Properties

##### decodingSpeed

• `Optional` **decodingSpeed**: [`DecodingSpeed`](#barkoder-decoding-speed)

___

##### enableMisshaped1D

• `Optional` **enableMisshaped1D**: `number`

___

##### encodingCharacterSet

• `Optional` **encodingCharacterSet**: `string`

___

##### formattingType

• `Optional` **formattingType**: [`FormattingType`](#barkoder-formatting-type)

___

##### roiHeight

• `Optional` **roiHeight**: `number`

___

##### roiWidth

• `Optional` **roiWidth**: `number`

___

##### roiX

• `Optional` **roiX**: `number`

___

##### roiY

• `Optional` **roiY**: `number`

___

##### threadsLimit

• `Optional` **threadsLimit**: `number`

___

##### upcEanDeblur

• `Optional` **upcEanDeblur**: `number`

#### Methods

##### setROI

▸ **setROI**(`x`, `y`, `width`, `height`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |

###### Returns

`void`

___

##### toMap

▸ **toMap**(): `Object`

###### Returns

`Object`

## Barkoder MSI Barcode Config

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / MSIBarcodeConfig

### Class: MSIBarcodeConfig

[Barkoder](#barkoder).MSIBarcodeConfig

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [checksum](#checksum)
- [enabled](#enabled)
- [maxLength](#maxlength)
- [minLength](#minlength)

##### Methods

- [setLengthRange](#setlengthrange)
- [toMap](#tomap)

#### Constructors

##### constructor

• **new MSIBarcodeConfig**(`config`): [`MSIBarcodeConfig`](#barkoder-msi-barcode-config)

###### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Partial`\<[`MSIBarcodeConfig`](#barkoder-msi-barcode-config)\> |

###### Returns

[`MSIBarcodeConfig`](#barkoder-msi-barcode-config)

#### Properties

##### checksum

• `Optional` **checksum**: [`MsiChecksumType`](#barkoder-msi-checksum-type)

___

##### enabled

• `Optional` **enabled**: `boolean`

___

##### maxLength

• `Private` `Optional` **maxLength**: `number`

___

##### minLength

• `Private` `Optional` **minLength**: `number`

#### Methods

##### setLengthRange

▸ **setLengthRange**(`minLength`, `maxLength`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `minLength` | `number` |
| `maxLength` | `number` |

###### Returns

`void`

___

##### toMap

▸ **toMap**(): `Object`

###### Returns

`Object`

## Barkoder View

[barkoder-react-native](#readme) / [Exports](#modules) / BarkoderView

### Class: BarkoderView

#### Hierarchy

- `Component`\<`BarkoderReactNativeProps`\>

  ↳ **`BarkoderView`**

#### Table of contents

##### Constructors

- [constructor](#constructor)

##### Properties

- [\_barkoder](#_barkoder)
- [\_eventEmitter](#_eventemitter)
- [\_myRef](#_myref)

##### Methods

- [\_onBarkoderConfigCreated](#_onbarkoderconfigcreated)
- [\_onDataReturned](#_ondatareturned)
- [render](#render)
- [startConfigurationEmitter](#startconfigurationemitter)

#### Constructors

##### constructor

• **new BarkoderView**(`props`): [`BarkoderView`](#barkoder-view)

###### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `BarkoderReactNativeProps` |

###### Returns

[`BarkoderView`](#barkoder-view)

###### Overrides

React.Component\&lt;BarkoderReactNativeProps\&gt;.constructor

#### Properties

##### \_barkoder

• `Private` **\_barkoder**: [`Barkoder`](#barkoder-1)

___

##### \_eventEmitter

• `Private` **\_eventEmitter**: `NativeEventEmitter`

___

##### \_myRef

• `Private` **\_myRef**: `RefObject`\<[`BarkoderView`](#barkoder-view)\>

#### Methods

##### \_onBarkoderConfigCreated

▸ **_onBarkoderConfigCreated**(`_event`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `_event` | `any` |

###### Returns

`void`

___

##### \_onDataReturned

▸ **_onDataReturned**(`event`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `any` |

###### Returns

`void`

___

##### render

▸ **render**(): `Element`

###### Returns

`Element`

###### Overrides

React.Component.render

___

##### startConfigurationEmitter

▸ **startConfigurationEmitter**(): `void`

###### Returns

`void`

# Enums

## Barkoder Barcode Type

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / BarcodeType

### Enumeration: BarcodeType

[Barkoder](#barkoder).BarcodeType

#### Table of contents

##### Enumeration Members

- [aztec](#aztec)
- [aztecCompact](#azteccompact)
- [codabar](#codabar)
- [code11](#code11)
- [code128](#code128)
- [code25](#code25)
- [code32](#code32)
- [code39](#code39)
- [code93](#code93)
- [coop25](#coop25)
- [datalogic25](#datalogic25)
- [datamatrix](#datamatrix)
- [dotcode](#dotcode)
- [ean13](#ean13)
- [ean8](#ean8)
- [iata25](#iata25)
- [interleaved25](#interleaved25)
- [itf14](#itf14)
- [matrix25](#matrix25)
- [msi](#msi)
- [pdf417](#pdf417)
- [pdf417Micro](#pdf417micro)
- [qr](#qr)
- [qrMicro](#qrmicro)
- [telepen](#telepen)
- [upcA](#upca)
- [upcE](#upce)
- [upcE1](#upce1)

#### Enumeration Members

##### aztec

• **aztec** = ``0``

___

##### aztecCompact

• **aztecCompact** = ``1``

___

##### codabar

• **codabar** = ``7``

___

##### code11

• **code11** = ``8``

___

##### code128

• **code128** = ``4``

___

##### code25

• **code25** = ``18``

___

##### code32

• **code32** = ``25``

___

##### code39

• **code39** = ``6``

___

##### code93

• **code93** = ``5``

___

##### coop25

• **coop25** = ``24``

___

##### datalogic25

• **datalogic25** = ``23``

___

##### datamatrix

• **datamatrix** = ``17``

___

##### dotcode

• **dotcode** = ``27``

___

##### ean13

• **ean13** = ``13``

___

##### ean8

• **ean8** = ``14``

___

##### iata25

• **iata25** = ``21``

___

##### interleaved25

• **interleaved25** = ``19``

___

##### itf14

• **itf14** = ``20``

___

##### matrix25

• **matrix25** = ``22``

___

##### msi

• **msi** = ``9``

___

##### pdf417

• **pdf417** = ``15``

___

##### pdf417Micro

• **pdf417Micro** = ``16``

___

##### qr

• **qr** = ``2``

___

##### qrMicro

• **qrMicro** = ``3``

___

##### telepen

• **telepen** = ``26``

___

##### upcA

• **upcA** = ``10``

___

##### upcE

• **upcE** = ``11``

___

##### upcE1

• **upcE1** = ``12``

## Barkoder Barkoder Resolution

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / BarkoderResolution

### Enumeration: BarkoderResolution

[Barkoder](#barkoder).BarkoderResolution

#### Table of contents

##### Enumeration Members

- [high](#high)
- [normal](#normal)

#### Enumeration Members

##### high

• **high** = ``1``

___

##### normal

• **normal** = ``0``

## Barkoder Code 11 Checksum Type

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / Code11ChecksumType

### Enumeration: Code11ChecksumType

[Barkoder](#barkoder).Code11ChecksumType

#### Table of contents

##### Enumeration Members

- [disabled](#disabled)
- [double](#double)
- [single](#single)

#### Enumeration Members

##### disabled

• **disabled** = ``0``

___

##### double

• **double** = ``2``

___

##### single

• **single** = ``1``

## Barkoder Code 39 Checksum Type

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / Code39ChecksumType

### Enumeration: Code39ChecksumType

[Barkoder](#barkoder).Code39ChecksumType

#### Table of contents

##### Enumeration Members

- [disabled](#disabled)
- [enabled](#enabled)

#### Enumeration Members

##### disabled

• **disabled** = ``0``

___

##### enabled

• **enabled** = ``1``

## Barkoder Decoding Speed

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / DecodingSpeed

### Enumeration: DecodingSpeed

[Barkoder](#barkoder).DecodingSpeed

#### Table of contents

##### Enumeration Members

- [fast](#fast)
- [normal](#normal)
- [slow](#slow)

#### Enumeration Members

##### fast

• **fast** = ``0``

___

##### normal

• **normal** = ``1``

___

##### slow

• **slow** = ``2``

## Barkoder Formatting Type

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / FormattingType

### Enumeration: FormattingType

[Barkoder](#barkoder).FormattingType

#### Table of contents

##### Enumeration Members

- [aamva](#aamva)
- [automatic](#automatic)
- [disabled](#disabled)
- [gs1](#gs1)

#### Enumeration Members

##### aamva

• **aamva** = ``3``

___

##### automatic

• **automatic** = ``1``

___

##### disabled

• **disabled** = ``0``

___

##### gs1

• **gs1** = ``2``

## Barkoder Msi Checksum Type

[barkoder-react-native](#readme) / [Exports](#modules) / [Barkoder](#barkoder) / MsiChecksumType

### Enumeration: MsiChecksumType

[Barkoder](#barkoder).MsiChecksumType

#### Table of contents

##### Enumeration Members

- [disabled](#disabled)
- [mod10](#mod10)
- [mod1010](#mod1010)
- [mod11](#mod11)
- [mod1110](#mod1110)
- [mod1110IBM](#mod1110ibm)
- [mod11IBM](#mod11ibm)

#### Enumeration Members

##### disabled

• **disabled** = ``0``

___

##### mod10

• **mod10** = ``1``

___

##### mod1010

• **mod1010** = ``3``

___

##### mod11

• **mod11** = ``2``

___

##### mod1110

• **mod1110** = ``4``

___

##### mod1110IBM

• **mod1110IBM** = ``6``

___

##### mod11IBM

• **mod11IBM** = ``5``

# Modules

[barkoder-react-native](#readme) / Exports

## barkoder-react-native

### Table of contents

#### Namespaces

- [Barkoder](#barkoder)

#### Classes

- [Barkoder](#barkoder-1)
- [BarkoderView](#barkoder-view)

# Modules

## Barkoder

[barkoder-react-native](#readme) / [Exports](#modules) / Barkoder

### Namespace: Barkoder

#### Table of contents

##### Enumerations

- [BarcodeType](#barkoder-barcode-type)
- [BarkoderResolution](#barkoder-barkoder-resolution)
- [Code11ChecksumType](#barkoder-code-11-checksum-type)
- [Code39ChecksumType](#barkoder-code-39-checksum-type)
- [DecodingSpeed](#barkoder-decoding-speed)
- [FormattingType](#barkoder-formatting-type)
- [MsiChecksumType](#barkoder-msi-checksum-type)

##### Classes

- [BarcodeConfig](#barkoder-barcode-config)
- [BarcodeConfigWithLength](#barkoder-barcode-config-with-length)
- [BarkoderConfig](#barkoder-barkoder-config)
- [BarkoderError](#barkoder-barkoder-error)
- [BarkoderResult](#barkoder-barkoder-result)
- [Code11BarcodeConfig](#barkoder-code-11-barcode-config)
- [Code39BarcodeConfig](#barkoder-code-39-barcode-config)
- [DatamatrixBarcodeConfig](#barkoder-datamatrix-barcode-config)
- [DekoderConfig](#barkoder-dekoder-config)
- [GeneralSettings](#barkoder-general-settings)
- [MSIBarcodeConfig](#barkoder-msi-barcode-config)
