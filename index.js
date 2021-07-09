/**
 * @format
 */
 import DemoYp from './src/DemoYp';
 import {NativeModules, NativeEventEmitter} from 'react-native';
 import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
 
 const AdbrixRmReact = new EventEmitter();
 AdbrixRmReact.DemmoYP = DemoYp;
 
 const {AdbrixRm} = NativeModules;
AdbrixRmReact.native = AdbrixRm;

const AdbrixRmCallBack = new NativeEventEmitter(NativeModules.AdbrixRm);
 
 const AdbrixDeferredDeeplinkEventEmitter = AdbrixRmCallBack.addListener("AdbrixDeferredDeeplinkListener", (deeplink) => {
                                                                         AdbrixRmReact.emit("AdbrixDeferredDeeplinkListener", deeplink);
                                                                         });
 const AdbrixDeeplinkEventEmitter = AdbrixRmCallBack.addListener("AdbrixDeeplinkListener", (deeplink) => {
                                                                 AdbrixRmReact.emit("AdbrixDeeplinkListener", deeplink);
                                                                 });
 // model
 var deferredDeeplinkListener = null;
 var deeplinkListener = null;
 
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
 
 AdbrixRmReact.testDictionary = (attr) => {
     AdbrixRm.testDictionary(assignAttrModel(attr));
 }
 
 
 AdbrixRmReact.startAdbrixSDK = (appKey, secretKey) => {
     return AdbrixRm.startAdbrixSDK(appKey, secretKey);
 }
 AdbrixRmReact.gdprForgetMe = () => {
     return AdbrixRm.gdprForgetMe();
 }
//  AdbrixRmReact.setDeviceId = (deviceId) => {
//      return AdbrixRm.setDeviceId(deviceId)
//  }
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
     console.log(assignProductModelList(productList));
     return AdbrixRm.commerceCategoryView(assignCategoryModel(category), assignProductModelList(productList), assignAttrModel(extraAttrs));
 }
 AdbrixRmReact.commerceProductView = (product, extraAttrs) => {
     console.log(assignProductModel(product));
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
 /*
  Android Only
  */
 AdbrixRmReact.setAppScanEnable = (enable) => {
     return AdbrixRm.setAppScanEnable(enable);
 }
 AdbrixRmReact.deepLinkEvent = (url) => {
     return AdbrixRm.deepLinkEvent(url);
 }
 
 
 AdbrixRmReact.setDeferredDeeplinkListener = (functionName) => {
     if( null != deferredDeeplinkListener){
         deferredDeeplinkListener.remove();
         deferredDeeplinkListener = null;
     }
     if (functionName != null){
         deferredDeeplinkListener = AdbrixRmReact.addListener('AdbrixDeferredDeeplinkListener', functionName);
     }
 }
 AdbrixRmReact.setDeeplinkListener = (functionName) => {
     if( null != deeplinkListener){
         deeplinkListener.remove();
         deeplinkListener = null;
     }
     if (functionName != null){
         deeplinkListener = AdbrixRmReact.addListener('AdbrixDeeplinkListener', functionName);
     }
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

 AdbrixRmReact.logTest = (msg) =>{
    if(Platform.OS === 'ios'){
        console.log("IOS LOG");
      }else{
        console.log("Andoid LOG");
        AdbrixRm.nativeHongLog("Hello Yen");
      }
 }
 
 export default AdbrixRmReact;
 