package com.example;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import android.os.Build;
import io.adbrix.AdbrixPackage;
import com.igaworks.v2.core.application.AbxActivityHelper;
import com.igaworks.v2.core.application.AbxActivityLifecycleCallbacks;

public abstract class AbxReactApplication extends Application implements ReactApplication {
  private ReactNativeHost mReactNativeHost;
  abstract public ReactNativeHost initReactNativeHost();

  @Override
  public void onCreate() {
    super.onCreate();
      SoLoader.init(this, /* native exopackage */ false);
      AbxActivityHelper.initializeSdk(this,
          getStringFromMetaData(this, "AdBrixRmAppKey"),
          getStringFromMetaData(this, "AdBrixRmSecretKey"));
      mReactNativeHost = initReactNativeHost();
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  private String getStringFromMetaData(Context context, String key) {
      ApplicationInfo applicationInfo;
      try {
          applicationInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
          if (applicationInfo == null) {
              AbxLog.d("AdBrixRm >> AndroidManifest.xml cannot find (cannot find package)" + "/" + context.getPackageName(), true);
              return "";
          }
          if (applicationInfo.metaData == null) {
              AbxLog.d("AdBrixRm SDK can not find meta-data tags required. Please check that meta-data tag is in the application tag.", true);
              return "";
          } else {
              if (applicationInfo.metaData.containsKey(key)) {
                  String value = String.valueOf(applicationInfo.metaData.get(key));
                  return value;
              } else {
                  AbxLog.d("AdBrixRm >> AndroidManifest.xml setting Error : Check AndroidManifest.xml file -> Missing AdBrixRmAppKey or SecretKey meta tag", true);
                  return "";
              }
          }
      } catch (PackageManager.NameNotFoundException e) {
          AbxLog.e(e, true);
      }
      return null;
  }
}
