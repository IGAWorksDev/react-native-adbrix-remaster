package io.adbrix.reactnative;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.google.firebase.messaging.RemoteMessage;
import com.igaworks.v2.core.AdBrixRm;
import com.igaworks.v2.core.application.AbxActivityHelper;
import com.igaworks.v2.core.result.OnRemotePushClickResult;


import android.util.Log;


public class ReactAdbrix  {

    public static void sdkInit(Application application, String appKey, String secretKey) {
        AbxActivityHelper.initializeSdk(application, appKey, secretKey);

        AdBrixRm.setOnRemotePushClickListener(new AdBrixRm.onRemotePushClickListener() {
            @Override
            public void onClick(OnRemotePushClickResult result) {
                String deeplink = result.getDeeplink();
                AdbrixRmModuleImpl.shared().onReceiveDeeplink(deeplink);
            }
        });
    }

    public static void deeplinkEvent(Activity deeplinkActivity) {
        AdBrixRm.deeplinkEvent(deeplinkActivity);

        if (deeplinkActivity == null) {return;}
        if (deeplinkActivity.getIntent() == null) {return;}

        Uri uri = deeplinkActivity.getIntent().getData();
        if (uri == null) {return;}

        AdbrixRmModuleImpl.shared().onReceiveDeeplink(uri.toString());
    }

    public static void onResume(Activity activity) {
        AdBrixRm.onResume(activity);
    }

    public static void onMessageReceived(Context context, RemoteMessage remoteMessage) {
        AdBrixRm.onMessageReceived(context, remoteMessage);
    }

    public static void setRegistrationId(String token) {
        AdBrixRm.setRegistrationId(token);
    }

    public static void setPushIconStyle(Context context, String smallIconName, String largeIconName, int argb) {
        AdBrixRm.setPushIconStyle(context, smallIconName, largeIconName, argb);
    }

    public static void createNotificationChannel(String channelName, String channelDescription) {
        AdBrixRm.createDefaultNotificationChannel(channelName, channelDescription);
    }

    public static void setPushEnable(boolean enabled) {
        AdBrixRm.setPushEnable(enabled);
    }
}
