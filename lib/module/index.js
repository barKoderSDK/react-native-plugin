import React from 'react';
import { requireNativeComponent, UIManager, Platform, findNodeHandle, NativeModules, NativeEventEmitter } from 'react-native';
const LINKING_ERROR = `The package 'barkoder-react-native' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const OS_NOT_SUPPORTED = 'OS is not supported!';
const BARKODER_RESULT_EVENT_NAME = 'BarkoderResultEvent';
const BARKODER_CONFIG_EVENT_NAME = 'BarkoderConfigEvent';
const ComponentName = 'BarkoderReactNativeView';
const BarkoderReactNativeView = UIManager.getViewManagerConfig(ComponentName) != null ? requireNativeComponent(ComponentName) : () => {
  throw new Error(LINKING_ERROR);
};
export class BarkoderView extends React.Component {
  _myRef = /*#__PURE__*/React.createRef();
  _barkoder = new Barkoder(this._myRef);
  _eventEmitter = new NativeEventEmitter(NativeModules.BarkoderEmitter);
  constructor(props) {
    super(props);
    if (Platform.OS === 'ios') this.startConfigurationEmitter();else {
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
    return /*#__PURE__*/React.createElement(BarkoderReactNativeView, {
      ref: this._myRef,
      licenseKey: this.props.licenseKey,
      style: this.props.style,
      onBarkoderViewCreated: this.props.onBarkoderViewCreated,
      onDataReturned: this._onDataReturned,
      onBarkoderConfigCreated: this._onBarkoderConfigCreated
    });
  }
}
export class Barkoder {
  constructor(barkoderViewRef) {
    this._barkoderViewRef = barkoderViewRef;
    this._promisesMap = new Map();
    this._promiseRequestId = 0;
    this._eventEmitter = new NativeEventEmitter(NativeModules.BarkoderEmitter);
  }
  _dispatchCommand(commandID, commandArgs) {
    UIManager.dispatchViewManagerCommand(findNodeHandle(this._barkoderViewRef.current), commandID, commandArgs);
  }

  // Used only for Android
  onDataReturned(event) {
    let nativeEvent = event.nativeEvent;

    // 0 will be special case for scanning results
    if (nativeEvent.promiseRequestId == 0) {
      if (this._resultCallback) {
        this._resultCallback(new Barkoder.BarkoderResult(nativeEvent.payload));
      }
    } else if (this._promisesMap.has(nativeEvent.promiseRequestId)) {
      let [resolve, reject] = this._promisesMap.get(nativeEvent.promiseRequestId);
      this._promisesMap.delete(nativeEvent.promiseRequestId);
      if (nativeEvent.error) reject(new Barkoder.BarkoderError(nativeEvent.error));else resolve(nativeEvent.payload);
    }
  }

  // Used only for iOS
  startScanningEventEmmitter() {
    this._eventEmitter.removeAllListeners(BARKODER_RESULT_EVENT_NAME);
    this._eventEmitter.addListener(BARKODER_RESULT_EVENT_NAME, event => {
      const {
        data
      } = event;
      const result = new Barkoder.BarkoderResult(data);
      if (this._resultCallback) {
        this._resultCallback(result);
      }
    });
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getMaxZoomFactor(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setZoomFactor(zoomFactor) {
    this._dispatchCommand('setZoomFactor', [zoomFactor]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isFlashAvailable(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setFlashEnabled(enabled) {
    this._dispatchCommand('setFlashEnabled', [enabled]);
  }
  startCamera() {
    this._dispatchCommand('startCamera');
  }
  stopScanning() {
    this._resultCallback = null;
    this._eventEmitter.removeAllListeners(BARKODER_RESULT_EVENT_NAME);
    this._dispatchCommand('stopScanning');
  }
  startScanning(resultsCallback) {
    if (this.isAndroid()) {
      this._resultCallback = resultsCallback;

      // 0 will be special case for scanning results
      this._dispatchCommand('startScanning', [0]);
    } else if (this.isIos()) {
      this._resultCallback = resultsCallback;
      this.startScanningEventEmmitter();
      NativeModules.BarkoderReactNativeViewManager.startScanning(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  pauseScanning() {
    this._resultCallback = null;
    this._eventEmitter.removeAllListeners(BARKODER_RESULT_EVENT_NAME);
    this._dispatchCommand('pauseScanning');
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getBarkoderResolution(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setBarkoderResolution(barkoderResolution) {
    this._dispatchCommand('setBarkoderResolution', [barkoderResolution]);
  }
  setDecodingSpeed(decodingSpeed) {
    this._dispatchCommand('setDecodingSpeed', [decodingSpeed]);
  }
  setFormattingType(formatting) {
    this._dispatchCommand('setFormattingType', [formatting]);
  }
  setEncodingCharacterSet(encodingCharacterSet) {
    this._dispatchCommand('setEncodingCharacterSet', [encodingCharacterSet]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getLocationLineColorHex(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.setLocationLineColor(findNodeHandle(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getLocationLineWidth(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setLocationLineWidth(lineWidth) {
    this._dispatchCommand('setLocationLineWidth', [lineWidth]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getRoiLineColorHex(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.setRoiLineColor(findNodeHandle(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getRoiLineWidth(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setRoiLineWidth(lineWidth) {
    this._dispatchCommand('setRoiLineWidth', [lineWidth]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getRoiOverlayBackgroundColorHex(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.setRoiOverlayBackgroundColor(findNodeHandle(this._barkoderViewRef.current), hexColor);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isCloseSessionOnResultEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setCloseSessionOnResultEnabled(enabled) {
    this._dispatchCommand('setCloseSessionOnResultEnabled', [enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isImageResultEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setImageResultEnabled(enabled) {
    this._dispatchCommand('setImageResultEnabled', [enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isLocationInImageResultEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setLocationInImageResultEnabled(enabled) {
    this._dispatchCommand('setLocationInImageResultEnabled', [enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getRegionOfInterest(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.setRegionOfInterest(findNodeHandle(this._barkoderViewRef.current), left, top, width, height);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getThreadsLimit(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.setThreadsLimit(findNodeHandle(this._barkoderViewRef.current), threadsLimit);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isLocationInPreviewEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setLocationInPreviewEnabled(enabled) {
    this._dispatchCommand('setLocationInPreviewEnabled', [enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isPinchToZoomEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setPinchToZoomEnabled(enabled) {
    this._dispatchCommand('setPinchToZoomEnabled', [enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isRegionOfInterestVisible(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setRegionOfInterestVisible(visible) {
    this._dispatchCommand('setRegionOfInterestVisible', [visible]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isBeepOnSuccessEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setBeepOnSuccessEnabled(enabled) {
    this._dispatchCommand('setBeepOnSuccessEnabled', [enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isVibrateOnSuccessEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setVibrateOnSuccessEnabled(enabled) {
    this._dispatchCommand('setVibrateOnSuccessEnabled', [enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getEncodingCharacterSet(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getVersion(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getDecodingSpeed(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getFormattingType(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isBarcodeTypeEnabled(findNodeHandle(this._barkoderViewRef.current), barcodeType);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getBarcodeTypeLengthRange(findNodeHandle(this._barkoderViewRef.current), barcodeType);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.setBarcodeTypeLengthRange(findNodeHandle(this._barkoderViewRef.current), barcodeType, min, max);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.configureBarkoder(findNodeHandle(this._barkoderViewRef.current), jsonString);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setBarcodeTypeEnabled(barcodeType, enabled) {
    this._dispatchCommand('setBarcodeTypeEnabled', [barcodeType, enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getMsiChecksumType(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setMsiChecksumType(msiChecksumType) {
    this._dispatchCommand('setMsiChecksumType', [msiChecksumType]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getCode39ChecksumType(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setCode39ChecksumType(code39ChecksumType) {
    this._dispatchCommand('setCode39ChecksumType', [code39ChecksumType]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getCode11ChecksumType(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setCode11ChecksumType(code11ChecksumType) {
    this._dispatchCommand('setCode11ChecksumType', [code11ChecksumType]);
  }
  setMaximumResultsCount(maximumResultsCount) {
    this._dispatchCommand('setMaximumResultsCount', [maximumResultsCount]);
  }
  setDuplicatesDelayMs(duplicatesDelayMs) {
    this._dispatchCommand('setDuplicatesDelayMs', [duplicatesDelayMs]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.setMulticodeCachingDuration(findNodeHandle(this._barkoderViewRef.current), multicodeCachingDuration);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.setMulticodeCachingEnabled(findNodeHandle(this._barkoderViewRef.current), multicodeCachingEnabled);
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getMaximumResultsCount(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  getDuplicatesDelayMs() {
    if (this.isAndroid()) {
      let promisesMap = this._promisesMap;
      let promiseRequestId = ++this._promiseRequestId;
      let promise = new Promise((resolve, reject) => {
        promisesMap.set(promiseRequestId, [resolve, reject]);
      });
      this._dispatchCommand('getDuplicatesDelayMs', [promiseRequestId]);
      return promise;
    } else if (this.isIos()) {
      return NativeModules.BarkoderReactNativeViewManager.getDuplicatesDelayMs(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setDatamatrixDpmModeEnabled(enabled) {
    this._dispatchCommand('setDatamatrixDpmModeEnabled', [enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isUpcEanDeblurEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setUpcEanDeblurEnabled(enabled) {
    this._dispatchCommand('setUpcEanDeblurEnabled', [enabled]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isMisshaped1DEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setEnableMisshaped1DEnabled(enabled) {
    this._dispatchCommand('setEnableMisshaped1DEnabled', [enabled]);
  }
  setBarcodeThumbnailOnResultEnabled(enabled) {
    this._dispatchCommand('setBarcodeThumbnailOnResultEnabled', [enabled]);
  }
  setThresholdBetweenDuplicatesScans(thresholdBetweenDuplicatesScans) {
    this._dispatchCommand('setThresholdBetweenDuplicatesScans', [thresholdBetweenDuplicatesScans]);
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getThresholdBetweenDuplicatesScans(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isBarcodeThumbnailOnResultEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getMulticodeCachingDuration(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.getMulticodeCachingEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
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
      return NativeModules.BarkoderReactNativeViewManager.isVINRestrictionsEnabled(findNodeHandle(this._barkoderViewRef.current));
    } else {
      throw new Error(OS_NOT_SUPPORTED);
    }
  }
  setEnableVINRestrictions(enabled) {
    this._dispatchCommand('setEnableVINRestrictions', [enabled]);
  }
  showLogMessages(show) {
    this._dispatchCommand('showLogMessages', [show]);
  }
  isIos() {
    return Platform.OS === 'ios';
  }
  isAndroid() {
    return Platform.OS === 'android';
  }
}

// Keep these classes in this file, so we can have same "Barkoder" alias for the class and for the namespace
(function (_Barkoder) {
  let DecodingSpeed = /*#__PURE__*/function (DecodingSpeed) {
    DecodingSpeed[DecodingSpeed["fast"] = 0] = "fast";
    DecodingSpeed[DecodingSpeed["normal"] = 1] = "normal";
    DecodingSpeed[DecodingSpeed["slow"] = 2] = "slow";
    return DecodingSpeed;
  }({});
  _Barkoder.DecodingSpeed = DecodingSpeed;
  let FormattingType = /*#__PURE__*/function (FormattingType) {
    FormattingType[FormattingType["disabled"] = 0] = "disabled";
    FormattingType[FormattingType["automatic"] = 1] = "automatic";
    FormattingType[FormattingType["gs1"] = 2] = "gs1";
    FormattingType[FormattingType["aamva"] = 3] = "aamva";
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
  let BarkoderResolution = /*#__PURE__*/function (BarkoderResolution) {
    BarkoderResolution[BarkoderResolution["normal"] = 0] = "normal";
    BarkoderResolution[BarkoderResolution["high"] = 1] = "high";
    return BarkoderResolution;
  }({});
  _Barkoder.BarkoderResolution = BarkoderResolution;
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
    return BarcodeType;
  }({});
  _Barkoder.BarcodeType = BarcodeType;
  class BarkoderConfig {
    constructor(config) {
      Object.assign(this, config);
    }
    toJsonString() {
      var _this$decoder2;
      let configAsJson = {
        "locationLineColor": this.locationLineColor,
        "locationLineWidth": this.locationLineWidth,
        "roiLineColor": this.roiLineColor,
        "roiLineWidth": this.roiLineWidth,
        "roiOverlayBackgroundColor": this.roiOverlayBackgroundColor,
        "closeSessionOnResultEnabled": this.closeSessionOnResultEnabled,
        "imageResultEnabled": this.imageResultEnabled,
        "locationInImageResultEnabled": this.locationInImageResultEnabled,
        "locationInPreviewEnabled": this.locationInPreviewEnabled,
        "pinchToZoomEnabled": this.pinchToZoomEnabled,
        "regionOfInterestVisible": this.regionOfInterestVisible,
        "barkoderResolution": this.barkoderResolution,
        "beepOnSuccessEnabled": this.beepOnSuccessEnabled,
        "vibrateOnSuccessEnabled": this.vibrateOnSuccessEnabled,
        "decoder": (_this$decoder2 = this.decoder) === null || _this$decoder2 === void 0 ? void 0 : _this$decoder2.toMap()
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
      var _this$aztec2, _this$aztecCompact2, _this$qr2, _this$qrMicro2, _this$code7, _this$code8, _this$code9, _this$codabar2, _this$code10, _this$msi2, _this$upcA2, _this$upcE3, _this$upcE4, _this$ean3, _this$ean4, _this$pdf2, _this$pdf417Micro2, _this$datamatrix2, _this$code11, _this$interleaved2, _this$itf2, _this$iata2, _this$matrix2, _this$datalogic2, _this$coop2, _this$code12, _this$telepen2, _this$dotcode2, _this$general2;
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
        'general': (_this$general2 = this.general) === null || _this$general2 === void 0 ? void 0 : _this$general2.toMap()
      };
      return map;
    }
  }
  _Barkoder.DekoderConfig = DekoderConfig;
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
  class DatamatrixBarcodeConfig {
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
  _Barkoder.DatamatrixBarcodeConfig = DatamatrixBarcodeConfig;
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
        "enableMisshaped1D": this.enableMisshaped1D
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
    constructor(jsonString) {
      const resultMap = JSON.parse(jsonString);
      this.barcodeType = resultMap['barcodeType'];
      this.barcodeTypeName = resultMap['barcodeTypeName'];
      this.binaryDataAsBase64 = resultMap['binaryDataAsBase64'];
      this.textualData = resultMap['textualData'];
      this.characterSet = resultMap['characterSet'];
      this.extra = resultMap['extra'] ? JSON.parse(resultMap['extra']) : undefined;
      if (resultMap['resultImageAsBase64'] != null) {
        this.resultImageAsBase64 = "data:image/jpeg;base64," + resultMap['resultImageAsBase64'];
      }
    }
  }
  _Barkoder.BarkoderResult = BarkoderResult;
  class BarkoderError {
    constructor(jsonString) {
      const errorMap = JSON.parse(jsonString);
      this.code = errorMap['code'];
      this.message = errorMap['message'];
    }
  }
  _Barkoder.BarkoderError = BarkoderError;
})(Barkoder || (Barkoder = {}));
//# sourceMappingURL=index.js.map