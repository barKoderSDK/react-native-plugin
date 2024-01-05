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
export declare class BarkoderView extends React.Component<BarkoderReactNativeProps> {
    private _myRef;
    private _barkoder;
    private _eventEmitter;
    constructor(props: BarkoderReactNativeProps);
    private startConfigurationEmitter;
    private _onDataReturned;
    private _onBarkoderConfigCreated;
    render(): React.JSX.Element;
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
    getMaxZoomFactor(): Promise<number>;
    setZoomFactor(zoomFactor: number): void;
    isFlashAvailable(): Promise<boolean>;
    setFlashEnabled(enabled: boolean): void;
    startCamera(): void;
    stopScanning(): void;
    startScanning(resultsCallback: ResultCallback): void;
    pauseScanning(): void;
    getBarkoderResolution(): Promise<Barkoder.BarkoderResolution>;
    setBarkoderResolution(barkoderResolution: Barkoder.BarkoderResolution): void;
    setDecodingSpeed(decodingSpeed: Barkoder.DecodingSpeed): void;
    setFormattingType(formatting: Barkoder.FormattingType): void;
    setEncodingCharacterSet(encodingCharacterSet: String): void;
    getLocationLineColorHex(): Promise<string>;
    setLocationLineColor(hexColor: String): Promise<boolean>;
    getLocationLineWidth(): Promise<number>;
    setLocationLineWidth(lineWidth: number): void;
    getRoiLineColorHex(): Promise<string>;
    setRoiLineColor(hexColor: String): Promise<boolean>;
    getRoiLineWidth(): Promise<number>;
    setRoiLineWidth(lineWidth: number): void;
    getRoiOverlayBackgroundColorHex(): Promise<string>;
    setRoiOverlayBackgroundColor(hexColor: String): Promise<boolean>;
    isCloseSessionOnResultEnabled(): Promise<boolean>;
    setCloseSessionOnResultEnabled(enabled: boolean): void;
    isImageResultEnabled(): Promise<boolean>;
    setImageResultEnabled(enabled: boolean): void;
    isLocationInImageResultEnabled(): Promise<boolean>;
    setLocationInImageResultEnabled(enabled: boolean): void;
    getRegionOfInterest(): Promise<number[]>;
    setRegionOfInterest(left: number, top: number, width: number, height: number): Promise<boolean>;
    getThreadsLimit(): Promise<number>;
    setThreadsLimit(threadsLimit: number): Promise<boolean>;
    isLocationInPreviewEnabled(): Promise<boolean>;
    setLocationInPreviewEnabled(enabled: boolean): void;
    isPinchToZoomEnabled(): Promise<boolean>;
    setPinchToZoomEnabled(enabled: boolean): void;
    isRegionOfInterestVisible(): Promise<boolean>;
    setRegionOfInterestVisible(visible: boolean): void;
    isBeepOnSuccessEnabled(): Promise<boolean>;
    setBeepOnSuccessEnabled(enabled: boolean): void;
    isVibrateOnSuccessEnabled(): Promise<boolean>;
    setVibrateOnSuccessEnabled(enabled: boolean): void;
    getEncodingCharacterSet(): Promise<string>;
    getVersion(): Promise<string>;
    getDecodingSpeed(): Promise<Barkoder.DecodingSpeed>;
    getFormattingType(): Promise<Barkoder.FormattingType>;
    isBarcodeTypeEnabled(barcodeType: Barkoder.BarcodeType): Promise<boolean>;
    getBarcodeTypeLengthRange(barcodeType: Barkoder.BarcodeType): Promise<number[]>;
    setBarcodeTypeLengthRange(barcodeType: Barkoder.BarcodeType, min: number, max: number): Promise<boolean>;
    configureBarkoder(barkoderConfig: Barkoder.BarkoderConfig): Promise<boolean>;
    setBarcodeTypeEnabled(barcodeType: Barkoder.BarcodeType, enabled: boolean): void;
    getMsiChecksumType(): Promise<Barkoder.MsiChecksumType>;
    setMsiChecksumType(msiChecksumType: Barkoder.MsiChecksumType): void;
    getCode39ChecksumType(): Promise<Barkoder.Code39ChecksumType>;
    setCode39ChecksumType(code39ChecksumType: Barkoder.Code39ChecksumType): void;
    getCode11ChecksumType(): Promise<Barkoder.Code11ChecksumType>;
    setCode11ChecksumType(code11ChecksumType: Barkoder.Code11ChecksumType): void;
    setMaximumResultsCount(maximumResultsCount: number): void;
    setDuplicatesDelayMs(duplicatesDelayMs: number): void;
    setMulticodeCachingDuration(multicodeCachingDuration: number): any;
    setMulticodeCachingEnabled(multicodeCachingEnabled: boolean): any;
    getMaximumResultsCount(): Promise<number>;
    getDuplicatesDelayMs(): Promise<number>;
    setDatamatrixDpmModeEnabled(enabled: boolean): void;
    setUpcEanDeblurEnabled(enabled: boolean): void;
    setEnableMisshaped1DEnabled(enabled: boolean): void;
    setBarcodeThumbnailOnResultEnabled(enabled: boolean): void;
    setThresholdBetweenDuplicatesScans(thresholdBetweenDuplicatesScans: number): void;
    getThresholdBetweenDuplicatesScans(): Promise<number>;
    isBarcodeThumbnailOnResultEnabled(): Promise<boolean>;
    getMulticodeCachingDuration(): Promise<number>;
    getMulticodeCachingEnabled(): Promise<boolean>;
    showLogMessages(show: boolean): void;
    private isIos;
    private isAndroid;
}
export declare namespace Barkoder {
    enum DecodingSpeed {
        fast = 0,
        normal = 1,
        slow = 2
    }
    enum FormattingType {
        disabled = 0,
        automatic = 1,
        gs1 = 2,
        aamva = 3
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
    enum BarkoderResolution {
        normal = 0,
        high = 1
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
        telepen = 26
    }
    class BarkoderConfig {
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
        constructor(config: Partial<BarkoderConfig>);
        toJsonString(): string;
    }
    class DekoderConfig {
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
        constructor(config: Partial<DekoderConfig>);
        toMap(): {
            Aztec: {
                enabled: boolean | undefined;
            } | undefined;
            'Aztec Compact': {
                enabled: boolean | undefined;
            } | undefined;
            QR: {
                enabled: boolean | undefined;
            } | undefined;
            'QR Micro': {
                enabled: boolean | undefined;
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
    class DatamatrixBarcodeConfig {
        enabled?: boolean;
        dpmMode?: number;
        private minLength?;
        private maxLength?;
        constructor(config: Partial<DatamatrixBarcodeConfig>);
        toMap(): {
            [key: string]: any;
        };
        setLengthRange(minLength: number, maxLength: number): void;
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
        constructor(config: Partial<GeneralSettings>);
        toMap(): {
            [key: string]: any;
        };
        setROI(x: number, y: number, width: number, height: number): void;
    }
    class BarkoderResult {
        barcodeType: BarcodeType;
        barcodeTypeName: string;
        binaryDataAsBase64: string;
        textualData: string;
        characterSet?: string | null;
        extra?: Record<string, any> | null;
        resultImageAsBase64?: string | null;
        constructor(jsonString: string);
    }
    class BarkoderError {
        code: string;
        message: string;
        constructor(jsonString: string);
    }
}
export {};
//# sourceMappingURL=index.d.ts.map