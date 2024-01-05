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
        this._resultCallback(new Barkoder.BarkoderResult(nativeEvent.payload));
      }
    } else if (this._promisesMap.has(nativeEvent.promiseRequestId)) {
      let [resolve, reject] = this._promisesMap.get(
        nativeEvent.promiseRequestId
      )!;
      this._promisesMap.delete(nativeEvent.promiseRequestId);

      if (nativeEvent.error)
        reject(new Barkoder.BarkoderError(nativeEvent.error));
      else
        resolve(nativeEvent.payload);
    }
  }

  // Used only for iOS
  private startScanningEventEmmitter() {
    this._eventEmitter.removeAllListeners(BARKODER_RESULT_EVENT_NAME);
    this._eventEmitter.addListener(BARKODER_RESULT_EVENT_NAME, (event: { data: string }) => {
      const { data } = event;
      const result = new Barkoder.BarkoderResult(data);

      if (this._resultCallback) {
        this._resultCallback(result);
      }
    });
  }

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

  setZoomFactor(zoomFactor: number) {
    this._dispatchCommand('setZoomFactor', [zoomFactor]);
  }

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

  setFlashEnabled(enabled: boolean) {
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

  pauseScanning() {
    this._resultCallback = null;

    this._eventEmitter.removeAllListeners(BARKODER_RESULT_EVENT_NAME);

    this._dispatchCommand('pauseScanning');
  }

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

  setBarkoderResolution(barkoderResolution: Barkoder.BarkoderResolution) {
    this._dispatchCommand('setBarkoderResolution', [barkoderResolution]);
  }

  setDecodingSpeed(decodingSpeed: Barkoder.DecodingSpeed) {
    this._dispatchCommand('setDecodingSpeed', [decodingSpeed]);
  }

  setFormattingType(formatting: Barkoder.FormattingType) {
    this._dispatchCommand('setFormattingType', [formatting]);
  }

  setEncodingCharacterSet(encodingCharacterSet: String) {
    this._dispatchCommand('setEncodingCharacterSet', [encodingCharacterSet]);
  }

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

  setLocationLineWidth(lineWidth: number) {
    this._dispatchCommand('setLocationLineWidth', [lineWidth]);
  }

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

  setRoiLineWidth(lineWidth: number) {
    this._dispatchCommand('setRoiLineWidth', [lineWidth]);
  }

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

  setCloseSessionOnResultEnabled(enabled: boolean) {
    this._dispatchCommand('setCloseSessionOnResultEnabled', [enabled]);
  }

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

  setImageResultEnabled(enabled: boolean) {
    this._dispatchCommand('setImageResultEnabled', [enabled]);
  }

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

  setLocationInImageResultEnabled(enabled: boolean) {
    this._dispatchCommand('setLocationInImageResultEnabled', [enabled]);
  }

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

  setLocationInPreviewEnabled(enabled: boolean) {
    this._dispatchCommand('setLocationInPreviewEnabled', [enabled]);
  }

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

  setPinchToZoomEnabled(enabled: boolean) {
    this._dispatchCommand('setPinchToZoomEnabled', [enabled]);
  }

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

  setRegionOfInterestVisible(visible: boolean) {
    this._dispatchCommand('setRegionOfInterestVisible', [visible]);
  }

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

  setBeepOnSuccessEnabled(enabled: boolean) {
    this._dispatchCommand('setBeepOnSuccessEnabled', [enabled]);
  }

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

  setVibrateOnSuccessEnabled(enabled: boolean) {
    this._dispatchCommand('setVibrateOnSuccessEnabled', [enabled]);
  }

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

  setBarcodeTypeEnabled(barcodeType: Barkoder.BarcodeType, enabled: boolean) {
    this._dispatchCommand('setBarcodeTypeEnabled', [barcodeType, enabled]);
  }

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

  setMsiChecksumType(msiChecksumType: Barkoder.MsiChecksumType) {
    this._dispatchCommand('setMsiChecksumType', [msiChecksumType]);
  }

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

  setCode39ChecksumType(code39ChecksumType: Barkoder.Code39ChecksumType) {
    this._dispatchCommand('setCode39ChecksumType', [code39ChecksumType]);
  }

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

  setCode11ChecksumType(code11ChecksumType: Barkoder.Code11ChecksumType) {
    this._dispatchCommand('setCode11ChecksumType', [code11ChecksumType]);
  }

  setMaximumResultsCount(maximumResultsCount: number) {
    this._dispatchCommand('setMaximumResultsCount', [maximumResultsCount]);
  }

  setDuplicatesDelayMs(duplicatesDelayMs: number) {
    this._dispatchCommand('setDuplicatesDelayMs', [duplicatesDelayMs]);
  }

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

  setDatamatrixDpmModeEnabled(enabled: boolean) {
    this._dispatchCommand('setDatamatrixDpmModeEnabled', [enabled]);
  }

  setUpcEanDeblurEnabled(enabled: boolean) {
    this._dispatchCommand('setUpcEanDeblurEnabled', [enabled]);
  }

  setEnableMisshaped1DEnabled(enabled: boolean) {
    this._dispatchCommand('setEnableMisshaped1DEnabled', [enabled]);
  }

  setBarcodeThumbnailOnResultEnabled(enabled: boolean) {
    this._dispatchCommand('setBarcodeThumbnailOnResultEnabled', [enabled]);
  }

  setThresholdBetweenDuplicatesScans(thresholdBetweenDuplicatesScans: number) {
    this._dispatchCommand('setThresholdBetweenDuplicatesScans', [thresholdBetweenDuplicatesScans]);
  }

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
    normal,
    high,
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
    telepen
  }

  export class BarkoderConfig {
    locationLineColor?: string;
    locationLineWidth?: number;
    roiLineColor?: string;
    roiLineWidth?: number;
    roiOverlayBackgroundColor?: string;
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
    qr?: BarcodeConfig;
    qrMicro?: BarcodeConfig;
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
    datamatrix?: DatamatrixBarcodeConfig;
    code25?: BarcodeConfig;
    interleaved25?: BarcodeConfig;
    itf14?: BarcodeConfig;
    iata25?: BarcodeConfig;
    matrix25?: BarcodeConfig;
    datalogic25?: BarcodeConfig;
    coop25?: BarcodeConfig;
    code32?: BarcodeConfig;
    telepen?: BarcodeConfig;
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

  export class DatamatrixBarcodeConfig {
    enabled?: boolean;
    dpmMode?: number;
    private minLength?: number;
    private maxLength?: number;

    constructor(config: Partial<DatamatrixBarcodeConfig>) {
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
    enableMisshaped1D? : number;

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
        "enableMisshaped1D": this.enableMisshaped1D
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
    barcodeType: BarcodeType;
    barcodeTypeName: string;
    binaryDataAsBase64: string;
    textualData: string;
    characterSet?: string | null;
    extra?: Record<string, any> | null;
    resultImageAsBase64?: string | null;

    constructor(jsonString: string) {
      const resultMap: Record<string, any> = JSON.parse(jsonString);

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
