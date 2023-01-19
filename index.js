/**
 * @format
 */
import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const AdbrixRmReact = new EventEmitter();
const { AdbrixRm } = NativeModules;
const AdbrixRmCallBack = new NativeEventEmitter(NativeModules.AdbrixRm);

const DEFERRED_LINK_LISTENER_CALLBACK = "DfnDeferredDeeplinkListener";
const DEEP_LINK_LISTENER_CALLBACK = "DfnDeeplinkListener";
const REMOTE_PUSH_MESSAGE_CALLBACK = "DfnRemotePushMessageListener";
const IN_APP_MESSAGE_CLICK_CALLBACK = "DfnInAppMessageClickListener";
const IN_APP_MESSAGE_AUTO_FETCH_CALLBACK = "DfnInAppMessageAutoFetchListener";
const LOG_LISTENER_CALLBACK = "DfnLogListener";

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

AdbrixRmReact.SHARING_CHANNEL_FACEBOOK = "Facebook";
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
AdbrixRmReact.SIGNUP_CHANNEL_SKTID = "SkTid";
AdbrixRmReact.SIGNUP_CHANNEL_APPLEID = "AppleId"; 

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

// 리스너 세팅
AdbrixRmReact.setDeferredDeeplinkListener = (functionName) => {
    if (functionName == null) {
        console.log("abxrm : setDeferredDeeplinkListener : callback is null");
        return;
    }

    AdbrixRmCallBack.removeAllListeners(DEFERRED_LINK_LISTENER_CALLBACK);
    AdbrixRmCallBack.addListener(DEFERRED_LINK_LISTENER_CALLBACK, (deeplink) => {
        AdbrixRmReact.emit(DEFERRED_LINK_LISTENER_CALLBACK, deeplink);
    });

    AdbrixRmReact.removeAllListeners(DEFERRED_LINK_LISTENER_CALLBACK);
    AdbrixRmReact.addListener(DEFERRED_LINK_LISTENER_CALLBACK, functionName);
}

AdbrixRmReact.setDeeplinkListener = (functionName) => {
    if (functionName == null) {
        console.log("abxrm : setDeeplinkListener : callback is null");
        return;
    }

    AdbrixRmCallBack.removeAllListeners(DEEP_LINK_LISTENER_CALLBACK);
    AdbrixRmCallBack.addListener(DEEP_LINK_LISTENER_CALLBACK, (deeplink) => {
        AdbrixRmReact.emit(DEEP_LINK_LISTENER_CALLBACK, deeplink);    
    });

    AdbrixRmReact.removeAllListeners(DEEP_LINK_LISTENER_CALLBACK);
    AdbrixRmReact.addListener(DEEP_LINK_LISTENER_CALLBACK, functionName);
}

AdbrixRmReact.setRemotePushMessageListener = (functionName) => {
    if (functionName == null) {
        console.log("abxrm : setRemotePushMessageListener : callback is null");
        return;
    }

    AdbrixRmCallBack.removeAllListeners(REMOTE_PUSH_MESSAGE_CALLBACK)
    AdbrixRmCallBack.addListener(REMOTE_PUSH_MESSAGE_CALLBACK, (callbackJsonString) => {
        AdbrixRmReact.emit(REMOTE_PUSH_MESSAGE_CALLBACK, callbackJsonString);    
    });

    AdbrixRmReact.removeAllListeners(REMOTE_PUSH_MESSAGE_CALLBACK);
    AdbrixRmReact.addListener(REMOTE_PUSH_MESSAGE_CALLBACK, functionName);
}

AdbrixRmReact.setInAppMessageClickListener = (functionName) => {
    if (functionName == null) {
        console.log("abxrm : setInAppMessageClickListener : callback is null");
        return;
    }

    AdbrixRmCallBack.removeAllListeners(IN_APP_MESSAGE_CLICK_CALLBACK);
    AdbrixRmCallBack.addListener(IN_APP_MESSAGE_CLICK_CALLBACK, (callbackJsonString) => {
        AdbrixRmReact.emit(IN_APP_MESSAGE_CLICK_CALLBACK, callbackJsonString);    
    });

    AdbrixRmReact.removeAllListeners(IN_APP_MESSAGE_CLICK_CALLBACK);
    AdbrixRmReact.addListener(IN_APP_MESSAGE_CLICK_CALLBACK, functionName);
}

