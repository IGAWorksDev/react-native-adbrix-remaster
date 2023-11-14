package io.adbrix.reactnative;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.firebase.messaging.RemoteMessage;
import com.igaworks.v2.core.AbxCommon;
import com.igaworks.v2.core.AdBrixRm;
import com.igaworks.v2.core.AdBrixRm.UserProperties;
import com.igaworks.v2.core.AdBrixRm.AttrModel;
import com.igaworks.v2.core.AdBrixRm.InAppMessageClickListener;
import com.igaworks.v2.core.application.AbxActivityHelper;
import com.igaworks.v2.core.result.GetSubscriptionStatusResult;
import com.igaworks.v2.core.result.OnDeeplinkResult;
import com.igaworks.v2.core.result.OnDeferredDeeplinkResult;
import com.igaworks.v2.core.result.OnRemotePushClickResult;
import com.igaworks.v2.core.result.SetCiProfileResult;
import com.igaworks.v2.core.result.SetSubscriptionStatusResult;
import io.adbrix.sdk.domain.model.SubscriptionStatus;


public class AdbrixRmModuleImpl {

    private static final AdbrixRmModuleImpl instance = new AdbrixRmModuleImpl();

    private static final String LISTENER_DEEPLINK = "dfn_deeplink_listener";
    private static final String LISTENER_DEFERRED_DEEPLINK = "dfn_deferred_deeplink_listener";
    private static final String LISTENER_IAM_CLICK = "dfn_inappmessage_click_listener";
    private static final String LISTENER_REMOTE_NOTIFICATION = "dfn_remote_notification_listener";

    public static final String NAME = "ReactAdbrixBridge";

    private String initialDeeplink;
    private String initialDeferredDeeplink;
    private String initialRemoteNotification;

    private boolean isDeeplinkEmitterReady = false;
    private boolean isDeferredDeeplinkEmitterReady = false;
    private boolean isRemoteEmitterReady = false;
    private boolean isInAppMessageClickEmitterReady = false;

    private ReactApplicationContext reactContext;

    private AdbrixRmModuleImpl() {
    }

    static AdbrixRmModuleImpl shared() {
        return instance;
    }

    public void sdkInit(Application application, String appKey, String secretKey) {
        AbxActivityHelper.initializeSdk(application, appKey, secretKey);
        
        setDeeplinkListener();
        setDeferredDeeplinkListener();
        setRemoteNotificationClickListener();
        setInAppMessageClickListener();
    }

    public void deeplinkEvent(Activity deeplinkActivity) {
        AdBrixRm.deeplinkEvent(deeplinkActivity);
    }

    public void onResume(Activity activity) {
        AdBrixRm.onResume(activity);
    }

    public void onMessageReceived(Context context, RemoteMessage remoteMessage) {
        AdBrixRm.onMessageReceived(context, remoteMessage);
    }

    public void setRegistrationId(String token) {
        AdBrixRm.setRegistrationId(token);
    }

    public void setPushIconStyle(Context context, String smallIconName, String largeIconName, int argb) {
        AdBrixRm.setPushIconStyle(context, smallIconName, largeIconName, argb);
    }

