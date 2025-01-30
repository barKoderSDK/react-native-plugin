import React from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
  findNodeHandle,
  NativeModules,
  NativeEventEmitter
} from 'react-native';

interface BarkoderViewCreated {
  (barkoder: Barkoder): void;
}
interface DataReturned {
  (event: any): void;
}

interface BarkoderConfigCreated {
  (event: any): void;
}

type BarkoderReactNativeProps = {
  licenseKey: string;
  style: ViewStyle;
  onBarkoderViewCreated: BarkoderViewCreated;
  ref?: React.RefObject<BarkoderView>; //users shouldn't set this
  onDataReturned?: DataReturned; //users shouldn't set this
  onBarkoderConfigCreated?: BarkoderConfigCreated; //users shouldn't set this
};

const LINKING_ERROR =
  `The package 'barkoder-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const OS_NOT_SUPPORTED = 'OS is not supported!';

const BARKODER_RESULT_EVENT_NAME = 'BarkoderResultEvent';
const BARKODER_CONFIG_EVENT_NAME = 'BarkoderConfigEvent';

const ComponentName = 'BarkoderReactNativeView';

const BarkoderReactNativeView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<BarkoderReactNativeProps>(ComponentName)
    : () => {
      throw new Error(LINKING_ERROR);
    };

/**
 * Initializes a new instance of the BarkoderView class.
 */
export class BarkoderView extends React.Component<BarkoderReactNativeProps> {
  private _myRef = React.createRef<BarkoderView>();
  private _barkoder = new Barkoder(this._myRef);
  private _eventEmitter = new NativeEventEmitter(NativeModules.BarkoderEmitter);

  constructor(props: BarkoderReactNativeProps) {
    super(props);

    if (Platform.OS === 'ios')
      this.startConfigurationEmitter();
    else {
      this._onDataReturned = this._onDataReturned.bind(this);
      this._onBarkoderConfigCreated = this._onBarkoderConfigCreated.bind(this);
    }
  }

  private startConfigurationEmitter() {
    this._eventEmitter.addListener(BARKODER_CONFIG_EVENT_NAME, () => {
      this._eventEmitter.removeAllListeners(BARKODER_CONFIG_EVENT_NAME);

      this.props.onBarkoderViewCreated(this._barkoder);
    });
  }

  private _onDataReturned(event: any) {
    this._barkoder.onDataReturned(event);
  }

  private _onBarkoderConfigCreated(_event: any) {
    this.props.onBarkoderViewCreated(this._barkoder);
  }

  render() {
    return (
      <BarkoderReactNativeView
        ref={this._myRef}
        licenseKey={this.props.licenseKey}
        style={this.props.style}
        onBarkoderViewCreated={this.props.onBarkoderViewCreated}
        onDataReturned={this._onDataReturned}
        onBarkoderConfigCreated={this._onBarkoderConfigCreated}
      />
    );
  }
}

interface ResultCallback { (result: Barkoder.BarkoderResult): void }

type BarkoderDataReturnedNativeEvent = {
  promiseRequestId: number;
  payload: any;
  error: string | undefined;
};

export class Barkoder {
  private _barkoderViewRef: React.RefObject<BarkoderView>;
  private _promisesMap: Map<
    number,
    [(value: any) => void, (error: Barkoder.BarkoderError | null) => void]
  >;
  private _promiseRequestId: number;
  private _resultCallback: ResultCallback | undefined | null;
  private _eventEmitter: NativeEventEmitter;

  constructor(barkoderViewRef: React.RefObject<BarkoderView>) {
    this._barkoderViewRef = barkoderViewRef;
    this._promisesMap = new Map();
    this._promiseRequestId = 0;
    this._eventEmitter = new NativeEventEmitter(NativeModules.BarkoderEmitter);
  }

  private _dispatchCommand(commandID: string, commandArgs?: Array<any>) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this._barkoderViewRef.current),
      commandID,
      commandArgs
    );
  }

  // Used only for Android
  onDataReturned(event: any) {
    let nativeEvent: BarkoderDataReturnedNativeEvent = event.nativeEvent;

    // 0 will be special case for scanning results
    if (nativeEvent.promiseRequestId == 0) {
      if (this._resultCallback) {
        // Parse the payload as JSON before passing to BarkoderResult
        const parsedPayload = typeof nativeEvent.payload === 'string'
          ? JSON.parse(nativeEvent.payload)
          : nativeEvent.payload;

        this._resultCallback(new Barkoder.BarkoderResult(parsedPayload));
      }
    } else if (this._promisesMap.has(nativeEvent.promiseRequestId)) {
      let [resolve, reject] = this._promisesMap.get(nativeEvent.promiseRequestId)!;
      this._promisesMap.delete(nativeEvent.promiseRequestId);

      if (nativeEvent.error) {
        reject(new Barkoder.BarkoderError(nativeEvent.error));
      } else {
        resolve(nativeEvent.payload);
      }
    }
  }

  // Used only for iOS
  private startScanningEventEmmitter() {
    this._eventEmitter.removeAllListeners(BARKODER_RESULT_EVENT_NAME);
    this._eventEmitter.addListener(BARKODER_RESULT_EVENT_NAME, (event: { data: string }) => {
      const { data } = event;
      const result = new Barkoder.BarkoderResult(JSON.parse(data));

      if (this._resultCallback) {
        this._resultCallback(result);
      }
    });
  }

  /**
   * Retrieves the maximum available zoom factor for the device's camera.
   * @returns A promise that resolves with the maximum zoom factor.
   */
  getMaxZoomFactor(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getMaxZoomFactor', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getMaxZoomFactor(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the zoom factor for the device's camera, adjusting the level of zoom during barcode scanning.
   * @param zoomFactor - The zoom factor to set.
   */
  setZoomFactor(zoomFactor: number) {
    this._dispatchCommand('setZoomFactor', [zoomFactor]);
  }

  /**
  * Checks whether the device has a built-in flash (torch) that can be used for illumination during barcode scanning.
  * @returns A promise that resolves with a boolean indicating whether flash is available.
  */
  isFlashAvailable(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isFlashAvailable', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isFlashAvailable(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the device's flash (torch) for illumination during barcode scanning.
   * @param enabled - A boolean indicating whether flash should be enabled.
   */
  setFlashEnabled(enabled: boolean) {
    this._dispatchCommand('setFlashEnabled', [enabled]);
  }

  /**
   * Starts the camera for barcode scanning.
   */
  startCamera() {
    this._dispatchCommand('startCamera', []);
  }

  /**
   * Halts the barcode scanning process, stopping the camera from capturing and processing barcode information.
   */
  stopScanning() {
    this._resultCallback = null;
    this._eventEmitter.removeAllListeners(BARKODER_RESULT_EVENT_NAME);

    this._dispatchCommand('stopScanning', []);
  }

  /**
   * Initiates the barcode scanning process, allowing the application to detect and decode barcodes from the device's camera feed.
   * @param resultsCallback - The callback function to handle barcode scanning events.
   */
  startScanning(resultsCallback: ResultCallback) {
    if (this.isAndroid()) {
      this._resultCallback = resultsCallback;

      // 0 will be special case for scanning results
      this._dispatchCommand('startScanning', [0]);
    } else if (this.isIos()) {
      this._resultCallback = resultsCallback;

      this.startScanningEventEmmitter();

      NativeModules.BarkoderReactNativeViewManager.startScanning(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Temporarily suspends the barcode scanning process, pausing the camera feed without completely stopping the scanning session.
   */
  pauseScanning() {
    this._resultCallback = null;

    this._eventEmitter.removeAllListeners(BARKODER_RESULT_EVENT_NAME);

    this._dispatchCommand('pauseScanning', []);
  }

  /**
 * Scan barcodes from base64 string image
 * @param base64 - image string.
 * @param resultsCallback - The callback function to handle barcode scanning events.
 */
  scanImage(base64: String, resultsCallback: ResultCallback) {
    if (this.isAndroid()) {
      this._resultCallback = resultsCallback;

      // 0 will be special case for scanning results
      this._dispatchCommand('scanImage', [0, base64]);
    } else if (this.isIos()) {
      this._resultCallback = resultsCallback;

      this.startScanningEventEmmitter();

      NativeModules.BarkoderReactNativeViewManager.scanImage(
        findNodeHandle(this._barkoderViewRef.current), base64
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the resolution for barcode scanning.
   * @returns A promise that resolves with the Barkoder resolution.
   */
  getBarkoderResolution(): Promise<Barkoder.BarkoderResolution> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<Barkoder.BarkoderResolution>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getBarkoderResolution', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getBarkoderResolution(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the resolution for barcode scanning.
   */
  setBarkoderResolution(barkoderResolution: Barkoder.BarkoderResolution) {
    this._dispatchCommand('setBarkoderResolution', [barkoderResolution]);
  }

  /**
   * Sets the decoding speed for barcode scanning.
   */
  setDecodingSpeed(decodingSpeed: Barkoder.DecodingSpeed) {
    this._dispatchCommand('setDecodingSpeed', [decodingSpeed]);
  }

  /**
   * Sets the formatting type for barcode scanning.
   */
  setFormattingType(formatting: Barkoder.FormattingType) {
    this._dispatchCommand('setFormattingType', [formatting]);
  }

  /**
   * Sets the encoding character set for barcode scanning.
   * @param encodingCharacterSet - The encoding character set to be set.
   */
  setEncodingCharacterSet(encodingCharacterSet: String) {
    this._dispatchCommand('setEncodingCharacterSet', [encodingCharacterSet]);
  }

  /**
   * Retrieves the hexadecimal color code representing the line color used to indicate the location of detected barcodes.
   * @returns A promise that resolves with the location line color in hexadecimal format.
   */
  getLocationLineColorHex(): Promise<string> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<string>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getLocationLineColorHex', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getLocationLineColorHex(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the color of the lines used to indicate the location of detected barcodes on the camera feed.
   * @param hexColor - The hexadecimal color value to set.
   * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
   */
  setLocationLineColor(hexColor: String): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('setLocationLineColor', [promiseRequestId, hexColor]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.setLocationLineColor(
        findNodeHandle(this._barkoderViewRef.current),
        hexColor
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the current width setting for the lines indicating the location of detected barcodes on the camera feed.
   * @returns A promise that resolves with the location line width.
   */
  getLocationLineWidth(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getLocationLineWidth', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getLocationLineWidth(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the width of the lines indicating the location of detected barcodes on the camera feed.
   * @param lineWidth - The width of the location line to set.
   */
  setLocationLineWidth(lineWidth: number) {
    this._dispatchCommand('setLocationLineWidth', [lineWidth]);
  }

  /**
   * Retrieves the hexadecimal color code representing the line color of the Region of Interest (ROI) on the camera preview.
   * @returns A promise that resolves with the ROI line color in hexadecimal format.
   */
  getRoiLineColorHex(): Promise<string> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<string>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getRoiLineColorHex', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getRoiLineColorHex(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the color of the lines outlining the Region of Interest (ROI) for barcode scanning on the camera feed.
   * @param hexColor - The hexadecimal representation of the color.
   * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
   */
  setRoiLineColor(hexColor: String): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('setRoiLineColor', [promiseRequestId, hexColor]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.setRoiLineColor(
        findNodeHandle(this._barkoderViewRef.current),
        hexColor
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the current width setting for the lines outlining the Region of Interest (ROI) on the camera preview.
   * @returns A promise that resolves with the ROI line width.
   */
  getRoiLineWidth(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getRoiLineWidth', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getRoiLineWidth(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the width of the lines outlining the Region of Interest (ROI) for barcode scanning on the camera feed.
   * @param lineWidth - The width of the ROI line to set.
   */
  setRoiLineWidth(lineWidth: number) {
    this._dispatchCommand('setRoiLineWidth', [lineWidth]);
  }

  /**
   * Retrieves the hexadecimal color code representing the background color of the overlay within the Region of Interest (ROI) on the camera preview.
   * @returns A promise that resolves with the ROI overlay background color in hexadecimal format.
   */
  getRoiOverlayBackgroundColorHex(): Promise<string> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<string>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getRoiOverlayBackgroundColorHex', [
        promiseRequestId,
      ]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getRoiOverlayBackgroundColorHex(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the background color of the overlay within the Region of Interest (ROI) for barcode scanning on the camera feed.
   * @param hexColor - The hexadecimal color value to set for the ROI overlay background.
   * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
   */
  setRoiOverlayBackgroundColor(hexColor: String): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('setRoiOverlayBackgroundColor', [promiseRequestId, hexColor]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.setRoiOverlayBackgroundColor(
        findNodeHandle(this._barkoderViewRef.current),
        hexColor
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if the session is closed on result enabled.
   * @returns A promise that resolves with a boolean indicating whether close session on result is enabled.
   */
  isCloseSessionOnResultEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isCloseSessionOnResultEnabled', [
        promiseRequestId,
      ]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isCloseSessionOnResultEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the automatic closing of the scanning session upon detecting a barcode result.
   * @param enabled - A boolean indicating whether to enable close session on result.
   */
  setCloseSessionOnResultEnabled(enabled: boolean) {
    this._dispatchCommand('setCloseSessionOnResultEnabled', [enabled]);
  }

  /**
   * Checks if image result is enabled.
   * @returns A promise that resolves with a boolean indicating whether image result is enabled.
   */
  isImageResultEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isImageResultEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isImageResultEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the capturing and processing of image data when a barcode is successfully detected.
   * @param enabled - True to enable image result display, false to disable it.
   */
  setImageResultEnabled(enabled: boolean) {
    this._dispatchCommand('setImageResultEnabled', [enabled]);
  }

  /**
   * Checks if location in image result is enabled.
   * @returns A promise that resolves with a boolean indicating whether location in image result is enabled.
   */
  isLocationInImageResultEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isLocationInImageResultEnabled', [
        promiseRequestId,
      ]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isLocationInImageResultEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the inclusion of barcode location information within the image data result.
   * @param enabled - True to display the location, false to hide it.
   */
  setLocationInImageResultEnabled(enabled: boolean) {
    this._dispatchCommand('setLocationInImageResultEnabled', [enabled]);
  }

  /**
   * Retrieves the region of interest (ROI).
   * @returns A promise that resolves with an array representing the region of interest (ROI).
   */
  getRegionOfInterest(): Promise<number[]> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number[]>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getRegionOfInterest', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getRegionOfInterest(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Defines the Region of Interest (ROI) on the camera preview for barcode scanning, specifying an area where the application focuses on detecting barcodes.
   * @param left - The left coordinate of the ROI.
   * @param top - The top coordinate of the ROI.
   * @param width - The width of the ROI.
   * @param height - The height of the ROI.
   * @returns A promise that resolves with a boolean indicating whether the ROI was successfully set.
   */
  setRegionOfInterest(
    left: number,
    top: number,
    width: number,
    height: number
  ): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('setRegionOfInterest', [promiseRequestId, left, top, width, height]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.setRegionOfInterest(
        findNodeHandle(this._barkoderViewRef.current),
        left,
        top,
        width,
        height
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the threads limit.
   * @returns {Promise<number>} A promise that resolves with the threads limit.
   */
  getThreadsLimit(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getThreadsLimit', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getThreadsLimit(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the threads limit.
   * @param threadsLimit - The limit for the number of threads to set.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the threads limit was successfully set.
   */
  setThreadsLimit(threadsLimit: number): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('setThreadsLimit', [promiseRequestId, threadsLimit]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.setThreadsLimit(
        findNodeHandle(this._barkoderViewRef.current),
        threadsLimit
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if location in preview is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether location in preview is enabled.
   */
  isLocationInPreviewEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isLocationInPreviewEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isLocationInPreviewEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the display of barcode location information on the camera preview.
   * @param enabled - True to display the location, false to hide it.
   */
  setLocationInPreviewEnabled(enabled: boolean) {
    this._dispatchCommand('setLocationInPreviewEnabled', [enabled]);
  }

  /**
   * Checks if pinch to zoom is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether pinch to zoom is enabled.
   */
  isPinchToZoomEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isPinchToZoomEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isPinchToZoomEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the pinch-to-zoom feature for adjusting the zoom level during barcode scanning.
   * @param enabled - True to enable pinch-to-zoom, false to disable it.
   */
  setPinchToZoomEnabled(enabled: boolean) {
    this._dispatchCommand('setPinchToZoomEnabled', [enabled]);
  }

  /**
   * Checks if the region of interest (ROI) is visible.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the ROI is visible.
   */
  isRegionOfInterestVisible(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isRegionOfInterestVisible', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isRegionOfInterestVisible(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the visibility of the Region of Interest (ROI) on the camera preview.
   * @param visible - True to make the ROI visible, false to hide it.
   */
  setRegionOfInterestVisible(visible: boolean) {
    this._dispatchCommand('setRegionOfInterestVisible', [visible]);
  }

  /**
   * Retrieves the value indicating whether a beep sound is played on successful barcode scanning.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the beep on success is enabled.
   */
  isBeepOnSuccessEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isBeepOnSuccessEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isBeepOnSuccessEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the audible beep sound upon successfully decoding a barcode.
   * @param enabled - True to enable beep sound, false to disable it.
   */
  setBeepOnSuccessEnabled(enabled: boolean) {
    this._dispatchCommand('setBeepOnSuccessEnabled', [enabled]);
  }

  /**
   * Retrieves the value indicating whether vibration is enabled on successful barcode scanning.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether vibrate on success is enabled.
   */
  isVibrateOnSuccessEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isVibrateOnSuccessEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isVibrateOnSuccessEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the vibration on successful barcode scanning.
   * @param enabled - True to enable vibration, false to disable it.
   */
  setVibrateOnSuccessEnabled(enabled: boolean) {
    this._dispatchCommand('setVibrateOnSuccessEnabled', [enabled]);
  }

  /**
   * Retrieves the character set used for encoding barcode data.
   * @returns {Promise<string>} A promise that resolves with the encoding character set.
   */
  getEncodingCharacterSet(): Promise<string> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<string>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getEncodingCharacterSet', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getEncodingCharacterSet(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the version of the Barkoder library.
   * @returns {Promise<string>} A promise that resolves with the version of the Barkoder library.
   */
  getVersion(): Promise<string> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<string>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getVersion', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getVersion(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the current decoding speed setting for barcode scanning.
   * @returns {Promise<Barkoder.DecodingSpeed>} A promise that resolves with the decoding speed configuration.
   */
  getDecodingSpeed(): Promise<Barkoder.DecodingSpeed> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<Barkoder.DecodingSpeed>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getDecodingSpeed', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getDecodingSpeed(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the formatting type used for presenting decoded barcode data..
   * @returns {Promise<Barkoder.FormattingType>} A promise that resolves with the formatting type configuration.
   */
  getFormattingType(): Promise<Barkoder.FormattingType> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<Barkoder.FormattingType>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getFormattingType', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getFormattingType(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if a specific barcode type is enabled.
   * @param barcodeType - The barcode type to check.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the barcode type is enabled.
   */
  isBarcodeTypeEnabled(barcodeType: Barkoder.BarcodeType): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isBarcodeTypeEnabled', [promiseRequestId, barcodeType]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isBarcodeTypeEnabled(
        findNodeHandle(this._barkoderViewRef.current),
        barcodeType
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the length range of the specified barcode type.
   * @param barcodeType - The barcode type to get the length range for.
   * @returns {Promise<number[]>} A promise that resolves with an array representing the length range of the barcode type.
   */
  getBarcodeTypeLengthRange(barcodeType: Barkoder.BarcodeType): Promise<number[]> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number[]>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getBarcodeTypeLengthRange', [promiseRequestId, barcodeType]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getBarcodeTypeLengthRange(
        findNodeHandle(this._barkoderViewRef.current),
        barcodeType
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the length range for the specified barcode type.
   * @param barcodeType - The barcode type to set the length range for.
   * @param min - The minimum length of the barcode type.
   * @param max - The maximum length of the barcode type.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the length range was successfully set.
   */
  setBarcodeTypeLengthRange(barcodeType: Barkoder.BarcodeType, min: number, max: number): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('setBarcodeTypeLengthRange', [promiseRequestId, barcodeType, min, max]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.setBarcodeTypeLengthRange(
        findNodeHandle(this._barkoderViewRef.current),
        barcodeType,
        min,
        max,
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Configures the Barkoder functionality based on the provided configuration.
   * @param barkoderConfig - The configuration parameters for the Barkoder.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the configuration was successful.
   */
  configureBarkoder(barkoderConfig: Barkoder.BarkoderConfig): Promise<boolean> {
    const jsonString = barkoderConfig.toJsonString();

    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('configureBarkoder', [promiseRequestId, jsonString]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.configureBarkoder(
        findNodeHandle(this._barkoderViewRef.current),
        jsonString,
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the specified barcode type for scanning.
   * @param barcodeType - The barcode type to enable or disable.
   * @param enabled - True to enable the barcode type, false to disable it.
   */
  setBarcodeTypeEnabled(barcodeType: Barkoder.BarcodeType, enabled: boolean) {
    this._dispatchCommand('setBarcodeTypeEnabled', [barcodeType, enabled]);
  }

  /**
   * Retrieves the MSI checksum type.
   * @returns {Promise<Barkoder.MsiChecksumType>} A promise that resolves with the checksum type for MSI barcodes.
   */
  getMsiChecksumType(): Promise<Barkoder.MsiChecksumType> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<Barkoder.MsiChecksumType>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getMsiChecksumType', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getMsiChecksumType(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
  * Set the MSI checksum type.
  * @param msiChecksumType - The MSI checksum type to set.
  */
  setMsiChecksumType(msiChecksumType: Barkoder.MsiChecksumType) {
    this._dispatchCommand('setMsiChecksumType', [msiChecksumType]);
  }

  /**
   * Retrieves the checksum type for Code 39 barcodes.
   * @returns {Promise<Barkoder.Code39ChecksumType>} A promise that resolves with the checksum type for Code 39 barcodes.
   */
  getCode39ChecksumType(): Promise<Barkoder.Code39ChecksumType> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<Barkoder.Code39ChecksumType>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getCode39ChecksumType', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getCode39ChecksumType(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the checksum type for Code 39 barcodes.
   * @param code39ChecksumType - The checksum type to set for Code 39 barcodes.
   */
  setCode39ChecksumType(code39ChecksumType: Barkoder.Code39ChecksumType) {
    this._dispatchCommand('setCode39ChecksumType', [code39ChecksumType]);
  }

  /**
   * Retrieves the Code11 checksum type.
   * @returns {Promise<Barkoder.Code11ChecksumType>} A promise that resolves with the checksum type for Code 11 barcodes.
   */
  getCode11ChecksumType(): Promise<Barkoder.Code11ChecksumType> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<Barkoder.Code11ChecksumType>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getCode11ChecksumType', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getCode11ChecksumType(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the checksum type for Code 11 barcodes.
   * @param code11ChecksumType - The checksum type to set for Code 11 barcodes.
   */
  setCode11ChecksumType(code11ChecksumType: Barkoder.Code11ChecksumType) {
    this._dispatchCommand('setCode11ChecksumType', [code11ChecksumType]);
  }

  /**
   * Sets the maximum number of results to be returned from barcode scanning.
   * @param maximumResultsCount - The maximum number of results to return.
   */
  setMaximumResultsCount(maximumResultsCount: number) {
    this._dispatchCommand('setMaximumResultsCount', [maximumResultsCount]);
  }

  /**
   * Sets the delay in milliseconds for considering duplicate barcodes during scanning.
   * @param duplicatesDelayMs - The delay in milliseconds for duplicate detection.
   */
  setDuplicatesDelayMs(duplicatesDelayMs: number) {
    this._dispatchCommand('setDuplicatesDelayMs', [duplicatesDelayMs]);
  }

  /**
   * Sets the caching duration (in milliseconds) for multi-code results.
   * @param multicodeCachingDuration - The caching duration (in milliseconds) for multi-code results.
   */
  setMulticodeCachingDuration(multicodeCachingDuration: number) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('setMulticodeCachingDuration', [promiseRequestId, multicodeCachingDuration]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.setMulticodeCachingDuration(
        findNodeHandle(this._barkoderViewRef.current),
        multicodeCachingDuration
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether multi-code caching is enabled.
   * @param multicodeCachingEnabled - A boolean indicating whether to enable multi-code caching.
   */
  setMulticodeCachingEnabled(multicodeCachingEnabled: boolean) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('setMulticodeCachingEnabled', [promiseRequestId, multicodeCachingEnabled]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.setMulticodeCachingEnabled(
        findNodeHandle(this._barkoderViewRef.current),
        multicodeCachingEnabled
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Gets the maximum number of results to be returned from barcode scanning.
   * @returns {Promise<number>} A promise that resolves with the maximum number of results to return.
   */
  getMaximumResultsCount(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getMaximumResultsCount', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getMaximumResultsCount(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Gets the delay in milliseconds for considering duplicate barcodes during scanning.
   * @returns {Promise<number>} A promise that resolves with the delay (in milliseconds) for detecting duplicate results.
   */
  getDuplicatesDelayMs(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getDuplicatesDelayMs', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getDuplicatesDelayMs(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
* Retrieves whether Direct Part Marking (DPM) mode for Datamatrix barcodes is enabled
* @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether DPM mode for Datamatrix barcodes is enabled.
*/
  isDatamatrixDpmModeEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isDatamatrixDpmModeEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isDatamatrixDpmModeEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether the Direct Part Marking (DPM) mode for Datamatrix barcodes is enabled.
   * @param enabled - True to enable DPM mode, false to disable it.
   */
  setDatamatrixDpmModeEnabled(enabled: boolean) {
    this._dispatchCommand('setDatamatrixDpmModeEnabled', [enabled]);
  }

  /**
* Retrieves whether Direct Part Marking (DPM) mode for QR barcodes is enabled
* @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether DPM mode for QR barcodes is enabled.
*/
  isQrDpmModeEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isQrDpmModeEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isQrDpmModeEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
 * Sets whether the Direct Part Marking (DPM) mode for QR barcodes is enabled.
 * @param enabled - True to enable DPM mode, false to disable it.
 */
  setQrDpmModeEnabled(enabled: boolean) {
    this._dispatchCommand('setQrDpmModeEnabled', [enabled]);
  }

  /**
* Retrieves whether Direct Part Marking (DPM) mode for QR Micro barcodes is enabled
* @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether DPM mode for QR Micro barcodes is enabled.
*/
  isQrMicroDpmModeEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isQrMicroDpmModeEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isQrMicroDpmModeEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
* Sets whether the Direct Part Marking (DPM) mode for QR Micro barcodes is enabled.
* @param enabled - True to enable DPM mode, false to disable it.
*/
  setQrMicroDpmModeEnabled(enabled: boolean) {
    this._dispatchCommand('setQrMicroDpmModeEnabled', [enabled]);
  }

  /**
* Retrieves whether Master checksum is enabled when scanning ID Documents 
* @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether Master checksum is enabled when scanning ID Documents 
*/
  isIdDocumentMasterChecksumEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isIdDocumentMasterChecksumEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isIdDocumentMasterChecksumEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
* Sets whether Master checksum should be requiered when scanning ID Documents
* @param enabled - True to enable Master checksum, false to disable it.
*/
  setIdDocumentMasterChecksumEnabled(enabled: boolean) {
    this._dispatchCommand('setIdDocumentMasterChecksumEnabled', [enabled]);
  }

  /**
   * Gets the value indicating whether deblurring is enabled for UPC/EAN barcodes.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the deblurring feature for UPC/EAN barcodes is enabled.
   */
  isUpcEanDeblurEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isUpcEanDeblurEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isUpcEanDeblurEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether the deblurring feature for UPC/EAN barcodes is enabled.
   * @param enabled - A boolean indicating whether to enable the deblurring feature for UPC/EAN barcodes.
   */
  setUpcEanDeblurEnabled(enabled: boolean) {
    this._dispatchCommand('setUpcEanDeblurEnabled', [enabled]);
  }

  /**
   * Checks if the detection of misshaped 1D barcodes is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the detection of misshaped 1D barcodes is enabled.
   */
  isMisshaped1DEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isMisshaped1DEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isMisshaped1DEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether the detection of misshaped 1D barcodes is enabled.
   * @param enabled - A boolean indicating whether to enable the detection of misshaped 1D barcodes.
   */
  setEnableMisshaped1DEnabled(enabled: boolean) {
    this._dispatchCommand('setEnableMisshaped1DEnabled', [enabled]);
  }

  /**
   * Sets whether the barcode thumbnail on result is enabled.
   * @param enabled - A boolean indicating whether to enable the barcode thumbnail on result.
   */
  setBarcodeThumbnailOnResultEnabled(enabled: boolean) {
    this._dispatchCommand('setBarcodeThumbnailOnResultEnabled', [enabled]);
  }

  /**
   * Sets the threshold between duplicate scans.
   * @param thresholdBetweenDuplicatesScans - The threshold between duplicate scans.
   */
  setThresholdBetweenDuplicatesScans(thresholdBetweenDuplicatesScans: number) {
    this._dispatchCommand('setThresholdBetweenDuplicatesScans', [thresholdBetweenDuplicatesScans]);
  }

  /**
   * Retrieves the threshold between duplicate scans.
   * @returns {Promise<number>} A promise that resolves with the threshold between duplicate scans.
   */
  getThresholdBetweenDuplicatesScans(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getThresholdBetweenDuplicatesScans', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getThresholdBetweenDuplicatesScans(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if the barcode thumbnail on result is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the barcode thumbnail on result is enabled.
   */
  isBarcodeThumbnailOnResultEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isBarcodeThumbnailOnResultEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isBarcodeThumbnailOnResultEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the caching duration (in milliseconds) for multi-code results.
   * @returns {Promise<number>} A promise that resolves with the caching duration (in milliseconds) for multi-code results.
   */
  getMulticodeCachingDuration(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getMulticodeCachingDuration', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getMulticodeCachingDuration(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves whether multi-code caching is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether multi-code caching is enabled.
   */
  getMulticodeCachingEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getMulticodeCachingEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getMulticodeCachingEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if Vehicle Identification Number (VIN) restrictions are enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether VIN restrictions are enabled.
   */
  isVINRestrictionsEnabled(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isVINRestrictionsEnabled', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isVINRestrictionsEnabled(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether Vehicle Identification Number (VIN) restrictions are enabled.
   * @param enabled - A boolean indicating whether to enable VIN restrictions.
   */
  setEnableVINRestrictions(enabled: boolean) {
    this._dispatchCommand('setEnableVINRestrictions', [enabled]);
  }

  /**
 * Sets whether the UPC-E barcodes should be expanded to UPC-A format.
 * @param enabled - A boolean indicating whether to enable the expansion for UPC-E barcodes.
 */
  setUPCEexpandToUPCA(enabled: boolean) {
    this._dispatchCommand('setUPCEexpandToUPCA', [enabled]);
  }

  /**
 * Sets whether the UPC-E1 barcodes should be expanded to UPC-A format.
 * @param enabled - A boolean indicating whether to enable the expansion for UPC-E1 barcodes.
 */
  setUPCE1expandToUPCA(enabled: boolean) {
    this._dispatchCommand('setUPCE1expandToUPCA', [enabled]);
  }

  /**
 * Retrieves the hexadecimal color code representing the line color of the scanning indicator on the camera preview.
 * @returns A promise that resolves with the scanning indicator line color in hexadecimal format.
 */
  getScanningIndicatorColorHex(): Promise<string> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<string>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getScanningIndicatorColorHex', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getScanningIndicatorColorHex(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the color of the lines outlining the scanning indicator for barcode scanning on the camera feed.
   * @param hexColor - The hexadecimal representation of the color.
   * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
   */
  setScanningIndicatorColor(hexColor: String): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('setScanningIndicatorColor', [promiseRequestId, hexColor]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.setScanningIndicatorColor(
        findNodeHandle(this._barkoderViewRef.current),
        hexColor
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
 * Retrieves the current width setting for the scanning indicator on the camera preview.
 * @returns A promise that resolves with the scanning indicator width.
 */
  getScanningIndicatorWidth(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getScanningIndicatorWidth', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getScanningIndicatorWidth(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the width of the scanning indicator for barcode scanning on the camera feed.
   * @param lineWidth - The width of the scanning indicator to set.
   */
  setScanningIndicatorWidth(lineWidth: number) {
    this._dispatchCommand('setScanningIndicatorWidth', [lineWidth]);
  }

  /**
* Retrieves the current animation setting for the scanning indicator on the camera preview.
* @returns A promise that resolves the scanning indicator animaiton.
*/
  getScanningIndicatorAnimation(): Promise<number> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<number>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('getScanningIndicatorAnimation', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getScanningIndicatorAnimation(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the animation of the scanning indicator for barcode scanning on the camera feed.
   * @param animation - The animation of the scanning indicator to set.
   */
  setScanningIndicatorAnimation(animation: number) {
    this._dispatchCommand('setScanningIndicatorAnimation', [animation]);
  }

  /**
* Retrieves if the scanning indicator is set to be always visible on the camera preview.
* @returns A promise that resolves the scanning indicator always visible state.
*/
  isScanningIndicatorAlwaysVisible(): Promise<boolean> {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;

      let promise = new Promise<boolean>((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });

      this._dispatchCommand('isScanningIndicatorAlwaysVisible', [promiseRequestId]);

      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.isScanningIndicatorAlwaysVisible(
        findNodeHandle(this._barkoderViewRef.current)
      );
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the scanning indicator to be always shown on the camera feed.
   * @param value - A boolean indicating whether the scanning indicator should always remain visible.
   */
  setScanningIndicatorAlwaysVisible(value: boolean) {
    this._dispatchCommand('setScanningIndicatorAlwaysVisible', [value]);
  }

  /**
 * Setting custom option.
 * @param string - string value
 * @param int - int value
 */
  setCustomOption(string: String, int: number) {
    this._dispatchCommand('setCustomOption', [string, int]);
  }

  /**
   * Sets the camera's exposure dynamically based on the provided intensity, cycling through predefined compensation values.
   * @param intesnity - The integer value for the exposure intensity.
   */
  setDynamicExposure(intesnity: number) {
    this._dispatchCommand('setDynamicExposure', [intesnity]);
  }

  /**
   * Sets the camera to use the center of the viewfinder for focus and exposure.
   * @param value - A boolean indicating whether the center of the viewfinder should be used.
   */
  setCentricFocusAndExposure(value: boolean) {
    this._dispatchCommand('setCentricFocusAndExposure', [value]);
  }

  /**
   * Sets wheter Composite Mode should be enabled when scanning.
   * @param value - The integer value if composite mode should be enabled.
   */
  setEnableComposite(value: number) {
    this._dispatchCommand('setEnableComposite', [value]);
  }

  /**
   * Enable or disable video stabilization for smoother video capture.
   * @param value - A boolean indicating whether video stabilization should be enabled/disabled.
   */
  setVideoStabilization(value: boolean) {
      this._dispatchCommand('setVideoStabilization', [value]);
  }

  showLogMessages(show: boolean) {
    this._dispatchCommand('showLogMessages', [show]);
  }

  private isIos(): boolean {
    return Platform.OS === 'ios';
  }

  private isAndroid(): boolean {
    return Platform.OS === 'android';
  }
}

// Keep these classes in this file, so we can have same "Barkoder" alias for the class and for the namespace
export namespace Barkoder {

  export enum DecodingSpeed {
    fast,
    normal,
    slow,
    rigorous,
  }

  export enum FormattingType {
    disabled,
    automatic,
    gs1,
    aamva,
  }

  export enum MsiChecksumType {
    disabled,
    mod10,
    mod11,
    mod1010,
    mod1110,
    mod11IBM,
    mod1110IBM,
  }

  export enum Code39ChecksumType {
    disabled,
    enabled,
  }

  export enum Code11ChecksumType {
    disabled,
    single,
    double,
  }

  export enum BarkoderResolution {
    HD,
    FHD,
    UHD,
  }

  export enum BarcodeType {
    aztec,
    aztecCompact,
    qr,
    qrMicro,
    code128,
    code93,
    code39,
    codabar,
    code11,
    msi,
    upcA,
    upcE,
    upcE1,
    ean13,
    ean8,
    pdf417,
    pdf417Micro,
    datamatrix,
    code25,
    interleaved25,
    itf14,
    iata25,
    matrix25,
    datalogic25,
    coop25,
    code32,
    telepen,
    dotcode,
    idDocument,
    databar14,         
    databarLimited,
    databarExpanded 
  }

  export class BarkoderConfig {
    locationLineColor?: string;
    locationLineWidth?: number;
    roiLineColor?: string;
    roiLineWidth?: number;
    roiOverlayBackgroundColor?: string;
    scanningIndicatorColor?: string;
    scanningIndicatorWidth?: number;
    scanningIndicatorAnimation?: number;
    scanningIndicatorAlwaysVisible?: boolean;
    closeSessionOnResultEnabled?: boolean;
    imageResultEnabled?: boolean;
    locationInImageResultEnabled?: boolean;
    locationInPreviewEnabled?: boolean;
    pinchToZoomEnabled?: boolean;
    regionOfInterestVisible?: boolean;
    barkoderResolution?: BarkoderResolution;
    beepOnSuccessEnabled?: boolean;
    vibrateOnSuccessEnabled?: boolean;
    decoder?: DekoderConfig;

    constructor(config: Partial<BarkoderConfig>) {
      Object.assign(this, config);
    }

    toJsonString() {
      let configAsJson: { [key: string]: any } = {
        "locationLineColor": this.locationLineColor,
        "locationLineWidth": this.locationLineWidth,
        "roiLineColor": this.roiLineColor,
        "roiLineWidth": this.roiLineWidth,
        "roiOverlayBackgroundColor": this.roiOverlayBackgroundColor,
        "scanningIndicatorColor": this.scanningIndicatorColor,
        "scanningIndicatorWidth": this.scanningIndicatorWidth,
        "scanningIndicatorAnimation": this.scanningIndicatorAnimation,
        "scanningIndicatorAlwaysVisible": this.scanningIndicatorAlwaysVisible,
        "closeSessionOnResultEnabled": this.closeSessionOnResultEnabled,
        "imageResultEnabled": this.imageResultEnabled,
        "locationInImageResultEnabled": this.locationInImageResultEnabled,
        "locationInPreviewEnabled": this.locationInPreviewEnabled,
        "pinchToZoomEnabled": this.pinchToZoomEnabled,
        "regionOfInterestVisible": this.regionOfInterestVisible,
        "barkoderResolution": this.barkoderResolution,
        "beepOnSuccessEnabled": this.beepOnSuccessEnabled,
        "vibrateOnSuccessEnabled": this.vibrateOnSuccessEnabled,
        "decoder": this.decoder?.toMap()
      };

      return JSON.stringify(configAsJson);
    }
  }

  export class DekoderConfig {
    aztec?: BarcodeConfig;
    aztecCompact?: BarcodeConfig;
    qr?: BarcodeConfigWithDpmMode;
    qrMicro?: BarcodeConfigWithDpmMode;
    code128?: BarcodeConfigWithLength;
    code93?: BarcodeConfigWithLength;
    code39?: Code39BarcodeConfig;
    codabar?: BarcodeConfigWithLength;
    code11?: Code11BarcodeConfig;
    msi?: MSIBarcodeConfig;
    upcA?: BarcodeConfig;
    upcE?: BarcodeConfig;
    upcE1?: BarcodeConfig;
    ean13?: BarcodeConfig;
    ean8?: BarcodeConfig;
    pdf417?: BarcodeConfig;
    pdf417Micro?: BarcodeConfig;
    datamatrix?: BarcodeConfigWithDpmMode;
    code25?: BarcodeConfig;
    interleaved25?: BarcodeConfig;
    itf14?: BarcodeConfig;
    iata25?: BarcodeConfig;
    matrix25?: BarcodeConfig;
    datalogic25?: BarcodeConfig;
    coop25?: BarcodeConfig;
    code32?: BarcodeConfig;
    telepen?: BarcodeConfig;
    dotcode?: BarcodeConfig;
    idDocument?: IdDocumentBarcodeConfig;
    databar14?: BarcodeConfig;         
    databarLimited?: BarcodeConfig;
    databarExpanded?: BarcodeConfig;
    general?: GeneralSettings;

    constructor(config: Partial<DekoderConfig>) {
      Object.assign(this, config);
    }

    toMap() {
      const map = {
        'Aztec': this.aztec?.toMap(),
        'Aztec Compact': this.aztecCompact?.toMap(),
        'QR': this.qr?.toMap(),
        'QR Micro': this.qrMicro?.toMap(),
        'Code 128': this.code128?.toMap(),
        'Code 93': this.code93?.toMap(),
        'Code 39': this.code39?.toMap(),
        'Codabar': this.codabar?.toMap(),
        'Code 11': this.code11?.toMap(),
        'MSI': this.msi?.toMap(),
        'Upc-A': this.upcA?.toMap(),
        'Upc-E': this.upcE?.toMap(),
        'Upc-E1': this.upcE1?.toMap(),
        'Ean-13': this.ean13?.toMap(),
        'Ean-8': this.ean8?.toMap(),
        'PDF 417': this.pdf417?.toMap(),
        'PDF 417 Micro': this.pdf417Micro?.toMap(),
        'Datamatrix': this.datamatrix?.toMap(),
        'Code 25': this.code25?.toMap(),
        'Interleaved 2 of 5': this.interleaved25?.toMap(),
        'ITF 14': this.itf14?.toMap(),
        'IATA 25': this.iata25?.toMap(),
        'Matrix 25': this.matrix25?.toMap(),
        'Datalogic 25': this.datalogic25?.toMap(),
        'COOP 25': this.coop25?.toMap(),
        'Code 32': this.code32?.toMap(),
        'Telepen': this.telepen?.toMap(),
        'Dotcode': this.dotcode?.toMap(),
        'ID Document': this.idDocument?.toMap(),
        'Databar 14': this.databar14?.toMap(),
        'Databar Limited': this.databarLimited?.toMap(),
        'Databar Expanded': this.databarExpanded?.toMap(),
        'general': this.general?.toMap()
      }

      return map;
    }
  }

  export class BarcodeConfig {
    enabled?: boolean;

    constructor(config: Partial<BarcodeConfig>) {
      Object.assign(this, config);
    }

    toMap() {
      const map = {
        "enabled": this.enabled
      }

      return map;
    }
  }

  export class BarcodeConfigWithLength {
    enabled?: boolean;
    private minLength?: number;
    private maxLength?: number;

    constructor(config: Partial<BarcodeConfigWithLength>) {
      Object.assign(this, config);
    }

    toMap() {
      const map = {
        "enabled": this.enabled,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength
      }

      return map;
    }

    setLengthRange(minLength: number, maxLength: number) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }

  export class MSIBarcodeConfig {
    enabled?: boolean;
    private minLength?: number;
    private maxLength?: number;
    checksum?: MsiChecksumType;

    constructor(config: Partial<MSIBarcodeConfig>) {
      Object.assign(this, config);
    }

    toMap() {
      let map: { [key: string]: any } = {
        "enabled": this.enabled,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength,
        "checksum": this.checksum
      }

      return map;
    }

    setLengthRange(minLength: number, maxLength: number) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }

  export class Code39BarcodeConfig {
    enabled?: boolean;
    private minLength?: number;
    private maxLength?: number;
    checksum?: Code39ChecksumType;

    constructor(config: Partial<Code39BarcodeConfig>) {
      Object.assign(this, config);
    }

    toMap() {
      let map: { [key: string]: any } = {
        "enabled": this.enabled,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength,
        "checksum": this.checksum
      }

      return map;
    }

    setLengthRange(minLength: number, maxLength: number) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }

  export class Code11BarcodeConfig {
    enabled?: boolean;
    private minLength?: number;
    private maxLength?: number;
    checksum?: Code11ChecksumType;

    constructor(config: Partial<Code11BarcodeConfig>) {
      Object.assign(this, config);
    }

    toMap() {
      let map: { [key: string]: any } = {
        "enabled": this.enabled,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength,
        "checksum": this.checksum
      }

      return map;
    }

    setLengthRange(minLength: number, maxLength: number) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }

  export class BarcodeConfigWithDpmMode {
    enabled?: boolean;
    dpmMode?: number;
    private minLength?: number;
    private maxLength?: number;

    constructor(config: Partial<BarcodeConfigWithDpmMode>) {
      Object.assign(this, config);
    }

    toMap() {
      let map: { [key: string]: any } = {
        "enabled": this.enabled,
        "dpmMode": this.dpmMode,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength,
      }

      return map;
    }

    setLengthRange(minLength: number, maxLength: number) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }

  export enum IdDocumentMasterChecksumType {
    disabled,
    enabled,
  }

  export class IdDocumentBarcodeConfig {
    enabled?: boolean;
    masterChecksum?: IdDocumentMasterChecksumType;

    constructor(config: Partial<IdDocumentBarcodeConfig>) {
      Object.assign(this, config);
    }

    toMap() {
      let map: { [key: string]: any } = {
        "enabled": this.enabled,
        "masterChecksum": this.masterChecksum
      }

      return map;
    }
  }

  export class GeneralSettings {
    threadsLimit?: number;
    decodingSpeed?: DecodingSpeed;
    roiX?: number;
    roiY?: number;
    roiWidth?: number;
    roiHeight?: number;
    formattingType?: FormattingType;
    encodingCharacterSet?: string;
    upcEanDeblur?: number;
    enableMisshaped1D?: number;
    maximumResultsCount?: number;
    duplicatesDelayMs?: number;
    multicodeCachingDuration?: number;
    multicodeCachingEnabled?: boolean;

    constructor(config: Partial<GeneralSettings>) {
      Object.assign(this, config);
    }

    toMap() {
      let map: { [key: string]: any } = {
        "maxThreads": this.threadsLimit,
        "decodingSpeed": this.decodingSpeed,
        "roi_x": this.roiX,
        "roi_y": this.roiY,
        "roi_w": this.roiWidth,
        "roi_h": this.roiHeight,
        "formattingType": this.formattingType,
        "encodingCharacterSet": this.encodingCharacterSet,
        "upcEanDeblur": this.upcEanDeblur,
        "enableMisshaped1D": this.enableMisshaped1D,
        "maximumResultsCount": this.maximumResultsCount,
        "duplicatesDelayMs": this.duplicatesDelayMs,
        "multicodeCachingDuration": this.multicodeCachingDuration,
        "multicodeCachingEnabled": this.multicodeCachingEnabled
      }

      return map;
    }

    setROI(x: number, y: number, width: number, height: number) {
      this.roiX = x;
      this.roiY = y;
      this.roiWidth = width;
      this.roiHeight = height;
    }
  }

  export class BarkoderResult {
    decoderResults: DecoderResult[];
    resultThumbnailsAsBase64?: string[] | null;
    resultImageAsBase64?: string | null;

    constructor(resultMap: Record<string, any>) {
      if (Array.isArray(resultMap['decoderResults'])) {
        this.decoderResults = resultMap['decoderResults'].map((result: any) => new DecoderResult(result));
      } else {
        this.decoderResults = [];
      }

      this.resultThumbnailsAsBase64 = Array.isArray(resultMap['resultThumbnailsAsBase64'])
        ? resultMap['resultThumbnailsAsBase64']
          .map(thumbnail => this.convertToBase64(thumbnail))
          .filter((thumbnail): thumbnail is string => thumbnail !== null)
        : null;

      this.resultImageAsBase64 = this.convertToBase64(resultMap['resultImageAsBase64']);
    }

    private convertToBase64(data: string | null | undefined): string | null {
      return data ? `data:image/jpeg;base64,${data}` : null;
    }
  }

  export class DecoderResult {
    barcodeType: number;
    barcodeTypeName: string;
    binaryDataAsBase64: string;
    textualData: string;
    characterSet?: string | null;
    extra?: Record<string, any> | null;
    mrzImagesAsBase64?: { name: string; base64: string }[];

    constructor(resultMap: Record<string, any>) {
      this.barcodeType = resultMap['barcodeType'];
      this.barcodeTypeName = resultMap['barcodeTypeName'];
      this.binaryDataAsBase64 = resultMap['binaryDataAsBase64'];
      this.textualData = resultMap['textualData'];
      this.characterSet = resultMap['characterSet'] || null;
      this.extra = 'extra' in resultMap ? JSON.parse(resultMap['extra']) : null;
      this.mrzImagesAsBase64 = Array.isArray(resultMap['mrzImagesAsBase64'])
        ? resultMap['mrzImagesAsBase64'].map((image: { name: string; base64: string }) => ({
          name: image.name,
          base64: `data:image/jpeg;base64,${image.base64}`,
        }))
        : [];
    }
  }

  export class BarkoderError {
    code: string;
    message: string;

    constructor(jsonString: string) {
      const errorMap: Record<string, any> = JSON.parse(jsonString);

      this.code = errorMap['code'];
      this.message = errorMap['message'];
    }
  }

}
