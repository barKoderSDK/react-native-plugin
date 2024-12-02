import BarkoderSDK
import UIKit
import Foundation
import React

@objc(BarkoderEmitter)
class BarkoderEmitter: RCTEventEmitter {
    
    static var shared = BarkoderEmitter()
    
    private var hasListeners: Bool = false
    
    override func supportedEvents() -> [String]! {
        return ["BarkoderResultEvent", "BarkoderConfigEvent"]
    }
    
    override class func requiresMainQueueSetup() -> Bool {
        return false
    }

    override func startObserving() {
        hasListeners = true
    }
    
    override func stopObserving() {
        hasListeners = false
    }
    
    @objc(sendDataToReactNative:)
    func sendDataToReactNative(data: String) {
        if hasListeners {
            sendEvent(withName: "BarkoderResultEvent", body: ["data": data])
        }
    }
    
    @objc(sendTest)
    func configDidFinish() {
        if hasListeners {
            sendEvent(withName: "BarkoderConfigEvent", body: nil)
        }
    }
    
}

@objc(BarkoderReactNativeViewManager)
class BarkoderReactNativeViewManager: RCTViewManager {
    
    private var barkoderReactNativeView: BarkoderReactNativeView?
    
    override func view() -> (BarkoderReactNativeView) {
        barkoderReactNativeView = BarkoderReactNativeView(frame: .zero, bridge: bridge)
        return barkoderReactNativeView!
    }
    
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc
    func startScanning(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            do {
                try barkoderView.startScanning(self)
            } catch let error {
                self.handleBarkoderError(BarkoderReactNativeErrors.BARKODER_VIEW_DESTROYED, rejecter: rejecter, error: error)
            }
        }
    }
    
    @objc
    func stopScanning(_ node: NSNumber) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.stopScanning()
        }
    }
    
    @objc
    func pauseScanning(_ node: NSNumber) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.pauseScanning()
        }
    }
  
  @objc
  func scanImage(
    _ node: NSNumber,
    arg: NSString,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    
    getBarkoderView(node: node) { barkoderView in
      let base64Image = arg as String
      
      guard let imageData = Data(base64Encoded: base64Image, options: .ignoreUnknownCharacters) else {
        return
      }
      
      guard let image = UIImage(data: imageData) else {
        return
      }
      
      //      DispatchQueue.main.async {
      guard let config = barkoderView.config else { return }
      
      BarkoderHelper.scanImage(image, bkdConfig: config, resultDelegate: self)
      //      }
    }
    
  }
    
    @objc
    func startCamera(_ node: NSNumber) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.startCamera()
        }
    }
    
    @objc
    func isFlashAvailable(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.isFlashAvailable({ flashAvailable in
                resolver(flashAvailable)
            })
        }
    }
    
    @objc
    func setFlashEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.setFlash(arg)
        }
    }
    
    @objc
    func getMaxZoomFactor(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.getMaxZoomFactor { maxZoomFactor in
                resolver(maxZoomFactor)
            }
        }
    }
    
    @objc
    func setZoomFactor(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.setZoomFactor(Float(truncating: arg))
        }
    }
    
    @objc
    func setLocationLineWidth(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.locationLineWidth = Float(truncating: arg)
        }
    }
    
    @objc
    func getLocationLineColorHex(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.locationLineColor.toHex())
        }
    }
    
    @objc
    func setLocationLineColor(
        _ node: NSNumber,
        arg: NSString,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let uiColor = Util.initColorWith(hexString: arg as String) else  {
            self.handleBarkoderError(BarkoderReactNativeErrors.COLOR_NOT_SET, rejecter: rejecter)

            return
        }
        
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.locationLineColor = uiColor
            resolver(true)
        }
    }
    
    @objc
    func setRoiLineColor(
        _ node: NSNumber,
        arg: NSString,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let uiColor = Util.initColorWith(hexString: arg as String) else  {
            self.handleBarkoderError(BarkoderReactNativeErrors.COLOR_NOT_SET, rejecter: rejecter)
            
            return
        }
        
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.roiLineColor = uiColor
            resolver(true)
        }
    }
    
    @objc
    func setRoiLineWidth(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.roiLineWidth = Float(truncating: arg)
        }
    }
    
    @objc
    func setRoiOverlayBackgroundColor(
        _ node: NSNumber,
        arg: NSString,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let uiColor = Util.initColorWith(hexString: arg as String) else  {
            self.handleBarkoderError(BarkoderReactNativeErrors.COLOR_NOT_SET, rejecter: rejecter)

            return
        }

        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.roiOverlayBackgroundColor = uiColor
            resolver(true)
        }
    }
    
    @objc
    func setCloseSessionOnResultEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.closeSessionOnResultEnabled = arg
        }
    }
    
    @objc
    func setImageResultEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.imageResultEnabled = arg
        }
    }
    
    @objc
    func setLocationInImageResultEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.locationInImageResultEnabled = arg
        }
    }
    
    @objc
    func setLocationInPreviewEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.locationInPreviewEnabled = arg
        }
    }
    
    @objc
    func setPinchToZoomEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.pinchToZoomEnabled = arg
        }
    }
    
    @objc
    func setRegionOfInterestVisible(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.regionOfInterestVisible = arg
        }
    }
    
    @objc
    func setRegionOfInterest(
        _ node: NSNumber,
        left: NSNumber,
        top: NSNumber,
        width: NSNumber,
        height: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let leftValue = left as? CGFloat,
              let topValue = top as? CGFloat,
              let widthValue = width as? CGFloat,
              let heightValue = height as? CGFloat else {
            self.handleBarkoderError(BarkoderReactNativeErrors.ROI_NOT_SET, rejecter: rejecter)

            return
        }
        
        
        getBarkoderView(node: node) { barkoderView in
            let roi = CGRect(
                x: leftValue,
                y: topValue,
                width: widthValue,
                height: heightValue
            )

            do {
                try barkoderView.config?.setRegionOfInterest(roi)
                resolver(true)
            } catch {
                self.handleBarkoderError(BarkoderReactNativeErrors.ROI_NOT_SET, rejecter: rejecter)
            }
        }
    }
    
    @objc
    func setBeepOnSuccessEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.beepOnSuccessEnabled = arg
        }
    }
    
    @objc
    func setVibrateOnSuccessEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.vibrateOnSuccessEnabled = arg
        }
    }
    
    @objc
    func getEncodingCharacterSet(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.encodingCharacterSet)
        }
    }
    
    @objc
    func getDecodingSpeed(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.decodingSpeed.rawValue)
        }
    }
    
    @objc
    func getFormattingType(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.formatting.rawValue)
        }
    }
    
    @objc
    func getLocationLineWidth(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.locationLineWidth)
        }
    }
    
    @objc
    func getRoiLineColorHex(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.roiLineColor.toHex())
        }
    }
    
    @objc
    func getRoiLineWidth(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.roiLineWidth)
        }
    }
    
    @objc
    func getRoiOverlayBackgroundColorHex(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.roiOverlayBackgroundColor.toHex())
        }
    }
    
    @objc
    func isCloseSessionOnResultEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.closeSessionOnResultEnabled)
        }
    }
    
    @objc
    func isImageResultEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.imageResultEnabled)
        }
    }
    
    @objc
    func isLocationInImageResultEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.locationInImageResultEnabled)
        }
    }
    
    @objc
    func getRegionOfInterest(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            guard let roi = barkoderView.config?.getRegionOfInterest() else {
                self.handleBarkoderError(BarkoderReactNativeErrors.ROI_NOT_SET, rejecter: rejecter)

                return
            }
            resolver([roi.minX, roi.minY, roi.width, roi.height])
        }
    }
    
    @objc
    func getThreadsLimit(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            guard let threadsLimit = barkoderView.config?.getThreadsLimit() else {
                self.handleBarkoderError(BarkoderReactNativeErrors.THREADS_LIMIT_NOT_SET, rejecter: rejecter)

                return
            }
            resolver(threadsLimit)
        }
    }
    
    @objc
    func setThreadsLimit(
        _ node: NSNumber,
        threadsLimit: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            do {
                try barkoderView.config?.setThreadsLimit(Int(truncating: threadsLimit))
            } catch {
                self.handleBarkoderError(BarkoderReactNativeErrors.THREADS_LIMIT_NOT_SET, rejecter: rejecter)
            }
        }
    }
    
    @objc
    func isLocationInPreviewEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.locationInPreviewEnabled)
        }
    }
    
    @objc
    func isPinchToZoomEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.pinchToZoomEnabled)
        }
    }
    
    @objc
    func isRegionOfInterestVisible(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.regionOfInterestVisible)
        }
    }
    
    @objc
    func isBeepOnSuccessEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.beepOnSuccessEnabled)
        }
    }
    
    @objc
    func isVibrateOnSuccessEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.vibrateOnSuccessEnabled)
        }
    }
    
    @objc
    func getVersion(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(iBarkoder.GetVersion())
        }
    }
    
    @objc
    func getMsiChecksumType(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.msi.checksum.rawValue)
        }
    }
    
    @objc
    func setMsiChecksumType(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        guard let index = arg as? Int else { return }
        
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.msi.checksum = .init(UInt32(index))
        }
    }
    
    @objc
    func getCode39ChecksumType(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.code39.checksum.rawValue)
        }
    }
    
    @objc
    func setCode39ChecksumType(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        guard let index = arg as? Int else { return }
        
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.code39.checksum = .init(UInt32(index))
        }
    }
    
    @objc
    func getCode11ChecksumType(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.code11.checksum.rawValue)
        }
    }
    
    @objc
    func setCode11ChecksumType(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        guard let index = arg as? Int else { return }
        
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.code11.checksum = .init(UInt32(index))
        }
    }
    
    @objc
    func setBarkoderResolution(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        guard let index = arg as? Int else { return }
        
        getBarkoderView(node: node) { barkoderView in
            if let barkoderResolution = BarkoderView.BarkoderResolution.init(rawValue: index) {
                barkoderView.config?.barkoderResolution = barkoderResolution
            }
        }
    }
    
    @objc
    func getBarkoderResolution(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.barkoderResolution.rawValue)
        }
    }
    
    @objc
    func setDecodingSpeed(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        guard let index = arg as? Int else { return }
        
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.decodingSpeed = DecodingSpeed.init(UInt32(index))
        }
    }
    
    @objc
    func setEncodingCharacterSet(
        _ node: NSNumber,
        arg: NSString
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.encodingCharacterSet = arg as String
        }
    }
    
    @objc
    func setFormattingType(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        guard let index = arg as? Int else { return }
        
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.formatting = Formatting.init(UInt32(index))
        }
    }
    
    @objc
    func setMaximumResultsCount(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.maximumResultsCount = Int32(truncating: arg)
        }
    }

    @objc
    func setDuplicatesDelayMs(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.duplicatesDelayMs = Int32(truncating: arg)
        }
    }

    @objc
    func setMulticodeCachingDuration(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.setMulticodeCachingDuration(Int(truncating: arg))
        }
    }

    @objc
    func setMulticodeCachingEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.setMulticodeCachingEnabled(arg)
        }
    }
        
    @objc
    func getMaximumResultsCount(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.maximumResultsCount)
        }
    }
    
    @objc
    func getDuplicatesDelayMs(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.duplicatesDelayMs)
        }
    }
  
  @objc
  func isDatamatrixDpmModeEnabled(
      _ node: NSNumber,
      resolver: @escaping RCTPromiseResolveBlock,
      rejecter: @escaping RCTPromiseRejectBlock
  ) {
      getBarkoderView(node: node) { barkoderView in
          resolver(barkoderView.config?.decoderConfig?.datamatrix.dpmMode == 1 ? true : false)
      }
  }
    
    @objc
    func setDatamatrixDpmModeEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.datamatrix.dpmMode = arg ? 1 : 0
        }
    }
  
  @objc
  func isQrDpmModeEnabled(
      _ node: NSNumber,
      resolver: @escaping RCTPromiseResolveBlock,
      rejecter: @escaping RCTPromiseRejectBlock
  ) {
      getBarkoderView(node: node) { barkoderView in
          resolver(barkoderView.config?.decoderConfig?.qr.dpmMode == 1 ? true : false)
      }
  }
  
  @objc
  func setQrDpmModeEnabled(
      _ node: NSNumber,
      arg: Bool
  ) {
      getBarkoderView(node: node) { barkoderView in
        barkoderView.config?.decoderConfig?.qr.dpmMode = arg ? 1 : 0
      }
  }
  
  @objc
  func isQrMicroDpmModeEnabled(
      _ node: NSNumber,
      resolver: @escaping RCTPromiseResolveBlock,
      rejecter: @escaping RCTPromiseRejectBlock
  ) {
      getBarkoderView(node: node) { barkoderView in
          resolver(barkoderView.config?.decoderConfig?.qrMicro.dpmMode == 1 ? true : false)
      }
  }
  
  @objc
  func setQrMicroDpmModeEnabled(
      _ node: NSNumber,
      arg: Bool
  ) {
      getBarkoderView(node: node) { barkoderView in
        barkoderView.config?.decoderConfig?.qrMicro.dpmMode = arg ? 1 : 0
      }
  }
  
  @objc
  func isIdDocumentMasterChecksumEnabled(
      _ node: NSNumber,
      resolver: @escaping RCTPromiseResolveBlock,
      rejecter: @escaping RCTPromiseRejectBlock
  ) {
      getBarkoderView(node: node) { barkoderView in
          resolver(barkoderView.config?.decoderConfig?.idDocument.masterChecksum.rawValue == 1 ? true : false)
      }
  }
  
  @objc
  func setIdDocumentMasterChecksumEnabled(
      _ node: NSNumber,
      arg: Bool
  ) {
      getBarkoderView(node: node) { barkoderView in
          barkoderView.config?.decoderConfig?.idDocument.masterChecksum = StandardChecksum(rawValue: arg == true ? 1 : 0)
      }
  }
    
    @objc
    func isUpcEanDeblurEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.upcEanDeblur)
        }
    }
    
    @objc
    func setUpcEanDeblurEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.upcEanDeblur = arg
        }
    }
    
    @objc
    func isMisshaped1DEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.enableMisshaped1D)
        }
    }
    
    @objc
    func setEnableMisshaped1DEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.enableMisshaped1D = arg
        }
    }
    
    @objc
    func setBarcodeThumbnailOnResultEnabled(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.barcodeThumbnailOnResult = arg
        }
    }
    
    @objc
    func isBarcodeThumbnailOnResultEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.barcodeThumbnailOnResult)
        }
    }
    
    @objc
    func setThresholdBetweenDuplicatesScans(
        _ node: NSNumber,
        arg: NSNumber
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.thresholdBetweenDuplicatesScans = Int(truncating: arg)
        }
    }
    
    @objc
    func getThresholdBetweenDuplicatesScans(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.thresholdBetweenDuplicatesScans)
        }
    }
    
    @objc
    func getMulticodeCachingEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.getMulticodeCachingEnabled())
        }
    }

    @objc
    func getMulticodeCachingDuration(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.getMulticodeCachingDuration())
        }
    }
    
    @objc
    func isVINRestrictionsEnabled(
        _ node: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        getBarkoderView(node: node) { barkoderView in
            resolver(barkoderView.config?.decoderConfig?.enableVINRestrictions)
        }
    }
    
    @objc
    func setEnableVINRestrictions(
        _ node: NSNumber,
        arg: Bool
    ) {
        getBarkoderView(node: node) { barkoderView in
            barkoderView.config?.decoderConfig?.enableVINRestrictions = arg
        }
    }
  
  
  

    @objc
    func isBarcodeTypeEnabled(
        _ node: NSNumber,
        arg: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let index = arg as? UInt32 else { return }

        getBarkoderView(node: node) { barkoderView in
            guard let decoderConfig = barkoderView.config?.decoderConfig else { return }
            
            guard let specificConfig = SpecificConfig(decoderType: .init(rawValue: index)) else {
                self.handleBarkoderError(BarkoderReactNativeErrors.BARKODER_CONFIG_IS_NOT_VALID, rejecter: rejecter)

                return
            }
            
            switch specificConfig.decoderType() {
            case Aztec:
                resolver(decoderConfig.aztec.enabled)
            case AztecCompact:
                resolver(decoderConfig.aztecCompact.enabled)
            case QR:
                resolver(decoderConfig.qr.enabled)
            case QRMicro:
                resolver(decoderConfig.qrMicro.enabled)
            case Code128:
                resolver(decoderConfig.code128.enabled)
            case Code93:
                resolver(decoderConfig.code93.enabled)
            case Code39:
                resolver(decoderConfig.code39.enabled)
            case Codabar:
                resolver(decoderConfig.codabar.enabled)
            case Code11:
                resolver(decoderConfig.code11.enabled)
            case Msi:
                resolver(decoderConfig.msi.enabled)
            case UpcA:
                resolver(decoderConfig.upcA.enabled)
            case UpcE:
                resolver(decoderConfig.upcE.enabled)
            case UpcE1:
                resolver(decoderConfig.upcE1.enabled)
            case Ean13:
                resolver(decoderConfig.ean13.enabled)
            case Ean8:
                resolver(decoderConfig.ean8.enabled)
            case PDF417:
                resolver(decoderConfig.pdf417.enabled)
            case PDF417Micro:
                resolver(decoderConfig.pdf417Micro.enabled)
            case Datamatrix:
                resolver(decoderConfig.datamatrix.enabled)
            case Code25:
                resolver(decoderConfig.code25.enabled)
            case Interleaved25:
                resolver(decoderConfig.interleaved25.enabled)
            case ITF14:
                resolver(decoderConfig.itf14.enabled)
            case IATA25:
                resolver(decoderConfig.iata25.enabled)
            case Matrix25:
                resolver(decoderConfig.matrix25.enabled)
            case Datalogic25:
                resolver(decoderConfig.datalogic25.enabled)
            case COOP25:
                resolver(decoderConfig.coop25.enabled)
            case Code32:
                resolver(decoderConfig.code32.enabled)
            case Telepen:
                resolver(decoderConfig.telepen.enabled)
            case Dotcode:
                resolver(decoderConfig.dotcode.enabled)
            case IDDocument:
                resolver(decoderConfig.idDocument.enabled)
            default:
                self.handleBarkoderError(BarkoderReactNativeErrors.BARKODER_CONFIG_IS_NOT_VALID, rejecter: rejecter)
            }

        }
    }
    
    @objc
    func setBarcodeTypeEnabled(
        _ node: NSNumber,
        arg: NSNumber,
        enabled: Bool
    ) {
        guard let index = arg as? UInt32 else { return }

        getBarkoderView(node: node) { barkoderView in
            guard let decoderConfig = barkoderView.config?.decoderConfig else { return }
            
            guard let specificConfig = SpecificConfig(decoderType: .init(rawValue: index)) else {
                return
            }
            
            switch specificConfig.decoderType() {
            case Aztec:
                decoderConfig.aztec.enabled = enabled
            case AztecCompact:
                decoderConfig.aztecCompact.enabled = enabled
            case QR:
                decoderConfig.qr.enabled = enabled
            case QRMicro:
                decoderConfig.qrMicro.enabled = enabled
            case Code128:
                decoderConfig.code128.enabled = enabled
            case Code93:
                decoderConfig.code93.enabled = enabled
            case Code39:
                decoderConfig.code39.enabled = enabled
            case Codabar:
                decoderConfig.codabar.enabled = enabled
            case Code11:
                decoderConfig.code11.enabled = enabled
            case Msi:
                decoderConfig.msi.enabled = enabled
            case UpcA:
                decoderConfig.upcA.enabled = enabled
            case UpcE:
                decoderConfig.upcE.enabled = enabled
            case UpcE1:
                decoderConfig.upcE1.enabled = enabled
            case Ean13:
                decoderConfig.ean13.enabled = enabled
            case Ean8:
                decoderConfig.ean8.enabled = enabled
            case PDF417:
                decoderConfig.pdf417.enabled = enabled
            case PDF417Micro:
                decoderConfig.pdf417Micro.enabled = enabled
            case Datamatrix:
                decoderConfig.datamatrix.enabled = enabled
            case Code25:
                decoderConfig.code25.enabled = enabled
            case Interleaved25:
                decoderConfig.interleaved25.enabled = enabled
            case ITF14:
                decoderConfig.itf14.enabled = enabled
            case IATA25:
                decoderConfig.iata25.enabled = enabled
            case Matrix25:
                decoderConfig.matrix25.enabled = enabled
            case Datalogic25:
                decoderConfig.datalogic25.enabled = enabled
            case COOP25:
                decoderConfig.coop25.enabled = enabled
            case Code32:
                decoderConfig.code32.enabled = enabled
            case Telepen:
                decoderConfig.telepen.enabled = enabled
            case Dotcode:
                decoderConfig.dotcode.enabled = enabled
            case IDDocument:
                decoderConfig.idDocument.enabled = enabled
            default:
                return
            }
        }
    }
    
    @objc
    func getBarcodeTypeLengthRange(
        _ node: NSNumber,
        arg: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let index = arg as? UInt32 else { return }

        getBarkoderView(node: node) { barkoderView in
            guard let decoderConfig = barkoderView.config?.decoderConfig else { return }
            
            guard let specificConfig = SpecificConfig(decoderType: .init(rawValue: index)) else {
                return
            }
            
            switch specificConfig.decoderType() {
            case Code128:
                resolver([decoderConfig.code128.minimumLength, decoderConfig.code128.maximumLength])
            case Code93:
                resolver([decoderConfig.code93.minimumLength, decoderConfig.code93.maximumLength])
            case Code11:
                resolver([decoderConfig.code11.minimumLength, decoderConfig.code11.maximumLength])
            case Msi:
                resolver([decoderConfig.msi.minimumLength, decoderConfig.msi.maximumLength])
            case Codabar:
                resolver([decoderConfig.codabar.minimumLength, decoderConfig.codabar.maximumLength])
            case Code39:
                resolver([decoderConfig.code39.minimumLength, decoderConfig.code39.maximumLength])
            default:
                self.handleBarkoderError(BarkoderReactNativeErrors.BARCODE_TYPE_NOT_SUPPORTED, rejecter: rejecter)
            }
        }
    }
    
    @objc
    func setBarcodeTypeLengthRange(
        _ node: NSNumber,
        arg: NSNumber,
        min: NSNumber,
        max: NSNumber,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        guard let index = arg as? UInt32 else {
            self.handleBarkoderError(BarkoderReactNativeErrors.LENGTH_RANGE_NOT_VALID, rejecter: rejecter)

            return
        }
        guard let minValue = min as? Int32,
              let maxValue = max as? Int32 else {
            self.handleBarkoderError(BarkoderReactNativeErrors.LENGTH_RANGE_NOT_VALID, rejecter: rejecter)

            return
        }
        
        getBarkoderView(node: node) { barkoderView in
            guard let decoderConfig = barkoderView.config?.decoderConfig else { return }

            guard let specificConfig = SpecificConfig(decoderType: .init(rawValue: index)) else {
                return
            }
            switch specificConfig.decoderType() {
            case Code128:
                if decoderConfig.code128.setLengthRangeWithMinimum(minValue, maximum: maxValue) == 0 {
                    resolver(true)
                } else {
                    self.handleBarkoderError(BarkoderReactNativeErrors.LENGTH_RANGE_NOT_VALID, rejecter: rejecter)
                }
            case Code93:
                if decoderConfig.code93.setLengthRangeWithMinimum(minValue, maximum: maxValue) == 0 {
                    resolver(true)
                } else {
                    self.handleBarkoderError(BarkoderReactNativeErrors.LENGTH_RANGE_NOT_VALID, rejecter: rejecter)
                }
            case Code39:
                if decoderConfig.code39.setLengthRangeWithMinimum(minValue, maximum: maxValue) == 0 {
                    resolver(true)
                } else {
                    self.handleBarkoderError(BarkoderReactNativeErrors.LENGTH_RANGE_NOT_VALID, rejecter: rejecter)
                }
            case Code11:
                if decoderConfig.code11.setLengthRangeWithMinimum(minValue, maximum: maxValue) == 0 {
                    resolver(true)
                } else {
                    self.handleBarkoderError(BarkoderReactNativeErrors.LENGTH_RANGE_NOT_VALID, rejecter: rejecter)
                }
            case Msi:
                if decoderConfig.msi.setLengthRangeWithMinimum(minValue, maximum: maxValue) == 0 {
                    resolver(true)
                } else {
                    self.handleBarkoderError(BarkoderReactNativeErrors.LENGTH_RANGE_NOT_VALID, rejecter: rejecter)
                }
            case Codabar:
                if decoderConfig.codabar.setLengthRangeWithMinimum(minValue, maximum: maxValue) == 0 {
                    resolver(true)
                } else {
                    self.handleBarkoderError(BarkoderReactNativeErrors.LENGTH_RANGE_NOT_VALID, rejecter: rejecter)
                }
            default:
                self.handleBarkoderError(BarkoderReactNativeErrors.BARCODE_TYPE_NOT_SUPPORTED, rejecter: rejecter)
            }
        }
    }
    
    @objc
    func configureBarkoder(
        _ node: NSNumber,
        arg: NSString,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        let barkoderConfigAsJsonString = arg as String
        
        let barkoderJsonData: Data
        
        // Converting from String -> Data
        // Converting from Data -> Dictionary
        // Changing values for colors from hexes to decimal values
        // Converting from Dictionary -> Data with utf8 encoding
        do {
            let barkoderConfigAsData = Data(barkoderConfigAsJsonString.utf8)
            
            var barkoderConfigAsDictionary = try JSONSerialization.jsonObject(with: barkoderConfigAsData, options: []) as? [String: Any]
            
            if let colorHexCode = barkoderConfigAsDictionary?["roiLineColor"] as? String {
                barkoderConfigAsDictionary?["roiLineColor"] = Util.parseColor(hexColor: colorHexCode)
            }
            
            if let colorHexCode = barkoderConfigAsDictionary?["locationLineColor"] as? String {
                barkoderConfigAsDictionary?["locationLineColor"] = Util.parseColor(hexColor: colorHexCode)
            }

            if let colorHexCode = barkoderConfigAsDictionary?["roiOverlayBackgroundColor"] as? String {
                barkoderConfigAsDictionary?["roiOverlayBackgroundColor"] = Util.parseColor(hexColor: colorHexCode)
            }
            
            let jsonData = try JSONSerialization.data(withJSONObject: barkoderConfigAsDictionary as Any, options: .prettyPrinted)
            
            let convertedBarkoderConfigAsString = String(data: jsonData, encoding: .utf8) ?? ""
            
            barkoderJsonData = Data(convertedBarkoderConfigAsString.utf8)
        } catch {
            self.handleBarkoderError(BarkoderReactNativeErrors.BARKODER_CONFIG_IS_NOT_VALID, rejecter: rejecter)

            return
        }
        
        getBarkoderView(node: node) { barkoderView in
            guard let barkoderConfig = barkoderView.config else { return }
            
            BarkoderHelper.applyConfigSettingsFromJson(
                barkoderConfig,
                jsonData: barkoderJsonData
            ) { config, error in
                if error != nil {
                    self.handleBarkoderError(BarkoderReactNativeErrors.BARKODER_CONFIG_IS_NOT_VALID, rejecter: rejecter)
                } else {
                    barkoderView.config = config
                    resolver(true)
                }
            }
        }
        
    }
}

