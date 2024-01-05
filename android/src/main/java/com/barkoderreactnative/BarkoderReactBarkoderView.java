package com.barkoderreactnative;

import android.content.Context;
import android.util.AttributeSet;

import com.barkoder.BarkoderView;

@SuppressWarnings("unused")
class BarkoderReactBarkoderView extends BarkoderView {

  private final Runnable measureAndLayout = () -> {
    measure(
      MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
    layout(getLeft(), getTop(), getRight(), getBottom());
  };

  public BarkoderReactBarkoderView(Context context, boolean forceLegacyCameraEnabled) {
    super(context, forceLegacyCameraEnabled);
  }

  public BarkoderReactBarkoderView(Context context) {
    super(context);
  }

  public BarkoderReactBarkoderView(Context context, AttributeSet attrs) {
    super(context, attrs);
  }

  public BarkoderReactBarkoderView(Context context, AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
  }

  @Override
  public void requestLayout() {
    super.requestLayout();

    // There is bug with react native, that's why we are using this workaround for now
    // https://github.com/facebook/react-native/issues/17968
    post(measureAndLayout);
  }
}
