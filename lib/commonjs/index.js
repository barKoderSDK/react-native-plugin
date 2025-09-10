"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarkoderView = exports.Barkoder = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LINKING_ERROR = `The package 'barkoder-react-native' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const OS_NOT_SUPPORTED = 'OS is not supported!';
const BARKODER_RESULT_EVENT_NAME = 'BarkoderResultEvent';
const BARKODER_CONFIG_EVENT_NAME = 'BarkoderConfigEvent';
const ComponentName = 'BarkoderReactNativeView';
const BarkoderReactNativeView = _reactNative.UIManager.getViewManagerConfig(ComponentName) != null ? (0, _reactNative.requireNativeComponent)(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};

/**
 * Initializes a new instance of the BarkoderView class.
 */
class BarkoderView extends _react.default.Component {
  _myRef = /*#__PURE__*/_react.default.createRef();
  _barkoder = new Barkoder(this._myRef);
  _eventEmitter = new _reactNative.NativeEventEmitter(_reactNative.NativeModules.BarkoderEmitter);
  constructor(props) {
    super(props);
    if (_reactNative.Platform.OS === 'ios') this.startConfigurationEmitter();else {
      this._onDataReturned = this._onDataReturned.bind(this);
      this._onBarkoderConfigCreated = this._onBarkoderConfigCreated.bind(this);
    }
  }
  startConfigurationEmitter() {
    this._eventEmitter.addListener(BARKODER_CONFIG_EVENT_NAME, () => {
      this._eventEmitter.removeAllListeners(BARKODER_CONFIG_EVENT_NAME);
      this.props.onBarkoderViewCreated(this._barkoder);
    });
  }
  _onDataReturned(event) {
    this._barkoder.onDataReturned(event);
  }
  _onBarkoderConfigCreated(_event) {
    this.props.onBarkoderViewCreated(this._barkoder);
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(BarkoderReactNativeView, {
      ref: this._myRef,
      licenseKey: this.props.licenseKey,
      style: this.props.style,
      onBarkoderViewCreated: this.props.onBarkoderViewCreated,
      onDataReturned: this._onDataReturned,
      onBarkoderConfigCreated: this._onBarkoderConfigCreated
    });
  }
}
exports.BarkoderView = BarkoderView;
class Barkoder {
  constructor(barkoderViewRef) {
    this._barkoderViewRef = barkoderViewRef;
    this._promisesMap = new Map();
    this._promiseRequestId = 0;
    this._eventEmitter = new _reactNative.NativeEventEmitter(_reactNative.NativeModules.BarkoderEmitter);
  }
  _dispatchCommand(commandID, commandArgs) {
    _reactNative.UIManager.dispatchViewManagerCommand((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), commandID, commandArgs);
  }

  // Used only for Android
  onDataReturned(event) {
    let nativeEvent = event.nativeEvent;

    // 0 will be special case for scanning results
    if (nativeEvent.promiseRequestId == 0) {
      if (this._resultCallback) {
        // Parse the payload as JSON before passing to BarkoderResult
        const parsedPayload = typeof nativeEvent.payload === 'string' ? JSON.parse(nativeEvent.payload) : nativeEvent.payload;
        this._resultCallback(new Barkoder.BarkoderResult(parsedPayload));
      }
    } else if (this._promisesMap.has(nativeEvent.promiseRequestId)) {
      let [resolve, reject] = this._promisesMap.get(nativeEvent.promiseRequestId);
      this._promisesMap.delete(nativeEvent.promiseRequestId);
      if (nativeEvent.error) {
        reject(new Barkoder.BarkoderError(nativeEvent.error));
      } else {
        resolve(nativeEvent.payload);
      }
    }
  }

