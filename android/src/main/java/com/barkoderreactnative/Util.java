package com.barkoderreactnative;

import android.graphics.Bitmap;
import android.graphics.Color;
import android.text.TextUtils;
import android.util.Base64;

import com.barkoder.Barkoder;
import com.barkoder.BarkoderLog;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;

class Util {
  private static final String TAG = Util.class.getSimpleName();

  static String barkoderResultsToJsonString(Barkoder.Result[] results, Bitmap resultImage) {
    JSONObject resultJson = new JSONObject();

    try {
      resultJson.put("barcodeType", results[0].barcodeType.ordinal());
      resultJson.put("barcodeTypeName", results[0].barcodeTypeName);
      resultJson.put("binaryDataAsBase64", Base64.encodeToString(results[0].binaryData, Base64.NO_WRAP));
      resultJson.put("textualData", results[0].textualData);

      if (!TextUtils.isEmpty(results[0].characterSet))
        resultJson.put("characterSet", results[0].characterSet);

      if (results[0].extra != null && results[0].extra.length > 0) {
        JSONObject extraAsJson = new JSONObject();
        for (Barkoder.BKKeyValue item : results[0].extra) {
          extraAsJson.put(item.key, item.value);
        }
        resultJson.put("extra", extraAsJson.toString());
      }

      if (resultImage != null)
        resultJson.put("resultImageAsBase64", bitmapImageToBase64(resultImage));

         if (results[0].images != null) {
            for (Barkoder.BKImageDescriptor image : results[0].images) {
              if (image != null && image.image != null) {
                switch (image.name) {
                  case "main":
                    resultJson.put("mainImageAsBase64", bitmapImageToBase64(image.image));
                    break;
                  case "document":
                    resultJson.put("documentImageAsBase64", bitmapImageToBase64(image.image));
                    break;
                  case "signature":
                    resultJson.put("signatureImageAsBase64", bitmapImageToBase64(image.image));
                    break;
                  case "picture":
                    resultJson.put("pictureImageAsBase64", bitmapImageToBase64(image.image));
                    break;
                  default:
                    break;
                }
              }
            }
          }

    } catch (JSONException ex) {
      BarkoderLog.d(TAG, ex.getMessage());
    }
    

    return resultJson.toString();
  }

  private static String bitmapImageToBase64(Bitmap bitmapImage) {
    try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
      bitmapImage.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
      byte[] bitmapImageBytes = byteArrayOutputStream.toByteArray();

      return Base64.encodeToString(bitmapImageBytes, Base64.NO_WRAP);
    } catch (Exception ex) {
      BarkoderLog.d(TAG, ex.getMessage());
    }
    return null;
  }

  static Barkoder.SpecificConfig getSpecificConfigRefFromBarcodeTypeOrdinal
    (int barcodeTypeOrdinal, Barkoder.Config decoderConfig) {

    // If not founded exception is thrown
    Barkoder.BarcodeType type = Barkoder.BarcodeType.valueOf(barcodeTypeOrdinal);

    switch (type) {
      case Aztec:
        return decoderConfig.Aztec;
      case AztecCompact:
        return decoderConfig.AztecCompact;
      case QR:
        return decoderConfig.QR;
      case QRMicro:
        return decoderConfig.QRMicro;
      case Code128:
        return decoderConfig.Code128;
      case Code93:
        return decoderConfig.Code93;
      case Code39:
        return decoderConfig.Code39;
      case Codabar:
        return decoderConfig.Codabar;
      case Code11:
        return decoderConfig.Code11;
      case Msi:
        return decoderConfig.Msi;
      case UpcA:
        return decoderConfig.UpcA;
      case UpcE:
        return decoderConfig.UpcE;
      case UpcE1:
        return decoderConfig.UpcE1;
      case Ean13:
        return decoderConfig.Ean13;
      case Ean8:
        return decoderConfig.Ean8;
      case PDF417:
        return decoderConfig.PDF417;
      case PDF417Micro:
        return decoderConfig.PDF417Micro;
      case Datamatrix:
        return decoderConfig.Datamatrix;
      case Code25:
        return decoderConfig.Code25;
      case Interleaved25:
        return decoderConfig.Interleaved25;
      case ITF14:
        return decoderConfig.ITF14;
      case IATA25:
        return decoderConfig.IATA25;
      case Matrix25:
        return decoderConfig.Matrix25;
      case Datalogic25:
        return decoderConfig.Datalogic25;
      case COOP25:
        return decoderConfig.COOP25;
      case Code32:
        return decoderConfig.Code32;
      case Telepen:
        return decoderConfig.Telepen;
      case Dotcode:
        return decoderConfig.Dotcode;
      case IDDocument:
        return decoderConfig.IDDocument;
    }
    return null;
  }

  static int hexColorToIntColor(String hexColor) {
    int color;

    if (hexColor.startsWith("#"))
      color = Color.parseColor(hexColor);
    else
      color = Color.parseColor("#" + hexColor);

    return color;
  }
}
