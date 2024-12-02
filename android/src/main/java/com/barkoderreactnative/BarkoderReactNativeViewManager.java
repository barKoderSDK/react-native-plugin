package com.barkoderreactnative;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;

import com.barkoder.Barkoder;
import com.barkoder.BarkoderConfig;
import com.barkoder.BarkoderHelper;
import com.barkoder.BarkoderLog;
import com.barkoder.enums.BarkoderResolution;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.EventDispatcher;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import org.json.JSONObject;

import java.lang.ref.SoftReference;
import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("NullableProblems") // To avoid androidX library
public class BarkoderReactNativeViewManager extends SimpleViewManager<BarkoderReactBarkoderView> {
  public static final String REACT_CLASS = "BarkoderReactNativeView";
  private static final String TAG = BarkoderReactNativeViewManager.class.getSimpleName();

  private EventDispatcher eventDispatcher;
  private Handler mainThreadHandler;

  @Override
  public BarkoderReactBarkoderView createViewInstance(ThemedReactContext reactContext) {
    mainThreadHandler = new Handler(Looper.getMainLooper());
    eventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();

    Activity currentActivity = reactContext.getCurrentActivity();

    BarkoderLog.d(TAG, "createViewInstance: " + currentActivity);

    return new BarkoderReactBarkoderView(currentActivity != null ? currentActivity : reactContext);
  }

  @Override
  public String getName() {
    BarkoderLog.d(TAG, "getName");
    return REACT_CLASS;
  }

  @SuppressWarnings("unused")
  @ReactProp(name = "licenseKey")
  public void setLicenseKey(BarkoderReactBarkoderView view, String licenseKey) {
    configureBarkoderView(view, licenseKey);

    SoftReference<EventDispatcher> dispatcherRef = new SoftReference<>(eventDispatcher);
    int bkdViewId = view.getId();

    BarkoderLog.i(TAG, "dispatchConfigCreatedEvent");

    dispatchConfigCreatedEvent(dispatcherRef, bkdViewId);
  }

