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
RCT_EXTERN_METHOD(setDuplicatesDelayMs:
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
RCT_EXTERN_METHOD(getDuplicatesDelayMs:
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

@end
