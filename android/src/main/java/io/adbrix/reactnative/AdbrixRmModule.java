package io.adbrix.reactnative;

import androidx.annotation.Nullable;
import java.util.Map;
import java.util.HashMap;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class AdbrixRmModule extends ReactContextBaseJavaModule {

    private AdbrixRmModuleImpl impl;

    ReactApplicationContext reactContext;

    AdbrixRmModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        impl = AdbrixRmModuleImpl.shared();
    }

    @Override
    public String getName() {
        return AdbrixRmModuleImpl.NAME;
    }

    @ReactMethod
    public void minus(double a, double b, Promise promise) {
        impl.minus(a, b, promise);
    }

    @ReactMethod
    public void setPushEnable(boolean isEnabled) {
        impl.setPushEnable(isEnabled);
    }

    @ReactMethod
    public void setSubscriptionStatus(ReadableMap status, Promise promise) {
        impl.setSubscriptionStatus(status, promise);
    }

    @ReactMethod
    public void getSubscriptionStatus(Promise promise) {
        impl.getSubscriptionStatus(promise);
    }

    @ReactMethod
    public void setKakaoId(String kakaoId, Promise promise) {
        impl.setKakaoId(kakaoId, promise);
    }

    @ReactMethod
    public void setPhoneNumber(String number, Promise promise) {
        impl.setPhoneNumber(number, promise);
    }

    @ReactMethod
    public void createNotificationChannel(String channelName, String channelDescription) {
        impl.createNotificationChannel(channelName, channelDescription);
    }

    private void sendEvent(
            ReactContext reactContext,
            String eventName,
            @Nullable WritableMap params) {

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private int listenerCount = 0;

    @ReactMethod
    public void addListener(String eventType) {
        if (listenerCount == 0) {
            impl.addAllListener();
            impl.setDeeplinkListener(new DeeplinkCallback() {
                @Override
                public void onDeeplinkOccurred(String deeplink) {
                    WritableMap data = Arguments.createMap();
                    data.putString("deeplink", deeplink);

                    sendEvent(reactContext, SupportedEvent.DEEPLINK.getValue(), data);
                }
            });

            impl.setIAMClickListener(new IAMClickCallback() {
                @Override
                public void onIAMClickOccurred(String actionId, String actionType, String actionArg, boolean isClosed) {
                    WritableMap data = Arguments.createMap();
                    data.putString("actionId", actionId);
                    data.putString("actionType", actionType);
                    data.putString("actionArg", actionArg);
                    data.putBoolean("isClosed", isClosed);

                    sendEvent(reactContext, SupportedEvent.IAMCLICK.getValue(), data);
                }
            });
        }
        listenerCount += 1;
    }

    @ReactMethod
    public void removeListeners(double number) {
        listenerCount -= 1;
        if (listenerCount == 0) {
            impl.removeAllListener();
        }
    }

    // #region - UserProperty
    @ReactMethod
    public void login(final String userId) {
        impl.login(userId);
    }

    @ReactMethod
    public void logout() {
        impl.logout();
    }

    @ReactMethod
    public void setAge(final double age) {
        impl.setAge(age);
    }

    @ReactMethod
    public void setGender(final double gender) {
        impl.setGender(gender);
    }

    @ReactMethod
    public void saveUserProperties(final ReadableMap userProperty) {
        impl.saveUserProperties(userProperty);
    }
    // #endregion

    // #region - Event
    @ReactMethod
    public void event(final String eventName, final ReadableMap attr) {
        impl.event(eventName, attr);
    }

    @ReactMethod
    public void commonSignUp(final String channel, final ReadableMap attr) {
        impl.commonSignUp(channel, attr);
    }

    @ReactMethod
    public void commonAppUpdate(
            final String prev,
            final String curr,
            final ReadableMap attr) {
        impl.commonAppUpdate(prev, curr, attr);
    }

    @ReactMethod
    public void commonInvite(final String channel, final ReadableMap attr) {
        impl.commonInvite(channel, attr);
    }

    @ReactMethod
    public void commonUseCredit(final ReadableMap attr) {
        impl.commonUseCredit(attr);
    }

    @ReactMethod
    public void commonPurchase(
            final String orderId,
            final ReadableArray productList,
            final double orderSales,
            final double discount,
            final double deliveryCharge,
            final String paymentMethod,
            final ReadableMap attr) {

        impl.commonPurchase(orderId,
                productList,
                orderSales,
                discount,
                deliveryCharge,
                paymentMethod,
                attr);
    }

    // #region - Commerce
    @ReactMethod
    public void commerceViewHome(final ReadableMap attr) {
        impl.commerceViewHome(attr);
    }

    @ReactMethod
    public void commerceCategoryView(
            final ReadableArray category,
            final ReadableArray productList,
            final ReadableMap attr) {
        impl.commerceCategoryView(category, productList, attr);
    }

    @ReactMethod
    public void commerceProductView(
            final ReadableMap productInfo,
            final ReadableMap attr) {
        impl.commerceProductView(productInfo, attr);
    }

    @ReactMethod
    public void commerceAddToCart(
            final ReadableArray productList,
            final ReadableMap attr) {
        impl.commerceAddToCart(productList, attr);
    }

    @ReactMethod
    public void commerceAddToWishList(
            final ReadableMap productInfo,
            final ReadableMap attr) {
        impl.commerceAddToWishList(productInfo, attr);
    }

    @ReactMethod
    public void commerceReviewOrder(
            final String orderId,
            final ReadableArray productList,
            final double discount,
            final double deliveryCharge,
            final ReadableMap attr) {
        impl.commerceReviewOrder(orderId, productList, discount, deliveryCharge, attr);
    }

    @ReactMethod
    public void commerceRefund(
            final String orderId,
            final ReadableArray productList,
            final double penaltyCharge,
            final ReadableMap attr) {
        impl.commerceRefund(orderId, productList, penaltyCharge, attr);
    }

    @ReactMethod
    public void commerceSearch(
            final String keyword,
            final ReadableArray productList,
            final ReadableMap attr) {
        impl.commerceSearch(keyword, productList, attr);
    }

    @ReactMethod
    public void commerceShare(
            final String channel,
            final ReadableMap productInfo,
            final ReadableMap attr) {
        impl.commerceShare(channel, productInfo, attr);
    }

    @ReactMethod
    public void commerceListView(
            final ReadableArray productList,
            final ReadableMap attr) {
        impl.commerceListView(productList, attr);
    }

    @ReactMethod
    public void commerceCartView(
            final ReadableArray productList,
            final ReadableMap attr) {
        impl.commerceCartView(productList, attr);
    }

    @ReactMethod
    public void commercePaymentInfoAdded(
            final ReadableMap attr) {
        impl.commercePaymentInfoAdded(attr);
    }

    // #endregion
    // #region - Game
    @ReactMethod
    public void gameTutorialCompleted(
            final boolean isSkip,
            final ReadableMap attr) {
        impl.gameTutorialCompleted(isSkip, attr);
    }

    @ReactMethod
    public void gameCharacterCreated(
            final ReadableMap attr) {
        impl.gameCharacterCreated(attr);
    }

    @ReactMethod
    public void gameStageCleared(
            final String stageName,
            final ReadableMap attr) {
        impl.gameStageCleared(stageName, attr);
    }

    @ReactMethod
    public void gameLevelAchieved(
            final double level,
            final ReadableMap attr) {
        impl.gameLevelAchieved(level, attr);
    }
    // #endregion

    // #region - Util
    @ReactMethod
    public void gdprForgetMe() {
        impl.gdprForgetMe(reactContext);
    }

    @ReactMethod
    public void setEventUploadCountInterval(final double interval) {
        impl.setEventUploadCountInterval(interval);
    }

    @ReactMethod
    public void setEventUploadTimeInterval(final double interval) {
        impl.setEventUploadTimeInterval(interval);
    }
    // #endregion



    // #endregion

}
