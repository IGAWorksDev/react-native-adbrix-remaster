package org.domain;

import android.content.Context;
import android.content.Intent;

import com.igaworks.v2.core.AbxReceiver;

public class AdbrixReactReceiver {
    public static void onRecevie(Context context, Intent intent) {
        new AbxReceiver().onReceive(context,intent);
    }
}
