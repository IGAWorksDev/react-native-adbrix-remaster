/**
 * @format
 */
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const AdbrixRmReact = new EventEmitter();

const { AdbrixRm } = NativeModules;

const AdbrixRmCallBack = new NativeEventEmitter(NativeModules.AdbrixRm);

// model
var deferredDeeplinkListener = null;
var deeplinkListener = null;
var localPushMessageListener = null;
var remoteMessageListener = null;
var inAppMessageClickListener = null;
var dfnInAppMessageAutoFetchListener = null;
var logListener = null;

AdbrixRmReact.UserProperties = class {
    constructor() {
        this.obj = {};
    }
    setProperty = (key, value) => {
        this.obj[key] = value;
    }
    getProperties = () => {
        return this.obj;
    }
}

AdbrixRmReact.AttrModel = class {
    constructor() {
        this.obj = {};
    }

    setAttrs = (key, value) => {
        this.obj[key] = value;
    }

    getAttrs = () => {
        return this.obj;
    }
}
AdbrixRmReact.CategoryModel = class {
    constructor() {
        this.categories = [];
    }

    setCategory = (category) => {
        this.categories.push(category);
    }
    getCategory = () => {
        return this.categories;
    }
}
AdbrixRmReact.ProductModel = class {
    constructor() {
        this.obj = {};
    }

    setProductId = (productId) => {
        this.obj["productId"] = productId;
    }
    setProductName = (productName) => {
        this.obj["productName"] = productName;
    }
    setPrice = (price) => {
        this.obj["price"] = price;
    }
    setQuantity = (quantity) => {
        this.obj["quantity"] = quantity;
    }
    setCurreny = (currency) => {
        this.obj["currency"] = currency;
    }
    setCategory = (category) => {
        var categoryArray = Object.assign(AdbrixRmReact.CategoryModel, category);
        this.obj["category"] = category.getCategory();
    }
    setDiscount = (discount) => {
        this.obj["discount"] = discount;
    }
    getProductModel = () => {
        return this.obj;
    }

}

AdbrixRmReact.ProductModelList = class {
    constructor() {
        this.list = [];
    }

    setProduct = (product) => {
        var productElement = Object.assign(AdbrixRmReact.ProductModel, product);
        this.list.push(productElement.getProductModel());
    }
    getProductList = () => {
        return this.list;
    }
}
AdbrixRmReact.AbxPushModel = class {
    constructor() {
        this.obj = {};
    }

    setTitle = (title) => {
        this.obj['title'] = title;
    }
    setBody = (body) => {
        this.obj['body'] = body;
    }
    setSummaryText = (summaryText) => {
        this.obj['summaryText'] = summaryText;
    }
    setImageUrl = (imageUrl) => {
        this.obj['imageUrl'] = imageUrl;
    }
    setLargeIconUrl = (largeIconUrl) => {
        this.obj['large_icon'] = largeIconUrl;
    }
    setWhileRun = (whileRun) => {
        this.obj['while_run'] = whileRun;
    }

    setDeepLinkUrl = (deepLinkUrl) => {
        this.obj['deep_link_url'] = deepLinkUrl;
    }

    setCampaignId = (campaignId) => {
        this.obj['abx:gf:campaign_id'] = campaignId;
    }
    setCampaignRevisionNo = (campaignRevisionNo) => {
        this.obj['abx:gf:campaign_revision_no'] = campaignRevisionNo;
    }
    setStepId = (stepId) => {
        this.obj['abx:gf:step_id'] = stepId;
    }
    setCycleTime = (cycleTime) => {
        this.obj['abx:gf:cycle_time'] = cycleTime;
    }
    setNotifiactionId = (notificationId) => {
        this.obj['notificationId'] = notificationId;
    }

    getAbxPushModel = () => {
        return this.obj;
    }
}

AdbrixRmReact.PushPropertiesModel = class PushPropertiesModel {
    constructor() {
        this.obj = {};
    }

    setSecond = (second) => {
        this.obj['second'] = second;
    }

    setEventId = (eventId) => {
        this.obj['eventId'] = eventId;
    }

    setContentText = (contentText) => {
        this.obj['contentText'] = contentText;
    }

    setSummaryText = (summaryText) => {
        this.obj['summaryText'] = summaryText;
    }

    setBigContentTitle = (bigContentTitle) => {
        this.obj['bigContentTitle'] = bigContentTitle;
    }

    setTitle = (title) => {
        this.obj['title'] = title;
    }

    setDeepLinkUri = (deepLinkUri) => {
        this.obj['deepLinkUri'] = deepLinkUri;
    }

    getPushProperties = () => {
        return this.obj;
    }
}