AdbrixRmReact.setDfnInAppMessageAutoFetchListener = (functionName) => {
    if (functionName == null) {
        console.log("abxrm : setDfnInAppMessageAutoFetchListener : callback is null");
        return;
    }

    AdbrixRmCallBack.removeAllListeners(IN_APP_MESSAGE_AUTO_FETCH_CALLBACK);
    AdbrixRmCallBack.addListener(IN_APP_MESSAGE_AUTO_FETCH_CALLBACK, (callbackJsonString) => {
        AdbrixRmReact.emit(IN_APP_MESSAGE_AUTO_FETCH_CALLBACK, callbackJsonString);    
    });

    AdbrixRmReact.removeAllListeners(IN_APP_MESSAGE_AUTO_FETCH_CALLBACK);
    AdbrixRmReact.addListener(IN_APP_MESSAGE_AUTO_FETCH_CALLBACK, functionName);
}

AdbrixRmReact.setLogListener = (functionName) => {
    if (functionName == null) {
        console.log("abxrm : setLogListener : callback is null");
        return;
    }

    AdbrixRmCallBack.removeAllListeners(LOG_LISTENER_CALLBACK);
    AdbrixRmCallBack.addListener(LOG_LISTENER_CALLBACK, (callbackJsonString) => {
        AdbrixRmReact.emit(LOG_LISTENER_CALLBACK, callbackJsonString);    
    });
    
    AdbrixRmReact.removeAllListeners(LOG_LISTENER_CALLBACK);
    AdbrixRmReact.addListener(LOG_LISTENER_CALLBACK, functionName);
}

AdbrixRmReact.login = (userId) => {
    AdbrixRm.login(userId);
}

AdbrixRmReact.logout = () => {
    AdbrixRm.logout();
}

AdbrixRmReact.gdprForgetMe = () => {
    AdbrixRm.gdprForgetMe();
}

AdbrixRmReact.setAge = (age) => {
    AdbrixRm.setAge(age);
}

AdbrixRmReact.setGender = (gender) => {
    AdbrixRm.setGender(gender);
}

AdbrixRmReact.saveUserProperties = (userProperties) => {
    AdbrixRm.saveUserProperties(assignUserProperties(userProperties));
}

AdbrixRmReact.clearUserProperties = () => {
    AdbrixRm.clearUserProperties();
}

AdbrixRmReact.setEnableLocationListening = (option) => {
    if (Platform.OS == 'android') {
        AdbrixRm.setEnableLocationListening(option);
    }
}

AdbrixRmReact.setLocation = (lat, lon) => {
    AdbrixRm.setLocation(lat, lon);
}

AdbrixRmReact.event = (eventName, attrs) => {
    AdbrixRm.event(eventName, assignAttrModel(attrs));
}

AdbrixRmReact.flushAllEvents = (callback) => {
    AdbrixRm.flushAllEvents(callback);
}

AdbrixRmReact.setEventUploadCountInterval = (interval) => {
    AdbrixRm.setEventUploadCountInterval(interval);
}

AdbrixRmReact.setEventUploadTimeInterval = (interval) => {
    AdbrixRm.setEventUploadCountInterval(interval);
}

// Aos Only
 AdbrixRmReact.setAppScanEnable = (enable) => {
    if (Platform.OS == 'android') {
        AdbrixRm.setAppScanEnable(enable);
    }
}

AdbrixRmReact.getPushEnable = () => {
    return AdbrixRm.getPushEnable();
}

AdbrixRmReact.getOsPushEnable = () => {
    return AdbrixRm.getOsPushEnable();
}

// Aos Only
AdbrixRmReact.setNotificationDoNotDisturbEnable = (enable) => {
    if (Platform.OS == 'android') {
        AdbrixRm.setNotificationDoNotDisturbEnable(enable);
    }
}