private extension BarkoderReactNativeViewManager {
    
    func getBarkoderView(node: NSNumber, completion: @escaping (BarkoderView) -> Void) {
        DispatchQueue.main.async {
            guard let rnComponent = self.bridge.uiManager.view(forReactTag: node) as? BarkoderReactNativeView else {
                return
            }
            
            completion(rnComponent.barkoderView)
        }
    }
    
    func handleBarkoderError(_ barkoderError: BarkoderReactNativeErrors, rejecter: @escaping RCTPromiseRejectBlock, error: Error? = nil) {
        rejecter(barkoderError.errorCode, barkoderError.errorMessage, error)
    }
    
}

class BarkoderReactNativeView: UIView {
    
    var barkoderView: BarkoderView!
    var bridge: RCTBridge
    
    @objc var licenseKey: String = "" {
        didSet {
            DispatchQueue.main.async {
                self.barkoderView.config = BarkoderConfig(licenseKey: self.licenseKey) { _ in
                    guard let eventEmitter = self.bridge.module(for: BarkoderEmitter.self) as? BarkoderEmitter else {
                        return
                    }

                    eventEmitter.configDidFinish()
                }
            }
        }
    }
    
    init(frame: CGRect, bridge: RCTBridge) {
        self.bridge = bridge
        
        super.init(frame: frame)
        
        barkoderView = BarkoderView(frame: frame)
        
        addSubview(barkoderView)
        
        barkoderView.translatesAutoresizingMaskIntoConstraints = false
        barkoderView.leadingAnchor.constraint(equalTo: leadingAnchor).isActive = true
        barkoderView.trailingAnchor.constraint(equalTo: trailingAnchor).isActive = true
        barkoderView.topAnchor.constraint(equalTo: topAnchor).isActive = true
        barkoderView.bottomAnchor.constraint(equalTo: bottomAnchor).isActive = true
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
}

extension BarkoderReactNativeViewManager: BarkoderResultDelegate {
    
