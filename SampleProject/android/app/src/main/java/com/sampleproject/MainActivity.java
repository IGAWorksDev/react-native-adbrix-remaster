package com.sampleproject;

import com.facebook.react.ReactActivity;

import android.content.Intent;
import android.os.Bundle;
import com.igaworks.v2.core.AdBrixRm;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SampleProject";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    onNewIntent(MainActivity.this.getIntent());
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    AdBrixRm.deeplinkEvent(MainActivity.this);
  }
}