  @Override
  public Map<String, Integer> getCommandsMap() {
    HashMap<String, Integer> commandsMap = MapBuilder.newHashMap();

    commandsMap.put("getMaxZoomFactor", BarkoderReactNativeCommands.GET_MAX_ZOOM_FACTOR);
    commandsMap.put("setZoomFactor", BarkoderReactNativeCommands.SET_MAX_ZOOM_FACTOR);
    commandsMap.put("isFlashAvailable", BarkoderReactNativeCommands.IS_FLASH_AVAILABLE);
    commandsMap.put("setFlashEnabled", BarkoderReactNativeCommands.SET_FLASH_AVAILABLE);
    commandsMap.put("startCamera", BarkoderReactNativeCommands.START_CAMERA);
    commandsMap.put("startScanning", BarkoderReactNativeCommands.START_SCANNING);
    commandsMap.put("scanImage", BarkoderReactNativeCommands.SCAN_IMAGE);
    commandsMap.put("stopScanning", BarkoderReactNativeCommands.STOP_SCANNING);
    commandsMap.put("pauseScanning", BarkoderReactNativeCommands.PAUSE_SCANNING);
    commandsMap.put("getLocationLineColorHex", BarkoderReactNativeCommands.GET_LOCATION_LINE_COLOR_HEX);
    commandsMap.put("setLocationLineColor", BarkoderReactNativeCommands.SET_LOCATION_LINE_COLOR);
    commandsMap.put("getLocationLineWidth", BarkoderReactNativeCommands.GET_LOCATION_LINE_WIDTH);
    commandsMap.put("setLocationLineWidth", BarkoderReactNativeCommands.SET_LOCATION_LINE_WIDTH);
    commandsMap.put("getRoiLineColorHex", BarkoderReactNativeCommands.GET_ROI_LINE_COLOR_HEX);
    commandsMap.put("setRoiLineColor", BarkoderReactNativeCommands.SET_ROI_LINE_COLOR);
    commandsMap.put("getRoiLineWidth", BarkoderReactNativeCommands.GET_ROI_LINE_WIDTH);
    commandsMap.put("setRoiLineWidth", BarkoderReactNativeCommands.SET_ROI_LINE_WIDTH);
    commandsMap.put("getRoiOverlayBackgroundColorHex",
        BarkoderReactNativeCommands.GET_ROI_OVERLAY_BACKGROUND_COLOR_HEX);
    commandsMap.put("setRoiOverlayBackgroundColor", BarkoderReactNativeCommands.SET_ROI_OVERLAY_BACKGROUND_COLOR);
    commandsMap.put("isCloseSessionOnResultEnabled", BarkoderReactNativeCommands.IS_CLOSE_SESSION_ON_RESULT_ENABLED);
    commandsMap.put("setCloseSessionOnResultEnabled", BarkoderReactNativeCommands.SET_CLOSE_SESSION_ON_RESULT_ENABLED);
    commandsMap.put("isImageResultEnabled", BarkoderReactNativeCommands.IS_IMAGE_RESULT_ENABLED);
    commandsMap.put("setImageResultEnabled", BarkoderReactNativeCommands.SET_IMAGE_RESULT_ENABLED);
    commandsMap.put("isLocationInImageResultEnabled", BarkoderReactNativeCommands.IS_LOCATION_IN_IMAGE_RESULT_ENABLED);
    commandsMap.put("setLocationInImageResultEnabled",
        BarkoderReactNativeCommands.SET_LOCATION_IN_IMAGE_RESULT_ENABLED);
    commandsMap.put("getRegionOfInterest", BarkoderReactNativeCommands.GET_REGION_OF_INTEREST);
    commandsMap.put("setRegionOfInterest", BarkoderReactNativeCommands.SET_REGION_OF_INTEREST);
    commandsMap.put("getThreadsLimit", BarkoderReactNativeCommands.GET_THREADS_LIMIT);
    commandsMap.put("setThreadsLimit", BarkoderReactNativeCommands.SET_THREADS_LIMIT);
    commandsMap.put("isLocationInPreviewEnabled", BarkoderReactNativeCommands.IS_LOCATION_IN_PREVIEW_ENABLED);
    commandsMap.put("setLocationInPreviewEnabled", BarkoderReactNativeCommands.SET_LOCATION_IN_PREVIEW_ENABLED);
    commandsMap.put("isPinchToZoomEnabled", BarkoderReactNativeCommands.IS_PINCH_TO_ZOOM_ENABLED);
    commandsMap.put("setPinchToZoomEnabled", BarkoderReactNativeCommands.SET_PINCH_TO_ZOOM_ENABLED);
    commandsMap.put("isRegionOfInterestVisible", BarkoderReactNativeCommands.IS_REGION_OF_INTEREST_ENABLED);
    commandsMap.put("setRegionOfInterestVisible", BarkoderReactNativeCommands.SET_REGION_OF_INTEREST_ENABLED);
    commandsMap.put("getBarkoderResolution", BarkoderReactNativeCommands.GET_BARKODER_RESOLUTION);
    commandsMap.put("setBarkoderResolution", BarkoderReactNativeCommands.SET_BARKODER_RESOLUTION);
    commandsMap.put("isBeepOnSuccessEnabled", BarkoderReactNativeCommands.IS_BEEP_ON_SUCCESS_ENABLED);
    commandsMap.put("setBeepOnSuccessEnabled", BarkoderReactNativeCommands.SET_BEEP_ON_SUCCESS_ENABLED);
    commandsMap.put("isVibrateOnSuccessEnabled", BarkoderReactNativeCommands.IS_VIBRATE_ON_SUCCESS_ENABLED);
    commandsMap.put("setVibrateOnSuccessEnabled", BarkoderReactNativeCommands.SET_VIBRATE_ON_SUCCESS_ENABLED);
    commandsMap.put("getVersion", BarkoderReactNativeCommands.GET_VERSION);
    commandsMap.put("showLogMessages", BarkoderReactNativeCommands.SHOW_LOG_MESSAGES);
    commandsMap.put("isBarcodeTypeEnabled", BarkoderReactNativeCommands.IS_BARCODE_TYPE_ENABLED);
    commandsMap.put("setBarcodeTypeEnabled", BarkoderReactNativeCommands.SET_BARCODE_TYPE_ENABLED);
    commandsMap.put("getBarcodeTypeLengthRange", BarkoderReactNativeCommands.GET_BARCODE_TYPE_LENGTH_RANGE);
    commandsMap.put("setBarcodeTypeLengthRange", BarkoderReactNativeCommands.SET_BARCODE_TYPE_LENGTH_RANGE);
    commandsMap.put("getMsiChecksumType", BarkoderReactNativeCommands.GET_MSI_CHECKSUM_TYPE);
    commandsMap.put("setMsiChecksumType", BarkoderReactNativeCommands.SET_MSI_CHECKSUM_TYPE);
    commandsMap.put("getCode39ChecksumType", BarkoderReactNativeCommands.GET_CODE_39_CHECKSUM_TYPE);
    commandsMap.put("setCode39ChecksumType", BarkoderReactNativeCommands.SET_CODE_39_CHECKSUM_TYPE);
    commandsMap.put("getCode11ChecksumType", BarkoderReactNativeCommands.GET_CODE_11_CHECKSUM_TYPE);
    commandsMap.put("setCode11ChecksumType", BarkoderReactNativeCommands.SET_CODE_11_CHECKSUM_TYPE);
    commandsMap.put("getEncodingCharacterSet", BarkoderReactNativeCommands.GET_ENCODING_CHARACTER_SET);
    commandsMap.put("setEncodingCharacterSet", BarkoderReactNativeCommands.SET_ENCODING_CHARACTER_SET);
    commandsMap.put("getDecodingSpeed", BarkoderReactNativeCommands.GET_DECODING_SPEED);
    commandsMap.put("setDecodingSpeed", BarkoderReactNativeCommands.SET_DECODING_SPEED);
    commandsMap.put("getFormattingType", BarkoderReactNativeCommands.GET_FORMATTING_TYPE);
    commandsMap.put("setFormattingType", BarkoderReactNativeCommands.SET_FORMATTING_TYPE);
    commandsMap.put("configureBarkoder", BarkoderReactNativeCommands.CONFIGURE_BARKODER);
    commandsMap.put("setMaximumResultsCount", BarkoderReactNativeCommands.SET_MAXIMUM_RESULTS_COUNT);
    commandsMap.put("setDuplicatesDelayMs", BarkoderReactNativeCommands.SET_DUPLICATES_DELAY_MS);
    commandsMap.put("setMulticodeCachingDuration", BarkoderReactNativeCommands.SET_MULTICODE_CACHING_DURATION);
    commandsMap.put("setMulticodeCachingEnabled", BarkoderReactNativeCommands.SET_MULTICODE_CACHING_ENABLED);
    commandsMap.put("getMaximumResultsCount", BarkoderReactNativeCommands.GET_MAXIMUM_RESULTS_COUNT);
    commandsMap.put("getDuplicatesDelayMs", BarkoderReactNativeCommands.GET_DUPLICATES_DELAY_MS);
    commandsMap.put("setUpcEanDeblurEnabled", BarkoderReactNativeCommands.SET_UPC_EAN_DEBLUR_ENABLED);
    commandsMap.put("setEnableMisshaped1DEnabled", BarkoderReactNativeCommands.SET_ENABLE_MISSHAPED_1D_ENABLED);
    commandsMap.put("setBarcodeThumbnailOnResultEnabled",
        BarkoderReactNativeCommands.SET_BARCODE_THUMBNAIL_ON_RESULT_ENABLED);
    commandsMap.put("setThresholdBetweenDuplicatesScans",
        BarkoderReactNativeCommands.SET_THRESHOLD_BETWEEN_DUPLICATES_SCANS);
    commandsMap.put("setDatamatrixDpmModeEnabled", BarkoderReactNativeCommands.SET_DATAMATRIX_DPM_MODE);
    commandsMap.put("setQrDpmModeEnabled", BarkoderReactNativeCommands.SET_QR_DPM_MODE);
    commandsMap.put("setQrMicroDpmModeEnabled", BarkoderReactNativeCommands.SET_QRMICRO_DPM_MODE);
    commandsMap.put("isDatamatrixDpmModeEnabled", BarkoderReactNativeCommands.GET_DATAMATRIX_DPM_MODE);
    commandsMap.put("isQrDpmModeEnabled", BarkoderReactNativeCommands.GET_QR_DPM_MODE);
    commandsMap.put("isQrMicroDpmModeEnabled", BarkoderReactNativeCommands.GET_QRMICRO_DPM_MODE);
    commandsMap.put("setIdDocumentMasterChecksumEnabled",
        BarkoderReactNativeCommands.SET_IDDOCUMENT_MASTERCHECKSUM_ENABLED);
    commandsMap.put("isIdDocumentMasterChecksumEnabled",
        BarkoderReactNativeCommands.GET_IDDOCUMENT_MASTERCHECKSUM_ENABLED);

    return commandsMap;
  }

