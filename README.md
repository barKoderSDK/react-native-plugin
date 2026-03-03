# barKoder Barcode Scanner SDK for React Native

## Add an enterprise-grade barcode scanning engine in your React Native app 

Integrating the [barKoder Barcode Scanner SDK](https://barkoder.com) into your Enterprise or Consumer-facing mobile apps will instantly transform your user's smarphones and tablets into rugged barcode scanning devices without the need to procure and maintain expensive and sluggish hardware devices that have a very short life span.

barKoder is a cutting-edge data capture solution built for modern enterprise use cases — delivering AI-powered computer vision, ultra-fast recognition, and industry-leading performance even in the most challenging real-world conditions.

---------------------------------------------
## Why barKoder?

barKoder is a production-ready scanning engine trusted across industries such as:
 - Logistics & Supply Chain
 - Manufacturing & Direct Part Marking (DPM)
 - Retail & Self-Checkout
 - Automotive & VIN Capture
 - Identity Verification (MRZ + OCR)

### Key capabilities include:

- Proprietary CV-based decoding algorithms
- Batch MultiScan (scan multiple barcodes at once)
- Advanced DPM Data Matrix & QR Code mode
- OCR-based MRZ & VIN scanning support
- Augmented Reality (AR) barcode overlays
- Offline scanning — no cloud dependency
- Cross-platform SDK family (iOS, Android, Web, React Native, Flutter, MAUI, Capacitor, Cordova and Native Script)

--------------------------------------
## Supported Barcode Symbologies

barKoder supports 30+ symbologies including:

1D - [Codabar](https://barkoder.com/barcode-types/codabar), [Code 11](https://barkoder.com/barcode-types/code-11), [Code 25](https://barkoder.com/barcode-types/code-25), [Code 32](https://barkoder.com/barcode-types/code-32), [Code 39](https://barkoder.com/barcode-types/code-39), [Code 93](https://barkoder.com/barcode-types/code-93), [Code 128](https://barkoder.com/barcode-types/code-128), [DataBar](https://barkoder.com/barcode-types/databar),  [EAN-8](https://barkoder.com/barcode-types/ean-upc-code), [EAN-13](https://barkoder.com/barcode-types/ean-upc-code), [GS1 Composite](https://barkoder.com/barcode-types/gs1-composite), [Interleaved 2 of 5](https://barkoder.com/barcode-types/code-25), [ITF-14](https://barkoder.com/barcode-types/code-25), [MSI Plessey](https://barkoder.com/barcode-types/msi-plessey), [Postal Barcodes](https://barkoder.com/barcode-types/postal-barcodes), [Telepen](https://barkoder.com/barcode-types/telepen), [UPC-A](https://barkoder.com/barcode-types/ean-upc-code) & [UPC-E](https://barkoder.com/barcode-types/ean-upc-code)

2D - [Aztec Code](https://barkoder.com/barcode-types/aztec), [Aztec Compact](https://barkoder.com/barcode-types/aztec), [Data Matrix](https://barkoder.com/barcode-types/data-matrix), [PDF417](https://barkoder.com/barcode-types/pdf417), [MaxiCode](https://barkoder.com/barcode-types/maxicode), [Micro PDF417](https://barkoder.com/barcode-types/pdf417), [DotCode](https://barkoder.com/barcode-types/dotcode), [QR Code](https://barkoder.com/barcode-types/qr-code) & [Micro QR Code](https://barkoder.com/barcode-types/qr-code)

-----------------------------------------
## Demo Apps

Try barKoder in action:

iOS Demo App:
https://apps.apple.com/us/app/barkoder-scanner/id6443715409

Android Demo App:
https://play.google.com/store/apps/details?id=com.barkoder.demoscanner

------------------------------------------
## Official React Native Documentation

The React Native SDK is fully documented here:

Installation Guide

https://barkoder.com/docs/v1/react-native/react-native-installation

General example

https://barkoder.com/docs/v1/react-native/react-native-examples/general-example

React Native API Reference

https://barkoder.com/docs/v1/react-native/react-native-api-reference

React Native Examples

https://barkoder.com/docs/v1/react-native/react-native-examples

----------------------------------
## Trial License

If you run the barKoder Barcode Scanner SDK without a valid trial or production license, all results upon successful barcode scans will be partially masked by asterisks (*). You can get a trial license simply by [registering on the barKoder Portal](https://barkoder.com/register) and utilizing the self-service for Evaluation License Generation! Each trial license will be good for an initial duration of 30 days and can be deployed to up to 25 devices. For any custom requirements, contact our sales team via sales@barkoder.com

Note that a trial license is only supposed to be utilized in a development or staging environment. IF you decide to publish a trial license along with your app to the App Store, Play Store or any public store we won't be held accountable for any potential consequences. 

------------------------------

## Free Developer Support

Our support is completely free for integration or testing purposes and granted through the [barKoder Developer Portal](https://barkoder.com/register). After registering and logging into your account, you only need to submit a Support Issue. Alternatively, you can contact us by email via support@barkoder.com

---------------------------------------

### How to use barkoder-react-native package in your project

#### 1. Prepare environment
Install the dependencies and [setup your environment](https://reactnative.dev/docs/environment-setup)

#### 2. Add our barkoder-react-native package
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

#### 3. Import package
Import the **barkoder-react-native** package in your project with:
   ``` 
    import { Barkoder, BarkoderView } from 'barkoder-react-native';
   ```
#### 4. BarkoderView
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
#### 5. Ready to Scan Event
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
#### 6. Camera permissions
Our SDK requires camera permission to be granted in order to use scanning features. For Android, the permission is set in the manifest from the package. For iOS you need to specify camera permission in **Info.plist** file inside your project
   ``` 
    <key>NSCameraUsageDescription</key>
 	 <string>Camera permission</string>
   ```