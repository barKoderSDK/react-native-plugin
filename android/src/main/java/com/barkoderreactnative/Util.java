package com.barkoderreactnative;

import android.graphics.Bitmap;
import android.graphics.Color;
import android.text.TextUtils;
import android.util.Base64;
import java.util.Objects;
import androidx.annotation.Nullable;

import com.barkoder.Barkoder;
import com.barkoder.BarkoderLog;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

import java.util.Objects;

import java.io.ByteArrayOutputStream;

class Util {
  private static final String TAG = Util.class.getSimpleName();

  static String barkoderResultsToJsonString(Barkoder.Result[] results, Bitmap[] thumbnails, Bitmap resultImage) {
    JSONObject barkoderResultJson = new JSONObject();
    JSONArray resultsArray = new JSONArray();

    try {
      // Process each decoder result separately
      for (Barkoder.Result decoderResult : results) {
        JSONObject resultJson = new JSONObject();

        resultJson.put("barcodeType", decoderResult.barcodeType.ordinal());
        resultJson.put("barcodeTypeName", decoderResult.barcodeTypeName);
        resultJson.put("binaryDataAsBase64", Base64.encodeToString(decoderResult.binaryData, Base64.NO_WRAP));
        resultJson.put("textualData", decoderResult.textualData);

        if (!TextUtils.isEmpty(decoderResult.characterSet)) {
          resultJson.put("characterSet", decoderResult.characterSet);
        }

        // Add "extra" if available and not empty
        if (decoderResult.extra != null && decoderResult.extra.length > 0) {
          JSONObject extraJson = new JSONObject();
          for (Barkoder.BKKeyValue item : decoderResult.extra) {
            extraJson.put(item.key, item.value);
          }
          resultJson.put("extra", extraJson.toString());
        }

        // Add mrzImagesAsBase64
        if (Objects.equals(decoderResult.barcodeTypeName, "MRZ")) {
          if (decoderResult.images != null) {
            JSONArray mrzImagesArray = new JSONArray();

            for (Barkoder.BKImageDescriptor image : decoderResult.images) {
              if (image != null && image.image != null) {
                switch (image.name) {
                  case "main":
                  case "document":
                  case "signature":
                  case "picture":
                    JSONObject imageInfo = new JSONObject();
                    imageInfo.put("name", image.name);
                    imageInfo.put("base64", bitmapImageToBase64(image.image));
                    mrzImagesArray.put(imageInfo);
                    break;
                }
              }
            }
            resultJson.put("mrzImagesAsBase64", mrzImagesArray);
          }
        }

        resultsArray.put(resultJson);
      }

      // Add decoderResults to the final JSON object
      barkoderResultJson.put("decoderResults", resultsArray);

      // Process thumbnails as an array of base64 strings if available, outside the
      // loop
      if (thumbnails != null) {
        JSONArray thumbnailsBase64Array = new JSONArray();
        for (Bitmap thumbnail : thumbnails) {
          if (thumbnail != null) {
            thumbnailsBase64Array.put(bitmapImageToBase64(thumbnail));
          }
        }
        barkoderResultJson.put("resultThumbnailsAsBase64", thumbnailsBase64Array);
      }

      // Process the main result image as base64 if available, outside the loop
      if (resultImage != null) {
        barkoderResultJson.put("resultImageAsBase64", bitmapImageToBase64(resultImage));
      }

    } catch (JSONException ex) {
      BarkoderLog.d(TAG, ex.getMessage());
    }

    return barkoderResultJson.toString();
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

  static Barkoder.SpecificConfig getSpecificConfigRefFromBarcodeTypeOrdinal(int barcodeTypeOrdinal,
      Barkoder.Config decoderConfig) {

    // If not founded exception is thrown
    Barkoder.DecoderType type = Barkoder.DecoderType.valueOf(barcodeTypeOrdinal);

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
      case Databar14:
        return decoderConfig.Databar14;
      case DatabarLimited:
        return decoderConfig.DatabarLimited;
      case DatabarExpanded:
        return decoderConfig.DatabarExpanded;
      case PostalIMB:
        return decoderConfig.PostalIMB;
      case Postnet:
        return decoderConfig.Postnet;
      case Planet:
        return decoderConfig.Planet;
      case AustralianPost:
        return decoderConfig.AustralianPost;
      case RoyalMail:
        return decoderConfig.RoyalMail;
      case KIX:
        return decoderConfig.KIX;
      case JapanesePost:
        return decoderConfig.JapanesePost;
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