  @Override
  public void receiveCommand(BarkoderReactBarkoderView root, String commandId, ReadableArray args) {
    super.receiveCommand(root, commandId, args);
    BarkoderLog.d(TAG, "receiveCommand: " + commandId + " with args: " + args);

    // Intentional noinspection because these params are required
    switch (commandId) {
      case "getMaxZoomFactor":
        getMaxZoomFactor(root, args.getInt(0));
        break;
      case "setZoomFactor":
        setZoomFactor(root, args.getDouble(0));
        break;
      case "isFlashAvailable":
        isFlashAvailable(root, args.getInt(0));
        break;
      case "setFlashEnabled":
        setFlashEnabled(root, args.getBoolean(0));
        break;
      case "startCamera":
        startCamera(root);
        break;
      case "startScanning":
        startScanning(root, args.getInt(0));
        break;
      case "scanImage":
        String base64Image = args.getString(1);
        scanImage(root, base64Image, args.getInt(0));
        break;
      case "stopScanning":
        stopScanning(root);
        break;
      case "pauseScanning":
        pauseScanning(root);
        break;
      case "getLocationLineColorHex":
        getLocationLineColorHex(root, args.getInt(0));
        break;
      case "setLocationLineColor":
        setLocationLineColor(root, args.getInt(0), args.getString(1));
        break;
      case "getLocationLineWidth":
        getLocationLineWidth(root, args.getInt(0));
        break;
      case "setLocationLineWidth":
        setLocationLineWidth(root, args.getDouble(0));
        break;
      case "getRoiLineColorHex":
        getRoiLineColorHex(root, args.getInt(0));
        break;
      case "setRoiLineColor":
        setRoiLineColor(root, args.getInt(0), args.getString(1));
        break;
      case "getRoiLineWidth":
        getRoiLineWidth(root, args.getInt(0));
        break;
      case "setRoiLineWidth":
        setRoiLineWidth(root, args.getDouble(0));
        break;
      case "getRoiOverlayBackgroundColorHex":
        getRoiOverlayBackgroundColorHex(root, args.getInt(0));
        break;
      case "setRoiOverlayBackgroundColor":
        setRoiOverlayBackgroundColor(root, args.getInt(0), args.getString(1));
        break;
      case "isCloseSessionOnResultEnabled":
        isCloseSessionOnResultEnabled(root, args.getInt(0));
        break;
      case "setCloseSessionOnResultEnabled":
        setCloseSessionOnResultEnabled(root, args.getBoolean(0));
        break;
      case "isImageResultEnabled":
        isImageResultEnabled(root, args.getInt(0));
        break;
      case "setImageResultEnabled":
        setImageResultEnabled(root, args.getBoolean(0));
        break;
      case "isLocationInImageResultEnabled":
        isLocationInImageResultEnabled(root, args.getInt(0));
        break;
      case "setLocationInImageResultEnabled":
        setLocationInImageResultEnabled(root, args.getBoolean(0));
        break;
      case "getRegionOfInterest":
        getRegionOfInterest(root, args.getInt(0));
        break;
      case "setRegionOfInterest":
        setRegionOfInterest(root, args.getInt(0),
            args.getDouble(1), args.getDouble(2), args.getDouble(3), args.getDouble(4));
        break;
      case "getThreadsLimit":
        getThreadsLimit(root, args.getInt(0));
        break;
      case "setThreadsLimit":
        setThreadsLimit(root, args.getInt(0), args.getInt(1));
        break;
      case "isLocationInPreviewEnabled":
        isLocationInPreviewEnabled(root, args.getInt(0));
        break;
      case "setLocationInPreviewEnabled":
        setLocationInPreviewEnabled(root, args.getBoolean(0));
        break;
      case "isPinchToZoomEnabled":
        isPinchToZoomEnabled(root, args.getInt(0));
        break;
      case "setPinchToZoomEnabled":
        setPinchToZoomEnabled(root, args.getBoolean(0));
        break;
      case "isRegionOfInterestVisible":
        isRegionOfInterestVisible(root, args.getInt(0));
        break;
      case "setRegionOfInterestVisible":
        setRegionOfInterestVisible(root, args.getBoolean(0));
        break;
      case "getBarkoderResolution":
        getBarkoderResolution(root, args.getInt(0));
        break;
      case "setBarkoderResolution":
        setBarkoderResolution(root, args.getInt(0));
        break;
      case "isBeepOnSuccessEnabled":
        isBeepOnSuccessEnabled(root, args.getInt(0));
        break;
      case "setBeepOnSuccessEnabled":
        setBeepOnSuccessEnabled(root, args.getBoolean(0));
        break;
      case "isVibrateOnSuccessEnabled":
        isVibrateOnSuccessEnabled(root, args.getInt(0));
        break;
      case "setVibrateOnSuccessEnabled":
        setVibrateOnSuccessEnabled(root, args.getBoolean(0));
        break;
      case "getVersion":
        getVersion(root, args.getInt(0));
        break;
      case "showLogMessages":
        showLogMessages(args.getBoolean(0));
        break;
      case "isBarcodeTypeEnabled":
        isBarcodeTypeEnabled(root, args.getInt(0), args.getInt(1));
        break;
      case "setBarcodeTypeEnabled":
        setBarcodeTypeEnabled(root, args.getInt(0), args.getBoolean(1));
        break;
      case "getBarcodeTypeLengthRange":
        getBarcodeTypeLengthRange(root, args.getInt(0), args.getInt(1));
        break;
      case "setBarcodeTypeLengthRange":
        setBarcodeTypeLengthRange(root, args.getInt(0), args.getInt(1), args.getInt(2), args.getInt(3));
        break;
      case "setDatamatrixDpmModeEnabled":
        setDatamatrixDpmModeEnabled(root, args.getBoolean(0));
        break;
      case "setQrDpmModeEnabled":
        setQrDpmModeEnabled(root, args.getBoolean(0));
        break;
      case "setQrMicroDpmModeEnabled":
        setQrMicroDpmModeEnabled(root, args.getBoolean(0));
        break;
      case "setIdDocumentMasterChecksumEnabled":
        setIdDocumentMasterChecksumEnabled(root, args.getBoolean(0));
        break;
      case "getMsiChecksumType":
        getMsiChecksumType(root, args.getInt(0));
        break;
      case "setMsiChecksumType":
        setMsiChecksumType(root, args.getInt(0));
        break;
      case "getCode39ChecksumType":
        getCode39ChecksumType(root, args.getInt(0));
        break;
      case "setCode39ChecksumType":
        setCode39ChecksumType(root, args.getInt(0));
        break;
      case "getCode11ChecksumType":
        getCode11ChecksumType(root, args.getInt(0));
        break;
      case "setCode11ChecksumType":
        setCode11ChecksumType(root, args.getInt(0));
        break;
      case "getEncodingCharacterSet":
        getEncodingCharacterSet(root, args.getInt(0));
        break;
      case "setEncodingCharacterSet":
        setEncodingCharacterSet(root, args.getString(0));
        break;
      case "getDecodingSpeed":
        getDecodingSpeed(root, args.getInt(0));
        break;
      case "setDecodingSpeed":
        setDecodingSpeed(root, args.getInt(0));
        break;
      case "getFormattingType":
        getFormattingType(root, args.getInt(0));
        break;
      case "setFormattingType":
        setFormattingType(root, args.getInt(0));
        break;
      case "configureBarkoder":
        configureBarkoder(root, args.getInt(0), args.getString(1));
        break;
      case "setMaximumResultsCount":
        setMaximumResultsCount(root, args.getInt(0));
        break;
      case "setDuplicatesDelayMs":
        setDuplicatesDelayMs(root, args.getInt(0));
        break;
      case "getMulticodeCachingDuration":
        getMulticodeCachingDuration(root, args.getInt(0));
        break;
      case "setMulticodeCachingDuration":
        setMulticodeCachingDuration(root, args.getInt(0), args.getInt(1));
        break;
      case "getMulticodeCachingEnabled":
        getMulticodeCachingEnabled(root, args.getInt(0));
        break;
      case "setMulticodeCachingEnabled":
        setMulticodeCachingEnabled(root, args.getInt(0), args.getBoolean(1));
        break;
      case "getMaximumResultsCount":
        getMaximumResultsCount(root, args.getInt(0));
        break;
      case "getDuplicatesDelayMs":
        getDuplicatesDelayMs(root, args.getInt(0));
        break;
      case "isUpcEanDeblurEnabled":
        isUpcEanDeblurEnabled(root, args.getInt(0));
        break;
      case "setUpcEanDeblurEnabled":
        setUpcEanDeblurEnabled(root, args.getBoolean(0));
        break;
      case "isMisshaped1DEnabled":
        isMisshaped1DEnabled(root, args.getInt(0));
        break;
      case "setEnableMisshaped1DEnabled":
        setEnableMisshaped1DEnabled(root, args.getBoolean(0));
        break;
      case "setBarcodeThumbnailOnResultEnabled":
        setBarcodeThumbnailOnResultEnabled(root, args.getBoolean(0));
        break;
      case "isBarcodeThumbnailOnResultEnabled":
        isBarcodeThumbnailOnResultEnabled(root, args.getInt(0));
        break;
      case "setThresholdBetweenDuplicatesScans":
        setThresholdBetweenDuplicatesScans(root, args.getInt(0));
        break;
      case "getThresholdBetweenDuplicatesScans":
        getThresholdBetweenDuplicatesScans(root, args.getInt(0));
        break;
      case "isVINRestrictionsEnabled":
        isVINRestrictionsEnabled(root, args.getInt(0));
        break;
      case "isIdDocumentMasterChecksumEnabled":
        isIdDocumentMasterChecksumEnabled(root, args.getInt(0));
        break;
      case "isDatamatrixDpmModeEnabled":
        isDatamatrixDpmModeEnabled(root, args.getInt(0));
        break;
      case "isQrDpmModeEnabled":
        isQrDpmModeEnabled(root, args.getInt(0));
        break;
      case "isQrMicroDpmModeEnabled":
        isQrMicroDpmModeEnabled(root, args.getInt(0));
        break;
      case "setEnableVINRestrictions":
        setEnableVINRestrictions(root, args.getBoolean(0));
        break;
    }
  }

