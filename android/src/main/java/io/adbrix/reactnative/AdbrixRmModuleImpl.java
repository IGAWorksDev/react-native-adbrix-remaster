package io.adbrix.reactnative;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.igaworks.v2.core.AbxCommerce;
import com.igaworks.v2.core.AbxCommon;
import com.igaworks.v2.core.AdBrixRm;
import com.igaworks.v2.core.AdBrixRm.UserProperties;
import com.igaworks.v2.core.AdBrixRm.AttrModel;
import com.igaworks.v2.core.AdBrixRm.DeferredDeeplinkListener;
import com.igaworks.v2.core.AdBrixRm.DeeplinkListener;
import com.igaworks.v2.core.AdBrixRm.InAppMessageClickListener;
import com.igaworks.v2.core.result.GetSubscriptionStatusResult;
import com.igaworks.v2.core.result.SetCiProfileResult;
import com.igaworks.v2.core.result.SetSubscriptionStatusResult;
import io.adbrix.sdk.domain.model.SubscriptionStatus;


import io.adbrix.reactnative.AdbrixRmModule;

public class AdbrixRmModuleImpl implements DeferredDeeplinkListener, InAppMessageClickListener {

    private static final AdbrixRmModuleImpl instance = new AdbrixRmModuleImpl();

    private AdbrixRmModuleImpl() {
    }

    public static AdbrixRmModuleImpl shared() {
        return instance;
    }

    private DeeplinkCallback deeplinkCallback;
    private IAMClickCallback iamClickCallback;
    private String deeplink;
    private boolean hasListener = false;

    @Override
    public void onReceiveDeferredDeeplink(String uriStr) {
        if (hasListener) {
            if (deeplinkCallback != null) {
                deeplinkCallback.onDeeplinkOccurred(uriStr);
            }
        } else {
            this.deeplink = uriStr;
        }
    }

    @Override
    public void onReceiveInAppMessageClick(String actionId, String actionType, String actionArg, boolean isClosed) {
        if (hasListener) {
            if (iamClickCallback != null) {
                iamClickCallback.onIAMClickOccurred(actionId, actionType, actionArg, isClosed);
            }
        }
    }

    public void onReceiveDeeplink(String deeplink) {
        if (hasListener) {
            if (deeplinkCallback != null) {
                deeplinkCallback.onDeeplinkOccurred(deeplink);
            }
        } else {
            this.deeplink = deeplink;
        }
    }

    public void setDeeplinkListener(DeeplinkCallback callback) {
        this.deeplinkCallback = callback;
        if (deeplink != null) {
            if (deeplinkCallback != null) {
                deeplinkCallback.onDeeplinkOccurred(deeplink);
                deeplink = null;
            }
        }

    }

    public void setIAMClickListener(IAMClickCallback callback) {
        this.iamClickCallback = callback;
    }

    public void addAllListener() {
        hasListener = true;
        AdBrixRm.setDeferredDeeplinkListener(instance);
        AdBrixRm.setInAppMessageClickListener(instance);
    }

    public void removeAllListener() {
        hasListener = false;
        AdBrixRm.setDeferredDeeplinkListener(null);
        AdBrixRm.setInAppMessageClickListener(null);
        deeplinkCallback = null;
        iamClickCallback = null;
    }

    public static final String NAME = "ReactAdbrixBridge";

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