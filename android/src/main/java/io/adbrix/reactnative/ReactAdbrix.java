package io.adbrix.reactnative;

import android.app.Activity;
import android.app.Application;
import android.content.Context;

import com.google.firebase.messaging.RemoteMessage;

import android.util.Log;


public class ReactAdbrix  {

    private static AdbrixRmModuleImpl impl = AdbrixRmModuleImpl.shared();

    public static void sdkInit(Application application, String appKey, String secretKey) {
        impl.sdkInit(application, appKey, secretKey);
    }

    public static void deeplinkEvent(Activity deeplinkActivity) {
        impl.deeplinkEvent(deeplinkActivity);
    }

    public static void onResume(Activity activity) {
        impl.onResume(activity);
    }

    public static void onMessageReceived(Context context, RemoteMessage remoteMessage) {
        impl.onMessageReceived(context, remoteMessage);
    }

    public static void setRegistrationId(String token) {
        impl.setRegistrationId(token);
    }

    public static void setPushIconStyle(Context context, String smallIconName, String largeIconName, int argb) {
        impl.setPushIconStyle(context, smallIconName, largeIconName, argb);
    }

    public static void createNotificationChannel(String channelName, String channelDescription) {
        impl.createNotificationChannel(channelName, channelDescription);
    }

    public static void setPushEnable(boolean enabled) {
        impl.setPushEnable(enabled);
    }
}
