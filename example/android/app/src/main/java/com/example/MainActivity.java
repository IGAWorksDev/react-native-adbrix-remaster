package com.example;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.igaworks.v2.core.AdBrixRm;

import io.adbrix.sdk.component.AbxLog;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "example";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    AdBrixRm.deeplinkEvent(MainActivity.this);
  }
}
