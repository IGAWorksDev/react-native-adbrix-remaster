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

import com.igaworks.v2.core.application.AbxActivityLifecycleCallbacks;

import io.adbrix.sdk.component.AbxLog;
import io.adbrix.sdk.domain.model.Empty;
import io.adbrix.sdk.domain.model.Result;

public abstract class AbxReactApplication extends Application implements ReactApplication {
    private ReactNativeHost reactNativeHost;
    public ReactApplicationContext reactApplicationContext;

    abstract public ReactNativeHost initReactNativeHost();
    abstract public void registerListener();

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        AbxActivityHelper.initializeSdk(this, getStringFromMetaData(this, "AdBrixRmAppKey"), getStringFromMetaData(this, "AdBrixRmSecretKey"));
        reactNativeHost = initReactNativeHost();
        registerActivityLifecycleCallbacks(new AbxActivityLifecycleCallbacks());
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
            Log.i("abxrm : ","ReactApplication Context is Null");
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

    public void setDeeplinkListener() {
        AdBrixRm.setDeeplinkListener(new AdBrixRm.DeeplinkListener() {
            @Override
            public void onReceiveDeeplink(String uriStr) {
                sendMessageToReact(DfnCallbackConstants.DEEP_LINK_LISTENER_CALLBACK, uriStr);
            }
        });
    }

    public void unregisterDeeplinkListener() {
        AdBrixRm.setDeeplinkListener(null);
    }

    public void setDeferredDeeplinkListener() {
        AdBrixRm.setDeferredDeeplinkListener(new AdBrixRm.DeferredDeeplinkListener() {
            @Override
            public void onReceiveDeferredDeeplink(String uriStr) {
                sendMessageToReact(DfnCallbackConstants.DEFERRED_LINK_LISTENER_CALLBACK, uriStr);
            }
        });
    }

    public void unregisterDeferredDeeplinkListener() {
        AdBrixRm.setDeferredDeeplinkListener(null);
    }

    public void setLocalPushMessageListener() {
        AdBrixRm.setLocalPushMessageListener(new AdBrixRm.onTouchLocalPushListener() {
            @Override
            public void onTouchLocalPush(String callbackJsonString) {
                sendMessageToReact(DfnCallbackConstants.LOCAL_PUSH_MESSAGE_CALLBACK, callbackJsonString);
            }
        });
    }

    public void unregisterLocalPushMessageListener() {
        AdBrixRm.setLocalPushMessageListener(null);
    }

    public void setRemotePushMessageListener() {
        AbxLog.d("setRemotePushMessageListener called.", false);
        AdBrixRm.setRemotePushMessageListener(new AdBrixRm.onTouchRemotePushListener() {
            @Override
            public void onTouchRemotePush(String callbackJsonString) {
                sendMessageToReact(DfnCallbackConstants.REMOTE_PUSH_MESSAGE_CALLBACK, callbackJsonString);
            }
        });
    }

    public void unregisterRemotePushMessageListener() {
        AdBrixRm.setRemotePushMessageListener(null);
    }

    public void setInAppMessageClickListener() {
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
                sendMessageToReact(DfnCallbackConstants.IN_APP_MESSAGE_CLICK_CALLBACK, jsonObject.toString());
            }
        });
    }

    public void unregisterInAppMessageClickListener() {
        AdBrixRm.setInAppMessageClickListener(null);
    }

    public void setDfnInAppMessageAutoFetchListener() {
        AdBrixRm.setDfnInAppMessageAutoFetchListener(new AdBrixRm.DfnInAppMessageAutoFetchListener() {
            @Override
            public void onFetchInAppMessage(Result<Empty> result) {
                sendMessageToReact(DfnCallbackConstants.IN_APP_MESSAGE_AUTO_FETCH_CALLBACK, result.toString());
            }
        });
    }

    public void unregisterDfnInAppMessageAutoFetchListener() {
        AdBrixRm.setDfnInAppMessageAutoFetchListener(null);
    }

    public void setLogListener() {
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
                sendMessageToReact(DfnCallbackConstants.LOG_LISTENER_CALLBACK, stringBuilder.toString());
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
