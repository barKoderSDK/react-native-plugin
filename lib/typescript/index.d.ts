import React from 'react';
import { ViewStyle } from 'react-native';
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
    ref?: React.RefObject<BarkoderView>;
    onDataReturned?: DataReturned;
    onBarkoderConfigCreated?: BarkoderConfigCreated;
};
/**
 * Initializes a new instance of the BarkoderView class.
 */
export declare class BarkoderView extends React.Component<BarkoderReactNativeProps> {
    private _myRef;
    private _barkoder;
    private _eventEmitter;
    constructor(props: BarkoderReactNativeProps);
    private startConfigurationEmitter;
    private _onDataReturned;
    private _onBarkoderConfigCreated;
    render(): JSX.Element;
}
interface ResultCallback {
    (result: Barkoder.BarkoderResult): void;
}
export declare class Barkoder {
    private _barkoderViewRef;
    private _promisesMap;
    private _promiseRequestId;
    private _resultCallback;
    private _eventEmitter;
    constructor(barkoderViewRef: React.RefObject<BarkoderView>);
    private _dispatchCommand;
    onDataReturned(event: any): void;
    private startScanningEventEmmitter;
    /**
     * Retrieves the maximum available zoom factor for the device's camera.
     * @returns A promise that resolves with the maximum zoom factor.
     */
    getMaxZoomFactor(): Promise<number>;
    /**
     * Sets the zoom factor for the device's camera, adjusting the level of zoom during barcode scanning.
     * @param zoomFactor - The zoom factor to set.
     */
    setZoomFactor(zoomFactor: number): void;
    /**
    * Checks whether the device has a built-in flash (torch) that can be used for illumination during barcode scanning.
    * @returns A promise that resolves with a boolean indicating whether flash is available.
    */
    isFlashAvailable(): Promise<boolean>;
    /**
     * Enables or disables the device's flash (torch) for illumination during barcode scanning.
     * @param enabled - A boolean indicating whether flash should be enabled.
     */
    setFlashEnabled(enabled: boolean): void;
    /**
     * Starts the camera for barcode scanning.
     */
    startCamera(): void;
    /**
     * Halts the barcode scanning process, stopping the camera from capturing and processing barcode information.
     */
    stopScanning(): void;
    /**
     * Initiates the barcode scanning process, allowing the application to detect and decode barcodes from the device's camera feed.
     * @param resultsCallback - The callback function to handle barcode scanning events.
     */
    startScanning(resultsCallback: ResultCallback): void;
    /**
     * Temporarily suspends the barcode scanning process, pausing the camera feed without completely stopping the scanning session.
     */
    pauseScanning(): void;
    /**
   * Scan barcodes from base64 string image
   * @param base64 - image string.
   * @param resultsCallback - The callback function to handle barcode scanning events.
   */
    scanImage(base64: String, resultsCallback: ResultCallback): void;
    /**
     * Retrieves the resolution for barcode scanning.
     * @returns A promise that resolves with the Barkoder resolution.
     */
    getBarkoderResolution(): Promise<Barkoder.BarkoderResolution>;
    /**
     * Sets the resolution for barcode scanning.
     */
    setBarkoderResolution(barkoderResolution: Barkoder.BarkoderResolution): void;
    /**
     * Sets the decoding speed for barcode scanning.
     */
    setDecodingSpeed(decodingSpeed: Barkoder.DecodingSpeed): void;
    /**
     * Sets the formatting type for barcode scanning.
     */
    setFormattingType(formatting: Barkoder.FormattingType): void;
    /**
     * Sets the encoding character set for barcode scanning.
     * @param encodingCharacterSet - The encoding character set to be set.
     */
    setEncodingCharacterSet(encodingCharacterSet: String): void;
    /**
     * Retrieves the hexadecimal color code representing the line color used to indicate the location of detected barcodes.
     * @returns A promise that resolves with the location line color in hexadecimal format.
     */
    getLocationLineColorHex(): Promise<string>;
    /**
     * Sets the color of the lines used to indicate the location of detected barcodes on the camera feed.
     * @param hexColor - The hexadecimal color value to set.
     * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
     */
    setLocationLineColor(hexColor: String): Promise<boolean>;
    /**
     * Retrieves the current width setting for the lines indicating the location of detected barcodes on the camera feed.
     * @returns A promise that resolves with the location line width.
     */
    getLocationLineWidth(): Promise<number>;
    /**
     * Sets the width of the lines indicating the location of detected barcodes on the camera feed.
     * @param lineWidth - The width of the location line to set.
     */
    setLocationLineWidth(lineWidth: number): void;
    /**
     * Retrieves the hexadecimal color code representing the line color of the Region of Interest (ROI) on the camera preview.
     * @returns A promise that resolves with the ROI line color in hexadecimal format.
     */
    getRoiLineColorHex(): Promise<string>;
    /**
     * Sets the color of the lines outlining the Region of Interest (ROI) for barcode scanning on the camera feed.
     * @param hexColor - The hexadecimal representation of the color.
     * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
     */
    setRoiLineColor(hexColor: String): Promise<boolean>;
    /**
     * Retrieves the current width setting for the lines outlining the Region of Interest (ROI) on the camera preview.
     * @returns A promise that resolves with the ROI line width.
     */
    getRoiLineWidth(): Promise<number>;
    /**
     * Sets the width of the lines outlining the Region of Interest (ROI) for barcode scanning on the camera feed.
     * @param lineWidth - The width of the ROI line to set.
     */
    setRoiLineWidth(lineWidth: number): void;
    /**
     * Retrieves the hexadecimal color code representing the background color of the overlay within the Region of Interest (ROI) on the camera preview.
     * @returns A promise that resolves with the ROI overlay background color in hexadecimal format.
     */
    getRoiOverlayBackgroundColorHex(): Promise<string>;
    /**
     * Sets the background color of the overlay within the Region of Interest (ROI) for barcode scanning on the camera feed.
     * @param hexColor - The hexadecimal color value to set for the ROI overlay background.
     * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
     */
    setRoiOverlayBackgroundColor(hexColor: String): Promise<boolean>;
    /**
     * Checks if the session is closed on result enabled.
     * @returns A promise that resolves with a boolean indicating whether close session on result is enabled.
     */
    isCloseSessionOnResultEnabled(): Promise<boolean>;
    /**
     * Enables or disables the automatic closing of the scanning session upon detecting a barcode result.
     * @param enabled - A boolean indicating whether to enable close session on result.
     */
    setCloseSessionOnResultEnabled(enabled: boolean): void;
    /**
     * Checks if image result is enabled.
     * @returns A promise that resolves with a boolean indicating whether image result is enabled.
     */
    isImageResultEnabled(): Promise<boolean>;
    /**
     * Enables or disables the capturing and processing of image data when a barcode is successfully detected.
     * @param enabled - True to enable image result display, false to disable it.
     */
    setImageResultEnabled(enabled: boolean): void;
    /**
     * Checks if location in image result is enabled.
     * @returns A promise that resolves with a boolean indicating whether location in image result is enabled.
     */
    isLocationInImageResultEnabled(): Promise<boolean>;
    /**
     * Enables or disables the inclusion of barcode location information within the image data result.
     * @param enabled - True to display the location, false to hide it.
     */
    setLocationInImageResultEnabled(enabled: boolean): void;
    /**
     * Retrieves the region of interest (ROI).
     * @returns A promise that resolves with an array representing the region of interest (ROI).
     */
    getRegionOfInterest(): Promise<number[]>;
    /**
     * Defines the Region of Interest (ROI) on the camera preview for barcode scanning, specifying an area where the application focuses on detecting barcodes.
     * @param left - The left coordinate of the ROI.
     * @param top - The top coordinate of the ROI.
     * @param width - The width of the ROI.
     * @param height - The height of the ROI.
     * @returns A promise that resolves with a boolean indicating whether the ROI was successfully set.
     */
    setRegionOfInterest(left: number, top: number, width: number, height: number): Promise<boolean>;
    /**
     * Retrieves the threads limit.
     * @returns {Promise<number>} A promise that resolves with the threads limit.
     */
    getThreadsLimit(): Promise<number>;
    /**
     * Sets the threads limit.
     * @param threadsLimit - The limit for the number of threads to set.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the threads limit was successfully set.
     */
    setThreadsLimit(threadsLimit: number): Promise<boolean>;
    /**
     * Checks if location in preview is enabled.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether location in preview is enabled.
     */
    isLocationInPreviewEnabled(): Promise<boolean>;
    /**
     * Enables or disables the display of barcode location information on the camera preview.
     * @param enabled - True to display the location, false to hide it.
     */
    setLocationInPreviewEnabled(enabled: boolean): void;
    /**
     * Checks if pinch to zoom is enabled.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether pinch to zoom is enabled.
     */
    isPinchToZoomEnabled(): Promise<boolean>;
    /**
     * Enables or disables the pinch-to-zoom feature for adjusting the zoom level during barcode scanning.
     * @param enabled - True to enable pinch-to-zoom, false to disable it.
     */
    setPinchToZoomEnabled(enabled: boolean): void;
    /**
     * Checks if the region of interest (ROI) is visible.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the ROI is visible.
     */
    isRegionOfInterestVisible(): Promise<boolean>;
    /**
     * Sets the visibility of the Region of Interest (ROI) on the camera preview.
     * @param visible - True to make the ROI visible, false to hide it.
     */
    setRegionOfInterestVisible(visible: boolean): void;
    /**
     * Retrieves the value indicating whether a beep sound is played on successful barcode scanning.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the beep on success is enabled.
     */
    isBeepOnSuccessEnabled(): Promise<boolean>;
    /**
     * Enables or disables the audible beep sound upon successfully decoding a barcode.
     * @param enabled - True to enable beep sound, false to disable it.
     */
    setBeepOnSuccessEnabled(enabled: boolean): void;
    /**
     * Retrieves the value indicating whether vibration is enabled on successful barcode scanning.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether vibrate on success is enabled.
     */
    isVibrateOnSuccessEnabled(): Promise<boolean>;
    /**
     * Enables or disables the vibration on successful barcode scanning.
     * @param enabled - True to enable vibration, false to disable it.
     */
    setVibrateOnSuccessEnabled(enabled: boolean): void;
    /**
     * Retrieves the character set used for encoding barcode data.
     * @returns {Promise<string>} A promise that resolves with the encoding character set.
     */
    getEncodingCharacterSet(): Promise<string>;
    /**
     * Retrieves the version of the Barkoder library.
     * @returns {Promise<string>} A promise that resolves with the version of the Barkoder library.
     */
    getVersion(): Promise<string>;
    /**
     * Retrieves the current decoding speed setting for barcode scanning.
     * @returns {Promise<Barkoder.DecodingSpeed>} A promise that resolves with the decoding speed configuration.
     */
    getDecodingSpeed(): Promise<Barkoder.DecodingSpeed>;
    /**
     * Retrieves the formatting type used for presenting decoded barcode data..
     * @returns {Promise<Barkoder.FormattingType>} A promise that resolves with the formatting type configuration.
     */
    getFormattingType(): Promise<Barkoder.FormattingType>;
    /**
     * Checks if a specific barcode type is enabled.
     * @param barcodeType - The barcode type to check.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the barcode type is enabled.
     */
    isBarcodeTypeEnabled(barcodeType: Barkoder.BarcodeType): Promise<boolean>;
    /**
     * Retrieves the length range of the specified barcode type.
     * @param barcodeType - The barcode type to get the length range for.
     * @returns {Promise<number[]>} A promise that resolves with an array representing the length range of the barcode type.
     */
    getBarcodeTypeLengthRange(barcodeType: Barkoder.BarcodeType): Promise<number[]>;
    /**
     * Sets the length range for the specified barcode type.
     * @param barcodeType - The barcode type to set the length range for.
     * @param min - The minimum length of the barcode type.
     * @param max - The maximum length of the barcode type.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the length range was successfully set.
     */
    setBarcodeTypeLengthRange(barcodeType: Barkoder.BarcodeType, min: number, max: number): Promise<boolean>;
    /**
     * Configures the Barkoder functionality based on the provided configuration.
     * @param barkoderConfig - The configuration parameters for the Barkoder.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the configuration was successful.
     */
    configureBarkoder(barkoderConfig: Barkoder.BarkoderConfig): Promise<boolean>;
    /**
     * Enables or disables the specified barcode type for scanning.
     * @param barcodeType - The barcode type to enable or disable.
     * @param enabled - True to enable the barcode type, false to disable it.
     */
    setBarcodeTypeEnabled(barcodeType: Barkoder.BarcodeType, enabled: boolean): void;
    /**
     * Retrieves the MSI checksum type.
     * @returns {Promise<Barkoder.MsiChecksumType>} A promise that resolves with the checksum type for MSI barcodes.
     */
    getMsiChecksumType(): Promise<Barkoder.MsiChecksumType>;
    /**
    * Set the MSI checksum type.
    * @param msiChecksumType - The MSI checksum type to set.
    */
    setMsiChecksumType(msiChecksumType: Barkoder.MsiChecksumType): void;
    /**
     * Retrieves the checksum type for Code 39 barcodes.
     * @returns {Promise<Barkoder.Code39ChecksumType>} A promise that resolves with the checksum type for Code 39 barcodes.
     */
    getCode39ChecksumType(): Promise<Barkoder.Code39ChecksumType>;
    /**
     * Sets the checksum type for Code 39 barcodes.
     * @param code39ChecksumType - The checksum type to set for Code 39 barcodes.
     */
    setCode39ChecksumType(code39ChecksumType: Barkoder.Code39ChecksumType): void;
    /**
     * Retrieves the Code11 checksum type.
     * @returns {Promise<Barkoder.Code11ChecksumType>} A promise that resolves with the checksum type for Code 11 barcodes.
     */
    getCode11ChecksumType(): Promise<Barkoder.Code11ChecksumType>;
    /**
     * Sets the checksum type for Code 11 barcodes.
     * @param code11ChecksumType - The checksum type to set for Code 11 barcodes.
     */
    setCode11ChecksumType(code11ChecksumType: Barkoder.Code11ChecksumType): void;
    /**
     * Sets the maximum number of results to be returned from barcode scanning.
     * @param maximumResultsCount - The maximum number of results to return.
     */
    setMaximumResultsCount(maximumResultsCount: number): void;
    /**
     * Sets the delay in milliseconds for considering duplicate barcodes during scanning.
     * @param duplicatesDelayMs - The delay in milliseconds for duplicate detection.
     */
    setDuplicatesDelayMs(duplicatesDelayMs: number): void;
    /**
     * Sets the caching duration (in milliseconds) for multi-code results.
     * @param multicodeCachingDuration - The caching duration (in milliseconds) for multi-code results.
     */
    setMulticodeCachingDuration(multicodeCachingDuration: number): any;
    /**
     * Sets whether multi-code caching is enabled.
     * @param multicodeCachingEnabled - A boolean indicating whether to enable multi-code caching.
     */
    setMulticodeCachingEnabled(multicodeCachingEnabled: boolean): any;
    /**
     * Gets the maximum number of results to be returned from barcode scanning.
     * @returns {Promise<number>} A promise that resolves with the maximum number of results to return.
     */
    getMaximumResultsCount(): Promise<number>;
    /**
     * Gets the delay in milliseconds for considering duplicate barcodes during scanning.
     * @returns {Promise<number>} A promise that resolves with the delay (in milliseconds) for detecting duplicate results.
     */
    getDuplicatesDelayMs(): Promise<number>;
    /**
  * Retrieves whether Direct Part Marking (DPM) mode for Datamatrix barcodes is enabled
  * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether DPM mode for Datamatrix barcodes is enabled.
  */
    isDatamatrixDpmModeEnabled(): Promise<boolean>;
    /**
     * Sets whether the Direct Part Marking (DPM) mode for Datamatrix barcodes is enabled.
     * @param enabled - True to enable DPM mode, false to disable it.
     */
    setDatamatrixDpmModeEnabled(enabled: boolean): void;
    /**
  * Retrieves whether Direct Part Marking (DPM) mode for QR barcodes is enabled
  * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether DPM mode for QR barcodes is enabled.
  */
    isQrDpmModeEnabled(): Promise<boolean>;
    /**
   * Sets whether the Direct Part Marking (DPM) mode for QR barcodes is enabled.
   * @param enabled - True to enable DPM mode, false to disable it.
   */
    setQrDpmModeEnabled(enabled: boolean): void;
    /**
  * Retrieves whether Direct Part Marking (DPM) mode for QR Micro barcodes is enabled
  * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether DPM mode for QR Micro barcodes is enabled.
  */
    isQrMicroDpmModeEnabled(): Promise<boolean>;
    /**
  * Sets whether the Direct Part Marking (DPM) mode for QR Micro barcodes is enabled.
  * @param enabled - True to enable DPM mode, false to disable it.
  */
    setQrMicroDpmModeEnabled(enabled: boolean): void;
    /**
  * Retrieves whether Master checksum is enabled when scanning ID Documents
  * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether Master checksum is enabled when scanning ID Documents
  */
    isIdDocumentMasterChecksumEnabled(): Promise<boolean>;
    /**
  * Sets whether Master checksum should be requiered when scanning ID Documents
  * @param enabled - True to enable Master checksum, false to disable it.
  */
    setIdDocumentMasterChecksumEnabled(enabled: boolean): void;
    /**
     * Gets the value indicating whether deblurring is enabled for UPC/EAN barcodes.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the deblurring feature for UPC/EAN barcodes is enabled.
     */
    isUpcEanDeblurEnabled(): Promise<boolean>;
    /**
     * Sets whether the deblurring feature for UPC/EAN barcodes is enabled.
     * @param enabled - A boolean indicating whether to enable the deblurring feature for UPC/EAN barcodes.
     */
    setUpcEanDeblurEnabled(enabled: boolean): void;
    /**
     * Checks if the detection of misshaped 1D barcodes is enabled.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the detection of misshaped 1D barcodes is enabled.
     */
    isMisshaped1DEnabled(): Promise<boolean>;
    /**
     * Sets whether the detection of misshaped 1D barcodes is enabled.
     * @param enabled - A boolean indicating whether to enable the detection of misshaped 1D barcodes.
     */
    setEnableMisshaped1DEnabled(enabled: boolean): void;
    /**
     * Sets whether the barcode thumbnail on result is enabled.
     * @param enabled - A boolean indicating whether to enable the barcode thumbnail on result.
     */
    setBarcodeThumbnailOnResultEnabled(enabled: boolean): void;
    /**
     * Sets the threshold between duplicate scans.
     * @param thresholdBetweenDuplicatesScans - The threshold between duplicate scans.
     */
    setThresholdBetweenDuplicatesScans(thresholdBetweenDuplicatesScans: number): void;
    /**
     * Retrieves the threshold between duplicate scans.
     * @returns {Promise<number>} A promise that resolves with the threshold between duplicate scans.
     */
    getThresholdBetweenDuplicatesScans(): Promise<number>;
    /**
     * Checks if the barcode thumbnail on result is enabled.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the barcode thumbnail on result is enabled.
     */
    isBarcodeThumbnailOnResultEnabled(): Promise<boolean>;
    /**
     * Retrieves the caching duration (in milliseconds) for multi-code results.
     * @returns {Promise<number>} A promise that resolves with the caching duration (in milliseconds) for multi-code results.
     */
    getMulticodeCachingDuration(): Promise<number>;
    /**
     * Retrieves whether multi-code caching is enabled.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether multi-code caching is enabled.
     */
    getMulticodeCachingEnabled(): Promise<boolean>;
    /**
     * Checks if Vehicle Identification Number (VIN) restrictions are enabled.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether VIN restrictions are enabled.
     */
    isVINRestrictionsEnabled(): Promise<boolean>;
    /**
     * Sets whether Vehicle Identification Number (VIN) restrictions are enabled.
     * @param enabled - A boolean indicating whether to enable VIN restrictions.
     */
    setEnableVINRestrictions(enabled: boolean): void;
    /**
   * Sets whether the UPC-E barcodes should be expanded to UPC-A format.
   * @param enabled - A boolean indicating whether to enable the expansion for UPC-E barcodes.
   */
    setUPCEexpandToUPCA(enabled: boolean): void;
    /**
   * Sets whether the UPC-E1 barcodes should be expanded to UPC-A format.
   * @param enabled - A boolean indicating whether to enable the expansion for UPC-E1 barcodes.
   */
    setUPCE1expandToUPCA(enabled: boolean): void;
    /**
   * Retrieves the hexadecimal color code representing the line color of the scanning indicator on the camera preview.
   * @returns A promise that resolves with the scanning indicator line color in hexadecimal format.
   */
    getScanningIndicatorColorHex(): Promise<string>;
    /**
     * Sets the color of the lines outlining the scanning indicator for barcode scanning on the camera feed.
     * @param hexColor - The hexadecimal representation of the color.
     * @returns A promise that resolves with a boolean indicating whether the color was successfully set.
     */
    setScanningIndicatorColor(hexColor: String): Promise<boolean>;
    /**
   * Retrieves the current width setting for the scanning indicator on the camera preview.
   * @returns A promise that resolves with the scanning indicator width.
   */
    getScanningIndicatorWidth(): Promise<number>;
    /**
     * Sets the width of the scanning indicator for barcode scanning on the camera feed.
     * @param lineWidth - The width of the scanning indicator to set.
     */
    setScanningIndicatorWidth(lineWidth: number): void;
    /**
  * Retrieves the current animation setting for the scanning indicator on the camera preview.
  * @returns A promise that resolves the scanning indicator animaiton.
  */
    getScanningIndicatorAnimation(): Promise<number>;
    /**
     * Sets the animation of the scanning indicator for barcode scanning on the camera feed.
     * @param animation - The animation of the scanning indicator to set.
     */
    setScanningIndicatorAnimation(animation: number): void;
    /**
  * Retrieves if the scanning indicator is set to be always visible on the camera preview.
  * @returns A promise that resolves the scanning indicator always visible state.
  */
    isScanningIndicatorAlwaysVisible(): Promise<boolean>;
    /**
     * Sets the scanning indicator to be always shown on the camera feed.
     * @param value - A boolean indicating whether the scanning indicator should always remain visible.
     */
    setScanningIndicatorAlwaysVisible(value: boolean): void;
    /**
   * Setting custom option.
   * @param string - string value
   * @param int - int value
   */
    setCustomOption(string: String, int: number): void;
    /**
     * Sets the camera's exposure dynamically based on the provided intensity, cycling through predefined compensation values.
     * @param intesnity - The integer value for the exposure intensity.
     */
    setDynamicExposure(intesnity: number): void;
    /**
     * Sets the camera to use the center of the viewfinder for focus and exposure.
     * @param value - A boolean indicating whether the center of the viewfinder should be used.
     */
    setCentricFocusAndExposure(value: boolean): void;
    /**
     * Sets wheter Composite Mode should be enabled when scanning.
     * @param value - The integer value if composite mode should be enabled.
     */
    setEnableComposite(value: number): void;
    /**
     * Enable or disable video stabilization for smoother video capture.
     * @param value - A boolean indicating whether video stabilization should be enabled/disabled.
     */
    setVideoStabilization(value: boolean): void;
    /**
     * Sets the camera to be used for scanning (back/front).
     * @param value - The value which camera should be used.
     */
    setCamera(value: number): Promise<boolean>;
    showLogMessages(show: boolean): void;
    private isIos;
    private isAndroid;
}
export declare namespace Barkoder {
    enum DecodingSpeed {
        fast = 0,
        normal = 1,
        slow = 2,
        rigorous = 3
    }
    enum FormattingType {
        disabled = 0,
        automatic = 1,
        gs1 = 2,
        aamva = 3,
        sadl = 4
    }
    enum MsiChecksumType {
        disabled = 0,
        mod10 = 1,
        mod11 = 2,
        mod1010 = 3,
        mod1110 = 4,
        mod11IBM = 5,
        mod1110IBM = 6
    }
    enum Code39ChecksumType {
        disabled = 0,
        enabled = 1
    }
    enum Code11ChecksumType {
        disabled = 0,
        single = 1,
        double = 2
    }
    enum BarkoderCameraPosition {
        BACK = 0,
        FRONT = 1
    }
    enum BarkoderResolution {
        HD = 0,
        FHD = 1,
        UHD = 2
    }
    enum BarcodeType {
        aztec = 0,
        aztecCompact = 1,
        qr = 2,
        qrMicro = 3,
        code128 = 4,
        code93 = 5,
        code39 = 6,
        codabar = 7,
        code11 = 8,
        msi = 9,
        upcA = 10,
        upcE = 11,
        upcE1 = 12,
        ean13 = 13,
        ean8 = 14,
        pdf417 = 15,
        pdf417Micro = 16,
        datamatrix = 17,
        code25 = 18,
        interleaved25 = 19,
        itf14 = 20,
        iata25 = 21,
        matrix25 = 22,
        datalogic25 = 23,
        coop25 = 24,
        code32 = 25,
        telepen = 26,
        dotcode = 27,
        idDocument = 28,
        databar14 = 29,
        databarLimited = 30,
        databarExpanded = 31,
        postalIMB = 32,
        postnet = 33,
        planet = 34,
        australianPost = 35,
        royalMail = 36,
        kix = 37,
        japanesePost = 38
    }
    class BarkoderConfig {
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
        constructor(config: Partial<BarkoderConfig>);
        toJsonString(): string;
    }
    class DekoderConfig {
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
        postalIMB?: BarcodeConfig;
        postnet?: BarcodeConfig;
        planet?: BarcodeConfig;
        australianPost?: BarcodeConfig;
        royalMail?: BarcodeConfig;
        kix?: BarcodeConfig;
        japanesePost?: BarcodeConfig;
        general?: GeneralSettings;
        constructor(config: Partial<DekoderConfig>);
        toMap(): {
            Aztec: {
                enabled: boolean | undefined;
            } | undefined;
            'Aztec Compact': {
                enabled: boolean | undefined;
            } | undefined;
            QR: {
                [key: string]: any;
            } | undefined;
            'QR Micro': {
                [key: string]: any;
            } | undefined;
            'Code 128': {
                enabled: boolean | undefined;
                minimumLength: number | undefined;
                maximumLength: number | undefined;
            } | undefined;
            'Code 93': {
                enabled: boolean | undefined;
                minimumLength: number | undefined;
                maximumLength: number | undefined;
            } | undefined;
            'Code 39': {
                [key: string]: any;
            } | undefined;
            Codabar: {
                enabled: boolean | undefined;
                minimumLength: number | undefined;
                maximumLength: number | undefined;
            } | undefined;
            'Code 11': {
                [key: string]: any;
            } | undefined;
            MSI: {
                [key: string]: any;
            } | undefined;
            'Upc-A': {
                enabled: boolean | undefined;
            } | undefined;
            'Upc-E': {
                enabled: boolean | undefined;
            } | undefined;
            'Upc-E1': {
                enabled: boolean | undefined;
            } | undefined;
            'Ean-13': {
                enabled: boolean | undefined;
            } | undefined;
            'Ean-8': {
                enabled: boolean | undefined;
            } | undefined;
            'PDF 417': {
                enabled: boolean | undefined;
            } | undefined;
            'PDF 417 Micro': {
                enabled: boolean | undefined;
            } | undefined;
            Datamatrix: {
                [key: string]: any;
            } | undefined;
            'Code 25': {
                enabled: boolean | undefined;
            } | undefined;
            'Interleaved 2 of 5': {
                enabled: boolean | undefined;
            } | undefined;
            'ITF 14': {
                enabled: boolean | undefined;
            } | undefined;
            'IATA 25': {
                enabled: boolean | undefined;
            } | undefined;
            'Matrix 25': {
                enabled: boolean | undefined;
            } | undefined;
            'Datalogic 25': {
                enabled: boolean | undefined;
            } | undefined;
            'COOP 25': {
                enabled: boolean | undefined;
            } | undefined;
            'Code 32': {
                enabled: boolean | undefined;
            } | undefined;
            Telepen: {
                enabled: boolean | undefined;
            } | undefined;
            Dotcode: {
                enabled: boolean | undefined;
            } | undefined;
            'ID Document': {
                [key: string]: any;
            } | undefined;
            'Databar 14': {
                enabled: boolean | undefined;
            } | undefined;
            'Databar Limited': {
                enabled: boolean | undefined;
            } | undefined;
            'Databar Expanded': {
                enabled: boolean | undefined;
            } | undefined;
            'Postal IMB': {
                enabled: boolean | undefined;
            } | undefined;
            Postnet: {
                enabled: boolean | undefined;
            } | undefined;
            Planet: {
                enabled: boolean | undefined;
            } | undefined;
            'Australian Post': {
                enabled: boolean | undefined;
            } | undefined;
            'Royal Mail': {
                enabled: boolean | undefined;
            } | undefined;
            KIX: {
                enabled: boolean | undefined;
            } | undefined;
            'Japanese Post': {
                enabled: boolean | undefined;
            } | undefined;
            general: {
                [key: string]: any;
            } | undefined;
        };
    }
    class BarcodeConfig {
        enabled?: boolean;
        constructor(config: Partial<BarcodeConfig>);
        toMap(): {
            enabled: boolean | undefined;
        };
    }
    class BarcodeConfigWithLength {
        enabled?: boolean;
        private minLength?;
        private maxLength?;
        constructor(config: Partial<BarcodeConfigWithLength>);
        toMap(): {
            enabled: boolean | undefined;
            minimumLength: number | undefined;
            maximumLength: number | undefined;
        };
        setLengthRange(minLength: number, maxLength: number): void;
    }
    class MSIBarcodeConfig {
        enabled?: boolean;
        private minLength?;
        private maxLength?;
        checksum?: MsiChecksumType;
        constructor(config: Partial<MSIBarcodeConfig>);
        toMap(): {
            [key: string]: any;
        };
        setLengthRange(minLength: number, maxLength: number): void;
    }
    class Code39BarcodeConfig {
        enabled?: boolean;
        private minLength?;
        private maxLength?;
        checksum?: Code39ChecksumType;
        constructor(config: Partial<Code39BarcodeConfig>);
        toMap(): {
            [key: string]: any;
        };
        setLengthRange(minLength: number, maxLength: number): void;
    }
    class Code11BarcodeConfig {
        enabled?: boolean;
        private minLength?;
        private maxLength?;
        checksum?: Code11ChecksumType;
        constructor(config: Partial<Code11BarcodeConfig>);
        toMap(): {
            [key: string]: any;
        };
        setLengthRange(minLength: number, maxLength: number): void;
    }
    class BarcodeConfigWithDpmMode {
        enabled?: boolean;
        dpmMode?: number;
        private minLength?;
        private maxLength?;
        constructor(config: Partial<BarcodeConfigWithDpmMode>);
        toMap(): {
            [key: string]: any;
        };
        setLengthRange(minLength: number, maxLength: number): void;
    }
    enum IdDocumentMasterChecksumType {
        disabled = 0,
        enabled = 1
    }
    class IdDocumentBarcodeConfig {
        enabled?: boolean;
        masterChecksum?: IdDocumentMasterChecksumType;
        constructor(config: Partial<IdDocumentBarcodeConfig>);
        toMap(): {
            [key: string]: any;
        };
    }
    class GeneralSettings {
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
        constructor(config: Partial<GeneralSettings>);
        toMap(): {
            [key: string]: any;
        };
        setROI(x: number, y: number, width: number, height: number): void;
    }
    class BarkoderResult {
        decoderResults: DecoderResult[];
        resultThumbnailsAsBase64?: string[] | null;
        resultImageAsBase64?: string | null;
        constructor(resultMap: Record<string, any>);
        private convertToBase64;
    }
    class DecoderResult {
        barcodeType: number;
        barcodeTypeName: string;
        binaryDataAsBase64: string;
        textualData: string;
        characterSet?: string | null;
        extra?: Record<string, any> | null;
        mrzImagesAsBase64?: {
            name: string;
            base64: string;
        }[];
        constructor(resultMap: Record<string, any>);
    }
    class BarkoderError {
        code: string;
        message: string;
        constructor(jsonString: string);
    }
}
export {};
//# sourceMappingURL=index.d.ts.map