// Aos Only
AdbrixRmReact.setNotificationDoNotDisturb = (startHour, startMinutes, endHour, endMinutes) => {
    if (Platform.OS == 'android') {
        AdbrixRm.setNotificationDoNotDisturb(startHour, startMinutes, endHour, endMinutes);
    }
}

AdbrixRmReact.setPushEnable = (enable) => {
    AdbrixRm.setPushEnable(enable);
}

AdbrixRmReact.setRegistrationId = (token) => {
    AdbrixRm.setRegistrationId(token);
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

AdbrixRmReact.setKakaoId = (kakaoId) => {
    AdbrixRm.setKakaoId(kakaoId);
}

AdbrixRmReact.saveUserCiProperties = (userCiProperties) => {
    AdbrixRm.saveUserCiProperties(assignUserProperties(userCiProperties));
}

AdbrixRmReact.parsePushData = (pushMap) => {
    return AdbrixRm.parsePushData(pushMap);
}

AdbrixRmReact.openPush = (pushModel) => {
    AdbrixRm.openPush(assignAbxRemotePushModel(pushModel));
}

AdbrixRmReact.deleteUserDataAndStopSDK = (userId, onSuccessCallbak, onFailCallback) => {
    if (Platform.OS == 'ios') {
        AdbrixRm.deleteUserDataAndStopSDK(userId, onSuccessCallbak);
    } else if (Platform.OS == 'android') {
        AdbrixRm.deleteUserDataAndStopSDK(userId, onSuccessCallbak, onFailCallback);
    }
}

AdbrixRmReact.restartSDK = (userId, onSuccessCallbak, onFailCallback) => {
    AdbrixRm.restartSDK(userId, onSuccessCallbak, onFailCallback);
}

AdbrixRmReact.getSDKVersion = () => {
    return AdbrixRm.getSDKVersion();
}

AdbrixRmReact.getUserId = (functionName) => {
    AdbrixRm.getUserId(functionName);   
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

AdbrixRmReact.deleteAllActionHistoryByUserId = (userId, callback) => {
    if (userId == null) {
        console.log("abxrm : deleteAllActionHistoryByUserId : userId is null");
        return;
    }
    AdbrixRm.deleteAllActionHistoryByUserId(userId, callback);
}

AdbrixRmReact.deleteAllActionHistoryByAdid = (adid, callback) => {
    if (adid == null) {
        console.log("abxrm : deleteAllActionHistoryByAdid : adid is null");
        return;
    }
    AdbrixRm.deleteAllActionHistoryByAdid(adid, callback);
}

AdbrixRmReact.clearSyncedActionHistoryInLocalDB = (callback) => {
    AdbrixRm.clearSyncedActionHistoryInLocalDB(callback);
}

AdbrixRmReact.setInAppMessageFetchMode = (mode) => {
    AdbrixRm.setInAppMessageFetchMode(mode);
}

AdbrixRmReact.setInAppMessageToken = (token) => {
    AdbrixRm.setInAppMessageToken(token);
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

// Commerce
AdbrixRmReact.commerceViewHome = (attrs) => {
    AdbrixRm.commerceViewHome(assignAttrModel(attrs));
}

AdbrixRmReact.commerceCategoryView = (category, productList, extraAttrs) => {
    AdbrixRm.commerceCategoryView(assignCategoryModel(category), assignProductModelList(productList), assignAttrModel(extraAttrs));
}

AdbrixRmReact.commerceProductView = (product, extraAttrs) => {
    AdbrixRm.commerceProductView(assignProductModel(product), assignAttrModel(extraAttrs));
}

AdbrixRmReact.commerceAddToCart = (productList, extraAttrs) => {
    AdbrixRm.commerceAddToCart(assignProductModelList(productList), assignAttrModel(extraAttrs));
}

AdbrixRmReact.commerceAddToWishList = (product, extraAttrs) => {
    AdbrixRm.commerceAddToWishList(assignProductModel(product), assignAttrModel(extraAttrs));
}

AdbrixRmReact.commerceReviewOrder = (orderId, productList, discount, deliveryCharge, extraAttrs) => {
    AdbrixRm.commerceReviewOrder(orderId, assignProductModelList(productList), discount, deliveryCharge, assignAttrModel(extraAttrs));
}

AdbrixRmReact.commerceRefund = (orderId, productList, penaltyCharge, extraAttrs) => {
    AdbrixRm.commerceRefund(orderId, assignProductModelList(productList), penaltyCharge, assignAttrModel(extraAttrs));
}

AdbrixRmReact.commerceSearch = (keyWord, productList, extraAttrs) => {
    AdbrixRm.commerceSearch(keyWord, assignProductModelList(productList), assignAttrModel(extraAttrs));
}

AdbrixRmReact.commerceShare = (sharingChannel, productModel, extraAttrs) => {
    AdbrixRm.commerceShare(sharingChannel, assignProductModel(productModel), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceListView = (productList, extraAttrs) => {
    AdbrixRm.commerceListView(assignProductModelList(productList), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commerceCartView = (productList, extraAttrs) => {
    AdbrixRm.commerceCartView(assignProductModelList(productList), assignAttrModel(extraAttrs));
}
AdbrixRmReact.commercePaymentInfoAdded = (extraAttrs) => {
    AdbrixRm.commercePaymentInfoAdded(assignAttrModel(extraAttrs));
}

// Game
AdbrixRmReact.gameTutorialCompleted = (isSkip, extraAttrs) => {
    AdbrixRm.gameTutorialCompleted(isSkip, assignAttrModel(extraAttrs));
}

AdbrixRmReact.gameLevelAchieved = (level, extraAttrs) => {
    AdbrixRm.gameLevelAchieved(level, assignAttrModel(extraAttrs));
}

AdbrixRmReact.gameCharacterCreated = (extraAttrs) => {
    AdbrixRm.gameCharacterCreated(assignAttrModel(extraAttrs));
}
AdbrixRmReact.gameStageCleared = (stageName, extraAttrs) => {
    AdbrixRm.gameStageCleared(stageName, assignAttrModel(extraAttrs));
}

// Common
AdbrixRmReact.commonPurchase = (orderId, productList, discount, deliveryCharge, paymentMethod, extraAttrs) => {
    AdbrixRm.commonPurchase(orderId, assignProductModelList(productList), discount, deliveryCharge, paymentMethod, assignAttrModel(extraAttrs));
}

AdbrixRmReact.commonSignUp = (channelName, extraAttrs) => {
    AdbrixRm.commonSignUp(channelName, assignAttrModel(extraAttrs));
}

AdbrixRmReact.commonUseCredit = (extraAttrs) => {
    AdbrixRm.commonUseCredit(assignAttrModel(extraAttrs));
}

AdbrixRmReact.commonAppUpdate = (prevVer, currentVer, extraAttrs) => {
    AdbrixRm.commonAppUpdate(prevVer, currentVer, assignAttrModel(extraAttrs));
}

AdbrixRmReact.commonInvite = (channelName, extraAttrs) => {
    AdbrixRm.commonInvite(channelName, assignAttrModel(extraAttrs));
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

    let userPropertyObject = Object.assign(AdbrixRmReact.UserProperties, userProperties);
    return JSON.stringify(userPropertyObject.getProperties());
}
function assignAttrModel(attrs) {
    if (attrs == null) return null;
    
    let attrModel = Object.assign(AdbrixRmReact.AttrModel, attrs);
    return JSON.stringify(attrModel.getAttrs());
}

function assignCategoryModel(categoryModel) {
    if (categoryModel == null) return null;

    let categories = Object.assign(AdbrixRmReact.CategoryModel, categoryModel);
    return JSON.stringify(categories.getCategory());
}

function assignProductModel(productModel) {
    if (productModel == null) return null;

    let product = Object.assign(AdbrixRmReact.ProductModel, productModel);
    return JSON.stringify(product.getProductModel());
}

function assignProductModelList(productList) {
    if (productList == null) return null;

    let products = Object.assign(AdbrixRmReact.ProductModelList, productList);
    return JSON.stringify(products.getProductList());
}

function assignAbxRemotePushModel(pushModel) {
    if (pushModel == null) return null;

    let push = Object.assign(AdbrixRmReact.AbxPushModel, pushModel);
    return JSON.stringify(push.getAbxPushModel());
}

export default AdbrixRmReact;