    func scanningFinished(_ decoderResults: [DecoderResult], thumbnails: [UIImage]?, image: UIImage?) {
        guard let eventEmitter = self.bridge.module(for: BarkoderEmitter.self) as? BarkoderEmitter,
              let barkoderResultsToJsonString = Util.barkoderResultsToJsonString(decoderResults, thumbnails: thumbnails, image: image) else {
            return
        }

        eventEmitter.sendDataToReactNative(data: barkoderResultsToJsonString)
    }
    
}

extension UIColor {
    
    func toHex() -> String? {
        guard let components = cgColor.components, components.count >= 3 else {
            return nil
        }
        
        let red = Float(components[0])
        let green = Float(components[1])
        let blue = Float(components[2])
        var alpha: Float = 0
        if components.count >= 4 {
            alpha = Float(components[3])
        }
        
        let hexString = String(
            format: "#%02lX%02lX%02lX%02lX",
            lroundf(alpha * 255),
            lroundf(red * 255),
            lroundf(green * 255),
            lroundf(blue * 255)
        )
        
        return hexString
    }
    
}

class Util {
    
    static func initColorWith(hexString: String) -> UIColor? {
        let hex = hexString.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int = UInt64()
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            return nil
        }
        
        return UIColor(red: CGFloat(r) / 255, green: CGFloat(g) / 255, blue: CGFloat(b) / 255, alpha: CGFloat(a) / 255)
    }
    
