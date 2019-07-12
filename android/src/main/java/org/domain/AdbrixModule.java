package com.test02;

import android.util.Log;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.igaworks.v2.core.AdBrixRm;
import com.igaworks.v2.core.application.AbxActivityHelper;
import com.igaworks.v2.core.utils.common.CommonUtils;
import com.igaworks.v2.core.utils.common.IgawConstant;
import com.igaworks.v2.core.utils.common.IgawLogger;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Nonnull;
import javax.annotation.RegEx;

public class AdbrixModule extends ReactContextBaseJavaModule implements AdBrixRm.DeferredDeeplinkListener {

    private final ReactApplicationContext mContext;

    public AdbrixModule(@Nonnull final ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;

    }

    @Nonnull
    @Override
    public String getName() {
        return "AdbrixRm";
    }

    @ReactMethod
    public void nativeHongLog(String msg){
        Log.d("HONG", msg);
    }

    @ReactMethod
    public void startAdbrixSDK(String appKey, String secretKey) {
        AbxActivityHelper.initializeSdk(mContext, appKey, secretKey);
        AdBrixRm.setDeferredDeeplinkListener(this);
        registerLifeCycle();
    }

    public void registerLifeCycle() {
        mContext.addLifecycleEventListener(new LifecycleEventListener() {
            @Override
            public void onHostResume() {
                AbxActivityHelper.onResume(mContext.getCurrentActivity());
                AdBrixRm.deeplinkEvent(mContext.getCurrentActivity());
            }

            @Override
            public void onHostPause() {
                Log.d("HONG", "------------------------------------------------------");
                Log.d("HONG", "onHostPause!!!!!!!!!!");
                Log.d("HONG", "------------------------------------------------------");
                AbxActivityHelper.onPause(mContext.getCurrentActivity());
            }

            @Override
            public void onHostDestroy() {

                Log.d("HONG", "------------------------------------------------------");
                Log.d("HONG", "onHostDestroyed!!!!!!!!!!");
                Log.d("HONG", "------------------------------------------------------");

            }
        });
            
    }

    @ReactMethod
    public void gdprForgetMe() {
        AdBrixRm.gdprForgetMe(mContext);
    }