  // Used only for iOS
  startScanningEventEmmitter() {
    this._eventEmitter.removeAllListeners(BARKODER_RESULT_EVENT_NAME);
    this._eventEmitter.addListener(BARKODER_RESULT_EVENT_NAME, event => {
      const {
        data
      } = event;
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
  getMaxZoomFactor() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getMaxZoomFactor', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getMaxZoomFactor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the current zoom factor for the device's camera.
   * @returns A promise that resolves with the current zoom factor.
   */
  getCurrentZoomFactor() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getCurrentZoomFactor', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getCurrentZoomFactor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the zoom factor for the device's camera, adjusting the level of zoom during barcode scanning.
   * @param zoomFactor - The zoom factor to set.
   */
  setZoomFactor(zoomFactor) {
    this._dispatchCommand('setZoomFactor', [zoomFactor]);
  }

  /**
  * Checks whether the device has a built-in flash (torch) that can be used for illumination during barcode scanning.
  * @returns A promise that resolves with a boolean indicating whether flash is available.
  */
  isFlashAvailable() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isFlashAvailable', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isFlashAvailable((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the device's flash (torch) for illumination during barcode scanning.
   * @param enabled - A boolean indicating whether flash should be enabled.
   */
  setFlashEnabled(enabled) {
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
  startScanning(resultsCallback) {
    if (this.isAndroid()) {
      this._resultCallback = resultsCallback;

      // 0 will be special case for scanning results
      this._dispatchCommand('startScanning', [0]);
    } else if (this.isIos()) {
      this._resultCallback = resultsCallback;
      this.startScanningEventEmmitter();
      _reactNative.NativeModules.BarkoderReactNativeViewManager.startScanning((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
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
   * Freezes the current AR scanning session by capturing a still image from the camera feed.
   * Use only when AR mode is enabled to temporarily freeze the view while keeping overlays visible.
   */
  freezeScanning() {
    this._dispatchCommand('freezeScanning', []);
  }

  /**
    * Unfreezes the AR scanning session by removing the still image and reactivating the camera and overlays.
    * Use only when AR mode is enabled to restore the live AR view and continue scanning.
   */
  unfreezeScanning() {
    this._dispatchCommand('unfreezeScanning', []);
  }

  /**
    * Captures the latest camera frame
   */
  captureImage() {
    this._dispatchCommand('captureImage', []);
  }

  /**
  * Scan barcodes from base64 string image
  * @param base64 - image string.
  * @param resultsCallback - The callback function to handle barcode scanning events.
  */
  scanImage(base64, resultsCallback) {
    if (this.isAndroid()) {
      this._resultCallback = resultsCallback;

      // 0 will be special case for scanning results
      this._dispatchCommand('scanImage', [0, base64]);
    } else if (this.isIos()) {
      this._resultCallback = resultsCallback;
      this.startScanningEventEmmitter();
      _reactNative.NativeModules.BarkoderReactNativeViewManager.scanImage((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), base64);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the resolution for barcode scanning.
   * @returns A promise that resolves with the Barkoder resolution.
   */
  getBarkoderResolution() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getBarkoderResolution', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getBarkoderResolution((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the resolution for barcode scanning.
   */
  setBarkoderResolution(barkoderResolution) {
    this._dispatchCommand('setBarkoderResolution', [barkoderResolution]);
  }

  /**
   * Sets the decoding speed for barcode scanning.
   */
  setDecodingSpeed(decodingSpeed) {
    this._dispatchCommand('setDecodingSpeed', [decodingSpeed]);
  }

  /**
   * Sets the formatting type for barcode scanning.
   */
  setFormattingType(formatting) {
    this._dispatchCommand('setFormattingType', [formatting]);
  }

  /**
   * Sets the encoding character set for barcode scanning.
   * @param encodingCharacterSet - The encoding character set to be set.
   */
  setEncodingCharacterSet(encodingCharacterSet) {
    this._dispatchCommand('setEncodingCharacterSet', [encodingCharacterSet]);
  }

  /**
   * Retrieves the hexadecimal color code representing the line color used to indicate the location of detected barcodes.
   * @returns A promise that resolves with the location line color in hexadecimal format.
   */
  getLocationLineColorHex() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getLocationLineColorHex', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getLocationLineColorHex((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the color of the lines used to indicate the location of detected barcodes on the camera feed.
   * @param hexColor - The hexadecimal color value to set.
   * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
   */
  setLocationLineColor(hexColor) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setLocationLineColor', [promiseRequestId, hexColor]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setLocationLineColor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the current width setting for the lines indicating the location of detected barcodes on the camera feed.
   * @returns A promise that resolves with the location line width.
   */
  getLocationLineWidth() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getLocationLineWidth', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getLocationLineWidth((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the width of the lines indicating the location of detected barcodes on the camera feed.
   * @param lineWidth - The width of the location line to set.
   */
  setLocationLineWidth(lineWidth) {
    this._dispatchCommand('setLocationLineWidth', [lineWidth]);
  }

  /**
   * Retrieves the hexadecimal color code representing the line color of the Region of Interest (ROI) on the camera preview.
   * @returns A promise that resolves with the ROI line color in hexadecimal format.
   */
  getRoiLineColorHex() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getRoiLineColorHex', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getRoiLineColorHex((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the color of the lines outlining the Region of Interest (ROI) for barcode scanning on the camera feed.
   * @param hexColor - The hexadecimal representation of the color.
   * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
   */
  setRoiLineColor(hexColor) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setRoiLineColor', [promiseRequestId, hexColor]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setRoiLineColor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the current width setting for the lines outlining the Region of Interest (ROI) on the camera preview.
   * @returns A promise that resolves with the ROI line width.
   */
  getRoiLineWidth() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getRoiLineWidth', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getRoiLineWidth((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the width of the lines outlining the Region of Interest (ROI) for barcode scanning on the camera feed.
   * @param lineWidth - The width of the ROI line to set.
   */
  setRoiLineWidth(lineWidth) {
    this._dispatchCommand('setRoiLineWidth', [lineWidth]);
  }

  /**
   * Retrieves the hexadecimal color code representing the background color of the overlay within the Region of Interest (ROI) on the camera preview.
   * @returns A promise that resolves with the ROI overlay background color in hexadecimal format.
   */
  getRoiOverlayBackgroundColorHex() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getRoiOverlayBackgroundColorHex', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getRoiOverlayBackgroundColorHex((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the background color of the overlay within the Region of Interest (ROI) for barcode scanning on the camera feed.
   * @param hexColor - The hexadecimal color value to set for the ROI overlay background.
   * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
   */
  setRoiOverlayBackgroundColor(hexColor) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setRoiOverlayBackgroundColor', [promiseRequestId, hexColor]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setRoiOverlayBackgroundColor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if the session is closed on result enabled.
   * @returns A promise that resolves with a boolean indicating whether close session on result is enabled.
   */
  isCloseSessionOnResultEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isCloseSessionOnResultEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isCloseSessionOnResultEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the automatic closing of the scanning session upon detecting a barcode result.
   * @param enabled - A boolean indicating whether to enable close session on result.
   */
  setCloseSessionOnResultEnabled(enabled) {
    this._dispatchCommand('setCloseSessionOnResultEnabled', [enabled]);
  }

  /**
   * Checks if image result is enabled.
   * @returns A promise that resolves with a boolean indicating whether image result is enabled.
   */
  isImageResultEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isImageResultEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isImageResultEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the capturing and processing of image data when a barcode is successfully detected.
   * @param enabled - True to enable image result display, false to disable it.
   */
  setImageResultEnabled(enabled) {
    this._dispatchCommand('setImageResultEnabled', [enabled]);
  }

  /**
   * Checks if location in image result is enabled.
   * @returns A promise that resolves with a boolean indicating whether location in image result is enabled.
   */
  isLocationInImageResultEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isLocationInImageResultEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isLocationInImageResultEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the inclusion of barcode location information within the image data result.
   * @param enabled - True to display the location, false to hide it.
   */
  setLocationInImageResultEnabled(enabled) {
    this._dispatchCommand('setLocationInImageResultEnabled', [enabled]);
  }

  /**
   * Retrieves the region of interest (ROI).
   * @returns A promise that resolves with an array representing the region of interest (ROI).
   */
  getRegionOfInterest() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getRegionOfInterest', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getRegionOfInterest((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
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
  setRegionOfInterest(left, top, width, height) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setRegionOfInterest', [promiseRequestId, left, top, width, height]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setRegionOfInterest((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), left, top, width, height);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the threads limit.
   * @returns {Promise<number>} A promise that resolves with the threads limit.
   */
  getThreadsLimit() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getThreadsLimit', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getThreadsLimit((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the threads limit.
   * @param threadsLimit - The limit for the number of threads to set.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the threads limit was successfully set.
   */
  setThreadsLimit(threadsLimit) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setThreadsLimit', [promiseRequestId, threadsLimit]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setThreadsLimit((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), threadsLimit);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if location in preview is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether location in preview is enabled.
   */
  isLocationInPreviewEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isLocationInPreviewEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isLocationInPreviewEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the display of barcode location information on the camera preview.
   * @param enabled - True to display the location, false to hide it.
   */
  setLocationInPreviewEnabled(enabled) {
    this._dispatchCommand('setLocationInPreviewEnabled', [enabled]);
  }

  /**
   * Checks if pinch to zoom is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether pinch to zoom is enabled.
   */
  isPinchToZoomEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isPinchToZoomEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isPinchToZoomEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the pinch-to-zoom feature for adjusting the zoom level during barcode scanning.
   * @param enabled - True to enable pinch-to-zoom, false to disable it.
   */
  setPinchToZoomEnabled(enabled) {
    this._dispatchCommand('setPinchToZoomEnabled', [enabled]);
  }

  /**
   * Checks if the region of interest (ROI) is visible.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the ROI is visible.
   */
  isRegionOfInterestVisible() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isRegionOfInterestVisible', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isRegionOfInterestVisible((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the visibility of the Region of Interest (ROI) on the camera preview.
   * @param visible - True to make the ROI visible, false to hide it.
   */
  setRegionOfInterestVisible(visible) {
    this._dispatchCommand('setRegionOfInterestVisible', [visible]);
  }

  /**
   * Retrieves the value indicating whether a beep sound is played on successful barcode scanning.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the beep on success is enabled.
   */
  isBeepOnSuccessEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isBeepOnSuccessEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isBeepOnSuccessEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the audible beep sound upon successfully decoding a barcode.
   * @param enabled - True to enable beep sound, false to disable it.
   */
  setBeepOnSuccessEnabled(enabled) {
    this._dispatchCommand('setBeepOnSuccessEnabled', [enabled]);
  }

  /**
   * Retrieves the value indicating whether vibration is enabled on successful barcode scanning.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether vibrate on success is enabled.
   */
  isVibrateOnSuccessEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isVibrateOnSuccessEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isVibrateOnSuccessEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the vibration on successful barcode scanning.
   * @param enabled - True to enable vibration, false to disable it.
   */
  setVibrateOnSuccessEnabled(enabled) {
    this._dispatchCommand('setVibrateOnSuccessEnabled', [enabled]);
  }

  /**
   * Retrieves the character set used for encoding barcode data.
   * @returns {Promise<string>} A promise that resolves with the encoding character set.
   */
  getEncodingCharacterSet() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getEncodingCharacterSet', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getEncodingCharacterSet((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the version of the Barkoder SDK.
   * @returns {Promise<string>} A promise that resolves with the version of the Barkoder SDK.
   */
  getVersion() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getVersion', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getVersion((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the version of the Barkoder library.
   * @returns {Promise<string>} A promise that resolves with the version of the Barkoder library.
   */
  getLibVersion() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getLibVersion', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getLibVersion((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the current decoding speed setting for barcode scanning.
   * @returns {Promise<Barkoder.DecodingSpeed>} A promise that resolves with the decoding speed configuration.
   */
  getDecodingSpeed() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getDecodingSpeed', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getDecodingSpeed((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the formatting type used for presenting decoded barcode data..
   * @returns {Promise<Barkoder.FormattingType>} A promise that resolves with the formatting type configuration.
   */
  getFormattingType() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getFormattingType', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getFormattingType((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if a specific barcode type is enabled.
   * @param barcodeType - The barcode type to check.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the barcode type is enabled.
   */
  isBarcodeTypeEnabled(barcodeType) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isBarcodeTypeEnabled', [promiseRequestId, barcodeType]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isBarcodeTypeEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), barcodeType);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the length range of the specified barcode type.
   * @param barcodeType - The barcode type to get the length range for.
   * @returns {Promise<number[]>} A promise that resolves with an array representing the length range of the barcode type.
   */
  getBarcodeTypeLengthRange(barcodeType) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getBarcodeTypeLengthRange', [promiseRequestId, barcodeType]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getBarcodeTypeLengthRange((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), barcodeType);
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
  setBarcodeTypeLengthRange(barcodeType, min, max) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setBarcodeTypeLengthRange', [promiseRequestId, barcodeType, min, max]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setBarcodeTypeLengthRange((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), barcodeType, min, max);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Configures the Barkoder functionality based on the provided configuration.
   * @param barkoderConfig - The configuration parameters for the Barkoder.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the configuration was successful.
   */
  configureBarkoder(barkoderConfig) {
    const jsonString = barkoderConfig.toJsonString();
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('configureBarkoder', [promiseRequestId, jsonString]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.configureBarkoder((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), jsonString);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables the specified barcode type for scanning.
   * @param barcodeType - The barcode type to enable or disable.
   * @param enabled - True to enable the barcode type, false to disable it.
   */
  setBarcodeTypeEnabled(barcodeType, enabled) {
    this._dispatchCommand('setBarcodeTypeEnabled', [barcodeType, enabled]);
  }

  /**
   * Retrieves the MSI checksum type.
   * @returns {Promise<Barkoder.MsiChecksumType>} A promise that resolves with the checksum type for MSI barcodes.
   */
  getMsiChecksumType() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getMsiChecksumType', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getMsiChecksumType((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
  * Set the MSI checksum type.
  * @param msiChecksumType - The MSI checksum type to set.
  */
  setMsiChecksumType(msiChecksumType) {
    this._dispatchCommand('setMsiChecksumType', [msiChecksumType]);
  }

  /**
   * Retrieves the checksum type for Code 39 barcodes.
   * @returns {Promise<Barkoder.Code39ChecksumType>} A promise that resolves with the checksum type for Code 39 barcodes.
   */
  getCode39ChecksumType() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getCode39ChecksumType', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getCode39ChecksumType((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the checksum type for Code 39 barcodes.
   * @param code39ChecksumType - The checksum type to set for Code 39 barcodes.
   */
  setCode39ChecksumType(code39ChecksumType) {
    this._dispatchCommand('setCode39ChecksumType', [code39ChecksumType]);
  }

  /**
   * Retrieves the Code11 checksum type.
   * @returns {Promise<Barkoder.Code11ChecksumType>} A promise that resolves with the checksum type for Code 11 barcodes.
   */
  getCode11ChecksumType() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getCode11ChecksumType', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getCode11ChecksumType((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the checksum type for Code 11 barcodes.
   * @param code11ChecksumType - The checksum type to set for Code 11 barcodes.
   */
  setCode11ChecksumType(code11ChecksumType) {
    this._dispatchCommand('setCode11ChecksumType', [code11ChecksumType]);
  }

  /**
   * Sets the maximum number of results to be returned from barcode scanning.
   * @param maximumResultsCount - The maximum number of results to return.
   */
  setMaximumResultsCount(maximumResultsCount) {
    this._dispatchCommand('setMaximumResultsCount', [maximumResultsCount]);
  }

  /**
   * Sets the caching duration (in milliseconds) for multi-code results.
   * @param multicodeCachingDuration - The caching duration (in milliseconds) for multi-code results.
   */
  setMulticodeCachingDuration(multicodeCachingDuration) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setMulticodeCachingDuration', [promiseRequestId, multicodeCachingDuration]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setMulticodeCachingDuration((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), multicodeCachingDuration);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether multi-code caching is enabled.
   * @param multicodeCachingEnabled - A boolean indicating whether to enable multi-code caching.
   */
  setMulticodeCachingEnabled(multicodeCachingEnabled) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setMulticodeCachingEnabled', [promiseRequestId, multicodeCachingEnabled]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setMulticodeCachingEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), multicodeCachingEnabled);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Gets the maximum number of results to be returned from barcode scanning.
   * @returns {Promise<number>} A promise that resolves with the maximum number of results to return.
   */
  getMaximumResultsCount() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getMaximumResultsCount', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getMaximumResultsCount((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
  * Retrieves whether Direct Part Marking (DPM) mode for Datamatrix barcodes is enabled
  * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether DPM mode for Datamatrix barcodes is enabled.
  */
  isDatamatrixDpmModeEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isDatamatrixDpmModeEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isDatamatrixDpmModeEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether the Direct Part Marking (DPM) mode for Datamatrix barcodes is enabled.
   * @param enabled - True to enable DPM mode, false to disable it.
   */
  setDatamatrixDpmModeEnabled(enabled) {
    this._dispatchCommand('setDatamatrixDpmModeEnabled', [enabled]);
  }

  /**
  * Retrieves whether Direct Part Marking (DPM) mode for QR barcodes is enabled
  * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether DPM mode for QR barcodes is enabled.
  */
  isQrDpmModeEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isQrDpmModeEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isQrDpmModeEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
  * Sets whether the Direct Part Marking (DPM) mode for QR barcodes is enabled.
  * @param enabled - True to enable DPM mode, false to disable it.
  */
  setQrDpmModeEnabled(enabled) {
    this._dispatchCommand('setQrDpmModeEnabled', [enabled]);
  }

  /**
  * Retrieves whether Direct Part Marking (DPM) mode for QR Micro barcodes is enabled
  * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether DPM mode for QR Micro barcodes is enabled.
  */
  isQrMicroDpmModeEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isQrMicroDpmModeEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isQrMicroDpmModeEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
  * Sets whether the Direct Part Marking (DPM) mode for QR Micro barcodes is enabled.
  * @param enabled - True to enable DPM mode, false to disable it.
  */
  setQrMicroDpmModeEnabled(enabled) {
    this._dispatchCommand('setQrMicroDpmModeEnabled', [enabled]);
  }

  /**
  * Retrieves whether Master checksum is enabled when scanning ID Documents 
  * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether Master checksum is enabled when scanning ID Documents 
  */
  isIdDocumentMasterChecksumEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isIdDocumentMasterChecksumEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isIdDocumentMasterChecksumEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
  * Sets whether Master checksum should be requiered when scanning ID Documents
  * @param enabled - True to enable Master checksum, false to disable it.
  */
  setIdDocumentMasterChecksumEnabled(enabled) {
    this._dispatchCommand('setIdDocumentMasterChecksumEnabled', [enabled]);
  }

  /**
   * Gets the value indicating whether deblurring is enabled for UPC/EAN barcodes.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the deblurring feature for UPC/EAN barcodes is enabled.
   */
  isUpcEanDeblurEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isUpcEanDeblurEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isUpcEanDeblurEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether the deblurring feature for UPC/EAN barcodes is enabled.
   * @param enabled - A boolean indicating whether to enable the deblurring feature for UPC/EAN barcodes.
   */
  setUpcEanDeblurEnabled(enabled) {
    this._dispatchCommand('setUpcEanDeblurEnabled', [enabled]);
  }

  /**
   * Checks if the detection of misshaped 1D barcodes is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the detection of misshaped 1D barcodes is enabled.
   */
  isMisshaped1DEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isMisshaped1DEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isMisshaped1DEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether the detection of misshaped 1D barcodes is enabled.
   * @param enabled - A boolean indicating whether to enable the detection of misshaped 1D barcodes.
   */
  setEnableMisshaped1DEnabled(enabled) {
    this._dispatchCommand('setEnableMisshaped1DEnabled', [enabled]);
  }

  /**
   * Sets whether the barcode thumbnail on result is enabled.
   * @param enabled - A boolean indicating whether to enable the barcode thumbnail on result.
   */
  setBarcodeThumbnailOnResultEnabled(enabled) {
    this._dispatchCommand('setBarcodeThumbnailOnResultEnabled', [enabled]);
  }

  /**
   * Sets the threshold between duplicate scans.
   * @param thresholdBetweenDuplicatesScans - The threshold between duplicate scans.
   */
  setThresholdBetweenDuplicatesScans(thresholdBetweenDuplicatesScans) {
    this._dispatchCommand('setThresholdBetweenDuplicatesScans', [thresholdBetweenDuplicatesScans]);
  }

  /**
   * Retrieves the threshold between duplicate scans.
   * @returns {Promise<number>} A promise that resolves with the threshold between duplicate scans.
   */
  getThresholdBetweenDuplicatesScans() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getThresholdBetweenDuplicatesScans', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getThresholdBetweenDuplicatesScans((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if the barcode thumbnail on result is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the barcode thumbnail on result is enabled.
   */
  isBarcodeThumbnailOnResultEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isBarcodeThumbnailOnResultEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isBarcodeThumbnailOnResultEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the caching duration (in milliseconds) for multi-code results.
   * @returns {Promise<number>} A promise that resolves with the caching duration (in milliseconds) for multi-code results.
   */
  getMulticodeCachingDuration() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getMulticodeCachingDuration', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getMulticodeCachingDuration((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves whether multi-code caching is enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether multi-code caching is enabled.
   */
  getMulticodeCachingEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getMulticodeCachingEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getMulticodeCachingEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks if Vehicle Identification Number (VIN) restrictions are enabled.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether VIN restrictions are enabled.
   */
  isVINRestrictionsEnabled() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isVINRestrictionsEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isVINRestrictionsEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets whether Vehicle Identification Number (VIN) restrictions are enabled.
   * @param enabled - A boolean indicating whether to enable VIN restrictions.
   */
  setEnableVINRestrictions(enabled) {
    this._dispatchCommand('setEnableVINRestrictions', [enabled]);
  }

  /**
  * Sets whether the UPC-E barcodes should be expanded to UPC-A format.
  * @param enabled - A boolean indicating whether to enable the expansion for UPC-E barcodes.
  */
  setUPCEexpandToUPCA(enabled) {
    this._dispatchCommand('setUPCEexpandToUPCA', [enabled]);
  }

  /**
  * Sets whether the UPC-E1 barcodes should be expanded to UPC-A format.
  * @param enabled - A boolean indicating whether to enable the expansion for UPC-E1 barcodes.
  */
  setUPCE1expandToUPCA(enabled) {
    this._dispatchCommand('setUPCE1expandToUPCA', [enabled]);
  }

  /**
  * Retrieves the hexadecimal color code representing the line color of the scanning indicator on the camera preview.
  * @returns A promise that resolves with the scanning indicator line color in hexadecimal format.
  */
  getScanningIndicatorColorHex() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getScanningIndicatorColorHex', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getScanningIndicatorColorHex((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the color of the lines outlining the scanning indicator for barcode scanning on the camera feed.
   * @param hexColor - The hexadecimal representation of the color.
   * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
   */
  setScanningIndicatorColor(hexColor) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setScanningIndicatorColor', [promiseRequestId, hexColor]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setScanningIndicatorColor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
  * Retrieves the current width setting for the scanning indicator on the camera preview.
  * @returns A promise that resolves with the scanning indicator width.
  */
  getScanningIndicatorWidth() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getScanningIndicatorWidth', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getScanningIndicatorWidth((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the width of the scanning indicator for barcode scanning on the camera feed.
   * @param lineWidth - The width of the scanning indicator to set.
   */
  setScanningIndicatorWidth(lineWidth) {
    this._dispatchCommand('setScanningIndicatorWidth', [lineWidth]);
  }

  /**
  * Retrieves the current animation setting for the scanning indicator on the camera preview.
  * @returns A promise that resolves the scanning indicator animaiton.
  */
  getScanningIndicatorAnimation() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getScanningIndicatorAnimation', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getScanningIndicatorAnimation((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the animation of the scanning indicator for barcode scanning on the camera feed.
   * @param animation - The animation of the scanning indicator to set.
   */
  setScanningIndicatorAnimation(animation) {
    this._dispatchCommand('setScanningIndicatorAnimation', [animation]);
  }

  /**
  * Retrieves if the scanning indicator is set to be always visible on the camera preview.
  * @returns A promise that resolves the scanning indicator always visible state.
  */
  isScanningIndicatorAlwaysVisible() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isScanningIndicatorAlwaysVisible', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isScanningIndicatorAlwaysVisible((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the scanning indicator to be always shown on the camera feed.
   * @param value - A boolean indicating whether the scanning indicator should always remain visible.
   */
  setScanningIndicatorAlwaysVisible(value) {
    this._dispatchCommand('setScanningIndicatorAlwaysVisible', [value]);
  }

  /**
  * Setting custom option.
  * @param string - string value
  * @param int - int value
  */
  setCustomOption(string, int) {
    this._dispatchCommand('setCustomOption', [string, int]);
  }

  /**
   * Sets the camera's exposure dynamically based on the provided intensity, cycling through predefined compensation values.
   * @param intesnity - The integer value for the exposure intensity.
   */
  setDynamicExposure(intesnity) {
    this._dispatchCommand('setDynamicExposure', [intesnity]);
  }

  /**
   * Sets the camera to use the center of the viewfinder for focus and exposure.
   * @param value - A boolean indicating whether the center of the viewfinder should be used.
   */
  setCentricFocusAndExposure(value) {
    this._dispatchCommand('setCentricFocusAndExposure', [value]);
  }

  /**
   * Sets wheter Composite Mode should be enabled when scanning.
   * @param value - The integer value if composite mode should be enabled.
   */
  setEnableComposite(value) {
    this._dispatchCommand('setEnableComposite', [value]);
  }

  /**
   * Enable or disable video stabilization for smoother video capture.
   * @param value - A boolean indicating whether video stabilization should be enabled/disabled.
   */
  setVideoStabilization(value) {
    this._dispatchCommand('setVideoStabilization', [value]);
  }

  /**
   * Sets the camera to be used for scanning (back/front).
   * @param value - The value which camera should be used.
   */
  setCamera(value) {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setCamera', [promiseRequestId, value]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setCamera((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), value);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Enables or disables showing duplicate barcode locations on the preview overlay.
   * @param value - `true` to show duplicates locations, `false` to hide them.
   */
  setShowDuplicatesLocations(value) {
    this._dispatchCommand('setShowDuplicatesLocations', [value]);
  }

  /**
   * Sets the AR mode used for barcode scanning visualization.
   * @param value - AR mode from BarkoderARMode enum.
   */
  setARMode(value) {
    this._dispatchCommand('setARMode', [value]);
  }

  /**
   * Sets the delay (in milliseconds) after which a detected AR result is removed.
   * @param value - Delay in milliseconds.
   */
  setARResultDisappearanceDelayMs(value) {
    this._dispatchCommand('setARResultDisappearanceDelayMs', [value]);
  }

  /**
   * Sets the speed of AR location overlay transition.
   * @param value - Numeric speed factor.
   */
  setARLocationTransitionSpeed(value) {
    this._dispatchCommand('setARLocationTransitionSpeed', [value]);
  }

  /**
   * Sets the AR overlay refresh mode.
   * @param value - Overlay refresh mode.
   */
  setAROverlayRefresh(value) {
    this._dispatchCommand('setAROverlayRefresh', [value]);
  }

  /**
   * Sets the color for selected AR overlay locations.
   * @param hexColor - Color in hexadecimal format (e.g., "#FF0000").
   * @returns A promise resolving to a boolean indicating success.
   */
  setARSelectedLocationColor(hexColor) {
    if (this.isAndroid()) {
      const promisesMap = this._promisesMap;
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setARSelectedLocationColor', [promiseRequestId, hexColor]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setARSelectedLocationColor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the color for non-selected AR overlay locations.
   * @param hexColor - Color in hexadecimal format (e.g., "#00FF00").
   * @returns A promise resolving to a boolean indicating success.
   */
  setARNonSelectedLocationColor(hexColor) {
    if (this.isAndroid()) {
      const promisesMap = this._promisesMap;
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setARNonSelectedLocationColor', [promiseRequestId, hexColor]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setARNonSelectedLocationColor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets line width for selected barcode overlay.
   * @param value - Line width.
   */
  setARSelectedLocationLineWidth(value) {
    this._dispatchCommand('setARSelectedLocationLineWidth', [value]);
  }

  /**
   * Sets line width for non-selected barcode overlay.
   * @param value - Line width.
   */
  setARNonSelectedLocationLineWidth(value) {
    this._dispatchCommand('setARNonSelectedLocationLineWidth', [value]);
  }

  /**
   * Sets AR location overlay type.
   * @param value - Location overlay type.
   */
  setARLocationType(value) {
    this._dispatchCommand('setARLocationType', [value]);
  }

  /**
   * Enables or disables double-tap to freeze in AR mode.
   * @param enabled - `true` to enable double-tap freezing.
   */
  setARDoubleTapToFreezeEnabled(enabled) {
    this._dispatchCommand('setARDoubleTapToFreezeEnabled', [enabled]);
  }

  /**
   * Enables or disables the capturing and processing of image data when a barcode is selected for AR mode.
   * @param enabled - A boolean indicating whether to enable image result.
   */
  setARImageResultEnabled(enabled) {
    this._dispatchCommand('setARImageResultEnabled', [enabled]);
  }

  /**
   * Enables or disables the barcode thumbnail on result for AR mode.
   * @param enabled - A boolean indicating whether to enable barcode thumbnail on result.
   */
  setARBarcodeThumbnailOnResultEnabled(enabled) {
    this._dispatchCommand('setARBarcodeThumbnailOnResultEnabled', [enabled]);
  }

  /**
   * Sets the maximum number of results allowed in a single AR scanning session.
   * @param value - Maximum number of results.
   */
  setARResultLimit(value) {
    this._dispatchCommand('setARResultLimit', [value]);
  }

  /**
   * Sets whether scanning continues when the result limit is reached (only in `.interactiveDisabled` mode).
   * @param value - Boolean indicating whether to continue scanning.
   */
  setARContinueScanningOnLimit(value) {
    this._dispatchCommand('setARContinueScanningOnLimit', [value]);
  }

  /**
   * Sets whether results are emitted only at AR session end (or when the limit is reached).
   * @param value - Boolean indicating whether to emit results only at session end.
   */
  setAREmitResultsAtSessionEndOnly(value) {
    this._dispatchCommand('setAREmitResultsAtSessionEndOnly', [value]);
  }

  /**
   * Sets height of the AR header label.
   * @param value - Header height.
   */
  setARHeaderHeight(value) {
    this._dispatchCommand('setARHeaderHeight', [value]);
  }

  /**
   * Sets AR header display mode.
   * @param value - Show mode for header (always, never, onSelected).
   */
  setARHeaderShowMode(value) {
    this._dispatchCommand('setARHeaderShowMode', [value]);
  }

  /**
   * Sets max height of AR header text.
   * @param value - Maximum text height.
   */
  setARHeaderMaxTextHeight(value) {
    this._dispatchCommand('setARHeaderMaxTextHeight', [value]);
  }

  /**
   * Sets min height of AR header text.
   * @param value - Minimum text height.
   */
  setARHeaderMinTextHeight(value) {
    this._dispatchCommand('setARHeaderMinTextHeight', [value]);
  }

  /**
   * Sets the text color for selected barcode headers.
   * @param hexColor - Color in hexadecimal format (e.g., "#FFFFFF").
   * @returns A promise resolving to a boolean indicating success.
   */
  setARHeaderTextColorSelected(hexColor) {
    if (this.isAndroid()) {
      const promisesMap = this._promisesMap;
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setARHeaderTextColorSelected', [promiseRequestId, hexColor]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setARHeaderTextColorSelected((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the text color for non-selected barcode headers.
   * @param hexColor - Color in hexadecimal format (e.g., "#888888").
   * @returns A promise resolving to a boolean indicating success.
   */
  setARHeaderTextColorNonSelected(hexColor) {
    if (this.isAndroid()) {
      const promisesMap = this._promisesMap;
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('setARHeaderTextColorNonSelected', [promiseRequestId, hexColor]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.setARHeaderTextColorNonSelected((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Sets the horizontal margin applied to the header text in AR mode, creating equal padding on both sides.
   * @param value - Horizontal Margin.
   */
  setARHeaderHorizontalTextMargin(value) {
    this._dispatchCommand('setARHeaderHorizontalTextMargin', [value]);
  }

  /**
   * Sets the vertical margin applied to the header text in AR mode, creating equal padding on both sides.
   * @param value - Vertical Margin.
   */
  setARHeaderVerticalTextMargin(value) {
    this._dispatchCommand('setARHeaderVerticalTextMargin', [value]);
  }

  /**
   * Sets format string for AR header text.
   * @param value - Format string (e.g., "[barcode_text]").
   */
  setARHeaderTextFormat(value) {
    this._dispatchCommand('setARHeaderTextFormat', [value]);
  }

  /**
   * Retrieves whether showing duplicate barcode locations in the AR view is enabled.
   * @returns A promise that resolves with a boolean indicating if duplicates are shown.
   */
  getShowDuplicatesLocations() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getShowDuplicatesLocations', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getShowDuplicatesLocations((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the current AR mode used for barcode scanning.
   * @returns A promise that resolves with the current AR mode.
   */
  getARMode() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARMode', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARMode((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the delay after which AR results disappear once detected.
   * @returns A promise that resolves with the disappearance delay in milliseconds.
   */
  getARResultDisappearanceDelayMs() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARResultDisappearanceDelayMs', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARResultDisappearanceDelayMs((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the transition speed for AR barcode location overlays.
   * @returns A promise that resolves with the transition speed value.
   */
  getARLocationTransitionSpeed() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARLocationTransitionSpeed', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARLocationTransitionSpeed((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the AR overlay refresh mode.
   * @returns A promise that resolves with the AR overlay refresh mode.
   */
  getAROverlayRefresh() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getAROverlayRefresh', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getAROverlayRefresh((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the color used for selected barcode overlays in AR mode.
   * @returns A promise that resolves with a hex color string.
   */
  getARSelectedLocationColor() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARSelectedLocationColor', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARSelectedLocationColor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the color used for non-selected barcode overlays in AR mode.
   * @returns A promise that resolves with a hex color string.
   */
  getARNonSelectedLocationColor() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARNonSelectedLocationColor', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARNonSelectedLocationColor((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the line width for selected barcode overlays in AR mode.
   * @returns A promise that resolves with the selected overlay line width.
   */
  getARSelectedLocationLineWidth() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARSelectedLocationLineWidth', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARSelectedLocationLineWidth((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the line width for non-selected barcode overlays in AR mode.
   * @returns A promise that resolves with the non-selected overlay line width.
   */
  getARNonSelectedLocationLineWidth() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARNonSelectedLocationLineWidth', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARNonSelectedLocationLineWidth((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the style of AR location overlays (tight, bounding box, none).
   * @returns A promise that resolves with the overlay style.
   */
  getARLocationType() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARLocationType', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARLocationType((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Checks whether double-tap to freeze is enabled in AR mode.
   * @returns A promise that resolves with a boolean indicating if the feature is enabled.
   */
  isARDoubleTapToFreezeEnabled() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isARDoubleTapToFreezeEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isARDoubleTapToFreezeEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves whether image result is enabled for AR mode.
   * @returns A promise that resolves with a boolean indicating if the feature is enabled.
   */
  isARImageResultEnabled() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isARImageResultEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isARImageResultEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves whether barcode thumbnail on result is enabled for AR mode.
   * @returns A promise that resolves with a boolean indicating if the feature is enabled.
   */
  isARBarcodeThumbnailOnResultEnabled() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('isARBarcodeThumbnailOnResultEnabled', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.isARBarcodeThumbnailOnResultEnabled((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the maximum number of results allowed in a single AR scanning session.
   * @returns A promise resolving to the maximum result limit.
   */
  getARResultLimit() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARResultLimit', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARResultLimit((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves whether scanning continues when the result limit is reached (only in `.interactiveDisabled` mode).
   * @returns A promise resolving to a boolean indicating if continue scanning is enabled.
   */
  getARContinueScanningOnLimit() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARContinueScanningOnLimit', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARContinueScanningOnLimit((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves whether results are emitted only at AR session end (or when the limit is reached).
   * @returns A promise resolving to a boolean indicating if results emit only at session end.
   */
  getAREmitResultsAtSessionEndOnly() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getAREmitResultsAtSessionEndOnly', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getAREmitResultsAtSessionEndOnly((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the header height above barcode in AR mode.
   * @returns A promise that resolves with the header height.
   */
  getARHeaderHeight() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARHeaderHeight', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARHeaderHeight((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the header display mode (always, on selected, never).
   * @returns A promise that resolves with the header show mode.
   */
  getARHeaderShowMode() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARHeaderShowMode', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARHeaderShowMode((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the maximum text height for AR headers.
   * @returns A promise that resolves with the maximum text height.
   */
  getARHeaderMaxTextHeight() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARHeaderMaxTextHeight', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARHeaderMaxTextHeight((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the minimum text height for AR headers.
   * @returns A promise that resolves with the minimum text height.
   */
  getARHeaderMinTextHeight() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARHeaderMinTextHeight', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARHeaderMinTextHeight((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the header text color for selected barcodes.
   * @returns A promise that resolves with the hex color string.
   */
  getARHeaderTextColorSelected() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARHeaderTextColorSelected', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARHeaderTextColorSelected((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the header text color for non-selected barcodes.
   * @returns A promise that resolves with the hex color string.
   */
  getARHeaderTextColorNonSelected() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARHeaderTextColorNonSelected', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARHeaderTextColorNonSelected((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the horizontal margin for AR header text.
   * @returns A promise that resolves with the horizontal margin value.
   */
  getARHeaderHorizontalTextMargin() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARHeaderHorizontalTextMargin', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARHeaderHorizontalTextMargin((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the vertical margin for AR header text.
   * @returns A promise that resolves with the vertical margin value.
   */
  getARHeaderVerticalTextMargin() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARHeaderVerticalTextMargin', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARHeaderVerticalTextMargin((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }

  /**
   * Retrieves the format string used for AR header text.
   * @returns A promise that resolves with the header text format string.
   */
  getARHeaderTextFormat() {
    if (this.isAndroid()) {
      const promiseRequestId = ++this._promiseRequestId;
      const promise = new Promise((resolve, reject) => {
        this._promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getARHeaderTextFormat', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return _reactNative.NativeModules.BarkoderReactNativeViewManager.getARHeaderTextFormat((0, _reactNative.findNodeHandle)(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  showLogMessages(show) {
    this._dispatchCommand('showLogMessages', [show]);
  }
  isIos() {
    return _reactNative.Platform.OS === 'ios';
  }
  isAndroid() {
    return _reactNative.Platform.OS === 'android';
  }
}

// Keep these classes in this file, so we can have same "Barkoder" alias for the class and for the namespace
exports.Barkoder = Barkoder;
(function (_Barkoder) {
  let DecodingSpeed = /*#__PURE__*/function (DecodingSpeed) {
    DecodingSpeed[DecodingSpeed["fast"] = 0] = "fast";
    DecodingSpeed[DecodingSpeed["normal"] = 1] = "normal";
    DecodingSpeed[DecodingSpeed["slow"] = 2] = "slow";
    DecodingSpeed[DecodingSpeed["rigorous"] = 3] = "rigorous";
    return DecodingSpeed;
  }({});
  _Barkoder.DecodingSpeed = DecodingSpeed;
  let FormattingType = /*#__PURE__*/function (FormattingType) {
    FormattingType[FormattingType["disabled"] = 0] = "disabled";
    FormattingType[FormattingType["automatic"] = 1] = "automatic";
    FormattingType[FormattingType["gs1"] = 2] = "gs1";
    FormattingType[FormattingType["aamva"] = 3] = "aamva";
    FormattingType[FormattingType["sadl"] = 4] = "sadl";
    return FormattingType;
  }({});
  _Barkoder.FormattingType = FormattingType;
  let MsiChecksumType = /*#__PURE__*/function (MsiChecksumType) {
    MsiChecksumType[MsiChecksumType["disabled"] = 0] = "disabled";
    MsiChecksumType[MsiChecksumType["mod10"] = 1] = "mod10";
    MsiChecksumType[MsiChecksumType["mod11"] = 2] = "mod11";
    MsiChecksumType[MsiChecksumType["mod1010"] = 3] = "mod1010";
    MsiChecksumType[MsiChecksumType["mod1110"] = 4] = "mod1110";
    MsiChecksumType[MsiChecksumType["mod11IBM"] = 5] = "mod11IBM";
    MsiChecksumType[MsiChecksumType["mod1110IBM"] = 6] = "mod1110IBM";
    return MsiChecksumType;
  }({});
  _Barkoder.MsiChecksumType = MsiChecksumType;
  let Code39ChecksumType = /*#__PURE__*/function (Code39ChecksumType) {
    Code39ChecksumType[Code39ChecksumType["disabled"] = 0] = "disabled";
    Code39ChecksumType[Code39ChecksumType["enabled"] = 1] = "enabled";
    return Code39ChecksumType;
  }({});
  _Barkoder.Code39ChecksumType = Code39ChecksumType;
  let Code11ChecksumType = /*#__PURE__*/function (Code11ChecksumType) {
    Code11ChecksumType[Code11ChecksumType["disabled"] = 0] = "disabled";
    Code11ChecksumType[Code11ChecksumType["single"] = 1] = "single";
    Code11ChecksumType[Code11ChecksumType["double"] = 2] = "double";
    return Code11ChecksumType;
  }({});
  _Barkoder.Code11ChecksumType = Code11ChecksumType;
  let BarkoderCameraPosition = /*#__PURE__*/function (BarkoderCameraPosition) {
    BarkoderCameraPosition[BarkoderCameraPosition["BACK"] = 0] = "BACK";
    BarkoderCameraPosition[BarkoderCameraPosition["FRONT"] = 1] = "FRONT";
    return BarkoderCameraPosition;
  }({});
  _Barkoder.BarkoderCameraPosition = BarkoderCameraPosition;
  let BarkoderResolution = /*#__PURE__*/function (BarkoderResolution) {
    BarkoderResolution[BarkoderResolution["HD"] = 0] = "HD";
    BarkoderResolution[BarkoderResolution["FHD"] = 1] = "FHD";
    BarkoderResolution[BarkoderResolution["UHD"] = 2] = "UHD";
    return BarkoderResolution;
  }({});
  _Barkoder.BarkoderResolution = BarkoderResolution;
  let BarkoderARMode = /*#__PURE__*/function (BarkoderARMode) {
    BarkoderARMode[BarkoderARMode["off"] = 0] = "off";
    BarkoderARMode[BarkoderARMode["interactiveDisabled"] = 1] = "interactiveDisabled";
    BarkoderARMode[BarkoderARMode["interactiveEnabled"] = 2] = "interactiveEnabled";
    BarkoderARMode[BarkoderARMode["nonInteractive"] = 3] = "nonInteractive";
    return BarkoderARMode;
  }({});
  _Barkoder.BarkoderARMode = BarkoderARMode;
  let BarkoderAROverlayRefresh = /*#__PURE__*/function (BarkoderAROverlayRefresh) {
    BarkoderAROverlayRefresh[BarkoderAROverlayRefresh["smooth"] = 0] = "smooth";
    BarkoderAROverlayRefresh[BarkoderAROverlayRefresh["normal"] = 1] = "normal";
    return BarkoderAROverlayRefresh;
  }({});
  _Barkoder.BarkoderAROverlayRefresh = BarkoderAROverlayRefresh;
  let BarkoderARLocationType = /*#__PURE__*/function (BarkoderARLocationType) {
    BarkoderARLocationType[BarkoderARLocationType["none"] = 0] = "none";
    BarkoderARLocationType[BarkoderARLocationType["tight"] = 1] = "tight";
    BarkoderARLocationType[BarkoderARLocationType["boundingBox"] = 2] = "boundingBox";
    return BarkoderARLocationType;
  }({});
  _Barkoder.BarkoderARLocationType = BarkoderARLocationType;
  let BarkoderARHeaderShowMode = /*#__PURE__*/function (BarkoderARHeaderShowMode) {
    BarkoderARHeaderShowMode[BarkoderARHeaderShowMode["never"] = 0] = "never";
    BarkoderARHeaderShowMode[BarkoderARHeaderShowMode["always"] = 1] = "always";
    BarkoderARHeaderShowMode[BarkoderARHeaderShowMode["onSelected"] = 2] = "onSelected";
    return BarkoderARHeaderShowMode;
  }({});
  _Barkoder.BarkoderARHeaderShowMode = BarkoderARHeaderShowMode;
  let BarcodeType = /*#__PURE__*/function (BarcodeType) {
    BarcodeType[BarcodeType["aztec"] = 0] = "aztec";
    BarcodeType[BarcodeType["aztecCompact"] = 1] = "aztecCompact";
    BarcodeType[BarcodeType["qr"] = 2] = "qr";
    BarcodeType[BarcodeType["qrMicro"] = 3] = "qrMicro";
    BarcodeType[BarcodeType["code128"] = 4] = "code128";
    BarcodeType[BarcodeType["code93"] = 5] = "code93";
    BarcodeType[BarcodeType["code39"] = 6] = "code39";
    BarcodeType[BarcodeType["codabar"] = 7] = "codabar";
    BarcodeType[BarcodeType["code11"] = 8] = "code11";
    BarcodeType[BarcodeType["msi"] = 9] = "msi";
    BarcodeType[BarcodeType["upcA"] = 10] = "upcA";
    BarcodeType[BarcodeType["upcE"] = 11] = "upcE";
    BarcodeType[BarcodeType["upcE1"] = 12] = "upcE1";
    BarcodeType[BarcodeType["ean13"] = 13] = "ean13";
    BarcodeType[BarcodeType["ean8"] = 14] = "ean8";
    BarcodeType[BarcodeType["pdf417"] = 15] = "pdf417";
    BarcodeType[BarcodeType["pdf417Micro"] = 16] = "pdf417Micro";
    BarcodeType[BarcodeType["datamatrix"] = 17] = "datamatrix";
    BarcodeType[BarcodeType["code25"] = 18] = "code25";
    BarcodeType[BarcodeType["interleaved25"] = 19] = "interleaved25";
    BarcodeType[BarcodeType["itf14"] = 20] = "itf14";
    BarcodeType[BarcodeType["iata25"] = 21] = "iata25";
    BarcodeType[BarcodeType["matrix25"] = 22] = "matrix25";
    BarcodeType[BarcodeType["datalogic25"] = 23] = "datalogic25";
    BarcodeType[BarcodeType["coop25"] = 24] = "coop25";
    BarcodeType[BarcodeType["code32"] = 25] = "code32";
    BarcodeType[BarcodeType["telepen"] = 26] = "telepen";
    BarcodeType[BarcodeType["dotcode"] = 27] = "dotcode";
    BarcodeType[BarcodeType["idDocument"] = 28] = "idDocument";
    BarcodeType[BarcodeType["databar14"] = 29] = "databar14";
    BarcodeType[BarcodeType["databarLimited"] = 30] = "databarLimited";
    BarcodeType[BarcodeType["databarExpanded"] = 31] = "databarExpanded";
    BarcodeType[BarcodeType["postalIMB"] = 32] = "postalIMB";
    BarcodeType[BarcodeType["postnet"] = 33] = "postnet";
    BarcodeType[BarcodeType["planet"] = 34] = "planet";
    BarcodeType[BarcodeType["australianPost"] = 35] = "australianPost";
    BarcodeType[BarcodeType["royalMail"] = 36] = "royalMail";
    BarcodeType[BarcodeType["kix"] = 37] = "kix";
    BarcodeType[BarcodeType["japanesePost"] = 38] = "japanesePost";
    BarcodeType[BarcodeType["maxiCode"] = 39] = "maxiCode";
    return BarcodeType;
  }({});
  _Barkoder.BarcodeType = BarcodeType;
  class BarkoderConfig {
    constructor(config) {
      Object.assign(this, config);
    }
    toJsonString() {
      var _this$decoder2, _this$arConfig2;
      let configAsJson = {
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
        "decoder": (_this$decoder2 = this.decoder) === null || _this$decoder2 === void 0 ? void 0 : _this$decoder2.toMap(),
        "arConfig": (_this$arConfig2 = this.arConfig) === null || _this$arConfig2 === void 0 ? void 0 : _this$arConfig2.toMap()
      };
      return JSON.stringify(configAsJson);
    }
  }
  _Barkoder.BarkoderConfig = BarkoderConfig;
  class DekoderConfig {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      var _this$aztec2, _this$aztecCompact2, _this$qr2, _this$qrMicro2, _this$code7, _this$code8, _this$code9, _this$codabar2, _this$code10, _this$msi2, _this$upcA2, _this$upcE3, _this$upcE4, _this$ean3, _this$ean4, _this$pdf2, _this$pdf417Micro2, _this$datamatrix2, _this$code11, _this$interleaved2, _this$itf2, _this$iata2, _this$matrix2, _this$datalogic2, _this$coop2, _this$code12, _this$telepen2, _this$dotcode2, _this$idDocument2, _this$databar2, _this$databarLimited2, _this$databarExpanded2, _this$postalIMB2, _this$postnet2, _this$planet2, _this$australianPost2, _this$royalMail2, _this$kix2, _this$japanesePost2, _this$maxiCode2, _this$general2;
      const map = {
        'Aztec': (_this$aztec2 = this.aztec) === null || _this$aztec2 === void 0 ? void 0 : _this$aztec2.toMap(),
        'Aztec Compact': (_this$aztecCompact2 = this.aztecCompact) === null || _this$aztecCompact2 === void 0 ? void 0 : _this$aztecCompact2.toMap(),
        'QR': (_this$qr2 = this.qr) === null || _this$qr2 === void 0 ? void 0 : _this$qr2.toMap(),
        'QR Micro': (_this$qrMicro2 = this.qrMicro) === null || _this$qrMicro2 === void 0 ? void 0 : _this$qrMicro2.toMap(),
        'Code 128': (_this$code7 = this.code128) === null || _this$code7 === void 0 ? void 0 : _this$code7.toMap(),
        'Code 93': (_this$code8 = this.code93) === null || _this$code8 === void 0 ? void 0 : _this$code8.toMap(),
        'Code 39': (_this$code9 = this.code39) === null || _this$code9 === void 0 ? void 0 : _this$code9.toMap(),
        'Codabar': (_this$codabar2 = this.codabar) === null || _this$codabar2 === void 0 ? void 0 : _this$codabar2.toMap(),
        'Code 11': (_this$code10 = this.code11) === null || _this$code10 === void 0 ? void 0 : _this$code10.toMap(),
        'MSI': (_this$msi2 = this.msi) === null || _this$msi2 === void 0 ? void 0 : _this$msi2.toMap(),
        'Upc-A': (_this$upcA2 = this.upcA) === null || _this$upcA2 === void 0 ? void 0 : _this$upcA2.toMap(),
        'Upc-E': (_this$upcE3 = this.upcE) === null || _this$upcE3 === void 0 ? void 0 : _this$upcE3.toMap(),
        'Upc-E1': (_this$upcE4 = this.upcE1) === null || _this$upcE4 === void 0 ? void 0 : _this$upcE4.toMap(),
        'Ean-13': (_this$ean3 = this.ean13) === null || _this$ean3 === void 0 ? void 0 : _this$ean3.toMap(),
        'Ean-8': (_this$ean4 = this.ean8) === null || _this$ean4 === void 0 ? void 0 : _this$ean4.toMap(),
        'PDF 417': (_this$pdf2 = this.pdf417) === null || _this$pdf2 === void 0 ? void 0 : _this$pdf2.toMap(),
        'PDF 417 Micro': (_this$pdf417Micro2 = this.pdf417Micro) === null || _this$pdf417Micro2 === void 0 ? void 0 : _this$pdf417Micro2.toMap(),
        'Datamatrix': (_this$datamatrix2 = this.datamatrix) === null || _this$datamatrix2 === void 0 ? void 0 : _this$datamatrix2.toMap(),
        'Code 25': (_this$code11 = this.code25) === null || _this$code11 === void 0 ? void 0 : _this$code11.toMap(),
        'Interleaved 2 of 5': (_this$interleaved2 = this.interleaved25) === null || _this$interleaved2 === void 0 ? void 0 : _this$interleaved2.toMap(),
        'ITF 14': (_this$itf2 = this.itf14) === null || _this$itf2 === void 0 ? void 0 : _this$itf2.toMap(),
        'IATA 25': (_this$iata2 = this.iata25) === null || _this$iata2 === void 0 ? void 0 : _this$iata2.toMap(),
        'Matrix 25': (_this$matrix2 = this.matrix25) === null || _this$matrix2 === void 0 ? void 0 : _this$matrix2.toMap(),
        'Datalogic 25': (_this$datalogic2 = this.datalogic25) === null || _this$datalogic2 === void 0 ? void 0 : _this$datalogic2.toMap(),
        'COOP 25': (_this$coop2 = this.coop25) === null || _this$coop2 === void 0 ? void 0 : _this$coop2.toMap(),
        'Code 32': (_this$code12 = this.code32) === null || _this$code12 === void 0 ? void 0 : _this$code12.toMap(),
        'Telepen': (_this$telepen2 = this.telepen) === null || _this$telepen2 === void 0 ? void 0 : _this$telepen2.toMap(),
        'Dotcode': (_this$dotcode2 = this.dotcode) === null || _this$dotcode2 === void 0 ? void 0 : _this$dotcode2.toMap(),
        'ID Document': (_this$idDocument2 = this.idDocument) === null || _this$idDocument2 === void 0 ? void 0 : _this$idDocument2.toMap(),
        'Databar 14': (_this$databar2 = this.databar14) === null || _this$databar2 === void 0 ? void 0 : _this$databar2.toMap(),
        'Databar Limited': (_this$databarLimited2 = this.databarLimited) === null || _this$databarLimited2 === void 0 ? void 0 : _this$databarLimited2.toMap(),
        'Databar Expanded': (_this$databarExpanded2 = this.databarExpanded) === null || _this$databarExpanded2 === void 0 ? void 0 : _this$databarExpanded2.toMap(),
        'Postal IMB': (_this$postalIMB2 = this.postalIMB) === null || _this$postalIMB2 === void 0 ? void 0 : _this$postalIMB2.toMap(),
        'Postnet': (_this$postnet2 = this.postnet) === null || _this$postnet2 === void 0 ? void 0 : _this$postnet2.toMap(),
        'Planet': (_this$planet2 = this.planet) === null || _this$planet2 === void 0 ? void 0 : _this$planet2.toMap(),
        'Australian Post': (_this$australianPost2 = this.australianPost) === null || _this$australianPost2 === void 0 ? void 0 : _this$australianPost2.toMap(),
        'Royal Mail': (_this$royalMail2 = this.royalMail) === null || _this$royalMail2 === void 0 ? void 0 : _this$royalMail2.toMap(),
        'KIX': (_this$kix2 = this.kix) === null || _this$kix2 === void 0 ? void 0 : _this$kix2.toMap(),
        'Japanese Post': (_this$japanesePost2 = this.japanesePost) === null || _this$japanesePost2 === void 0 ? void 0 : _this$japanesePost2.toMap(),
        'MaxiCode': (_this$maxiCode2 = this.maxiCode) === null || _this$maxiCode2 === void 0 ? void 0 : _this$maxiCode2.toMap(),
        'general': (_this$general2 = this.general) === null || _this$general2 === void 0 ? void 0 : _this$general2.toMap()
      };
      return map;
    }
  }
  _Barkoder.DekoderConfig = DekoderConfig;
  class BarkoderARConfig {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      return {
        "arMode": this.arMode,
        "resultDisappearanceDelayMs": this.resultDisappearanceDelayMs,
        "locationTransitionSpeed": this.locationTransitionSpeed,
        "overlayRefresh": this.overlayRefresh,
        "selectedLocationColor": this.selectedLocationColor,
        "nonSelectedLocationColor": this.nonSelectedLocationColor,
        "selectedLocationLineWidth": this.selectedLocationLineWidth,
        "nonSelectedLocationLineWidth": this.nonSelectedLocationLineWidth,
        "locationType": this.locationType,
        "doubleTapToFreezeEnabled": this.doubleTapToFreezeEnabled,
        "imageResultEnabled": this.imageResultEnabled,
        "barcodeThumbnailOnResult": this.barcodeThumbnailOnResult,
        "resultLimit": this.resultLimit,
        "continueScanningOnLimit": this.continueScanningOnLimit,
        "emitResultsAtSessionEndOnly": this.emitResultsAtSessionEndOnly,
        "headerHeight": this.headerHeight,
        "headerShowMode": this.headerShowMode,
        "headerMaxTextHeight": this.headerMaxTextHeight,
        "headerMinTextHeight": this.headerMinTextHeight,
        "headerTextColorSelected": this.headerTextColorSelected,
        "headerTextColorNonSelected": this.headerTextColorNonSelected,
        "headerHorizontalTextMargin": this.headerHorizontalTextMargin,
        "headerVerticalTextMargin": this.headerVerticalTextMargin,
        "headerTextFormat": this.headerTextFormat
      };
    }
  }
  _Barkoder.BarkoderARConfig = BarkoderARConfig;
  class BarcodeConfig {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      const map = {
        "enabled": this.enabled
      };
      return map;
    }
  }
  _Barkoder.BarcodeConfig = BarcodeConfig;
  class BarcodeConfigWithLength {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      const map = {
        "enabled": this.enabled,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength
      };
      return map;
    }
    setLengthRange(minLength, maxLength) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }
  _Barkoder.BarcodeConfigWithLength = BarcodeConfigWithLength;
  class MSIBarcodeConfig {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      let map = {
        "enabled": this.enabled,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength,
        "checksum": this.checksum
      };
      return map;
    }
    setLengthRange(minLength, maxLength) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }
  _Barkoder.MSIBarcodeConfig = MSIBarcodeConfig;
  class Code39BarcodeConfig {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      let map = {
        "enabled": this.enabled,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength,
        "checksum": this.checksum
      };
      return map;
    }
    setLengthRange(minLength, maxLength) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }
  _Barkoder.Code39BarcodeConfig = Code39BarcodeConfig;
  class Code11BarcodeConfig {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      let map = {
        "enabled": this.enabled,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength,
        "checksum": this.checksum
      };
      return map;
    }
    setLengthRange(minLength, maxLength) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }
  _Barkoder.Code11BarcodeConfig = Code11BarcodeConfig;
  class BarcodeConfigWithDpmMode {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      let map = {
        "enabled": this.enabled,
        "dpmMode": this.dpmMode,
        "minimumLength": this.minLength,
        "maximumLength": this.maxLength
      };
      return map;
    }
    setLengthRange(minLength, maxLength) {
      this.minLength = minLength;
      this.maxLength = maxLength;
    }
  }
  _Barkoder.BarcodeConfigWithDpmMode = BarcodeConfigWithDpmMode;
  let IdDocumentMasterChecksumType = /*#__PURE__*/function (IdDocumentMasterChecksumType) {
    IdDocumentMasterChecksumType[IdDocumentMasterChecksumType["disabled"] = 0] = "disabled";
    IdDocumentMasterChecksumType[IdDocumentMasterChecksumType["enabled"] = 1] = "enabled";
    return IdDocumentMasterChecksumType;
  }({});
  _Barkoder.IdDocumentMasterChecksumType = IdDocumentMasterChecksumType;
  class IdDocumentBarcodeConfig {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      let map = {
        "enabled": this.enabled,
        "masterChecksum": this.masterChecksum
      };
      return map;
    }
  }
  _Barkoder.IdDocumentBarcodeConfig = IdDocumentBarcodeConfig;
  class GeneralSettings {
    constructor(config) {
      Object.assign(this, config);
    }
    toMap() {
      let map = {
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
        "multicodeCachingDuration": this.multicodeCachingDuration,
        "multicodeCachingEnabled": this.multicodeCachingEnabled
      };
      return map;
    }
    setROI(x, y, width, height) {
      this.roiX = x;
      this.roiY = y;
      this.roiWidth = width;
      this.roiHeight = height;
    }
  }
  _Barkoder.GeneralSettings = GeneralSettings;
  class BarkoderResult {
    constructor(resultMap) {
      if (Array.isArray(resultMap['decoderResults'])) {
        this.decoderResults = resultMap['decoderResults'].map(result => new DecoderResult(result));
      } else {
        this.decoderResults = [];
      }
      this.resultThumbnailsAsBase64 = Array.isArray(resultMap['resultThumbnailsAsBase64']) ? resultMap['resultThumbnailsAsBase64'].map(thumbnail => this.convertToBase64(thumbnail)).filter(thumbnail => thumbnail !== null) : null;
      this.resultImageAsBase64 = this.convertToBase64(resultMap['resultImageAsBase64']);
    }
    convertToBase64(data) {
      return data ? `data:image/jpeg;base64,${data}` : null;
    }
  }
  _Barkoder.BarkoderResult = BarkoderResult;
  class DecoderResult {
    constructor(resultMap) {
      this.barcodeType = resultMap['barcodeType'];
      this.barcodeTypeName = resultMap['barcodeTypeName'];
      this.binaryDataAsBase64 = resultMap['binaryDataAsBase64'];
      this.textualData = resultMap['textualData'];
      this.characterSet = resultMap['characterSet'] || null;
      this.extra = 'extra' in resultMap ? JSON.parse(resultMap['extra']) : null;
      this.mrzImagesAsBase64 = Array.isArray(resultMap['mrzImagesAsBase64']) ? resultMap['mrzImagesAsBase64'].map(image => ({
        name: image.name,
        base64: `data:image/jpeg;base64,${image.base64}`
      })) : [];
    }
  }
  _Barkoder.DecoderResult = DecoderResult;
  class BarkoderError {
    constructor(jsonString) {
      const errorMap = JSON.parse(jsonString);
      this.code = errorMap['code'];
      this.message = errorMap['message'];
    }
  }
  _Barkoder.BarkoderError = BarkoderError;
})(Barkoder || (exports.Barkoder = Barkoder = {}));
//# sourceMappingURL=index.js.map