    static func parseColor(hexColor: String) -> Int? {
        Int(hexColor.replacingOccurrences(of: "#", with: ""), radix: 16)
    }
    
  static func barkoderResultsToJsonString(_ decoderResults: [DecoderResult], thumbnails: [UIImage]?, image: UIImage?) -> String? {
    var resultsJsonArray = [[String: Any]]()
    
    // Process each decoder result separately
    for decoderResult in decoderResults {
      var resultJson = [String: Any]()
      
      resultJson["barcodeType"] = decoderResult.barcodeType.rawValue
      resultJson["barcodeTypeName"] = decoderResult.barcodeTypeName
      resultJson["binaryDataAsBase64"] = Data(decoderResult.binaryData).base64EncodedString()
      resultJson["textualData"] = decoderResult.textualData
      resultJson["characterSet"] = decoderResult.characterSet
      
      if let extraAsDictionary = decoderResult.extra as? [String: Any],
         !extraAsDictionary.isEmpty,
         let jsonData = try? JSONSerialization.data(withJSONObject: extraAsDictionary, options: []),
         let jsonString = String(data: jsonData, encoding: .utf8) {
        resultJson["extra"] = jsonString
      }
      
      // Add mrzImages
      if decoderResult.barcodeTypeName == "MRZ" {
        if let images = decoderResult.images {
          var mrzImagesArray = [[String: Any]]()
          
          for image in images {
            if let imageName = image.name, let imageData = image.image.pngData() {
              switch imageName {
              case "main", "document", "signature", "picture":
                let imageInfo: [String: Any] = [
                  "name": imageName,
                  "base64": imageData.base64EncodedString()
                ]
                mrzImagesArray.append(imageInfo)
              default:
                break
              }
            }
          }
          resultJson["mrzImagesAsBase64"] = mrzImagesArray
        }
      }
      
      resultsJsonArray.append(resultJson)
    }
    
    // Process thumbnails and main image outside the loop
    var barkoderResultJson: [String: Any] = ["decoderResults": resultsJsonArray]
    
    if let thumbnails = thumbnails {
      let thumbnailsBase64Array = thumbnails.compactMap { thumbnail in
        thumbnail.pngData()?.base64EncodedString()
      }
      barkoderResultJson["resultThumbnailsAsBase64"] = thumbnailsBase64Array
    }
    
    if let image = image,
       let imageData = image.pngData() {
      barkoderResultJson["resultImageAsBase64"] = imageData.base64EncodedString()
    }
    
    do {
      let jsonData = try JSONSerialization.data(
        withJSONObject: barkoderResultJson,
        options: JSONSerialization.WritingOptions()
      ) as NSData
      
      let jsonString = NSString(data: jsonData as Data, encoding: String.Encoding.utf8.rawValue) as? String
      
      return jsonString
    } catch _ {
      return nil
    }
    
  }
    
}
