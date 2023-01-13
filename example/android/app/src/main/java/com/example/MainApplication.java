package com.example;

import android.app.NotificationManager;
import android.content.Context;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.facebook.react.bridge.ReactApplicationContext;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.igaworks.v2.core.AdBrixRm;

import java.util.List;

import io.adbrix.AbxReactApplication;
import io.adbrix.AdbrixPackage;
import io.adbrix.PackageList;
import io.adbrix.*;
import io.adbrix.sdk.component.AbxLog;
import io.adbrix.sdk.domain.model.*;

public class MainApplication extends AbxReactApplication {

    @Override
    public ReactNativeHost initReactNativeHost() {
        return new ReactNativeHost(this) {
            @Override
            public boolean getUseDeveloperSupport() {
                return BuildConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
                List<ReactPackage> packages = new PackageList(this).getPackages();
                // Packages that cannot be autolinked yet can be added manually here, for example:
                // packages.add(new MyReactNativePackage());
                packages.add(new AdbrixPackage(new AdbrixPackage.ReactApplicationContextListener() {
                    @Override
                    public void onReceive(ReactApplicationContext reactApplicationContext) {
                        setReactApplicationContext(reactApplicationContext);
                    }
                }));
                return packages;
            }

            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
    }

    @Override
    public void onCreate() {
        super.onCreate();
        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
        AdBrixRm.setPushEnable(true);
        AdBrixRm.setInAppMessageFetchMode(DfnInAppMessageFetchMode.ADID);
        AdBrixRm.setNotificationChannel(this,"myPushChannelName", "my Channel description", NotificationManager.IMPORTANCE_HIGH, true);
        registerListener();
    }

    @Override
    public void registerListener() {
         setDeeplinkListener();
         setDeferredDeeplinkListener();
         setRemotePushMessageListener();
         setInAppMessageClickListener();
         setLocalPushMessageListener();
         setDfnInAppMessageAutoFetchListener();
         setLogListener();
    }

    /**xw
     * Loads Flipper in React Native templates. Call this in the onCreate method with something like
     * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     *
     * @param context
     * @param reactInstanceManager
     */
    private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            ReactNativeFlipper.initializeFlipper(context, reactInstanceManager);
        }
    }
}