    public void setReactContext(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    private void setDeeplinkListener() {
        AdBrixRm.setOnDeeplinkListener(new AdBrixRm.onDeeplinkListener() {
            @Override
            public void onReceive(OnDeeplinkResult onDeeplinkResult) {
                String deeplink = onDeeplinkResult.getDeeplink();
                WritableMap data = Arguments.createMap();
                data.putString("deeplink", deeplink);

                if (isDeeplinkEmitterReady) {
                    sendEvent(reactContext, LISTENER_DEEPLINK, data);
                } else {
                    initialDeeplink = deeplink;
                }
            }
        });
    }
    private void setDeferredDeeplinkListener() {
        AdBrixRm.setOnDeferredDeeplinkListener(new AdBrixRm.onDeferredDeeplinkListener() {
            @Override
            public void onReceive(OnDeferredDeeplinkResult onDeferredDeeplinkResult) {
                String deeplink = onDeferredDeeplinkResult.getDeeplink();
                WritableMap data = Arguments.createMap();
                data.putString("deeplink", deeplink);

                if (isDeferredDeeplinkEmitterReady) {
                    sendEvent(reactContext, LISTENER_DEFERRED_DEEPLINK, data);
                } else {
                    initialDeferredDeeplink = deeplink;
                }
            }
        });
    }

    private void setInAppMessageClickListener() {
        AdBrixRm.setInAppMessageClickListener(new InAppMessageClickListener() {
            @Override
            public void onReceiveInAppMessageClick(String s, String s1, String s2, boolean b) {
                WritableMap data = Arguments.createMap();
                data.putString("actionId", s);
                data.putString("actionType", s1);
                data.putString("actionArg", s2);
                data.putBoolean("isClosed", b);

                if (isInAppMessageClickEmitterReady) {
                    sendEvent(reactContext, LISTENER_IAM_CLICK, data);
                }
                if (isDeeplinkEmitterReady) {
                    if (s1.equals("deeplink") || s1.equals("deeplink_and_close")) {
                        WritableMap deeplink = Arguments.createMap();
                        deeplink.putString("deeplink", s2);
                        sendEvent(reactContext, LISTENER_DEEPLINK, deeplink);
                    }
                }
            }
        });
    }

    private void setRemoteNotificationClickListener() {
        AdBrixRm.setOnRemotePushClickListener(new AdBrixRm.onRemotePushClickListener() {
            @Override
            public void onClick(OnRemotePushClickResult onRemotePushClickResult) {
                String remoteNotificationData = onRemotePushClickResult.getDeeplink();
                if (remoteNotificationData == null) {
                    remoteNotificationData = "";
                }
                WritableMap data = Arguments.createMap();
                data.putString("pushData", remoteNotificationData);

                if (isRemoteEmitterReady) {
                    sendEvent(reactContext, LISTENER_REMOTE_NOTIFICATION, data);
                } else {
                    initialRemoteNotification = remoteNotificationData;
                }
            }
        });
    }

    public void addListener(String eventType) {
        switch (eventType) {
            case LISTENER_DEEPLINK:
                if (initialDeeplink != null) {
                    WritableMap data = Arguments.createMap();
                    data.putString("deeplink", initialDeeplink);
                    sendEvent(reactContext, LISTENER_DEEPLINK, data);
                    initialDeeplink = null;
                }
                isDeeplinkEmitterReady = true;
                break;
            case LISTENER_DEFERRED_DEEPLINK:
                if (initialDeferredDeeplink != null) {
                    WritableMap data = Arguments.createMap();
                    data.putString("deeplink", initialDeferredDeeplink);
                    sendEvent(reactContext, LISTENER_DEFERRED_DEEPLINK, data);
                    initialDeferredDeeplink = null;
                }
                isDeferredDeeplinkEmitterReady = true;
                break;
            case LISTENER_IAM_CLICK:
                isInAppMessageClickEmitterReady = true;
                break;
            case LISTENER_REMOTE_NOTIFICATION:
                if (initialRemoteNotification != null) {
                    WritableMap data = Arguments.createMap();
                    data.putString("pushData", initialRemoteNotification);
                    sendEvent(reactContext, LISTENER_REMOTE_NOTIFICATION, data);
                    initialRemoteNotification = null;
                }
                isRemoteEmitterReady = true;
                break;
        }
    }

    public void removeListeners() {
        isDeeplinkEmitterReady = false;
        isDeferredDeeplinkEmitterReady = false;
        isInAppMessageClickEmitterReady = false;
        isRemoteEmitterReady = false;
    }

    private void sendEvent(
            ReactContext reactContext,
            String eventName,
            @Nullable WritableMap params) {

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


    public void setPushEnable(boolean isEnabled) {
        AdBrixRm.setPushEnable(isEnabled);
    }

    public void setSubscriptionStatus(final ReadableMap status, Promise promise) {
        SubscriptionStatus subscriptionStatus = AbxUtil.buildSubscriptionStatusWith(status);
        AdBrixRm.setSubscriptionStatus(subscriptionStatus, new AdBrixRm.SetSubscriptionStatusCallback() {
            @Override
            public void onCallback(SetSubscriptionStatusResult result) {
                if(result.isSuccess()) {
                    promise.resolve("success");
                } else {
                    promise.reject("event_failure", result.getResultMessage());
                }
            }
        });
    }

    public void getSubscriptionStatus(Promise promise) {
        AdBrixRm.getSubscriptionStatus(new AdBrixRm.GetSubscriptionStatusCallback() {
            @Override
            public void onCallback(GetSubscriptionStatusResult result) {
                if (result.isSuccess()) {
                    WritableMap obj = AbxUtil.getSubsResultToWritableMap(result);
                    promise.resolve(obj);
                } else {
                    promise.reject("event_failure", result.getResultMessage());
                }
            }
        });
    }

    public void setKakaoId(final String kakaoId, Promise promise) {
        AdBrixRm.setKakaoId(kakaoId, new AdBrixRm.SetCiProfileCallback() {
            @Override
            public void onCallback(SetCiProfileResult result) {
                if(result.isSuccess()) {
                    promise.resolve("success");
                } else {
                    promise.reject("event_failure", result.getResultMessage());
                }
            }
        });
    }

    public void setPhoneNumber(String number, Promise promise) {
        AdBrixRm.setPhoneNumber(number, new AdBrixRm.SetCiProfileCallback() {
            @Override
            public void onCallback(SetCiProfileResult result) {
                if(result.isSuccess()) {
                    promise.resolve("success");
                } else {
                    promise.reject("event_failure", result.getResultMessage());
                }
            }
        });
    }

    public void createNotificationChannel(String channelName, String channelDescription) {
        AdBrixRm.createDefaultNotificationChannel(channelName, channelDescription);
    }

    public void minus(double a, double b, Promise promise) {
        promise.resolve(a - b);
    }

    // #region - UserProperty
    public void login(final String userId) {
        AdBrixRm.login(userId);
    }

    public void logout() {
        AdBrixRm.logout();
    }

    public void setAge(final double age) {
        AdBrixRm.setAge(AbxUtil.doubleToInt(age));
    }

    public void setGender(final double gender) {
        switch (AbxUtil.doubleToInt(gender)) {
            case 1:
                AdBrixRm.setGender(AdBrixRm.AbxGender.FEMALE);
                break;
            case 2:
                AdBrixRm.setGender(AdBrixRm.AbxGender.MALE);
                break;
            default:
                AdBrixRm.setGender(AdBrixRm.AbxGender.UNKNOWN);
                break;
        }
    }

    public void saveUserProperties(final ReadableMap userPropertyObj) {
        UserProperties userProperties = AbxUtil.convertMapToUserProperties(userPropertyObj);
        AdBrixRm.saveUserProperties(userProperties);
    }
    // #endregion

    // #region - Event

    public void event(final String eventName, final ReadableMap attr) {
        AttrModel attrModel = AbxUtil.convertMapToAttr(attr);
        AdBrixRm.event(eventName, attrModel);
    }

    public void commonSignUp(final String channel, final ReadableMap attr) {
        AdBrixRm.CommonProperties.SignUp signUpInfo = new AdBrixRm.CommonProperties.SignUp()
                .setAttrModel(AbxUtil.convertMapToAttr(attr));

        AbxCommon.signUp(AdBrixRm.CommonSignUpChannel.getChannelByChannelCode(channel), signUpInfo);
    }

    public void commonAppUpdate(final String prev, final String curr, final ReadableMap attr) {
        AttrModel attrModel = AbxUtil.convertMapToAttr(attr);
        AdBrixRm.CommonProperties.AppUpdate updateInfo = new AdBrixRm.CommonProperties.AppUpdate()
                .setPrevVersion(prev)
                .setCurrVersion(curr)
                .setAttrModel(attrModel);

        AbxCommon.appUpdate(updateInfo);
    }

    public void commonInvite(final String channel, final ReadableMap attr) {
        AttrModel attrModel = AbxUtil.convertMapToAttr(attr);

        AdBrixRm.CommonProperties.Invite inviteInfo = new AdBrixRm.CommonProperties.Invite()
                .setAttrModel(attrModel);

        AbxCommon.invite(AdBrixRm.CommonInviteChannel.getChannelByChannelCode(channel), inviteInfo);
    }

    public void commonUseCredit(final ReadableMap attr) {
        AttrModel attrModel = AbxUtil.convertMapToAttr(attr);

        AdBrixRm.CommonProperties.UseCredit useCreditInfo = new AdBrixRm.CommonProperties.UseCredit()
                .setAttrModel(attrModel);

        AbxCommon.useCredit(useCreditInfo);
    }

    public void commonPurchase(
            final String orderId,
            final ReadableArray productList,
            final double orderSales,
            final double discount,
            final double deliveryCharge,
            final String paymentMethod,
            final ReadableMap attr) {

        AdBrixRm.CommonProperties.Purchase purchaseInfo = new AdBrixRm.CommonProperties.Purchase()
                .setAttrModel(AbxUtil.convertMapToAttr(attr));

        AbxCommon.purchase(orderId,
                AbxUtil.convertArrayToCommerceProductModelList(productList),
                orderSales,
                discount,
                deliveryCharge,
                AdBrixRm.CommercePaymentMethod.getMethodByMethodCode(paymentMethod),
                purchaseInfo);

    }

    public void commerceViewHome(final ReadableMap attr) {
        AdBrixRm.Commerce.viewHome(AbxUtil.convertMapToAttr(attr));
    }

    public void commerceCategoryView(
            final ReadableArray category,
            final ReadableArray productList,
            final ReadableMap attr) {

        AdBrixRm.Commerce.categoryView(
                AbxUtil.convertReadableArrayToCategoryModel(category),
                AbxUtil.convertArrayToCommerceProductModelList(productList),
                AbxUtil.convertMapToAttr(attr));

    }

    public void commerceProductView(
            final ReadableMap productInfo,
            final ReadableMap attr) {

        AdBrixRm.Commerce.productView(
                AbxUtil.convertMapToProductModel(productInfo),
                AbxUtil.convertMapToAttr(attr));
    }

    public void commerceAddToCart(
            final ReadableArray productList,
            final ReadableMap attr) {

        AdBrixRm.Commerce.addToCart(
                AbxUtil.convertArrayToCommerceProductModelList(productList),
                AbxUtil.convertMapToAttr(attr));
    }

    public void commerceAddToWishList(
            final ReadableMap productInfo,
            final ReadableMap attr) {

        AdBrixRm.Commerce.addToWishList(
                AbxUtil.convertMapToProductModel(productInfo),
                AbxUtil.convertMapToAttr(attr));
    }

    public void commerceReviewOrder(
            final String orderId,
            final ReadableArray productList,
            final double discount,
            final double deliveryCharge,
            final ReadableMap attr) {

        AdBrixRm.Commerce.reviewOrder(
                orderId,
                AbxUtil.convertArrayToCommerceProductModelList(productList),
                discount,
                deliveryCharge,
                AbxUtil.convertMapToAttr(attr));
    }

    public void commerceRefund(
            final String orderId,
            final ReadableArray productList,
            final double penaltyCharge,
            final ReadableMap attr) {

        AdBrixRm.Commerce.refund(
                orderId,
                AbxUtil.convertArrayToCommerceProductModelList(productList),
                penaltyCharge,
                AbxUtil.convertMapToAttr(attr));
    }

    public void commerceSearch(
            final String keyword,
            final ReadableArray productList,
            final ReadableMap attr) {

        AdBrixRm.Commerce.search(
                keyword,
                AbxUtil.convertArrayToCommerceProductModelList(productList),
                AbxUtil.convertMapToAttr(attr));
    }

    public void commerceShare(
            final String channel,
            final ReadableMap productInfo,
            final ReadableMap attr) {

        AdBrixRm.Commerce.share(
                AdBrixRm.CommerceSharingChannel.getChannelByChannelCode(channel),
                AbxUtil.convertMapToProductModel(productInfo),
                AbxUtil.convertMapToAttr(attr));
    }

    public void commerceListView(
            final ReadableArray productList,
            final ReadableMap attr) {

        AdBrixRm.Commerce.listView(
                AbxUtil.convertArrayToCommerceProductModelList(productList),
                AbxUtil.convertMapToAttr(attr));
    }

    public void commerceCartView(
            final ReadableArray productList,
            final ReadableMap attr) {

        AdBrixRm.Commerce.cartView(
                AbxUtil.convertArrayToCommerceProductModelList(productList),
                AbxUtil.convertMapToAttr(attr));
    }

    public void commercePaymentInfoAdded(
            final ReadableMap attr) {

        AdBrixRm.Commerce.paymentInfoAdded(
                AbxUtil.convertMapToAttr(attr));

    }

    // #endregion
    // #region - Game
    public void gameTutorialCompleted(
            final boolean isSkip,
            final ReadableMap attr) {

        AdBrixRm.GameProperties.TutorialComplete gameProp = new AdBrixRm.GameProperties.TutorialComplete()
                .setIsSkip(isSkip)
                .setAttrModel(
                        AbxUtil.convertMapToAttr(attr));

        AdBrixRm.Game.tutorialComplete(gameProp);
    }

    public void gameCharacterCreated(
            final ReadableMap attr) {

        AdBrixRm.GameProperties.CharacterCreated gameProp = new AdBrixRm.GameProperties.CharacterCreated()
                .setAttrModel(
                        AbxUtil.convertMapToAttr(attr));

        AdBrixRm.Game.characterCreated(gameProp);
    }

    public void gameStageCleared(
            final String stageName,
            final ReadableMap attr) {

        AdBrixRm.GameProperties.StageCleared gameProp = new AdBrixRm.GameProperties.StageCleared()
                .setStageName(stageName)
                .setAttrModel(
                        AbxUtil.convertMapToAttr(attr));

        AdBrixRm.Game.stageCleared(gameProp);
    }

    public void gameLevelAchieved(
            final double level,
            final ReadableMap attr) {

        AdBrixRm.GameProperties.LevelAchieved gameProp = new AdBrixRm.GameProperties.LevelAchieved()
                .setLevel(AbxUtil.doubleToInt(level))
                .setAttrModel(
                        AbxUtil.convertMapToAttr(attr));

        AdBrixRm.Game.levelAchieved(gameProp);
    }
    // #endregion

    // #region - Util
    public void gdprForgetMe(Context context) {
        AdBrixRm.gdprForgetMe(context);
    }

    public void setEventUploadCountInterval(double interval) {
        AdBrixRm.setEventUploadCountInterval(AdBrixRm.AdBrixEventUploadCountInterval.getValueByInt((int) interval));
    }

    public void setEventUploadTimeInterval(double interval) {
        AdBrixRm.setEventUploadTimeInterval(AdBrixRm.AdBrixEventUploadTimeInterval.getValueByInt((int) interval));
    }

    // #endregion
    // #endregion

}