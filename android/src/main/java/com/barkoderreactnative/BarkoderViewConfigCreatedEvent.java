package com.barkoderreactnative;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.uimanager.events.RCTModernEventEmitter;
import com.facebook.react.bridge.WritableMap;

class BarkoderViewConfigCreatedEvent extends Event<BarkoderViewConfigCreatedEvent> {

  public static final String EVENT_NAME = "barkoderViewConfigCreated";

  @Override
  public String getEventName() {
    return EVENT_NAME;
  }

  public BarkoderViewConfigCreatedEvent(int viewId) {
    super(viewId);
  }

  protected WritableMap getEventData() {
    return serializeEventData();
  }

  private WritableMap serializeEventData() {
    WritableMap eventData = Arguments.createMap();
    return eventData;
  }

  @Override
  public boolean canCoalesce() {
    // Dispatch every event one by one every time
    return false;
  }
}
