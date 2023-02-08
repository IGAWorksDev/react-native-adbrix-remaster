package com.example;

import android.util.Log;

import androidx.annotation.NonNull;

import com.google.firebase.messaging.RemoteMessage;
import com.igaworks.v2.core.AdBrixRm;
import com.google.firebase.messaging.FirebaseMessagingService;

import io.adbrix.sdk.component.AbxLog;
import io.adbrix.sdk.utils.CommonUtils;

public class MyFirebaseMessagingService extends FirebaseMessagingService {
    @Override
    public void onNewToken(String token) {
        Log.d("adbrix", "Refreshed token: " + token);
        AdBrixRm.setRegistrationId(token);
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        AdBrixRm.onMessageReceived(getApplicationContext(), remoteMessage);
    }
}