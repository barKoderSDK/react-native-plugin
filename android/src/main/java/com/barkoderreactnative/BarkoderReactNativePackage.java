package com.barkoderreactnative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

@SuppressWarnings("NullableProblems") // To avoid androidX library
public class BarkoderReactNativePackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @SuppressWarnings("rawtypes")
  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return List.of(new BarkoderReactNativeViewManager());
  }
}