  @Override
  public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
    HashMap<String, Object> exportedCustomDirectEventTypeConstants = MapBuilder.newHashMap();

    exportedCustomDirectEventTypeConstants.put(BarkoderViewDataReturnedEvent.EVENT_NAME,
        MapBuilder.of("registrationName", "onDataReturned"));

    exportedCustomDirectEventTypeConstants.put(BarkoderViewConfigCreatedEvent.EVENT_NAME,
        MapBuilder.of("registrationName", "onBarkoderConfigCreated"));

    return exportedCustomDirectEventTypeConstants;
  }

  // region Methods

  private void getMaxZoomFactor(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    SoftReference<EventDispatcher> dispatcherRef = new SoftReference<>(eventDispatcher);
    int bkdViewId = bkdView.getId();

    bkdView.getMaxZoomFactor(
        maxZoomFactor -> dispatchDataReturnedEvent(dispatcherRef, bkdViewId, promiseRequestId, maxZoomFactor));
  }

  private void setZoomFactor(BarkoderReactBarkoderView bkdView, double zoomFactor) {
    bkdView.setZoomFactor((float) zoomFactor);
  }

  private void isFlashAvailable(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    SoftReference<EventDispatcher> dispatcherRef = new SoftReference<>(eventDispatcher);
    int bkdViewId = bkdView.getId();

    bkdView.isFlashAvailable(
        isAvailable -> dispatchDataReturnedEvent(dispatcherRef, bkdViewId, promiseRequestId, isAvailable));
  }

  private void setFlashEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.setFlashEnabled(enabled);
  }

  private void startCamera(BarkoderReactBarkoderView bkdView) {
    bkdView.startCamera();
  }

  private void startScanning(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    SoftReference<EventDispatcher> dispatcherRef = new SoftReference<>(eventDispatcher);
    int bkdViewId = bkdView.getId();

    bkdView.startScanning((results, thumbnails, resultImage) -> {
      dispatchDataReturnedEvent(dispatcherRef, bkdViewId, promiseRequestId,
          Util.barkoderResultsToJsonString(results, thumbnails, resultImage));
    });
  }

  private void scanImage(BarkoderReactBarkoderView bkdView, String base64Image, int promiseRequestId) {
    SoftReference<EventDispatcher> dispatcherRef = new SoftReference<>(eventDispatcher);
    int bkdViewId = bkdView.getId();

    byte[] imageData = android.util.Base64.decode(base64Image, android.util.Base64.DEFAULT);
    if (imageData == null) {
      dispatchDataReturnedEvent(dispatcherRef, bkdViewId, promiseRequestId, "Failed to decode image data.");
      return;
    }

    Bitmap image = BitmapFactory.decodeByteArray(imageData, 0, imageData.length);
    if (image == null) {
      dispatchDataReturnedEvent(dispatcherRef, bkdViewId, promiseRequestId, "Failed to create bitmap from image data.");
      return;
    }

    BarkoderHelper.scanImage(image, bkdView.config, (results, thumbnails, resultImage) -> {
      dispatchDataReturnedEvent(dispatcherRef, bkdViewId, promiseRequestId,
          Util.barkoderResultsToJsonString(results, thumbnails, resultImage));
    }, bkdView.getContext());
  }

  private void stopScanning(BarkoderReactBarkoderView bkdView) {
    bkdView.stopScanning();
  }

  private void pauseScanning(BarkoderReactBarkoderView bkdView) {
    bkdView.pauseScanning();
  }

  private void getLocationLineColorHex(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    String hexColor = String.format("#%08X", bkdView.config.getLocationLineColor());
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId, hexColor);
  }

  private void setLocationLineColor(BarkoderReactBarkoderView bkdView, int promiseRequestId, String hexColor) {
    try {
      bkdView.config.setLocationLineColor(Util.hexColorToIntColor(hexColor));

      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          true);
    } catch (IllegalArgumentException ex) {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.COLOR_NOT_SET, ex.getMessage());
    }
  }

  private void getLocationLineWidth(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.getLocationLineWidth());
  }

  private void setLocationLineWidth(BarkoderReactBarkoderView bkdView, double width) {
    bkdView.config.setLocationLineWidth((float) width);
  }

  private void getRoiLineColorHex(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    String hexColor = String.format("#%08X", bkdView.config.getRoiLineColor());
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId, hexColor);
  }

  private void setRoiLineColor(BarkoderReactBarkoderView bkdView, int promiseRequestId, String hexColor) {
    try {
      bkdView.config.setRoiLineColor(Util.hexColorToIntColor(hexColor));

      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          true);
    } catch (IllegalArgumentException ex) {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.COLOR_NOT_SET, ex.getMessage());
    }
  }

  private void getRoiLineWidth(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.getRoiLineWidth());
  }

  private void setRoiLineWidth(BarkoderReactBarkoderView bkdView, double width) {
    bkdView.config.setRoiLineWidth((float) width);
  }

  private void getRoiOverlayBackgroundColorHex(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    String hexColor = String.format("#%08X", bkdView.config.getRoiOverlayBackgroundColor());
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId, hexColor);
  }

  private void setRoiOverlayBackgroundColor(BarkoderReactBarkoderView bkdView, int promiseRequestId, String hexColor) {
    try {
      bkdView.config.setRoiOverlayBackgroundColor(Util.hexColorToIntColor(hexColor));

      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          true);
    } catch (IllegalArgumentException ex) {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.COLOR_NOT_SET, ex.getMessage());
    }
  }

  private void isCloseSessionOnResultEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.isCloseSessionOnResultEnabled());
  }

  private void setCloseSessionOnResultEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.setCloseSessionOnResultEnabled(enabled);
  }

  private void isImageResultEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.isImageResultEnabled());
  }

  private void setImageResultEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.setImageResultEnabled(enabled);
  }

  private void isLocationInImageResultEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.isLocationInImageResultEnabled());
  }

  private void setLocationInImageResultEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.setLocationInImageResultEnabled(enabled);
  }

  private void getRegionOfInterest(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    Barkoder.BKRect roiRect = bkdView.config.getRegionOfInterest();

    WritableArray roiAsArray = Arguments.createArray();
    roiAsArray.pushDouble(roiRect.left);
    roiAsArray.pushDouble(roiRect.top);
    roiAsArray.pushDouble(roiRect.width);
    roiAsArray.pushDouble(roiRect.height);

    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        roiAsArray);
  }

  private void setRegionOfInterest(BarkoderReactBarkoderView bkdView, int promiseRequestId, double left, double top,
      double width, double height) {
    try {
      bkdView.config.setRegionOfInterest((float) left, (float) top, (float) width, (float) height);

      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          true);
    } catch (IllegalArgumentException ex) {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.ROI_NOT_SET, ex.getMessage());
    }
  }

  private void getThreadsLimit(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        BarkoderConfig.GetThreadsLimit());
  }

  private void setThreadsLimit(BarkoderReactBarkoderView bkdView, int promiseRequestId, int threadsLimit) {
    try {
      BarkoderConfig.SetThreadsLimit(threadsLimit);

      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          true);
    } catch (IllegalArgumentException ex) {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.THREADS_LIMIT_NOT_SET, ex.getMessage());
    }
  }

  private void isLocationInPreviewEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.isLocationInPreviewEnabled());
  }

  private void setLocationInPreviewEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.setLocationInPreviewEnabled(enabled);
  }

  private void isPinchToZoomEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.isPinchToZoomEnabled());
  }

  private void setPinchToZoomEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.setPinchToZoomEnabled(enabled);
  }

  private void isRegionOfInterestVisible(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.isRegionOfInterestVisible());
  }

  private void setRegionOfInterestVisible(BarkoderReactBarkoderView bkdView, boolean visible) {
    bkdView.config.setRegionOfInterestVisible(visible);
  }

  private void getBarkoderResolution(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.getBarkoderResolution().ordinal());
  }

  private void setBarkoderResolution(BarkoderReactBarkoderView bkdView, int barkoderResolutionOrdinal) {
    // Intentional noinspection for NPE
    BarkoderResolution bkdResolution = BarkoderResolution.values()[barkoderResolutionOrdinal];
    bkdView.config.setBarkoderResolution(bkdResolution);
  }

  private void isBeepOnSuccessEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.isBeepOnSuccessEnabled());
  }

  private void setBeepOnSuccessEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.setBeepOnSuccessEnabled(enabled);
  }

  private void isVibrateOnSuccessEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.isVibrateOnSuccessEnabled());
  }

  private void setVibrateOnSuccessEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.setVibrateOnSuccessEnabled(enabled);
  }

  private void getVersion(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        Barkoder.GetVersion());
  }

  private void showLogMessages(boolean show) {
    BarkoderConfig.LogsEnabled = show;
  }

  @SuppressWarnings("ConstantConditions")
  private void isBarcodeTypeEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId, int barcodeTypeOrdinal) {
    final Barkoder.SpecificConfig specificConfig = Util.getSpecificConfigRefFromBarcodeTypeOrdinal(barcodeTypeOrdinal,
        bkdView.config.getDecoderConfig());

    // Intentional noinspection for NPE
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        specificConfig.enabled);
  }

  @SuppressWarnings("ConstantConditions")
  private void setBarcodeTypeEnabled(BarkoderReactBarkoderView bkdView, int barcodeTypeOrdinal, boolean enabled) {
    final Barkoder.SpecificConfig specificConfig = Util.getSpecificConfigRefFromBarcodeTypeOrdinal(barcodeTypeOrdinal,
        bkdView.config.getDecoderConfig());

    // Intentional noinspection for NPE
    specificConfig.enabled = enabled;
  }

  @SuppressWarnings("ConstantConditions")
  private void getBarcodeTypeLengthRange(BarkoderReactBarkoderView bkdView, int promiseRequestId,
      int barcodeTypeOrdinal) {
    if (barcodeTypeOrdinal == Barkoder.BarcodeType.Code128.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Code93.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Code39.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Codabar.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Code11.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Msi.ordinal()) {

      final Barkoder.SpecificConfig specificConfig = Util.getSpecificConfigRefFromBarcodeTypeOrdinal(barcodeTypeOrdinal,
          bkdView.config.getDecoderConfig());

      WritableArray rangeAsArray = Arguments.createArray();
      rangeAsArray.pushInt(specificConfig.minimumLength);
      rangeAsArray.pushInt(specificConfig.maximumLength);

      // Intentional noinspection for NPE
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          rangeAsArray);
    } else {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.BARCODE_TYPE_NOT_SUPPORTED, null);
    }
  }

  @SuppressWarnings("ConstantConditions")
  private void setBarcodeTypeLengthRange(BarkoderReactBarkoderView bkdView, int promiseRequestId,
      int barcodeTypeOrdinal,
      int min, int max) {

    if (barcodeTypeOrdinal == Barkoder.BarcodeType.Code128.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Code93.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Code39.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Codabar.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Code11.ordinal() ||
        barcodeTypeOrdinal == Barkoder.BarcodeType.Msi.ordinal()) {

      final Barkoder.SpecificConfig specificConfig = Util.getSpecificConfigRefFromBarcodeTypeOrdinal(barcodeTypeOrdinal,
          bkdView.config.getDecoderConfig());

      if (specificConfig.setLengthRange(min, max) == 0) {
        dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
            true);
      } else {
        dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
            null, BarkoderReactNativeErrors.LENGTH_RANGE_NOT_VALID, null);
      }
    } else {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.BARCODE_TYPE_NOT_SUPPORTED, null);
    }
  }

  private void getMsiChecksumType(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.getDecoderConfig().Msi.checksumType.ordinal());
  }

  private void setMsiChecksumType(BarkoderReactBarkoderView bkdView, int checksumTypeOrdinal) {
    // Intentional noinspection for NPE
    bkdView.config.getDecoderConfig().Msi.checksumType = Barkoder.MsiChecksumType.valueOf(checksumTypeOrdinal);
  }

  private void getCode39ChecksumType(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.getDecoderConfig().Code39.checksumType.ordinal());
  }

  private void setCode39ChecksumType(BarkoderReactBarkoderView bkdView, int checksumTypeOrdinal) {
    // Intentional noinspection for NPE
    bkdView.config.getDecoderConfig().Code39.checksumType = Barkoder.Code39ChecksumType.valueOf(checksumTypeOrdinal);
  }

  private void getCode11ChecksumType(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.getDecoderConfig().Code11.checksumType.ordinal());
  }

  private void setCode11ChecksumType(BarkoderReactBarkoderView bkdView, int checksumTypeOrdinal) {
    // Intentional noinspection for NPE
    bkdView.config.getDecoderConfig().Code11.checksumType = Barkoder.Code11ChecksumType.valueOf(checksumTypeOrdinal);
  }

  private void getEncodingCharacterSet(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.getDecoderConfig().encodingCharacterSet);
  }

  private void setEncodingCharacterSet(BarkoderReactBarkoderView bkdView, String characterSet) {
    bkdView.config.getDecoderConfig().encodingCharacterSet = characterSet;
  }

  private void getDecodingSpeed(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.getDecoderConfig().decodingSpeed.ordinal());
  }

  private void setDecodingSpeed(BarkoderReactBarkoderView bkdView, int decodingSpeedOrdinal) {
    // Intentional noinspection for NPE
    bkdView.config.getDecoderConfig().decodingSpeed = Barkoder.DecodingSpeed.valueOf(decodingSpeedOrdinal);
  }

  private void getFormattingType(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        bkdView.config.getDecoderConfig().formattingType.ordinal());
  }

  private void setFormattingType(BarkoderReactBarkoderView bkdView, int formattingTypeOrdinal) {
    // Intentional noinspection for NPE
    bkdView.config.getDecoderConfig().formattingType = Barkoder.FormattingType.valueOf(formattingTypeOrdinal);
  }

  private void setMaximumResultsCount(BarkoderReactBarkoderView bkdView, int maximumResultsCount) {
    bkdView.config.getDecoderConfig().maximumResultsCount = maximumResultsCount;
  }

  private void setDuplicatesDelayMs(BarkoderReactBarkoderView bkdView, int duplicatesDelayMs) {
    bkdView.config.getDecoderConfig().duplicatesDelayMs = duplicatesDelayMs;
  }

  private void setMulticodeCachingDuration(BarkoderReactBarkoderView bkdView, int promiseRequestId,
      int multicodeCachingDuration) {
    try {
      BarkoderConfig.SetMulticodeCachingDuration(multicodeCachingDuration);

      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          true);
    } catch (IllegalArgumentException ex) {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.MULTICODE_CACHING_IS_NOT_SET, ex.getMessage());
    }
  }

  private void getMulticodeCachingDuration(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    int multicodeCachingDuration = BarkoderConfig.GetMulticodeCachingDuration();
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        multicodeCachingDuration);
  }

  private void setMulticodeCachingEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId,
      boolean multicodeCachingEnabled) {
    try {
      BarkoderConfig.SetMulticodeCachingEnabled(multicodeCachingEnabled);

      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          true);
    } catch (IllegalArgumentException ex) {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.MULTICODE_CACHING_IS_NOT_SET, ex.getMessage());
    }
  }

  private void getMulticodeCachingEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    boolean multicodeCachingEnabled = BarkoderConfig.IsMulticodeCachingEnabled();
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        multicodeCachingEnabled);
  }

  private void getMaximumResultsCount(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    int maximumResultsCount = bkdView.config.getDecoderConfig().maximumResultsCount;
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        maximumResultsCount);
  }

  private void getDuplicatesDelayMs(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    int duplicatesDelayMs = bkdView.config.getDecoderConfig().duplicatesDelayMs;
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        duplicatesDelayMs);
  }

  private void setUpcEanDeblurEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.getDecoderConfig().upcEanDeblur = enabled;
  }

  private void isUpcEanDeblurEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    boolean isUpcEanDeblurEnabled = bkdView.config.getDecoderConfig().upcEanDeblur;
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        isUpcEanDeblurEnabled);
  }

  private void setEnableMisshaped1DEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.getDecoderConfig().enableMisshaped1D = enabled;
  }

  private void isMisshaped1DEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    boolean isMisshaped1DEnabled = bkdView.config.getDecoderConfig().enableMisshaped1D;
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        isMisshaped1DEnabled);
  }

  private void setBarcodeThumbnailOnResultEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.setThumbnailOnResultEnabled(enabled);
  }

  private void isBarcodeThumbnailOnResultEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    boolean thumbnailOnResulEnabled = bkdView.config.getThumbnailOnResulEnabled();
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        thumbnailOnResulEnabled);
  }

  private void setThresholdBetweenDuplicatesScans(BarkoderReactBarkoderView bkdView,
      int thresholdBetweenDuplicatesScans) {
    bkdView.config.setThresholdBetweenDuplicatesScans(thresholdBetweenDuplicatesScans);
  }

  private void getThresholdBetweenDuplicatesScans(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    int thresholdBetweenDuplicatesScans = bkdView.config.getThresholdBetweenDuplicatesScans();
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        thresholdBetweenDuplicatesScans);
  }

  private void setEnableVINRestrictions(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.getDecoderConfig().enableVINRestrictions = enabled;
  }

  private void isVINRestrictionsEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    boolean isVINRestrictionsEnabled = bkdView.config.getDecoderConfig().enableVINRestrictions;
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        isVINRestrictionsEnabled);
  }

  private void setDatamatrixDpmModeEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.getDecoderConfig().Datamatrix.dpmMode = enabled;
  }

  private void setQrDpmModeEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.getDecoderConfig().QR.dpmMode = enabled;
  }

  private void setQrMicroDpmModeEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    bkdView.config.getDecoderConfig().QRMicro.dpmMode = enabled;
  }

  private void isDatamatrixDpmModeEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    boolean isDatamatrixDpmModeEnabled = bkdView.config.getDecoderConfig().Datamatrix.dpmMode;
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        isDatamatrixDpmModeEnabled);
  }

  private void isQrDpmModeEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    boolean isQRDpmModeEnabled = bkdView.config.getDecoderConfig().QR.dpmMode;
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        isQRDpmModeEnabled);
  }

  private void isQrMicroDpmModeEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    boolean isQrMicroDpmModeEnabled = bkdView.config.getDecoderConfig().QRMicro.dpmMode;
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        isQrMicroDpmModeEnabled);
  }

  private void setIdDocumentMasterChecksumEnabled(BarkoderReactBarkoderView bkdView, boolean enabled) {
    if (enabled) {
      bkdView.config.getDecoderConfig().IDDocument.masterChecksumType = Barkoder.StandardChecksumType.Enabled;
    } else {
      bkdView.config.getDecoderConfig().IDDocument.masterChecksumType = Barkoder.StandardChecksumType.Disabled;
    }

  }

  private void isIdDocumentMasterChecksumEnabled(BarkoderReactBarkoderView bkdView, int promiseRequestId) {
    boolean isIdDocumentMasterChecksumEnabled = bkdView.config
        .getDecoderConfig().IDDocument.masterChecksumType == Barkoder.StandardChecksumType.Enabled;

    // Dispatch the result
    dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
        isIdDocumentMasterChecksumEnabled);
  }

  private void configureBarkoder(BarkoderReactBarkoderView bkdView, int promiseRequestId,
      String barkoderConfigAsJsonString) {
    try {
      JSONObject configAsJson = new JSONObject(barkoderConfigAsJsonString);

      // Its easier for the users to send us hex color from the cross platform

      if (configAsJson.has("roiLineColor")) {
        String colorAsHex = configAsJson.getString("roiLineColor");
        configAsJson.put("roiLineColor", Util.hexColorToIntColor(colorAsHex));
      }

      if (configAsJson.has("roiOverlayBackgroundColor")) {
        String colorAsHex = configAsJson.getString("roiOverlayBackgroundColor");
        configAsJson.put("roiOverlayBackgroundColor", Util.hexColorToIntColor(colorAsHex));
      }

      if (configAsJson.has("locationLineColor")) {
        String colorAsHex = configAsJson.getString("locationLineColor");
        configAsJson.put("locationLineColor", Util.hexColorToIntColor(colorAsHex));
      }

      BarkoderHelper.applyJsonToConfig(bkdView.config, configAsJson);

      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          true);
    } catch (Exception ex) {
      dispatchDataReturnedEvent(new SoftReference<>(eventDispatcher), bkdView.getId(), promiseRequestId,
          null, BarkoderReactNativeErrors.BARKODER_CONFIG_IS_NOT_VALID, ex.getMessage());
    }
  }

  // endregion Methods

  // region Helper f-ons

  private void configureBarkoderView(BarkoderReactBarkoderView bkdView, String licenseKey) {
    bkdView.config = new BarkoderConfig(bkdView.getContext(), licenseKey,
        licenseCheckResult -> BarkoderLog.i(TAG, "LICENSE RESULT: " + licenseCheckResult.message));
  }

  private void dispatchDataReturnedEvent(SoftReference<EventDispatcher> dispatcherRef,
      int bkdViewId, int promiseRequestId, Object payloadValue) {

    dispatchDataReturnedEvent(dispatcherRef, bkdViewId, promiseRequestId, payloadValue, null, null);
  }

  private void dispatchDataReturnedEvent(SoftReference<EventDispatcher> dispatcherRef, int bkdViewId,
      int promiseRequestId, Object payloadValue,
      BarkoderReactNativeErrors customError, String exceptionMessage) {
    mainThreadHandler.post(() -> {
      EventDispatcher dispatcher = dispatcherRef.get();
      if (dispatcher != null && promiseRequestId >= 0) {
        if (customError == null)
          dispatcher.dispatchEvent(new BarkoderViewDataReturnedEvent(bkdViewId, promiseRequestId, payloadValue));
        else
          dispatcher.dispatchEvent(new BarkoderViewDataReturnedEvent(bkdViewId, promiseRequestId,
              customError, exceptionMessage));
      }
    });
  }

  private void dispatchConfigCreatedEvent(SoftReference<EventDispatcher> dispatcherRef, int bkdViewId) {
    mainThreadHandler.post(() -> {
      EventDispatcher dispatcher = dispatcherRef.get();
      if (dispatcher != null) {
        dispatcher.dispatchEvent(new BarkoderViewConfigCreatedEvent(bkdViewId));
      }
    });
  }

  // endregion Helper f-ons
}