    @ReactMethod
    public void setDeviceId(String deviceId) {
        AdBrixRm.setCustomDeviceId(deviceId);
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
    public void setLogLevel(int logLevel) {
        switch (logLevel) {
            case 0:
                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.NONE);
                break;
            case 1:
                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.VERBOSE);
                break;
            case 2:
                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.DEBUG);
                break;
            case 3:
                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.INFO);
                break;
            case 4:
                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.WARNING);
                break;
            case 5:
                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.ERROR);
                break;
            default:
                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.VERBOSE);
                break;

        }
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
            case IgawConstant.EVENT_UPLOAD_MAX_BATCH_SIZE:
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
    public void setEnableLocationListening(boolean option) {
        AdBrixRm.setEnableLocationListening(option);
    }

    @ReactMethod
    public void setLocation(double lat, double lon) {
        AdBrixRm.setLocation(lat, lon);
    }

    @ReactMethod
    public void setUserPropertiesInt(String key, int value) {
        AdBrixRm.UserProperties userProperties = new AdBrixRm.UserProperties();
        userProperties.setAttrs(key, value);
        AdBrixRm.saveUserProperties(userProperties);
    }
    @ReactMethod
    public void setUserPropertiesLong(String key, String value) {
        AdBrixRm.UserProperties userProperties = new AdBrixRm.UserProperties();
        userProperties.setAttrs(key, AdbrixUtils.castStringToLong(value));
        AdBrixRm.saveUserProperties(userProperties);
    }
    @ReactMethod
    public void setUserPropertiesDouble(String key, double value) {
        AdBrixRm.UserProperties userProperties = new AdBrixRm.UserProperties();
        userProperties.setAttrs(key, value);
        AdBrixRm.saveUserProperties(userProperties);
    }

    @ReactMethod
    public void setUserPropertiesBoolean(String key, boolean value) {
        AdBrixRm.UserProperties userProperties = new AdBrixRm.UserProperties();
        userProperties.setAttrs(key, value);
        AdBrixRm.saveUserProperties(userProperties);
    }

    @ReactMethod
    public void setUserPropertiesString(String key, String value) {
        AdBrixRm.UserProperties userProperties = new AdBrixRm.UserProperties();
        userProperties.setAttrs(key, value);
        AdBrixRm.saveUserProperties(userProperties);
    }

    @ReactMethod
    public void event(String eventName, String paramJson) {
        if (CommonUtils.isEmptyString(paramJson)){
            AdBrixRm.event(eventName);
            return;
        }
        try {
            AdBrixRm.event(eventName, new JSONObject(paramJson));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void login(String userId) {
        AdBrixRm.login(userId);
    }

    @ReactMethod
    public void commerceViewHome(String extraAttrJsonString) {
        if(extraAttrJsonString == null){
            AdBrixRm.Commerce.viewHome();
            return;
        }
        JSONObject commerceExtraAttributes = null;
        try {
            if (extraAttrJsonString != null && extraAttrJsonString.length() > 0) {
                commerceExtraAttributes = new JSONObject(extraAttrJsonString);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        } finally {
            AdBrixRm.Commerce.viewHome(commerceExtraAttributes);
        }
    }

    @ReactMethod
    public void commerceCategoryView(final String categoryString, final String productListString, final String extraString) {
        try {
            JSONArray categoryArray = new JSONArray();
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(categoryString)){
                categoryArray = new JSONArray(categoryString);
            }
            if(!AdbrixUtils.isNullString(productListString)){
                items = new JSONArray(productListString);
            }
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }

            AdBrixRm.CommerceCategoriesModel categories = new AdBrixRm.CommerceCategoriesModel();
            for(int i=0; i<categoryArray.length();i++){
                categories.setCategory(categoryArray.getString(i));
            }
            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AdBrixRm.Commerce.categoryView(categories, products, extraAttrs);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
   @ReactMethod
    public void commerceProductView(final String productString, final String extraString) {
       try {
           JSONObject product = new JSONObject();
           JSONObject extraAttrs = new JSONObject();
           if(!AdbrixUtils.isNullString(productString)){
               product = new JSONObject(productString);
           }
           if(!AdbrixUtils.isNullString(extraString)){
               extraAttrs = new JSONObject(extraString);
           }

           AdBrixRm.CommerceProductModel productModel = AdbrixUtils.makeProductModel(product);
           AdBrixRm.Commerce.productView(productModel, extraAttrs);

       } catch (JSONException e) {
           e.printStackTrace();
       }
    }

    @ReactMethod
    public void commerceAddToCart(final String productString, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(productString)){
                items = new JSONArray(productString);
            }
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AdBrixRm.Commerce.addToCart(products, extraAttrs);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void commerceAddToWishList(final String productString, final String extraString) {
        try {
            JSONObject product = new JSONObject();
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(productString)){
                product = new JSONObject(productString);
            }
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }

            AdBrixRm.CommerceProductModel productModel = AdbrixUtils.makeProductModel(product);
            AdBrixRm.Commerce.addToWishList(productModel, extraAttrs);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void commerceReviewOrder(final String orderId, final String productString, final double discount, final double deliveryCharge, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(productString)){
                items = new JSONArray(productString);
            }
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AdBrixRm.Commerce.reviewOrder(orderId, products, discount, deliveryCharge, extraAttrs);


        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void commerceRefund(final String orderId, final String productString, final double penaltyCharge, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(productString)){
                items = new JSONArray(productString);
            }
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AdBrixRm.Commerce.refund(orderId, products, penaltyCharge, extraAttrs);

        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    @ReactMethod
    public void commerceSearch(final String keyword, final String productString, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(productString)){
                items = new JSONArray(productString);
            }
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AdBrixRm.Commerce.search(keyword,products,extraAttrs);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

   @ReactMethod
    public void commerceShare(final String sharingChannel, final String productString, final String extraString) {
       try {
           JSONObject product = new JSONObject();
           JSONObject extraAttrs = new JSONObject();
           if(!AdbrixUtils.isNullString(productString)){
               product = new JSONObject(productString);
           }
           if(!AdbrixUtils.isNullString(extraString)){
               extraAttrs = new JSONObject(extraString);
           }

           AdBrixRm.CommerceProductModel productModel = AdbrixUtils.makeProductModel(product);
           AdBrixRm.Commerce.share(AdBrixRm.CommerceSharingChannel.getChannelByChannelCode(sharingChannel),productModel, extraAttrs);

       } catch (JSONException e) {
           e.printStackTrace();
       }
    }

    @ReactMethod
    public void commerceListView(final String productString, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(productString)){
                items = new JSONArray(productString);
            }
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AdBrixRm.Commerce.listView(products,extraAttrs);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void commerceCartView(final String productString, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(productString)){
                items = new JSONArray(productString);
            }
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AdBrixRm.Commerce.cartView(products,extraAttrs);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }
    //paymentinfo_added
    //

    @ReactMethod
    public void commercePaymentInfoAdded(final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.Commerce.paymentInfoAdded(extraAttrs);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void gameTutorialCompleted(final boolean is_skip, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.GameProperties.TutorialComplete gameProperties = new AdBrixRm.GameProperties.TutorialComplete()
                    .setIsSkip(is_skip);
            AdBrixRm.Game.tutorialComplete(gameProperties.setProperties(extraAttrs));

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void gameLevelAchieved(final int level, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.GameProperties.LevelAchieved gameProperties = new AdBrixRm.GameProperties.LevelAchieved().setLevel(level);
            AdBrixRm.Game.levelAchieved(gameProperties.setProperties(extraAttrs));

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void gameCharacterCreated(final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.GameProperties.CharacterCreated gameProperties = new AdBrixRm.GameProperties.CharacterCreated();
            AdBrixRm.Game.characterCreated(gameProperties.setProperties(extraAttrs));
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void gameStageCleared(final String stageName, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.GameProperties.StageCleared gameProperties = new AdBrixRm.GameProperties.StageCleared()
                    .setStageName(stageName);
            AdBrixRm.Game.stageCleared(gameProperties.setProperties(extraAttrs));

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /* Common */


    @ReactMethod
    public void commonPurchase(final String orderID, final String productString, final double discount, final double deliveryCharge, final String paymentMethod, final String extraString) {
        try {
            JSONArray items = new JSONArray();
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(productString)){
                items = new JSONArray(productString);
            }
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }

            List<AdBrixRm.CommerceProductModel> products = AdbrixUtils.makeProductList(items);
            AdBrixRm.Common.purchase(orderID, products, discount, deliveryCharge, AdBrixRm.CommercePaymentMethod.getMethodByMethodCode(paymentMethod), extraAttrs);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void commonSignUp(final String channelName, final String extraString) {
        try {
            JSONObject extraAttrs = new JSONObject();
            if(!AdbrixUtils.isNullString(extraString)){
                extraAttrs = new JSONObject(extraString);
            }
            AdBrixRm.CommonProperties.SignUp properties = new AdBrixRm.CommonProperties.SignUp()
                    .setProperties(extraAttrs);
            AdBrixRm.Common.signUp(AdBrixRm.CommonSignUpChannel.getChannelByChannelCode(channelName), properties);
        } catch (JSONException e) {
            e.printStackTrace();
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
                    .setProperties(extraAttrs);

            AdBrixRm.Common.useCredit(properties);
        } catch (JSONException e) {
            e.printStackTrace();
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
                    .setProperties(extraAttrs);
            AdBrixRm.Common.appUpdate(properties);
        } catch (JSONException e) {
            e.printStackTrace();
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
                    .setProperties(extraAttrs);
            AdBrixRm.Common.invite(AdBrixRm.CommonInviteChannel.getChannelByChannelCode(channelName), properties);
        } catch (JSONException e) {
            e.printStackTrace();
        }
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
    public void setAppScanEnable(boolean enable){
                AdBrixRm.setAppScanEnable(enable);
    }

    @Override
    public void onReceiveDeferredDeeplink(String deeplink) {
        Log.d("HONG", "Receive deferred: "+deeplink);
        mContext.getJSModule(RCTNativeAppEventEmitter.class).emit("AdbrixDeferredDeeplinkListener", deeplink);
    }
}
