package io.adbrix;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.igaworks.v2.core.AbxCommerce;
import com.igaworks.v2.core.AbxCommon;
import com.igaworks.v2.core.AbxGame;
import com.igaworks.v2.core.AdBrixRm;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import io.adbrix.sdk.component.AbxLog;
import io.adbrix.sdk.domain.function.Completion;
import io.adbrix.sdk.domain.model.ActionHistory;
import io.adbrix.sdk.domain.model.DfnInAppMessage;
import io.adbrix.sdk.domain.model.DfnInAppMessageFetchMode;
import io.adbrix.sdk.domain.model.Empty;
import io.adbrix.sdk.domain.model.Result;
import io.adbrix.sdk.utils.CommonUtils;

// Version 2 note: 20210707
// Remove startAdbrixSDK API, add new initRNPlugin API
// startAdbrixSDK (v1): Move to native android code. This part needs low level integration with android platform
// Use React Native Linking class instead. https://reactnative.dev/docs/linking

@ReactModule(name = AdbrixModule.NAME)
public class AdbrixModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactApplicationContext;
    public static final String NAME = "AdbrixRm";

    public AdbrixModule(@NonNull final ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        this.reactApplicationContext = reactApplicationContext;
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    //region AdBrixRm
    
    @ReactMethod
    public void login(String userId) {
        AdBrixRm.login(userId);
    }

    @ReactMethod
    public void logout() {
        AdBrixRm.logout();
    }

    @ReactMethod
    public void gdprForgetMe() {
        AdBrixRm.gdprForgetMe(reactApplicationContext);
    }

    @ReactMethod
    public void setAge(int age) {
        AdBrixRm.setAge(age);
    }

    @ReactMethod
    public void setGender(int gender) {
        switch (gender) {
            case 0:
                AdBrixRm.setGender(AdBrixRm.AbxGender.UNKNOWN);
                break;
            case 1:
                AdBrixRm.setGender(AdBrixRm.AbxGender.MALE);
                break;
            case 2:
                AdBrixRm.setGender(AdBrixRm.AbxGender.FEMALE);
                break;
            default:
                AdBrixRm.setGender(AdBrixRm.AbxGender.UNKNOWN);
                break;

        }
    }

    @ReactMethod
    public void saveUserProperties(String jsonString) {
        JSONObject userPropertiesJSON = new JSONObject();
        try {
            if (!AdbrixUtils.isNullString(jsonString)) {
                userPropertiesJSON = new JSONObject(jsonString);
            }
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
        AdBrixRm.UserProperties userProperties = AdbrixUtils.makeUserProperties(userPropertiesJSON);
        AdBrixRm.saveUserProperties(userProperties);
    }

    @ReactMethod
    public void clearUserProperties() {
        AdBrixRm.clearUserProperties();
    }

    @ReactMethod
    public void setEnableLocationListening(boolean option) {
        AdBrixRm.setEnableLocationListening(option);
    }

    @ReactMethod
    public void setLocation(double lat, double lon) {
        AdBrixRm.setLocation(lat, lon);
    }

    @ReactMethod
    public void event(String eventName, String paramJson) {
        if (AdbrixUtils.isNullString(paramJson)) {
            AdBrixRm.event(eventName);
            return;
        }

        try {
            JSONObject attrmodel = new JSONObject(paramJson);

            AdBrixRm.event(eventName, AdbrixUtils.makeEventProperties(attrmodel));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void flushAllEvents(Callback callback) {
        AdBrixRm.flushAllEvents(new Completion<Result<Empty>>() {
            @Override
            public void handle(Result<Empty> emptyResult) {
                if (callback == null) {
                    return;
                }
                callback.invoke(emptyResult.toString());
            }
        });
    }

    @ReactMethod
    public void disableSDK(String reason) {
        AdBrixRm.disableSDK(reason);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isAdbrixDisabled() {
        return AdBrixRm.isAdbrixDisabled();
    }

    @ReactMethod
    public void deepLinkEvent() {
        Activity activity = reactApplicationContext.getCurrentActivity();
        AdBrixRm.deeplinkEvent(activity);
    }

    // todo application?x
    @ReactMethod
    public void deeplinkEventWithIntent(final Intent deeplinkIntent) {
        AdBrixRm.deeplinkEventWithIntent(deeplinkIntent);
    }

    @ReactMethod
    public void setEventUploadCountInterval(int interval) {
        switch (interval) {
            case 10:
                AdBrixRm.setEventUploadCountInterval(AdBrixRm.AdBrixEventUploadCountInterval.MIN);
                break;
            case 30:
                AdBrixRm.setEventUploadCountInterval(AdBrixRm.AdBrixEventUploadCountInterval.NORMAL);
                break;
            case 60:
                AdBrixRm.setEventUploadCountInterval(AdBrixRm.AdBrixEventUploadCountInterval.MAX);
                break;
            default:
                AdBrixRm.setEventUploadCountInterval(AdBrixRm.AdBrixEventUploadCountInterval.NORMAL);
                break;
        }
    }

    @ReactMethod
    public void setEventUploadTimeInterval(int interval) {
        switch (interval) {
            case 30:
                AdBrixRm.setEventUploadTimeInterval(AdBrixRm.AdBrixEventUploadTimeInterval.MIN);
                break;
            case 60:
                AdBrixRm.setEventUploadTimeInterval(AdBrixRm.AdBrixEventUploadTimeInterval.NORMAL);
                break;
            case 120:
                AdBrixRm.setEventUploadTimeInterval(AdBrixRm.AdBrixEventUploadTimeInterval.MAX);
                break;
            default:
                AdBrixRm.setEventUploadTimeInterval(AdBrixRm.AdBrixEventUploadTimeInterval.NORMAL);
                break;
        }
    }

    @ReactMethod
    public void setAppScanEnable(boolean enable) {
        AdBrixRm.setAppScanEnable(enable);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean getPushEnable(){
        return AdBrixRm.getPushEnable();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean getOsPushEnable(){
        return AdBrixRm.getOsPushEnable();
    }

    @ReactMethod
    public void setNotificationDoNotDisturbEnable(boolean enable) {
        AdBrixRm.setNotificationDoNotDisturbEnable(enable);
    }

    @ReactMethod
    public void setNotificationDoNotDisturb(int startHour, int startMinutes, int endHour, int endMinutes) {
        AdBrixRm.setNotificationDoNotDisturb(startHour, startMinutes, endHour, endMinutes);
    }

    @ReactMethod
    public void setPushEnable(boolean toEnable) {
        AdBrixRm.setPushEnable(toEnable);
    }

    @ReactMethod
    public void setRegistrationId(String token) {
        AdBrixRm.setRegistrationId(token);
    }

    @ReactMethod
    public void setPushIconStyle(String smallIconName, String largeIconName, int argb) {
        AdBrixRm.setPushIconStyle(reactApplicationContext, smallIconName, largeIconName, argb);
    }

    @ReactMethod
    public void setNotificationOption(int priority, int visibility) {
        int resultPriority = priority;
        int resultVisibility = visibility;

        if (resultPriority < -2 || resultPriority > 2) {
            AbxLog.w("setNotificationOption() : priority has to between -2 to 2. setting default priority(0).", false);
            resultPriority = NotificationCompat.PRIORITY_DEFAULT;
        }
        if (resultVisibility < -1 || resultVisibility > 1) {
            AbxLog.w("setNotificationOption() : visibility has to between -1 to 1. setting default visibility(0).", false);
            resultVisibility = NotificationCompat.VISIBILITY_PRIVATE;
        }

        AdBrixRm.setNotificationOption(reactApplicationContext, resultPriority, resultPriority);
    }

    @ReactMethod
    public void setNotificationChannel(String channelName, String channelDescription, int importance, boolean vibrateEnable) {
        AdBrixRm.setNotificationChannel(reactApplicationContext, channelName, channelDescription, importance, vibrateEnable);
    }

    @ReactMethod
    public void setKakaoId(final String kakaoId) {
        AdBrixRm.setKakaoId(kakaoId);
    }

    @ReactMethod
    public void  saveUserCiProperties(String userCiAttrJson) {
        if (CommonUtils.isNullOrEmpty(userCiAttrJson)) {
            AbxLog.e("saveUserCiWithAttr() userCiAttrJson is null or empty.", false);
            return;
        }

        try {
            JSONObject jsonObject = new JSONObject(userCiAttrJson);
            AdBrixRm.CiProperties ciProperties = getCiProperties(jsonObject);
            AdBrixRm.saveCiProperties(ciProperties);
        } catch (JSONException e) {
            AbxLog.e("saveUserCiWithAttr() - userCiAttrJson is not fit to jsonobject ", false);
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String parsePushData(ReadableMap pushDataMap) {
        Map<String, String> map = new HashMap<>();
        ReadableMapKeySetIterator iterator = pushDataMap.keySetIterator();
        while (iterator.hasNextKey()) {
           String key = iterator.nextKey();
           String value = pushDataMap.getString(key);
           map.put(key, value);
        }

        return AdBrixRm.parsePushData(map).toString();
    }

    @ReactMethod
    public void openPush(String openPushParamJson) {
        if(CommonUtils.isNullOrEmpty(openPushParamJson)){
            AbxLog.e("openPush() openPushParamJson is empty", false);
            return;
        }

        try {
            JSONObject pushJsonObject = new JSONObject(openPushParamJson);
            AdBrixRm.AbxRemotePushModel abxRemotePushModel = AdbrixUtils.makeAbxRemotePushModel(pushJsonObject);
            AdBrixRm.openPush(abxRemotePushModel);
        } catch (Exception e) {
            AbxLog.e("openPush() - Adbrix push tracking parameters don't exist! ", false);
        }
    }

    @ReactMethod
    public void deleteUserDataAndStopSDK(String userId, Callback onSuccessCallback, Callback onFailCallback) {
        Runnable onSuccessRunnable = new Runnable() {
            @Override
            public void run() {
                if (onSuccessCallback == null) {
                    return;
                }
                onSuccessCallback.invoke("delete User Data And Stpo SDK Success");
            }
        };

        Runnable onFailRunnable = new Runnable() {
            @Override
            public void run() {
                if (onFailCallback == null) {
                    return;
                }
                onFailCallback.invoke("Fail to delete User Data And Stop SDK");
            }
        };

        AdBrixRm.deleteUserDataAndStopSDK(userId, onSuccessRunnable, onFailRunnable);
    }

    @ReactMethod
    public void restartSDK(String userId, Callback onSuccessCallback, Callback onFailCallback) {
        Runnable onSuccessRunnable = new Runnable() {
            @Override
            public void run() {
                if (onSuccessCallback == null) {
                    return;
                }
                onSuccessCallback.invoke("restartSDK() onSuccess");
            }
        };
        Runnable onFailRunnable = new Runnable() {
            @Override
            public void run() {
                if (onFailCallback == null) {
                    return;
                }
                onFailCallback.invoke("restartSDK() onFail");
            }
        };

        AdBrixRm.restartSDK(userId, onSuccessRunnable, onFailRunnable);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getSDKVersion() {
        String sdkVersion = AdBrixRm.SDKVersion();
        return sdkVersion;
    }

    @ReactMethod
    public void getUserId(Callback callback) {
        AdBrixRm.getUserId(new Completion<Result<String>>() {
            @Override
            public void handle(Result<String> stringResult) {
                if (callback == null) {
                    return;
                }
                callback.invoke(stringResult.getOrNull());
            }
        });
    }

    @ReactMethod
    public void fetchActionHistoryByUserId(String token, ReadableArray actionType, Callback callback) {
        if(AdbrixUtils.isNullString(actionType.toString())){
            AbxLog.e("fetchActionHistoryByUserId() actionType is null or empty", false);
            return;
        }

        List<String> actionTypeList = getListFromReadableArray(actionType);

        AdBrixRm.fetchActionHistoryByUserId(token, actionTypeList, new Completion<Result<List<ActionHistory>>>() {
            @Override
            public void handle(Result<List<ActionHistory>> listResult) {
                List<ActionHistory> list = listResult.getOrDefault(new ArrayList<>());
                JSONArray array = new JSONArray();
                for(ActionHistory index: list){
                    if(index == null){
                        continue;
                    }
                    try {
                        array.put(index);
                    } catch (Exception e){
                        AbxLog.e("fetchActionHistoryByUserId() ",e, false);
                    }
                }

                if (callback == null) {
                    return;
                }
                callback.invoke(array.toString());
            }
        });
    }

    @ReactMethod
    public void fetchActionHistoryByAdid(String token, ReadableArray actionType, Callback callback) {
        if(AdbrixUtils.isNullString(actionType.toString())){
            AbxLog.e("fetchActionHistoryByAdid() actionType is null or empty", false);
            return;
        }

        List<String> actionTypeList = getListFromReadableArray(actionType);
        AdBrixRm.fetchActionHistoryByAdid(token, actionTypeList, new Completion<Result<List<ActionHistory>>>() {
            @Override
            public void handle(Result<List<ActionHistory>> listResult) {
                List<ActionHistory> list = listResult.getOrDefault(new ArrayList<>());
                JSONArray array = new JSONArray();
                for(ActionHistory index: list){
                    if(index == null){
                        continue;
                    }
                    try {
                        array.put(index);
                    } catch (Exception e){
                        AbxLog.e("fetchActionHistoryByAdid() ",e, false);
                    }
                }

                if (callback == null) {
                    return;
                }
                callback.invoke(array.toString());
            }
        });
    }

    @ReactMethod
    public void insertPushData(String data) {
        if(AdbrixUtils.isNullString(data)){
            AbxLog.e("insertPushData() data is empty", false);
            return;
        }
        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(data);
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
        if(jsonObject == null){
            AbxLog.e("insertPushData() parsing error", false);
            return;
        }

        Map<String, String> map = getMapFromJSONObject(jsonObject);
        AdBrixRm.insertPushData(map);
    }

    @ReactMethod
    public void getActionHistory(int skip, int limit, ReadableArray actionType, Callback callback) {
        if(AdbrixUtils.isNullString(actionType.toString())){
            AbxLog.e("getActionHistory() actionType is null or empty", false);
            return;
        }

        AdBrixRm.getActionHistory(skip, limit, getListFromReadableArray(actionType), new Completion<Result<List<ActionHistory>>>() {
            @Override
            public void handle(Result<List<ActionHistory>> listResult) {
                List<ActionHistory> list = listResult.getOrDefault(new ArrayList<>());
                JSONArray array = new JSONArray();
                for(ActionHistory index: list){
                    if(index == null){
                        continue;
                    }
                    try {
                        array.put(index);
                    } catch (Exception e){
                        AbxLog.e("getActionHistory() error",e, false);
                    }
                }

                if (callback == null) {
                    return;
                }
                callback.invoke(array.toString());
            }
        });
    }

    @ReactMethod
    public void getAllActionHistory(ReadableArray actionType, Callback callback) {
        if(CommonUtils.isNullOrEmpty(actionType.toString())){
            AbxLog.e("getAllActionHistory() actionType is null or empty", false);
            return;
        }

        AdBrixRm.getAllActionHistory(getListFromReadableArray(actionType), new Completion<Result<List<ActionHistory>>>() {
            @Override
            public void handle(Result<List<ActionHistory>> listResult) {
                List<ActionHistory> list = listResult.getOrDefault(new ArrayList<>());
                JSONArray array = new JSONArray();
                for(ActionHistory index: list){
                    if(index == null){
                        continue;
                    }
                    try {
                        array.put(index);
                    } catch (Exception e){
                        AbxLog.e("getAllActionHistory() error",e, false);
                    }
                }

                if (callback == null) {
                    return;
                }
                callback.invoke(array.toString());
            }
        });
    }

    @ReactMethod
    public void deleteActionHistory(
            String token,
            String historyId,
            String timestamp,
            Callback callback
    ) {
        long time = 0;
        try {
            time = Long.parseLong(timestamp);
        } catch (NumberFormatException e) {
            AbxLog.e("deleteActionHistory : Given time stamp can not covert to Long.", false);
            return;
        }

        AdBrixRm.deleteActionHistory(token, historyId, time, new Completion<Result<Empty>>() {
            @Override
            public void handle(Result<Empty> emptyResult) {
                if (callback == null) {
                    return;
                }
                callback.invoke(emptyResult.toString());
            }
        });
    }

    @ReactMethod
    public void deleteAllActionHistoryByUserId(String token, Callback callback) {
        AdBrixRm.deleteAllActionHistoryByUserId(token, new Completion<Result<Empty>>() {
            @Override
            public void handle(Result<Empty> emptyResult) {
                if (callback == null) {
                    return;
                }
                callback.invoke(emptyResult.toString());
            }
        });
    }

    @ReactMethod
    public void deleteAllActionHistoryByAdid(String token, Callback callback) {
        AdBrixRm.deleteAllActionHistoryByAdid(token, new Completion<Result<Empty>>() {
            @Override
            public void handle(Result<Empty> emptyResult) {
                if (callback == null) {
                    return;
                }
                callback.invoke(emptyResult.toString());
            }
        });
    }

    @ReactMethod
    public void clearSyncedActionHistoryInLocalDB(Callback callback) {
        AdBrixRm.clearSyncedActionHistoryInLocalDB(new Completion<Result<Empty>>() {
            @Override
            public void handle(Result<Empty> emptyResult) {
                if (callback == null) {
                    return;
                }
                callback.invoke(emptyResult.toString());
            }
        });
    }

    @ReactMethod
    public void setInAppMessageFetchMode(int mode) {
        DfnInAppMessageFetchMode dfnInAppMessageFetchMode;
        switch (mode){
            case 0: {
                dfnInAppMessageFetchMode = DfnInAppMessageFetchMode.USER_ID;
                break;
            }
            case 1:{
                dfnInAppMessageFetchMode = DfnInAppMessageFetchMode.ADID;
                break;
            }
            default:{
                dfnInAppMessageFetchMode = DfnInAppMessageFetchMode.USER_ID;
                AbxLog.e("setInAppMessageFetchMode() unknown mode!", false);
                break;
            }
        }

        AdBrixRm.setInAppMessageFetchMode(dfnInAppMessageFetchMode);
    }

    @ReactMethod
    public void setInAppMessageToken(String token) {
        AdBrixRm.setInAppMessageToken(token);
    }

    @ReactMethod
    public void fetchInAppMessage(Callback callback) {
        System.out.println("fetchInAppMessage called");
        AdBrixRm.fetchInAppMessage(new Completion<Result<Empty>>() {
            @Override
            public void handle(Result<Empty> emptyResult) {
                if (callback == null) {
                    return;
                }
                callback.invoke(emptyResult.toString());
            }
        });
    }

    @ReactMethod
    public void getAllInAppMessage(Callback callback) {
        AdBrixRm.getAllInAppMessage(new Completion<Result<List<DfnInAppMessage>>>() {
            @Override
            public void handle(Result<List<DfnInAppMessage>> listResult) {
                List<DfnInAppMessage> list = listResult.getOrDefault(new ArrayList<>());
                JSONArray array = new JSONArray();
                for(DfnInAppMessage index: list){
                    if(index == null){
                        continue;
                    }
                    try {
                        array.put(index);
                    } catch (Exception e){
                        AbxLog.e("getAllInAppMessage() error",e, false);
                    }
                }
                if (callback == null) {
                    return;
                }
                callback.invoke(array.toString());
            }
        });
    }

    @ReactMethod
    public void openInAppMessage(String campaignId, Callback callback) {
        AdBrixRm.openInAppMessage(campaignId, new Completion<Result<Empty>>() {
            @Override
            public void handle(Result<Empty> emptyResult) {
                if (callback == null) {
                    return;
                }
                callback.invoke(emptyResult.toString());
            }
        });
    }

    @ReactMethod
    public void commerceViewHome(String extraAttrJsonString) {
        if (extraAttrJsonString == null) {
            AbxCommerce.viewHome();
            return;
        }
        JSONObject commerceExtraAttributes = null;
        try {
            if (extraAttrJsonString != null && extraAttrJsonString.length() > 0) {
                commerceExtraAttributes = new JSONObject(extraAttrJsonString);
            }
        } catch (JSONException e) {
            AbxLog.e(e, false);
        } finally {
            AbxCommerce.viewHome(AdbrixUtils.makeEventProperties(commerceExtraAttributes));
        }
    }

    @ReactMethod
    public void commerceCategoryView(final String categoryString, final String productListString, final String extraString) {
        try {
            JSONArray categoryArray = new JSONArray();
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(categoryString)) {
                categoryArray = new JSONArray(categoryString);
            }
            if (!AdbrixUtils.isNullString(productListString)) {
                items = new JSONArray(productListString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            AdBrixRm.CommerceCategoriesModel categories = new AdBrixRm.CommerceCategoriesModel();
            for (int i = 0; i < categoryArray.length(); i++) {
                categories.setCategory(categoryArray.getString(i));
            }
            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AbxCommerce.categoryView(categories, products, AdbrixUtils.makeEventProperties(extraAttrs));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commerceProductView(final String productString, final String extraString) {
        try {
            JSONObject product = new JSONObject();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                product = new JSONObject(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            AdBrixRm.CommerceProductModel productModel = AdbrixUtils.makeProductModel(product);
            AbxCommerce.productView(productModel, AdbrixUtils.makeEventProperties(extraAttrs));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commerceAddToCart(final String productString, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                items = new JSONArray(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AbxCommerce.addToCart(products, AdbrixUtils.makeEventProperties(extraAttrs));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commerceAddToWishList(final String productString, final String extraString) {
        try {
            JSONObject product = new JSONObject();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                product = new JSONObject(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            AdBrixRm.CommerceProductModel productModel = AdbrixUtils.makeProductModel(product);
            AbxCommerce.addToWishList(productModel, AdbrixUtils.makeEventProperties(extraAttrs));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commerceReviewOrder(final String orderId, final String productString, final double discount, final double deliveryCharge, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                items = new JSONArray(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AbxCommerce.reviewOrder(orderId, products, discount, deliveryCharge, AdbrixUtils.makeEventProperties(extraAttrs));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commerceRefund(final String orderId, final String productString, final double penaltyCharge, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                items = new JSONArray(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AbxCommerce.refund(orderId, products, penaltyCharge, AdbrixUtils.makeEventProperties(extraAttrs));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }

    }

    @ReactMethod
    public void commerceSearch(final String keyword, final String productString, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                items = new JSONArray(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AbxCommerce.search(keyword, products, AdbrixUtils.makeEventProperties(extraAttrs));

        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commerceShare(final String sharingChannel, final String productString, final String extraString) {
        try {
            JSONObject product = new JSONObject();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                product = new JSONObject(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            AdBrixRm.CommerceProductModel productModel = AdbrixUtils.makeProductModel(product);
            AbxCommerce.share(AdBrixRm.CommerceSharingChannel.getChannelByChannelCode(sharingChannel), productModel, AdbrixUtils.makeEventProperties(extraAttrs));

        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commerceListView(final String productString, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                items = new JSONArray(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AbxCommerce.listView(products, AdbrixUtils.makeEventProperties(extraAttrs));

        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commerceCartView(final String productString, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                items = new JSONArray(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AbxCommerce.cartView(products, AdbrixUtils.makeEventProperties(extraAttrs));

        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }
    //paymentinfo_added
    //

    @ReactMethod
    public void commercePaymentInfoAdded(final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }
            AbxCommerce.paymentInfoAdded(AdbrixUtils.makeEventProperties(extraAttrs));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }


    @ReactMethod
    public void gameTutorialCompleted(final boolean is_skip, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.GameProperties.TutorialComplete gameProperties = new AdBrixRm.GameProperties.TutorialComplete()
                    .setIsSkip(is_skip);
            AbxGame.tutorialComplete(gameProperties.setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs)));

        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void gameLevelAchieved(final int level, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.GameProperties.LevelAchieved gameProperties = new AdBrixRm.GameProperties.LevelAchieved().setLevel(level);
            AbxGame.levelAchieved(gameProperties.setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs)));

        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void gameCharacterCreated(final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.GameProperties.CharacterCreated gameProperties = new AdBrixRm.GameProperties.CharacterCreated();
            AbxGame.characterCreated(gameProperties.setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs)));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }


    @ReactMethod
    public void gameStageCleared(final String stageName, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.GameProperties.StageCleared gameProperties = new AdBrixRm.GameProperties.StageCleared()
                    .setStageName(stageName);
            AbxGame.stageCleared(gameProperties.setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs)));
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    /* Common */


    @ReactMethod
    public void commonPurchase(final String orderID, final String productString, final double discount, final double deliveryCharge, final String paymentMethod, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(productString)) {
                items = new JSONArray(productString);
            }
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AdBrixRm.CommonProperties.Purchase purchaseEventProperties = new AdBrixRm.CommonProperties.Purchase()
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));
            AbxCommon.purchase(orderID, products, discount, deliveryCharge, AdBrixRm.CommercePaymentMethod.getMethodByMethodCode(paymentMethod), purchaseEventProperties);

        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commonSignUp(final String channelName, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.CommonProperties.SignUp properties = new AdBrixRm.CommonProperties.SignUp()
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));
            AbxCommon.signUp(AdBrixRm.CommonSignUpChannel.getChannelByChannelCode(channelName), properties);
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commonUseCredit(final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.CommonProperties.UseCredit properties = new AdBrixRm.CommonProperties.UseCredit()
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));

            AbxCommon.useCredit(properties);
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commonAppUpdate(final String prev_ver, final String curr_ver, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.CommonProperties.AppUpdate properties = new AdBrixRm.CommonProperties.AppUpdate()
                    .setPrevVersion(prev_ver)
                    .setCurrVersion(curr_ver)
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));
            AbxCommon.appUpdate(properties);
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    @ReactMethod
    public void commonInvite(final String channelName, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if (!AdbrixUtils.isNullString(extraString)) {
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.CommonProperties.Invite properties = new AdBrixRm.CommonProperties.Invite()
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));
            AbxCommon.invite(AdBrixRm.CommonInviteChannel.getChannelByChannelCode(channelName), properties);
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
    }

    // ******************** For v1 backward compatibility only. Please use new API *********************
    @ReactMethod
    public void startAdbrixSDK(String appKey, String secretKey) {

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

    private Map<String, String> getMapFromJSONObject(JSONObject object) {
        Map<String, String> map = new HashMap<>();
        Iterator<String> keysItr = object.keys();
        try {
            while (keysItr.hasNext()) {
                String key = keysItr.next();
                String value = object.getString(key);
                map.put(key, value);
            }
        } catch (JSONException e) {
            AbxLog.e(e, true);
        }
        return map;
    }

    private List<String> getListFromReadableArray(ReadableArray readableArray) {
        List<String> actionTypeList = new ArrayList<>();
        for (Object o : readableArray.toArrayList()) {
            actionTypeList.add(o.toString());
        }

        return actionTypeList;
    }

    public List<AdBrixRm.CommerceProductModel> getCommerceProductModelListByJsonString(String dataJsonString) {
        try {
            JSONArray root = new JSONArray(dataJsonString);

            if (root.length() < 1) {
                Log.e("abxrm", "commerceV2PlugIn error : No purhcase item.");
                return null;
            }

            ArrayList<AdBrixRm.CommerceProductModel> items = new ArrayList<AdBrixRm.CommerceProductModel>();

            for (int i = 0; i < root.length(); i++) {
                try {
                    JSONObject item = root.getJSONObject(i);
                    AdBrixRm.CommerceProductModel pItem = new AdBrixRm.CommerceProductModel();

                    if (item.has("productId")) {
                        Log.i("abxrm", "Productname is " + item.getString("productId"));
                        pItem.setProductID(item.getString("productId"));
                    } else {
                        throw new Exception("No productId attribute.");
                    }
                    if (item.has("productName")) {
                        pItem.setProductName(item.getString("productName"));
                    } else {
                        throw new Exception("No productName attribute.");
                    }
                    if (item.has("price")) {
                        pItem.setPrice(Double.parseDouble(item.getString("price")));
                    } else {
                        throw new Exception("No price attribute.");
                    }
                    if (item.has("discount")) {
                        pItem.setDiscount(Double.parseDouble(item.getString("discount")));
                    } else {
                        throw new Exception("No discount attribute.");
                    }
                    if (item.has("quantity")) {
                        pItem.setQuantity(Integer.parseInt(item.getString("quantity")));
                    } else {
                        throw new Exception("No quantity attribute.");
                    }
                    if (item.has("currency")) {
                        pItem.setCurrency(AdBrixRm.Currency.getCurrencyByCurrencyCode(item.getString("currency")));
                    } else {
                        throw new Exception("No currency attribute.");
                    }
                    if (item.has("category")) {
                        String[] categories = new String[5];
                        String[] temp = item.getString("category") != null ? item.getString("category").split("\\.") : new String[0];

                        for (int j = 0; j < temp.length; j++) {
                            categories[j] = temp[j];
                        }

                        AdBrixRm.CommerceCategoriesModel categoriesModel = new AdBrixRm.CommerceCategoriesModel();

                        if (categories.length == 1) categoriesModel.setCategory(categories[0]);
                        else if (categories.length == 2)
                            categoriesModel.setCategory(categories[0]).setCategory(categories[1]);
                        else if (categories.length == 3)
                            categoriesModel.setCategory(categories[0]).setCategory(categories[1]).setCategory(categories[2]);
                        else if (categories.length == 4)
                            categoriesModel.setCategory(categories[0]).setCategory(categories[1]).setCategory(categories[2]).setCategory(categories[3]);
                        else if (categories.length == 5)
                            categoriesModel.setCategory(categories[0]).setCategory(categories[1]).setCategory(categories[2]).setCategory(categories[3]).setCategory(categories[4]);
                        pItem.setCategory(categoriesModel);
                    } else {
                        throw new Exception("No category attribute.");
                    }
                    if (item.has("extra_attrs")) {
                        final JSONObject subItem = item.getJSONObject("extra_attrs");
                        JSONObject attrs = new JSONObject();
                        Iterator<?> keys = subItem.keys();

                        while (keys.hasNext()) {
                            String key = (String) keys.next();
                            String value = subItem.getString(key);
                            attrs.put(key, value);
                        }
                        pItem.setAttrModel(getAttrModelFromMap(attrs));
                    } else {
                        throw new Exception("No extra_attrs attribute.");
                    }
                    items.add(pItem);
                } catch (Exception e) {
                    Log.e("abxrm", "purchase error : invalid item = " + dataJsonString);
                }
            }
            return items;
        } catch (JSONException e) {
            AbxLog.e(e, false);
        }
        return null;
    }

    private AdBrixRm.AttrModel getAttrModelFromMap(String jsonString) {
        AdBrixRm.AttrModel result = new AdBrixRm.AttrModel();
        if (CommonUtils.isNullOrEmpty(jsonString)){
            return result;
        }
        JSONObject jsonObject = null;
        try {
            jsonObject = new JSONObject(jsonString);
        } catch (JSONException e) {

        }
        if(jsonObject == null){
            return result;
        }
        return getAttrModelFromMap(jsonObject);
    }

    private static AdBrixRm.AttrModel getAttrModelFromMap(JSONObject jsonObject) {
        AdBrixRm.AttrModel result = new AdBrixRm.AttrModel();
        if(jsonObject == null){
            return result;
        }
        Iterator<String> keys = jsonObject.keys();

        while(keys.hasNext()) {
            String key = keys.next();

            try {
                result.setAttrs(key, jsonObject.get(key));
            } catch (JSONException e) {

            }
        }
        return result;
    }

    public AdBrixRm.CiProperties getCiProperties(JSONObject jsonObject) {
        AdBrixRm.CiProperties ciProperties = new AdBrixRm.CiProperties();
        if (jsonObject == null) {
            return ciProperties;
        }

        Iterator<String> keys = jsonObject.keys();
        while (keys.hasNext()) {
            String key = keys.next();

            try {
                ciProperties.setAttrs(key, jsonObject.get(key));
            } catch (JSONException e) {
                AbxLog.w(e, false);
            }
        }

        return ciProperties;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> map = new HashMap<>();
        map.put(DfnCallbackConstants.DEEP_LINK_LISTENER_CALLBACK, DfnCallbackConstants.DEEP_LINK_LISTENER_CALLBACK);
        map.put(DfnCallbackConstants.DEFERRED_LINK_LISTENER_CALLBACK, DfnCallbackConstants.DEFERRED_LINK_LISTENER_CALLBACK);
        map.put(DfnCallbackConstants.REMOTE_PUSH_MESSAGE_CALLBACK, DfnCallbackConstants.REMOTE_PUSH_MESSAGE_CALLBACK);
        map.put(DfnCallbackConstants.IN_APP_MESSAGE_CLICK_CALLBACK, DfnCallbackConstants.IN_APP_MESSAGE_CLICK_CALLBACK);
        map.put(DfnCallbackConstants.IN_APP_MESSAGE_AUTO_FETCH_CALLBACK, DfnCallbackConstants.IN_APP_MESSAGE_AUTO_FETCH_CALLBACK);
        map.put(DfnCallbackConstants.LOG_LISTENER_CALLBACK, DfnCallbackConstants.LOG_LISTENER_CALLBACK);
        return map;
    }
}
