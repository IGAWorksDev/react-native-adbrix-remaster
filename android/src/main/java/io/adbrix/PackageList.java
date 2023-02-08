package io.adbrix;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

/**
 * 2022.12.15 bobos
 * react native 패키지에 PackageList가 없어져서
 * 이거 보고 따라 만듬 @see("https://stackoverflow.com/questions/70992083/android-error-cannot-resolve-symbol-packagelist")
 */
public class PackageList {
    private Application application;
    private ReactNativeHost reactNativeHost;
    private MainPackageConfig mConfig;

    public PackageList(ReactNativeHost reactNativeHost) {
        this(reactNativeHost, null);
    }

    public PackageList(Application application) {
        this(application, null);
    }

    public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
        this.reactNativeHost = reactNativeHost;
        mConfig = config;
    }

    public PackageList(Application application, MainPackageConfig config) {
        this.reactNativeHost = null;
        this.application = application;
        mConfig = config;
    }

    private ReactNativeHost getReactNativeHost() {
        return this.reactNativeHost;
    }

    public ArrayList<ReactPackage> getPackages() {
        return new ArrayList<ReactPackage>(Arrays.<ReactPackage>asList(new MainReactPackage(mConfig)));
    }
}
