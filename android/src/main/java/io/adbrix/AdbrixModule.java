package io.adbrix;

import android.util.Log;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.igaworks.v2.core.AdBrixRm;
import com.igaworks.v2.core.application.AbxActivityHelper;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

import javax.annotation.Nonnull;

// Version 2 note: 20210707
// Remove startAdbrixSDK API, add new initRNAdbrixSDK_v2 API
// startAdbrixSDK (v1): Move to native android code. This part needs low level integration with android platform
// Use React Native Linking class instead. https://reactnative.dev/docs/linking

@ReactModule(name = AdbrixModule.NAME)
public class AdbrixModule extends ReactContextBaseJavaModule implements AdBrixRm.DeferredDeeplinkListener{

    private final ReactApplicationContext mContext;
    public static final String NAME = "AdbrixRm";

    public AdbrixModule(@Nonnull final ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void initRNAdbrixSDK_v2(){
        AdBrixRm.setDeferredDeeplinkListener(this);
    }


    @ReactMethod
    public void gdprForgetMe() {
        AdBrixRm.gdprForgetMe(mContext);
    }

    // Yen 20210709
    @ReactMethod
    public void setDeviceId(String deviceId) {
//        AdBrixRm.setCustomDeviceId(deviceId);
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
    // Yen 20210709
//     @ReactMetho   public void setLogLevel(int logLevel) {
//        switch (logLevel) {
//            case 0:
//                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.NONE);
//                break;
//            case 1:
//                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.VERBOSE);
//                break;
//            case 2:
//                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.DEBUG);
//                break;
//            case 3:
//                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.INFO);
//                break;
//            case 4:
//                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.WARNING);
//                break;
//            case 5:
//                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.ERROR);
//                break;
//            default:
//                AdBrixRm.setLogLevel(AdBrixRm.AdBrixLogLevel.VERBOSE);
//                break;
//
//        }
//    }

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
    public void setEnableLocationListening(boolean option) {
        AdBrixRm.setEnableLocationListening(option);
    }

    @ReactMethod
    public void setLocation(double lat, double lon) {
        AdBrixRm.setLocation(lat, lon);
    }

    @ReactMethod
    public void setUserProperties(String jsonString){
        JSONObject userPropertiesJSON = new JSONObject();
        try {
            if(!AdbrixUtils.isNullString(jsonString)) {
                userPropertiesJSON = new JSONObject(jsonString);
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        AdBrixRm.UserProperties userProperties = AdbrixUtils.makeUserProperties(userPropertiesJSON);
        AdBrixRm.saveUserProperties(userProperties);
    }
    //Yen 20210709 Public to private
//    @ReactMethod
//    public void clearUserProperties(){
//        AdBrixRm.clearUserProperties();
//    }

    @ReactMethod
    public void event(String eventName, String paramJson) {
        if (AdbrixUtils.isNullString(paramJson)){
            AdBrixRm.event(eventName);
        }
        else {
            try {
                JSONObject attrmodel = new JSONObject(paramJson);

                AdBrixRm.event(eventName, AdbrixUtils.makeEventProperties(attrmodel));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    @ReactMethod
    public void login(String userId) {
        AdBrixRm.login(userId);
    }

    @ReactMethod
    public void logout() {
        AdBrixRm.logout();
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
            AdBrixRm.Commerce.viewHome(AdbrixUtils.makeEventProperties(commerceExtraAttributes));
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
            AdBrixRm.Commerce.categoryView(categories, products, AdbrixUtils.makeEventProperties(extraAttrs));

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
            AdBrixRm.Commerce.productView(productModel, AdbrixUtils.makeEventProperties(extraAttrs));

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
            AdBrixRm.Commerce.addToCart(products, AdbrixUtils.makeEventProperties(extraAttrs));

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
            AdBrixRm.Commerce.addToWishList(productModel, AdbrixUtils.makeEventProperties(extraAttrs));

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
            AdBrixRm.Commerce.reviewOrder(orderId, products, discount, deliveryCharge, AdbrixUtils.makeEventProperties(extraAttrs));


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
            AdBrixRm.Commerce.refund(orderId, products, penaltyCharge, AdbrixUtils.makeEventProperties(extraAttrs));

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
            AdBrixRm.Commerce.search(keyword,products, AdbrixUtils.makeEventProperties(extraAttrs));

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
            AdBrixRm.Commerce.share(AdBrixRm.CommerceSharingChannel.getChannelByChannelCode(sharingChannel),productModel,  AdbrixUtils.makeEventProperties(extraAttrs));

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
            AdBrixRm.Commerce.listView(products, AdbrixUtils.makeEventProperties(extraAttrs));

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
            AdBrixRm.Commerce.cartView(products, AdbrixUtils.makeEventProperties(extraAttrs));

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
            AdBrixRm.Commerce.paymentInfoAdded(AdbrixUtils.makeEventProperties(extraAttrs));
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
            AdBrixRm.Game.tutorialComplete(gameProperties.setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs)));

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
            AdBrixRm.Game.levelAchieved(gameProperties.setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs)));

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
            AdBrixRm.Game.characterCreated(gameProperties.setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs)));
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
            AdBrixRm.Game.stageCleared(gameProperties.setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs)));

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
            AdBrixRm.CommonProperties.Purchase purchaseEventProperties = new AdBrixRm.CommonProperties.Purchase()
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));
            AdBrixRm.Common.purchase(orderID, products, discount, deliveryCharge, AdBrixRm.CommercePaymentMethod.getMethodByMethodCode(paymentMethod), purchaseEventProperties);

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
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));
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
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));

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
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));
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
                    .setAttrModel(AdbrixUtils.makeEventProperties(extraAttrs));
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
        mContext.getJSModule(RCTNativeAppEventEmitter.class).emit("AdbrixDeferredDeeplinkListener", deeplink);
    }
    // Yen 20210709 Use React Native Linking class instead. https://reactnative.dev/docs/linking
//    @Override
//    public void onReceiveDeeplink(String deeplink) {
//        mContext.getJSModule(RCTNativeAppEventEmitter.class).emit("AdbrixDeeplinkListener", deeplink);
//    }
}
