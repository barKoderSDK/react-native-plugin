package com.barkoderreactnative;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.uimanager.events.RCTModernEventEmitter;

class BarkoderViewConfigCreatedEvent extends Event<BarkoderViewConfigCreatedEvent> {

  public static final String EVENT_NAME = "barkoderViewConfigCreated";

  @Override
  public String getEventName() {
    return EVENT_NAME;
  }

  public BarkoderViewConfigCreatedEvent(int viewId) {
    super(viewId);
  }

  @Override
  public void dispatch(RCTEventEmitter rctEventEmitter) {
    super.dispatch(rctEventEmitter);
  }

  @Override
  public void dispatchModern(RCTModernEventEmitter rctEventEmitter) {
    rctEventEmitter.receiveEvent(getViewTag(), getEventName(), Arguments.createMap());
  }

  @Override
  public boolean canCoalesce() {
    // Dispatch every event one by one every time
    return false;
  }
}
