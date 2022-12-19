package io.adbrix;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.facebook.soloader.SoLoader;
import com.igaworks.v2.core.AdBrixRm;
import com.igaworks.v2.core.application.AbxActivityHelper;

import org.json.JSONException;
import org.json.JSONObject;

import io.adbrix.sdk.component.AbxLog;
import io.adbrix.sdk.domain.model.Empty;
import io.adbrix.sdk.domain.model.Result;
import io.adbrix.sdk.utils.CommonUtils;

public abstract class AbxReactApplication extends Application implements ReactApplication {
    private ReactNativeHost reactNativeHost;
    public ReactApplicationContext reactApplicationContext;

    abstract public ReactNativeHost initReactNativeHost();

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        AbxActivityHelper.initializeSdk(this,
                getStringFromMetaData(this, "AdBrixRmAppKey"),
                getStringFromMetaData(this, "AdBrixRmSecretKey"));
        reactNativeHost = initReactNativeHost();
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return reactNativeHost;
    }

    public void setReactApplicationContext(ReactApplicationContext reactApplicationContext) {
        this.reactApplicationContext = reactApplicationContext;
    }

    private void sendMessageToReact(final String callbackMethodName, final String arguments) {
        if (reactApplicationContext == null) {
            AbxLog.i("ReactApplicationContext is null", false);
            return;
        }
        Activity activity = reactApplicationContext.getCurrentActivity();
        if (activity == null) {
            AbxLog.i("currentActivity is null", false);
            return;
        }
        activity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                reactApplicationContext.getJSModule(RCTNativeAppEventEmitter.class).emit(callbackMethodName, arguments);
            }
        });
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

    public void setDeeplinkListener(String callbackMethodName) {
        AdBrixRm.setDeeplinkListener(new AdBrixRm.DeeplinkListener() {
            @Override
            public void onReceiveDeeplink(String uriStr) {
                sendMessageToReact(callbackMethodName, uriStr);
            }
        });
    }

    public void unregisterDeeplinkListener() {
        AdBrixRm.setDeeplinkListener(null);
    }

    public void setDeferredDeeplinkListener(String callbackMethodName) {
        AdBrixRm.setDeferredDeeplinkListener(new AdBrixRm.DeferredDeeplinkListener() {
            @Override
            public void onReceiveDeferredDeeplink(String uriStr) {
                sendMessageToReact(callbackMethodName, uriStr);
            }
        });
    }

    public void unregisterDeferredDeeplinkListener() {
        AdBrixRm.setDeferredDeeplinkListener(null);
    }

    public void setLocalPushMessageListener(String callbackMethodName) {
        AdBrixRm.setLocalPushMessageListener(new AdBrixRm.onTouchLocalPushListener() {
            @Override
            public void onTouchLocalPush(String callbackJsonString) {
                sendMessageToReact(callbackMethodName, callbackJsonString);
            }
        });
    }

    public void unregisterLocalPushMessageListener() {
        AdBrixRm.setLocalPushMessageListener(null);
    }

    public void setRemotePushMessageListener(String callbackMethodName) {
        AdBrixRm.setRemotePushMessageListener(new AdBrixRm.onTouchRemotePushListener() {
            @Override
            public void onTouchRemotePush(String callbackJsonString) {
                sendMessageToReact(callbackMethodName, callbackJsonString);
            }
        });
    }

    public void unregisterRemotePushMessageListener() {
        AdBrixRm.setRemotePushMessageListener(null);
    }

    public void setInAppMessageClickListener(String callbackMethodName) {
        AdBrixRm.setInAppMessageClickListener(new AdBrixRm.InAppMessageClickListener() {
            @Override
            public void onReceiveInAppMessageClick(String actionId, String actionType, String actionArg, boolean isClosed) {
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("actionId", actionId);
                    jsonObject.put("actionType", actionType);
                    jsonObject.put("actionArg", actionArg);
                    jsonObject.put("isClosed", isClosed);
                } catch (JSONException e) {
                    AbxLog.e("onReceiveInAppMessageClick() parse error", e, false);
                }
                sendMessageToReact(callbackMethodName, jsonObject.toString());
            }
        });
    }

    public void unregisterInAppMessageClickListener() {
        AdBrixRm.setInAppMessageClickListener(null);
    }

    public void setDfnInAppMessageAutoFetchListener(String callbackMethodName) {
        AdBrixRm.setDfnInAppMessageAutoFetchListener(new AdBrixRm.DfnInAppMessageAutoFetchListener() {
            @Override
            public void onFetchInAppMessage(Result<Empty> result) {
                sendMessageToReact(callbackMethodName, result.toString());
            }
        });
    }

    public void unregisterDfnInAppMessageAutoFetchListener() {
        AdBrixRm.setDfnInAppMessageAutoFetchListener(null);
    }

    public void setLogListener(String callbackMethodName) {
        if (CommonUtils.isNullOrEmpty(callbackMethodName)) {
            AbxLog.d("callbackMethodName is null or empty", false);
            return;
        }
        AdBrixRm.setLogListener(new AdBrixRm.LogListener() {
            @Override
            public void onPrintLog(int level, String message) {
                StringBuilder stringBuilder = new StringBuilder();
                stringBuilder.append("[");
                switch (level) {
                    case Log.VERBOSE:
                        stringBuilder.append("V");
                        break;
                    case Log.DEBUG:
                        stringBuilder.append("D");
                        break;
                    case Log.INFO:
                        stringBuilder.append("I");
                        break;
                    case Log.ASSERT:
                        stringBuilder.append("A");
                        break;
                    case Log.WARN:
                        stringBuilder.append("W");
                        break;
                    case Log.ERROR:
                        stringBuilder.append("E");
                        break;
                }
                stringBuilder.append("] ");
                stringBuilder.append(message);
                sendMessageToReact(callbackMethodName, stringBuilder.toString());
            }
        });
    }

    public void unregisterLogListener() {
        AdBrixRm.setLogListener(null);
        AbxLog.setLogObserver(null);
    }

    public void unregisterListeners() {
        unregisterDeeplinkListener();
        unregisterDeferredDeeplinkListener();
        unregisterLocalPushMessageListener();
        unregisterRemotePushMessageListener();
        unregisterInAppMessageClickListener();
        unregisterDfnInAppMessageAutoFetchListener();
        unregisterLogListener();
    }
}