AdbrixRmReact.BigTextPushPropertiesModel = class BigTextPushPropertiesModel extends AdbrixRmReact.PushPropertiesModel {
    constructor() {
        super();
    }
    
    setBigText = (bigText) => {
        this.obj['bigText'] = bigText;
    }

    getBigTextPushPropertiesModel = () => {
        return this.obj;
    }
}

AdbrixRmReact.BigPicturePushPropertiesModel = class BigPicturePushPropertiesModel extends AdbrixRmReact.PushPropertiesModel {
    constructor() {
        super();
    }

    setBigPictureUrl = (bigPictureUrl) => {
        this.obj['bigPictureUrl'] = bigPictureUrl;
    }

    setResourceId = (resourceId) => {
        this.obj['resourceId'] = resourceId;
    }
    
    getBigPicturePushPropertiesModel = () => {
        return this.obj;
    }
}

AdbrixRmReact.testDictionary = (attr) => {
    AdbrixRm.testDictionary(assignAttrModel(attr));
}

//V2 API
AdbrixRmReact.gdprForgetMe = () => {
    return AdbrixRm.gdprForgetMe();
}
AdbrixRmReact.setAge = (age) => {
    return AdbrixRm.setAge(age);
}
AdbrixRmReact.setGender = (gender) => {
    return AdbrixRm.setGender(gender);
}
AdbrixRmReact.setLogLevel = (logLevel) => {
    return AdbrixRm.setLogLevel(logLevel);
}
AdbrixRmReact.setEventUploadCountInterval = (interval) => {
    return AdbrixRm.setEventUploadCountInterval(interval);
}
AdbrixRmReact.setEventUploadTimeInterval = (interval) => {
    return AdbrixRm.setEventUploadCountInterval(interval);
}
AdbrixRmReact.setEnableLocationListening = (option) => {
    return AdbrixRm.setEnableLocationListening(option);
}
AdbrixRmReact.setLocation = (lat, lon) => {
    return AdbrixRm.setLocation(lat, lon);
}
AdbrixRmReact.setUserProperties = (userProperties) => {
    return AdbrixRm.setUserProperties(assignUserProperties(userProperties));
}
AdbrixRmReact.clearUserProperties = () => {
    return AdbrixRm.clearUserProperties();
}
AdbrixRmReact.event = (eventName, attrs) => {
    AdbrixRm.event(eventName, assignAttrModel(attrs));
}
AdbrixRmReact.login = (userId) => {
    return AdbrixRm.login(userId);
}
AdbrixRmReact.logout = () => {
    return AdbrixRm.logout();
}
AdbrixRmReact.commerceViewHome = (attrs) => {
    if (attrs == null) return AdbrixRm.commerceViewHome(null);
    else return AdbrixRm.commerceViewHome(JSON.stringify(attrs));
}
//array, jsonArray, json
AdbrixRmReact.commerceCategoryView = (category, productList, extraAttrs) => {
    return AdbrixRm.commerceCategoryView(assignCategoryModel(category), assignProductModelList(productList), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceProductView = (product, extraAttrs) => {
    return AdbrixRm.commerceProductView(assignProductModel(product), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceAddToCart = (productList, extraAttrs) => {
    return AdbrixRm.commerceAddToCart(assignProductModelList(productList), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceAddToWishList = (product, extraAttrs) => {
    return AdbrixRm.commerceAddToWishList(assignProductModel(product), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceReviewOrder = (orderId, productList, discount, deliveryCharge, extraAttrs) => {
    return AdbrixRm.commerceReviewOrder(orderId, assignProductModelList(productList), discount, deliveryCharge, assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceRefund = (orderId, productList, penaltyCharge, extraAttrs) => {
    return AdbrixRm.commerceRefund(orderId, assignProductModelList(productList), penaltyCharge, assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceSearch = (keyWord, productList, extraAttrs) => {
    return AdbrixRm.commerceSearch(keyWord, assignProductModelList(productList), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceShare = (sharingChannel, productModel, extraAttrs) => {
    return AdbrixRm.commerceShare(sharingChannel, assignProductModel(productModel), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceListView = (productList, extratAttrs) => {
    return AdbrixRm.commerceListView(assignProductModelList(productList), assignAttrModel(extratAttrs));
}
AdbrixRmReact.commerceCartView = (productList, extraAttrs) => {
    return AdbrixRm.commerceCartView(assignProductModelList(productList), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commercePaymentInfoAdded = (extraAttrs) => {
    return AdbrixRm.commercePaymentInfoAdded(assignAttrModel(extraAttrs));
}
AdbrixRmReact.gameTutorialCompleted = (isSkip, extraAttrs) => {
    return AdbrixRm.gameTutorialCompleted(isSkip, assignAttrModel(extraAttrs));
}
AdbrixRmReact.gameLevelAchieved = (level, extraAttrs) => {
    return AdbrixRm.gameLevelAchieved(level, assignAttrModel(extraAttrs));
}
AdbrixRmReact.gameCharacterCreated = (extraAttrs) => {
    return AdbrixRm.gameCharacterCreated(assignAttrModel(extraAttrs));
}
AdbrixRmReact.gameStageCleared = (stageName, extraAttrs) => {
    return AdbrixRm.gameStageCleared(stageName, assignAttrModel(extraAttrs));
}
//string, string, double, double, string, string
AdbrixRmReact.commonPurchase = (orderId, productList, discount, deliveryCharge, paymentMethod, extraAttrs) => {
    return AdbrixRm.commonPurchase(orderId, assignProductModelList(productList), discount, deliveryCharge, paymentMethod, assignAttrModel(extraAttrs));
}
AdbrixRmReact.commonSignUp = (channelName, extraAttrs) => {
    return AdbrixRm.commonSignUp(channelName, assignAttrModel(extraAttrs));
}
AdbrixRmReact.commonUseCredit = (extraAttrs) => {
    return AdbrixRm.commonUseCredit(assignAttrModel(extraAttrs));
}
AdbrixRmReact.commonAppUpdate = (prevVer, currentVer, extraAttrs) => {
    return AdbrixRm.commonAppUpdate(prevVer, currentVer, assignAttrModel(extraAttrs));
}
AdbrixRmReact.commonInvite = (channelName, extraAttrs) => {
    return AdbrixRm.commonInvite(channelName, assignAttrModel(extraAttrs));
}
AdbrixRmReact.setPushEnable = (enable) => {
    return AdbrixRm.setPushEnable(enable);
}
AdbrixRmReact.setRegistrationId = (token) => {
    return AdbrixRm.setRegistrationId(token);
}

// [s] local Push
// aos only
AdbrixRmReact.setBigTextClientPushEvent = (bigTextPushProperties, alwaysIsShown) => {
    if (Platform.OS == 'android') {
        AdbrixRm.setBigTextClientPushEvent(assignBigTextPushProperties(bigTextPushProperties), alwaysIsShown);
    }
}
// aos only
AdbrixRmReact.setBigPictureClientPushEvent = (bigPicturePushProperties, alwaysIsShown) => {
    if (Platform.OS == 'android') {
        AdbrixRm.setBigPictureClientPushEvent(assignBigPicturePushProperties(bigPicturePushProperties), alwaysIsShown);
    }
}

// ios only
AdbrixRmReact.registerLocalPushNotification = () => {
    if (Platform.OS == 'ios') {
        AdbrixRm.registerLocalPushNotification();
    }
}

// aos only
AdbrixRmReact.cancelClientPushEvent = (eventId) => {
    if (Platform.OS == 'android') {
        AdbrixRm.cancelClientPushEvent(eventId);
    }
}

// both
AdbrixRmReact.cancelLocalPushNotification = (eventId) => {
    AdbrixRm.cancelLocalPushNotification(eventId);
}

// both
AdbrixRmReact.cancelLocalPushNotificationAll = () => {
    AdbrixRm.cancelLocalPushNotificationAll();
}

// aos only
AdbrixRmReact.getPushEventList = () => {
    if (Platform.OS == 'android') {
        return AdbrixRm.getPushEventList();
    }
}

// both
AdbrixRmReact.getRegisteredLocalPushNotification = () => {
    return AdbrixRm.getRegisteredLocalPushNotification();
}

// Aos Only
AdbrixRmReact.setPushIconStyle = (smallIconName, largeIconName, argb) => {
    if (Platform.OS == 'android') {
        AdbrixRm.setPushIconStyle(smallIconName, largeIconName, argb);
    }
}

// Aos only
AdbrixRmReact.setNotificationOption = (priority, visibility) => {
    if (Platform.OS == 'android') {
        AdbrixRm.setNotificationOption(priority, visibility);
    }
}

// Aos Only
AdbrixRmReact.setNotificationChannel = (channelName, channelDescription, importance, vibrateEnable) => {
    if (Platform.OS == 'android') {
        AdbrixRm.setNotificationChannel(channelName, channelDescription, importance, vibrateEnable);    
    }
}
// [e] local push

AdbrixRmReact.setUserProperties = (userProperties) => {
    return AdbrixRm.setUserProperties(assignUserProperties(userProperties));
}

// 현재 추가 중인 메소드들
AdbrixRmReact.openPush = (pushModel) => {
    console.log("indexjs : open push")
    return AdbrixRm.openPush(assignAbxRemotePushModel(pushModel));
}

AdbrixRmReact.deleteUserDataAndStopSDK = (userId, onSuccessCallbak, onFailCallback) => {
    AdbrixRm.deleteUserDataAndStopSDK(userId, onSuccessCallbak, onFailCallback);
}

AdbrixRmReact.restartSDK = (userId, onSuccessCallbak, onFailCallback) => {
    AdbrixRm.restartSDK(userId, onSuccessCallbak, onFailCallback);
}

AdbrixRmReact.disableSDK = (disableReason) => {
    AdbrixRm.disableSDK(disableReason);
}

AdbrixRmReact.getSDKVersion = () => {
    return AdbrixRm.getSDKVersion();
}

AdbrixRmReact.fetchActionHistoryByUserId = (userId, actionType, callback) => {
    AdbrixRm.fetchActionHistoryByUserId(userId, actionType, callback);
}

AdbrixRmReact.fetchActionHistoryByAdid = (token, actionType, callback) => {
    AdbrixRm.fetchActionHistoryByAdid(token, actionType, callback);
}

AdbrixRmReact.insertPushData = (data) => {
    AdbrixRm.insertPushData(data);
}

AdbrixRmReact.getActionHistory = (skip, limit, actionType, callback) => {
    AdbrixRm.getActionHistory(skip, limit, actionType, callback);
}

AdbrixRmReact.getAllActionHistory = (actionType, callback) => {
    AdbrixRm.getAllActionHistory(actionType, callback);
}

AdbrixRmReact.deleteActionHistory = (token, historyId, timestamp, callback) => {
    AdbrixRm.deleteActionHistory(token, historyId, timestamp, callback);
}

AdbrixRmReact.deleteAllActionHistoryByUserId = (token, callback) => {
    AdbrixRm.deleteAllActionHistoryByUserId(token, callback);
}

AdbrixRmReact.deleteAllActionHistoryByAdid = (token, callback) => {
    AdbrixRm.deleteAllActionHistoryByAdid(token, callback);
}

AdbrixRmReact.clearSyncedActionHistoryInLocalDB = (callback) => {
    AdbrixRm.clearSyncedActionHistoryInLocalDB(callback);
}

AdbrixRmReact.fetchInAppMessage = (callback) => {
    AdbrixRm.fetchInAppMessage(callback);
}

AdbrixRmReact.getAllInAppMessage = (callback) => {
    AdbrixRm.getAllInAppMessage(callback);
}

AdbrixRmReact.openInAppMessage = (campaignId, callback) => {
    AdbrixRm.openInAppMessage(campaignId, callback);
}

AdbrixRmReact.flushAllEvents = (callback) => {
    AdbrixRm.flushAllEvents(callback);
}

/*
 Android Only
 */
AdbrixRmReact.setAppScanEnable = (enable) => {
    return AdbrixRm.setAppScanEnable(enable);
}
AdbrixRmReact.deepLinkEvent = () => {
    return AdbrixRm.deepLinkEvent();
}

function isDouble(value) {
    var temp = value.toString();
    if (temp.indexOf('.') == -1) {
        return false;
    } else {
        return true;
    }
}

function assignUserProperties(userProperties) {
    if (userProperties == null) return null;
    else {
        let userPropertyObject = Object.assign(AdbrixRmReact.UserProperties, userProperties);
        return JSON.stringify(userPropertyObject.getProperties());
    }
}
function assignAttrModel(attrs) {
    if (attrs == null) return null;
    else {
        let attrModel = Object.assign(AdbrixRmReact.AttrModel, attrs);
        return JSON.stringify(attrModel.getAttrs());
    }
}

function assignCategoryModel(categoryModel) {
    if (categoryModel == null) return null;
    else {
        let categories = Object.assign(AdbrixRmReact.CategoryModel, categoryModel);
        return JSON.stringify(categories.getCategory());
    }
}

function assignBigTextPushProperties(bigTextPushPropertiesModel) {
    if (bigTextPushPropertiesModel == null) return null;
    else {
        let bigTextPushProperties = Object.assign(AdbrixRmReact.BigTextPushPropertiesModel, bigTextPushPropertiesModel);
        return JSON.stringify(bigTextPushProperties.getBigTextPushPropertiesModel());
    }
}

function assignBigPicturePushProperties(bigPicturePushPropertiesModel) {
    if (bigPicturePushPropertiesModel == null) return;
    else {
        let bigPicturePushProperties = Object.assign(AdbrixRmReact.BigPicturePushPropertiesModel, bigPicturePushPropertiesModel);
        return JSON.stringify(bigPicturePushProperties.getBigPicturePushPropertiesModel());
    }
}

function assignProductModel(productModel) {
    if (productModel == null) return null;
    else {
        let product = Object.assign(AdbrixRmReact.ProductModel, productModel);
        return JSON.stringify(product.getProductModel());
    }
}

function assignProductModelList(productList) {
    if (productList == null) return null;
    else {
        let products = Object.assign(AdbrixRmReact.ProductModelList, productList);
        return JSON.stringify(products.getProductList());
    }
}

function assignAbxRemotePushModel(pushModel) {
    if (pushModel == null) return null;
    let push = Object.assign(AdbrixRmReact.AbxPushModel, pushModel);
    return JSON.stringify(push.getAbxPushModel());
}



//constant
AdbrixRmReact.INVITE_CHANNEL_KAKAO = "Kakao";
AdbrixRmReact.INVITE_CHANNEL_NAVER = "Naver";
AdbrixRmReact.INVITE_CHANNEL_LINE = "Line";
AdbrixRmReact.INVITE_CHANNEL_GOOGLE = "Google";
AdbrixRmReact.INVITE_CHANNEL_FACEBOOK = "Facebook";
AdbrixRmReact.INVITE_CHANNEL_TWITTER = "Twitter";
AdbrixRmReact.INVITE_CHANNEL_WHATSAPP = "whatsApp";
AdbrixRmReact.INVITE_CHANNEL_QQ = "QQ";
AdbrixRmReact.INVITE_CHANNEL_WECHAT = "WeChat";
AdbrixRmReact.INVITE_CHANNEL_ETC = "ETC";

AdbrixRmReact.SHARING_CHANNEL_KAKAO = "Kakao";
AdbrixRmReact.SHARING_CHANNEL_KAKAOSTORY = "KakaoStory";
AdbrixRmReact.SHARING_CHANNEL_LINE = "Line";
AdbrixRmReact.SHARING_CHANNEL_TWITTER = "Twitter";
AdbrixRmReact.SHARING_CHANNEL_WHATSAPP = "whatsApp";
AdbrixRmReact.SHARING_CHANNEL_QQ = "QQ";
AdbrixRmReact.SHARING_CHANNEL_WECHAT = "WeChat";
AdbrixRmReact.SHARING_CHANNEL_SMS = "SMS";
AdbrixRmReact.SHARING_CHANNEL_EMAIL = "Email";
AdbrixRmReact.SHARING_CHANNEL_COPYURL = "CopyUrl";
AdbrixRmReact.SHARING_CHANNEL_ETC = "ETC";

AdbrixRmReact.SIGNUP_CHANNEL_KAKAO = "Kakao";
AdbrixRmReact.SIGNUP_CHANNEL_NAVER = "Naver";
AdbrixRmReact.SIGNUP_CHANNEL_LINE = "Line";
AdbrixRmReact.SIGNUP_CHANNEL_GOOGLE = "Google";
AdbrixRmReact.SIGNUP_CHANNEL_FACEBOOK = "Facebook";
AdbrixRmReact.SIGNUP_CHANNEL_TWITTER = "Twitter";
AdbrixRmReact.SIGNUP_CHANNEL_WHATSAPP = "whatsApp";
AdbrixRmReact.SIGNUP_CHANNEL_QQ = "QQ";
AdbrixRmReact.SIGNUP_CHANNEL_WECHAT = "WeChat";
AdbrixRmReact.SIGNUP_CHANNEL_USERID = "UserId";
AdbrixRmReact.SIGNUP_CHANNEL_ETC = "ETC";

AdbrixRmReact.PAYMENT_METHOD_CREDIT_CARD = "CreditCard";
AdbrixRmReact.PAYMENT_METHOD_BANK_TRASNFER = "BankTransfer";
AdbrixRmReact.PAYMENT_METHOD_MOBILE_PAYMENT = "MobilePayment";
AdbrixRmReact.PAYMENT_METHOD_ETC = "ETC";

AdbrixRmReact.CURRENCY_KR_KRW = "KRW";
AdbrixRmReact.CURRENCY_US_USD = "USD";
AdbrixRmReact.CURRENCY_JP_JPY = "JPY";
AdbrixRmReact.CURRENCY_EU_EUR = "EUR";
AdbrixRmReact.CURRENCY_UK_GBP = "GBP";
AdbrixRmReact.CURRENCY_CN_CNY = "CNY";
AdbrixRmReact.CURRENCY_TW_TWD = "TWD";
AdbrixRmReact.CURRENCY_HK_HKD = "HKD";
AdbrixRmReact.CURRENCY_ID_IDR = "IDR";
AdbrixRmReact.CURRENCY_IN_INR = "INR";
AdbrixRmReact.CURRENCY_RU_RUB = "RUB";
AdbrixRmReact.CURRENCY_TH_THB = "THB";
AdbrixRmReact.CURRENCY_VN_VND = "VND";
AdbrixRmReact.CURRENCY_MY_MYR = "MYR";

AdbrixRmReact.GENDER_MALE = 2;
AdbrixRmReact.GENDER_FEMALE = 1;
AdbrixRmReact.GENDER_UNKOWN = 0;

AdbrixRmReact.UPLOAD_COUNT_INTERVAL_MIN = 10;
AdbrixRmReact.UPLOAD_COUNT_INTERVAL_NORMAL = 30;
AdbrixRmReact.UPLOAD_COUNT_INTERVAL_MAX = 1000;

AdbrixRmReact.UPLOAD_TIME_INTERVAL_MIN = 60;
AdbrixRmReact.UPLOAD_TIME_INTERVAL_NORMAL = 60;
AdbrixRmReact.UPLOAD_TIME_INTERVAL_MAX = 120;

const DEFERRED_LINK_LISTENER_CALLBACK = "DfnDeferredDeeplinkListener";
const DEEP_LINK_LISTENER_CALLBACK = "DfnDeeplinkListener";
const LOCAL_PUSH_MESSAGE_CALLBACK = "DfnLocalPushMessageListener";
const REMOTE_PUSH_MESSAGE_CALLBACK = "DfnRemotePushMessageListener";
const IN_APP_MESSAGE_CLICK_CALLBACK = "DfnInAppMessageClickListener";
const IN_APP_MESSAGE_AUTO_FETCH_CALLBACK = "DfnInAppMessageAutoFetchListener";
const LOG_LISTENER_CALLBACK = "DfnLogListener";

// ******************** For v1 backward compatibility only. Please use new API *********************
// Depreciated: Should implement on native side
AdbrixRmReact.startAdbrixSDK = (appKey, secretKey) => {
    console.log("startAdbrixSDK was removed from plugin version 2. Please use initRNPlugin. Check new integration guide at: https://help.dfinery.io/hc/en-us/articles/360033981253-Adbrix-Integration-React-Native-")
    return AdbrixRm.startAdbrixSDK(appKey, secretKey);
}
// ******************** END v1 backward compatibility *************

// 리스너 콜백
AdbrixRmReact.setDeferredDeeplinkListener = (functionName) => {
    AdbrixRmCallBack.removeAllListeners(DEFERRED_LINK_LISTENER_CALLBACK);
    AdbrixRmCallBack.addListener(DEFERRED_LINK_LISTENER_CALLBACK, (deeplink) => {
        AdbrixRmReact.emit(DEFERRED_LINK_LISTENER_CALLBACK, deeplink);
    });

    if (null != deferredDeeplinkListener) {
        deferredDeeplinkListener.remove();
        deferredDeeplinkListener = null;
    }
    if (functionName != null) {
        deferredDeeplinkListener = AdbrixRmReact.addListener(DEFERRED_LINK_LISTENER_CALLBACK, functionName);
    }
}

AdbrixRmReact.setDeeplinkListener = (functionName) => {
    AdbrixRmCallBack.removeAllListeners(DEEP_LINK_LISTENER_CALLBACK);
    AdbrixRmCallBack.addListener(DEEP_LINK_LISTENER_CALLBACK, (deeplink) => {
        AdbrixRmReact.emit(DEEP_LINK_LISTENER_CALLBACK, deeplink);    
    });
    
    if (null != deeplinkListener) {
        deeplinkListener.remove();
        deeplinkListener = null;
    }
    if (functionName != null) {
        deeplinkListener = AdbrixRmReact.addListener(DEEP_LINK_LISTENER_CALLBACK, functionName);
    }
}

AdbrixRmReact.setLocalPushMessageListener = (functionName) => {
    AdbrixRmCallBack.removeAllListeners(LOCAL_PUSH_MESSAGE_CALLBACK);
    AdbrixRmCallBack.addListener(LOCAL_PUSH_MESSAGE_CALLBACK, (callbackJsonString) => {
        AdbrixRmReact.emit(LOCAL_PUSH_MESSAGE_CALLBACK, callbackJsonString);    
    });

    if (null != localPushMessageListener) {
        localPushMessageListener.remove();
        localPushMessageListener = null;
    }
    if (functionName != null) {
        localPushMessageListener = AdbrixRmReact.addListener(LOCAL_PUSH_MESSAGE_CALLBACK, functionName);
    }
}

AdbrixRmReact.setRemotePushMessageListener = (functionName) => {
    AdbrixRmCallBack.removeAllListeners(REMOTE_PUSH_MESSAGE_CALLBACK)
    AdbrixRmCallBack.addListener(REMOTE_PUSH_MESSAGE_CALLBACK, (callbackJsonString) => {
        AdbrixRmReact.emit(REMOTE_PUSH_MESSAGE_CALLBACK, callbackJsonString);    
    });

    if (null != remoteMessageListener) {
        remoteMessageListener.remove();
        remoteMessageListener = null;
    }

    if (functionName != null) {
        remoteMessageListener = AdbrixRmReact.addListener(REMOTE_PUSH_MESSAGE_CALLBACK, functionName);
    }
}

AdbrixRmReact.setInAppMessageClickListener = (functionName) => {
    AdbrixRmCallBack.removeAllListeners(IN_APP_MESSAGE_CLICK_CALLBACK);
    AdbrixRmCallBack.addListener(IN_APP_MESSAGE_CLICK_CALLBACK, (callbackJsonString) => {
        AdbrixRmReact.emit(IN_APP_MESSAGE_CLICK_CALLBACK, callbackJsonString);    
    });

    if (null != inAppMessageClickListener) {
        inAppMessageClickListener.remove();
        inAppMessageClickListener = null;
    }

    if (functionName != null) {
        inAppMessageClickListener = AdbrixRmReact.addListener(IN_APP_MESSAGE_CLICK_CALLBACK, functionName);
    }
}

AdbrixRmReact.setDfnInAppMessageAutoFetchListener = (functionName) => {
    AdbrixRmCallBack.removeAllListeners(IN_APP_MESSAGE_AUTO_FETCH_CALLBACK);
    AdbrixRmCallBack.addListener(IN_APP_MESSAGE_AUTO_FETCH_CALLBACK, (callbackJsonString) => {
        AdbrixRmReact.emit(IN_APP_MESSAGE_AUTO_FETCH_CALLBACK, callbackJsonString);    
    });

    if (null != dfnInAppMessageAutoFetchListener) {
        dfnInAppMessageAutoFetchListener.remove();
        dfnInAppMessageAutoFetchListener = null;
    }

    if (functionName != null) {
        dfnInAppMessageAutoFetchListener = AdbrixRmReact.addListener(IN_APP_MESSAGE_AUTO_FETCH_CALLBACK, functionName);
    }
}

AdbrixRmReact.setLogListener = (functionName) => {
    AdbrixRmCallBack.removeAllListeners(LOG_LISTENER_CALLBACK);
    AdbrixRmCallBack.addListener(LOG_LISTENER_CALLBACK, (callbackJsonString) => {
        AdbrixRmReact.emit(LOG_LISTENER_CALLBACK, callbackJsonString);    
    });
    
    if (null != logListener) {
        logListener.remove();
        logListener = null;
    }

    if (functionName != null) {
        logListener = AdbrixRmReact.addListener("DfnLogListener", functionName);
    }
}

export default AdbrixRmReact;