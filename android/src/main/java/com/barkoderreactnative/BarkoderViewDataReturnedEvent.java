package com.barkoderreactnative;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTModernEventEmitter;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import org.json.JSONException;
import org.json.JSONObject;

class BarkoderViewDataReturnedEvent extends Event<BarkoderViewDataReturnedEvent> {

  public static final String EVENT_NAME = "barkoderViewDataReturned";
  private static final String PROMISE_REQUEST_ID_KEY = "promiseRequestId";
  private static final String PAYLOAD_KEY = "payload";
  private static final String ERROR_KEY = "error";
  private static final String ERROR_CODE_KEY = "code";
  private static final String ERROR_MESSAGE_KEY = "message";

  private final WritableMap payload;

  @Override
  public String getEventName() {
    return EVENT_NAME;
  }

  public BarkoderViewDataReturnedEvent(int viewId, int promiseRequestId, Object payloadValue) {
    super(viewId);

    payload = Arguments.createMap();
    payload.putInt(PROMISE_REQUEST_ID_KEY, promiseRequestId);

    if (payloadValue instanceof Double)
      payload.putDouble(PAYLOAD_KEY, (Double) payloadValue);
    else if (payloadValue instanceof Float)
      payload.putDouble(PAYLOAD_KEY, (Float) payloadValue);
    else if (payloadValue instanceof Integer)
      payload.putInt(PAYLOAD_KEY, (Integer) payloadValue);
    else if (payloadValue instanceof Boolean)
      payload.putBoolean(PAYLOAD_KEY, (Boolean) payloadValue);
    else if (payloadValue instanceof ReadableArray)
      payload.putArray(PAYLOAD_KEY, (ReadableArray) payloadValue);
    else
      payload.putString(PAYLOAD_KEY, String.valueOf(payloadValue));
  }

  public BarkoderViewDataReturnedEvent(int viewId, int promiseRequestId,
                                       BarkoderReactNativeErrors customError, String exceptionMessage) {
    super(viewId);

    payload = Arguments.createMap();
    payload.putInt(PROMISE_REQUEST_ID_KEY, promiseRequestId);

    JSONObject errorObject = new JSONObject();
    try {
      errorObject.put(ERROR_CODE_KEY, customError.getErrorCode());
      errorObject.put(ERROR_MESSAGE_KEY,
        customError.getErrorMessage() + (exceptionMessage != null ? exceptionMessage : ""));

      payload.putString(ERROR_KEY, errorObject.toString());
    } catch (JSONException e) {
      // This one should never happen
      throw new RuntimeException(e.getMessage());
    }
  }

  @Override
  public boolean canCoalesce() {
    // Dispatch every event one by one every time
    return false;
  }

  @Override
  protected WritableMap getEventData() {
    return serializeEventData();
  }

  private WritableMap serializeEventData() {
    WritableMap eventData = payload;
    return eventData;
  }

}
