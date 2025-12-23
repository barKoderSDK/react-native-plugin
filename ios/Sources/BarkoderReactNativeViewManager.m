#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(BarkoderEmitter, RCTEventEmitter)
@end

@interface RCT_EXTERN_MODULE(BarkoderReactNativeViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(licenseKey, NSString)
RCT_EXTERN_METHOD(startScanning: (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(stopScanning: (nonnull NSNumber *)node)
RCT_EXTERN_METHOD(pauseScanning: (nonnull NSNumber *)node)
RCT_EXTERN_METHOD(freezeScanning: (nonnull NSNumber *)node)
RCT_EXTERN_METHOD(unfreezeScanning: (nonnull NSNumber *)node)
RCT_EXTERN_METHOD(captureImage: (nonnull NSNumber *)node)
RCT_EXTERN_METHOD(scanImage: (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(startCamera: (nonnull NSNumber *)node)
RCT_EXTERN_METHOD(isFlashAvailable:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setFlashEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(getMaxZoomFactor:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getCurrentZoomFactor:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setZoomFactor:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(getLocationLineColorHex:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setLocationLineColor:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setRoiLineColor:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setRoiLineWidth:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setRoiOverlayBackgroundColor:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setCloseSessionOnResultEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setImageResultEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setLocationInImageResultEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setLocationInPreviewEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setPinchToZoomEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setRegionOfInterestVisible:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setRegionOfInterest:
                  (nonnull NSNumber *)node
                  left:(nonnull NSNumber)left
                  top:(nonnull NSNumber)top
                  width:(nonnull NSNumber)width
                  height:(nonnull NSNumber)height
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setBeepOnSuccessEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setVibrateOnSuccessEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(getEncodingCharacterSet:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getDecodingSpeed:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getFormattingType:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setLocationLineWidth:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(getLocationLineWidth:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getRoiLineColorHex:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getRoiLineWidth:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getRoiOverlayBackgroundColorHex:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isCloseSessionOnResultEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isImageResultEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isLocationInImageResultEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getRegionOfInterest:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getThreadsLimit:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setThreadsLimit:
                  (nonnull NSNumber *)node
                  threadsLimit:(nonnull NSNumber)threadsLimit
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isLocationInPreviewEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isPinchToZoomEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isRegionOfInterestVisible:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isBeepOnSuccessEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isVibrateOnSuccessEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getVersion:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getLibVersion:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getMsiChecksumType:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getCode39ChecksumType:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getCode11ChecksumType:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setBarkoderResolution:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(getBarkoderResolution:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setEncodingCharacterSet:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg)
RCT_EXTERN_METHOD(setDecodingSpeed:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setFormattingType:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setMsiChecksumType:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setCode39ChecksumType:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setCode11ChecksumType:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(isBarcodeTypeEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setBarcodeTypeEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg
                  enabled:(nonnull BOOL)enabled)
RCT_EXTERN_METHOD(getBarcodeTypeLengthRange:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setBarcodeTypeLengthRange:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg
                  min:(nonnull NSNumber)min
                  max:(nonnull NSNumber)max
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setMaximumResultsCount:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setMulticodeCachingDuration:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setMulticodeCachingEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(getMaximumResultsCount:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isDatamatrixDpmModeEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setDatamatrixDpmModeEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(isQrDpmModeEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setQrDpmModeEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(isQrMicroDpmModeEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setQrMultiPartMergeEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(isQrMultiPartMergeEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setQrMicroDpmModeEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(isIdDocumentMasterChecksumEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setIdDocumentMasterChecksumEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setUpcEanDeblurEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setUPCEexpandToUPCA:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setUPCE1expandToUPCA:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setEnableMisshaped1DEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setBarcodeThumbnailOnResultEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(isBarcodeThumbnailOnResultEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setThresholdBetweenDuplicatesScans:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(getThresholdBetweenDuplicatesScans:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getMulticodeCachingEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getMulticodeCachingDuration:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isUpcEanDeblurEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isMisshaped1DEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isVINRestrictionsEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setEnableVINRestrictions:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(configureBarkoder:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getScanningIndicatorColorHex:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setScanningIndicatorColor:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getScanningIndicatorWidth:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setScanningIndicatorWidth:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(getScanningIndicatorAnimation:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setScanningIndicatorAnimation:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(isScanningIndicatorAlwaysVisible:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setScanningIndicatorAlwaysVisible:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setCustomOption:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  intvalue:(nonnull NSNumber)intvalue)
RCT_EXTERN_METHOD(setDynamicExposure:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setCentricFocusAndExposure:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setEnableComposite:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setVideoStabilization:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setCamera:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setShowDuplicatesLocations:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setARMode:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARResultDisappearanceDelayMs:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARLocationTransitionSpeed:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setAROverlayRefresh:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARSelectedLocationColor:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setARNonSelectedLocationColor:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setARSelectedLocationLineWidth:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARNonSelectedLocationLineWidth:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARLocationType:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARDoubleTapToFreezeEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setARImageResultEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setARBarcodeThumbnailOnResultEnabled:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setARResultLimit:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARContinueScanningOnLimit:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setAREmitResultsAtSessionEndOnly:
                  (nonnull NSNumber *)node
                  arg:(nonnull BOOL)arg)
RCT_EXTERN_METHOD(setARHeaderHeight:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARHeaderShowMode:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARHeaderMaxTextHeight:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARHeaderMinTextHeight:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARHeaderTextColorSelected:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setARHeaderTextColorNonSelected:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(setARHeaderHorizontalTextMargin:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARHeaderVerticalTextMargin:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSNumber)arg)
RCT_EXTERN_METHOD(setARHeaderTextFormat:
                  (nonnull NSNumber *)node
                  arg:(nonnull NSString)arg)
RCT_EXTERN_METHOD(configureCloseButton:
                  (nonnull NSNumber *)node
                  visible:(nonnull NSNumber *)visible
                  positionX:(nonnull NSNumber *)positionX
                  positionY:(nonnull NSNumber *)positionY
                  iconSize:(nonnull NSNumber *)iconSize
                  tintColorHex:(nonnull NSString *)tintColorHex
                  backgroundColorHex:(nonnull NSString *)backgroundColorHex
                  cornerRadius:(nonnull NSNumber *)cornerRadius
                  padding:(nonnull NSNumber *)padding
                  useCustomIcon:(nonnull NSNumber *)useCustomIcon
                  customIcon:(nonnull NSString *)customIcon)
RCT_EXTERN_METHOD(configureFlashButton:
                  (nonnull NSNumber *)node
                  visible:(nonnull NSNumber *)visible
                  positionX:(nonnull NSNumber *)positionX
                  positionY:(nonnull NSNumber *)positionY
                  iconSize:(nonnull NSNumber *)iconSize
                  tintColorHex:(nonnull NSString *)tintColorHex
                  backgroundColorHex:(nonnull NSString *)backgroundColorHex
                  cornerRadius:(nonnull NSNumber *)cornerRadius
                  padding:(nonnull NSNumber *)padding
                  useCustomIcon:(nonnull NSNumber *)useCustomIcon
                  customIconFlashOn:(nonnull NSString *)customIconFlashOn
                  customIconFlashOff:(nonnull NSString *)customIconFlashOff)
RCT_EXTERN_METHOD(configureZoomButton:
                  (nonnull NSNumber *)node
                  visible:(nonnull NSNumber *)visible
                  positionX:(nonnull NSNumber *)positionX
                  positionY:(nonnull NSNumber *)positionY
                  iconSize:(nonnull NSNumber *)iconSize
                  tintColorHex:(nonnull NSString *)tintColorHex
                  backgroundColorHex:(nonnull NSString *)backgroundColorHex
                  cornerRadius:(nonnull NSNumber *)cornerRadius
                  padding:(nonnull NSNumber *)padding
                  useCustomIcon:(nonnull NSNumber *)useCustomIcon
                  customIconZoomedIn:(nonnull NSString *)customIconZoomedIn
                  customIconZoomedOut:(nonnull NSString *)customIconZoomedOut
                  zoomedInFactor:(nonnull NSNumber *)zoomedInFactor
                  zoomedOutFactor:(nonnull NSNumber *)zoomedOutFactor)
RCT_EXTERN_METHOD(selectVisibleBarcodes: (nonnull NSNumber *)node)
RCT_EXTERN_METHOD(getShowDuplicatesLocations:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARMode:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARResultDisappearanceDelayMs:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARLocationTransitionSpeed:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getAROverlayRefresh:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARSelectedLocationColor:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARNonSelectedLocationColor:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARSelectedLocationLineWidth:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARNonSelectedLocationLineWidth:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARLocationType:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isARDoubleTapToFreezeEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isARImageResultEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(isARBarcodeThumbnailOnResultEnabled:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARResultLimit:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARContinueScanningOnLimit:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getAREmitResultsAtSessionEndOnly:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARHeaderHeight:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARHeaderShowMode:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARHeaderMaxTextHeight:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARHeaderMinTextHeight:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARHeaderTextColorSelected:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARHeaderTextColorNonSelected:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARHeaderHorizontalTextMargin:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARHeaderVerticalTextMargin:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getARHeaderTextFormat:
                  (nonnull NSNumber *)node
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
