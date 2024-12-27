# barKoder Barcode Scanner SDK for React Native 

### Add an enterprise-grade barcode scanning engine in your React Native app 

The barKoder SDK React Native plugin grants an easy to use React Native solution with a great interface that can be integrated in both iOS and Android apps.

Integrating the [barKoder Barcode Scanner SDK](https://barkoder.com/barcode-scanner-sdk) into your Enterprise or Consumer-facing mobile apps will instantly transform your user's smarphones and tablets into rugged barcode scanning devices without the need to procure and maintain expensive and sluggish hardware devices that have a very short life span.

The barKoder barcode scanner SDK is a relatively new product in an established market, already developed to be as advanced if not more than other competitor API's. Its robust barcode reading engine can be used to read the content of the most widely used barcodes with lightning fast speed and unprecended recognition rate: 

1D - [Codabar](https://barkoder.com/barcode-types/codaba), [Code 11](https://barkoder.com/barcode-types/code-11), [Code 25](https://barkoder.com/barcode-types/code-25), [Code 39](https://barkoder.com/barcode-types/code-39), [Code 93](https://barkoder.com/barcode-types/code-93), [Code 128](https://barkoder.com/barcode-types/code-128), [EAN-8](https://barkoder.com/barcode-types/ean-upc-code), [EAN-13](https://barkoder.com/barcode-types/ean-upc-code), [Interleaved 2 of 5](https://barkoder.com/barcode-types/code-25), [ITF-14](https://barkoder.com/barcode-types/code-25), [MSI Plessey](https://barkoder.com/barcode-types/msi-plessey), Pharmacode, [Telepen](https://barkoder.com/barcode-types/telepen), [UPC-A](https://barkoder.com/barcode-types/ean-upc-code) & [UPC-E](https://barkoder.com/barcode-types/ean-upc-code)

2D - [Aztec Code](https://barkoder.com/barcode-types/aztec), [Aztec Compact](https://barkoder.com/barcode-types/aztec), [Data Matrix](https://barkoder.com/barcode-types/data-matrix), [PDF417](https://barkoder.com/barcode-types/pdf417), [Micro PDF417](https://barkoder.com/barcode-types/pdf417), [DotCode](https://barkoder.com/barcode-types/dotcode), [QR Code](https://barkoder.com/barcode-types/qr-code) & [Micro QR Code](https://barkoder.com/barcode-types/qr-code)


You can check out our free demo app Barcode Scanner by barKoder available both via [Apple App Store](https://apps.apple.com/us/app/barkoder-scanner/id6443715409?uo=2) & [Google Play Store](https://play.google.com/store/apps/details?id=com.barkoder.demoscanner).

### Documentation

You can find full documentation about the barKoder Barcode Reader SDK plugin for React Native here: https://docs.barkoder.com/en/v1/react-installation

### Trial License

If you run the barKoder Barcode Scanner SDK without a valid trial or production license, all results upon successful barcode scans will be partially masked by asterisks (*). You can get a trial license simply by [registering on the barKoder Portal](https://barkoder.com/register) and utilizing the self-service for [Evaluation License Generation](https://barkoder.com/spr/new)! Each trial license will be good for an initial duration of 30 days and can be deployed to up to 50 devices. For any custom requirements, contact our sales team via sales@barkoder.com

Note that a trial license is only supposed to be utilized in a development or staging environment. IF you decide to publish a trial license along with your app to the App Store, Play Store or any public store we won't be held accountable for any potential consequences. 

### Free Developer Support

Our support is completely free for integration or testing purposes and granted through the [barKoder Developer Portal](https://barkoder.com/login). After registering and logging into your account, you only need to submit a [Support Issue](https://barkoder.com/issues). Alternatively, you can contact us by email via support@barkoder.com

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
