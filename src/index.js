import {
    NativeModules,
    NativeEventEmitter,
    EmitterSubscription,
    Platform
} from 'react-native'

import {
    UserProperties,
    AttrModel,
    CategoryModel,
    ProductModel,
    ProductModelList,
    SubscriptionStatus,
} from './model/class.js';

import {
    Gender,
    UploadTimeInterval,
    UploadCountInterval,
    InviteChannel,
    SharingChannel,
    SignUpChannel,
    PaymentMethod,
    Currency,
    ATTStatus,
} from './model/enum.js';

const isTurboModuleEnabled = global.__turboModuleProxy != null;

export default class AdbrixRm {
    //#region - Property
    static UserProperties = UserProperties;
    static AttrModel = AttrModel;
    static CategoryModel = CategoryModel;
    static ProductModel = ProductModel;
    static ProductModelList = ProductModelList;
    static SubscriptionStatus = SubscriptionStatus;

    static Gender = Gender;
    static UploadTimeInterval = UploadTimeInterval;
    static UploadCountInterval = UploadCountInterval;
    static InviteChannel = InviteChannel;
    static SharingChannel = SharingChannel;
    static SignUpChannel = SignUpChannel;
    static PaymentMethod = PaymentMethod;
    static Currency = Currency;
    static ATTStatus = ATTStatus;

    static LISTENER_DEEPLINK = "dfn_deeplink_listener";
    static LISTENER_DEFERRED_DEEPLINK = "dfn_deferred_deeplink_listener";
    static LISTENER_IAM_CLICK = "dfn_inappmessage_click_listener";
    static LISTENER_REMOTE_NOTIFICATION = "dfn_remote_notification_listener";
    //#endregion
    static bridge = NativeModules.ReactAdbrixBridge
    static emitter = new NativeEventEmitter(this.bridge)
    
    
    //#region - Listener
    /**
    * This function receives a callback function `subscriber` as an argument. 
    * The `subscriber` is a callback that receives a string `deeplink` as an argument and returns void.
    * The function returns an `EmitterSubscription`.
    *
    * @param {function({deeplink: string}): void} subscriber - A callback function that receives a deeplink string
    * @returns {EmitterSubscription}
    */
    static deeplinkListener(subscriber): EmitterSubscription {

        this.bridge.addListener(this.LISTENER_DEEPLINK);

        if (typeof subscriber === "function") {
            return this.emitter.addListener(this.LISTENER_DEEPLINK, subscriber)
        }
    }

    /**
    * This function receives a callback function `subscriber` as an argument. 
    * The `subscriber` is a callback that receives a string `deeplink` as an argument and returns void.
    * The function returns an `EmitterSubscription`.
    *
    * @param {function({deeplink: string}): void} subscriber - A callback function that receives a deeplink string
    * @returns {EmitterSubscription}
    */
       static deferredDeeplinkListener(subscriber): EmitterSubscription {

        this.bridge.addListener(this.LISTENER_DEFERRED_DEEPLINK);

        if (typeof subscriber === "function") {
            return this.emitter.addListener(this.LISTENER_DEFERRED_DEEPLINK, subscriber)
        }
    }

    /**
     * This function receives a callback function `subscriber` as an argument. 
     * The `subscriber` is a callback that receives an object `arguments` 
     * with properties `actionId`, `actionType`, `actionArg`, `isClosed` and returns void.
     * The function returns an `EmitterSubscription`.
     *
     * @param {function({ actionId: string, actionType: string, actionArg: string, isClosed: boolean }): void} subscriber
     * @returns {EmitterSubscription}
     */
    static inAppMessageClickListener(subscriber): EmitterSubscription {

        this.bridge.addListener(this.LISTENER_IAM_CLICK);

        if (typeof subscriber === "function") {
            return this.emitter.addListener(this.LISTENER_IAM_CLICK, subscriber)
        }
    }

    /**
    * This function receives a callback function `subscriber` as an argument. 
    * The `subscriber` is a callback that receives a string `pushData` as an argument and returns void.
    * 'pushData' is a deeplink value set in Dfinery console. If deeplink value isn't set, 'pushData' is set to "".
    * The function returns an `EmitterSubscription`.
    *
    * @param {function({pushData: string}): void} subscriber - A callback function that receives a pushData
    * @returns {EmitterSubscription}
    */
     static remoteNotificationClickListener(subscriber): EmitterSubscription {
        this.bridge.addListener(this.LISTENER_REMOTE_NOTIFICATION);

        if (typeof subscriber === "function") {
            return this.emitter.addListener(this.LISTENER_REMOTE_NOTIFICATION, subscriber);
        }
    }

    //#endregion

    //#region - UserProperty
    /**
    * @param {string} userId
    */
    static login(userId: string): void {

        this.bridge.login(userId);
    }

    static logout() {
        this.bridge.logout();
    }

    /**
     * @param {number} age 
     * @returns
     */
    static setAge(age) {

        this.bridge.setAge(age);
    }

    /**
     * 
     * @param {Gender} gender - 0 = unknown, 1 = female, 2 = male
     */
    static setGender(gender) {
        if (gender < 0 || 2 < gender) {
            console.log(`wrong gender value input, input value = ${gender}. only 0~2 allowed`)
            return
        }

        this.bridge.setGender(gender);
    }

    /**
     * 
     * @param {UserProperties} userProperty 
     * @returns 
     */
    static saveUserProperties(userProperty) {
        this.bridge.saveUserProperties(userProperty.getProperties());
    }
    //#endregion

    //#region - Event
    //#region - Common
    /**
     * 
     * @param {string} eventName 
     * @param {AttrModel} [attr] 
     */
    static event(eventName: string, attr = new AttrModel()): void {
        this.bridge.event(eventName, attr.getAttrs());
    }

    /**
     * 
     * @param {SignuUpChannel} channel 
     * @param {AttrModel} [attr] 
     */
    static commonSignUp(channel: SignUpChannel, attr = new AttrModel()): void {
        this.bridge.commonSignUp(channel, attr.getAttrs());
    }

    /**
     * 
     * @param {string} prev - Previous version of this app user used
     * @param {string} curr - Current version of this app user used
     * @param {AttrModel} [attr]
     */
    static commonAppUpdate(prev: string, curr: string, attr = new AttrModel()) {
        this.bridge.commonAppUpdate(prev, curr, attr.getAttrs());
    }

    /**
     * 
     * @param {InviteChannel} channel 
     * @param {AttrModel} [attr] 
     */
    static commonInvite(channel: InviteChannel, attr = new AttrModel()) {
        this.bridge.commonInvite(channel, attr.getAttrs());
    }

    /**
     * 
     * @param {AttrModel} [attr] 
     */
    static commonUseCredit(attr = new AttrModel()) {
        this.bridge.commonUseCredit(attr.getAttrs());
    }

    /**
     * 
     * @param {string} orderId 
     * @param {ProductModelList} productList 
     * @param {number} orderSales 
     * @param {number} discount 
     * @param {number} deliveryCharge 
     * @param {PaymentMethod} paymentMethod 
     * @param {AttrModel} [attr]
     */
    static commonPurchase(
        orderId: string,
        productList: ProductModelList,
        orderSales: number,
        discount: number,
        deliveryCharge: number,
        paymentMethod: PaymentMethod,
        attr = new AttrModel()) {

        this.bridge.commonPurchase(
            orderId,
            productList.getProductList(),
            orderSales,
            discount,
            deliveryCharge,
            paymentMethod,
            attr.getAttrs());
    }
    //#endregion
    //#region Commerce

    /**
     * 
     * @param {AttrModel} [attr]
     */
    static commerceViewHome(attr = new AttrModel()) {
        this.bridge.commerceViewHome(attr.getAttrs());
    }

    /**
     * 
     * @param {CategoryModel} category 
     * @param {ProductModelList} productList 
     * @param {AttrModel} [attr]
     */
    static commerceCategoryView(
        category: CategoryModel,
        productList: ProductModelList,
        attr = new AttrModel()
    ) {

        this.bridge.commerceCategoryView(
            category.getCategory(),
            productList.getProductList(),
            attr.getAttrs()
        );
    }

    /**
     * 
     * @param {ProductModel} produtInfo 
     * @param {AttrModel} [attr]
     */
    static commerceProductView(
        produtInfo: ProductModel,
        attr = new AttrModel()
    ) {
        this.bridge.commerceProductView(
            produtInfo.getProductModel(),
            attr.getAttrs()
        );
    }

    /**
     * 
     * @param {ProductModelList} productList 
     * @param {AttrModel} [attr]
     */
    static commerceAddToCart(
        productList: ProductModelList,
        attr = new AttrModel()
    ) {
        this.bridge.commerceAddToCart(
            productList.getProductList(),
            attr.getAttrs()
        );
    }

    /**
     * 
     * @param {ProductModel} productInfo 
     * @param {AttrModel} [attr]
     */
    static commerceAddToWishList(
        productInfo: ProductModel,
        attr = new AttrModel()
    ) {
        this.bridge.commerceAddToWishList(
            productInfo.getProductModel(),
            attr.getAttrs()
        );
    }

    /**
     * 
     * @param {string} orderId 
     * @param {ProductModelList} productList 
     * @param {number} discount 
     * @param {number} deliveryCharge 
     * @param {AttrModel} [attr]
     */
    static commerceReviewOrder(
        orderId: string,
        productList: ProductModelList,
        discount: number,
        deliveryCharge: number,
        attr = new AttrModel()
    ) {
        this.bridge.commerceReviewOrder(
            orderId,
            productList.getProductList(),
            discount,
            deliveryCharge,
            attr.getAttrs()
        );
    }

    /**
     * 
     * @param {string} orderId 
     * @param {ProductModelList} productList 
     * @param {number} penaltyCharge 
     * @param {AttrModel} [attr]
     */
    static commerceRefund(
        orderId: string,
        productList: ProductModelList,
        penaltyCharge: number,
        attr = new AttrModel()
    ) {
        this.bridge.commerceRefund(
            orderId,
            productList.getProductList(),
            penaltyCharge,
            attr.getAttrs()
        );
    }

    /**
     * 
     * @param {string} keyword 
     * @param {ProductModelList} productList 
     * @param {AttrModel} [attr]
     */
    static commerceSearch(
        keyword: string,
        productList: ProductModelList,
        attr = new AttrModel()
    ) {
        this.bridge.commerceSearch(
            keyword,
            productList.getProductList(),
            attr.getAttrs()
        );
    }

    /**
     * 
     * @param {SharingChannel} channel 
     * @param {ProductModel} productInfo 
     * @param {AttrModel} [attr]
     */
    static commerceShare(
        channel: SharingChannel,
        productInfo: ProductModel,
        attr = new AttrModel()
    ) {
        this.bridge.commerceShare(
            channel,
            productInfo.getProductModel(),
            attr.getAttrs()
        );
    }

    /**
     * 
     * @param {ProductModelList} productList 
     * @param {AttrModel} [attr]
     */
    static commerceListView(
        productList: ProductModelList,
        attr = new AttrModel()
    ) {
        this.bridge.commerceListView(
            productList.getProductList(),
            attr.getAttrs()
        );
    }

    /**
     * 
     * @param {ProductModelList} productList 
     * @param {AttrModel} [attr] 
     */
    static commerceCartView(
        productList: ProductModelList,
        attr = new AttrModel()
    ) {
        this.bridge.commerceCartView(
            productList.getProductList(),
            attr.getAttrs()
        )
    }

    /**
     * 
     * @param {AttrModel} [attr]
     */
    static commercePaymentInfoAdded(
        attr = new AttrModel()
    ) {
        this.bridge.commercePaymentInfoAdded(attr.getAttrs());
    }
    //#endregion
    //#region - Game

    /**
     * 
     * @param {boolean} isSkip 
     * @param {AttrModel} [attr] 
     */
    static gameTutorialCompleted(
        isSkip: boolean,
        attr = new AttrModel()
    ) {
        this.bridge.gameTutorialCompleted(isSkip, attr.getAttrs());
    }

    /**
     * 
     * @param {AttrModel} [attr]
     */
    static gameCharacterCreated(
        attr = new AttrModel()
    ) {
        this.bridge.gameCharacterCreated(attr.getAttrs());
    }

    /**
     * 
     * @param {string} stageName 
     * @param {AttrModel} [attr]
     */
    static gameStageCleared(
        stageName: string,
        attr = new AttrModel()
    ) {
        this.bridge.gameStageCleared(stageName, attr.getAttrs());
    }

    /**
     * 
     * @param {number} level 
     * @param {AttrModel} [attr]
     */
    static gameLevelAchieved(
        level: number,
        attr = new AttrModel()
    ) {
        this.bridge.gameLevelAchieved(level, attr.getAttrs());
    }
    //#endregion

    //#endregion
    
    //#region - GrowthAction
    /**
     * 
     * @param {boolean} isEnabled 
     */
    static setPushEnable(isEnabled) {
        this.bridge.setPushEnable(isEnabled)
    }


    /**
     * 
     * @param {SubscriptionStatus} status 
     */
    static setSubscriptionStatus(status: SubscriptionStatus): Promise<any> {
        return this.bridge.setSubscriptionStatus(status.getObj()).then(
            result => {
                return Promise.resolve(result)
            },
            error => {
                return Promise.reject(new Error ("setSubscription failed, error message ::") + error.message)
            }
        )
    }

    /**
     * @returns {Promise<SubscriptionStatus>}
     */
    static getSubscriptionStatus(): Promise<SubscriptionStatus> {
        return this.bridge.getSubscriptionStatus().then(
            result => {
                let status = new SubscriptionStatus()
                status.obj = result
                return Promise.resolve(status);
            },
            error => {
                return Promise.reject(new Error("getSubscriptionStatus failed, error message :: " + error.message));
            }
        );
    }
    
    /**
     * 
     * @param {string} kakaoId 
     * @returns 
     */
    static setKakaoId(kakaoId): Promise<any> {
        return this.bridge.setKakaoId(kakaoId).then(
            result => {
                return Promise.resolve(result)
            },
            error => {
                return Promise.reject(new Error ("setKakaoId failed, error message ::") + error.message)
            }
        )
    } 

    /**
     * 
     * @param {string} number 
     * @returns 
     */
    static setPhoneNumber(number): Promise<any> {
        return this.bridge.setPhoneNumber(number).then(
            result => {
                return Promise.resolve(result)
            },
            error => {
                return Promise.reject(new Error ("setPhoneNumber failed, error message ::") + error.message)
            }
        )
    } 
 
    //#endregion
    
    //#region - Utils
    /**
     * 
     */
    static gdprForgetMe() {
        this.bridge.gdprForgetMe()
    }

    /**
     * 
     * @param {UploadCountInterval} interval
     */
    static setEventUploadCountInterval(interval) {
        this.bridge.setEventUploadCountInterval(interval)
    }

    /**
     * 
     * @param {UploadTimeInterval} interval 
     */
    static setEventUploadTimeInterval(interval) {
        this.bridge.setEventUploadTimeInterval(interval)
    }

    //#region Platform specific

    /**
     * 
     * @returns ATTStatus = 'unavailable' | 'denied' | 'authorized' | 'restricted' | 'notDetermined'
     */
    static async requestATTPermission() {
        if (Platform.OS !== 'ios') return ATTStatus.UNAVAILABLE;
        return await this.bridge.requestATTPermission();
    }

    /**
     * 
     * @returns {Promise<boolean>} If user granted, returns true, otherwise returns false.
     */
    static async requestNotificationPermissionForiOS(): Promise<boolean> {
        if (Platform.OS !== 'ios') return Promise.reject(new Error("This API is only for iOS"));
        return await this.bridge.requestNotificationPermissionForiOS();
    }

    /**
     * 
     * @param {string} channelName 
     * @param {string} channelDescription 
     */
        static createNotificationChannel(channelName, channelDescription) {
            if (Platform.OS === 'android') {
                this.bridge.createNotificationChannel(channelName, channelDescription)
            }
        }    

    //#endregion

    //#endregion

    //deprecated properties
    //left for backward compatibility
    static INVITE_CHANNEL_KAKAO = "Kakao";
    static INVITE_CHANNEL_NAVER = "Naver";
    static INVITE_CHANNEL_LINE = "Line";
    static INVITE_CHANNEL_GOOGLE = "Google";
    static INVITE_CHANNEL_FACEBOOK = "Facebook";
    static INVITE_CHANNEL_TWITTER = "Twitter";
    static INVITE_CHANNEL_WHATSAPP = "whatsApp";
    static INVITE_CHANNEL_QQ = "QQ";
    static INVITE_CHANNEL_WECHAT = "WeChat";
    static INVITE_CHANNEL_ETC = "ETC";

    static SHARING_CHANNEL_FACEBOOK = "Facebook";
    static SHARING_CHANNEL_KAKAO = "Kakao";
    static SHARING_CHANNEL_KAKAOSTORY = "KakaoStory";
    static SHARING_CHANNEL_LINE = "Line";
    static SHARING_CHANNEL_TWITTER = "Twitter";
    static SHARING_CHANNEL_WHATSAPP = "whatsApp";
    static SHARING_CHANNEL_QQ = "QQ";
    static SHARING_CHANNEL_WECHAT = "WeChat";
    static SHARING_CHANNEL_SMS = "SMS";
    static SHARING_CHANNEL_EMAIL = "Email";
    static SHARING_CHANNEL_COPYURL = "CopyUrl";
    static SHARING_CHANNEL_ETC = "ETC";

    static SIGNUP_CHANNEL_KAKAO = "Kakao";
    static SIGNUP_CHANNEL_NAVER = "Naver";
    static SIGNUP_CHANNEL_LINE = "Line";
    static SIGNUP_CHANNEL_GOOGLE = "Google";
    static SIGNUP_CHANNEL_FACEBOOK = "Facebook";
    static SIGNUP_CHANNEL_TWITTER = "Twitter";
    static SIGNUP_CHANNEL_WHATSAPP = "whatsApp";
    static SIGNUP_CHANNEL_QQ = "QQ";
    static SIGNUP_CHANNEL_WECHAT = "WeChat";
    static SIGNUP_CHANNEL_USERID = "UserId";
    static SIGNUP_CHANNEL_ETC = "ETC";
    static SIGNUP_CHANNEL_SKTID = "SkTid";
    static SIGNUP_CHANNEL_APPLEID = "AppleId"; 

    static PAYMENT_METHOD_CREDIT_CARD = "CreditCard";
    static PAYMENT_METHOD_BANK_TRASNFER = "BankTransfer";
    static PAYMENT_METHOD_MOBILE_PAYMENT = "MobilePayment";
    static PAYMENT_METHOD_ETC = "ETC";

    static CURRENCY_KR_KRW = "KRW";
    static CURRENCY_US_USD = "USD";
    static CURRENCY_JP_JPY = "JPY";
    static CURRENCY_EU_EUR = "EUR";
    static CURRENCY_UK_GBP = "GBP";
    static CURRENCY_CN_CNY = "CNY";
    static CURRENCY_TW_TWD = "TWD";
    static CURRENCY_HK_HKD = "HKD";
    static CURRENCY_ID_IDR = "IDR";
    static CURRENCY_IN_INR = "INR";
    static CURRENCY_RU_RUB = "RUB";
    static CURRENCY_TH_THB = "THB";
    static CURRENCY_VN_VND = "VND";
    static CURRENCY_MY_MYR = "MYR";

    static GENDER_MALE = 2;
    static GENDER_FEMALE = 1;
    static GENDER_UNKOWN = 0;

    static UPLOAD_COUNT_INTERVAL_MIN = 10;
    static UPLOAD_COUNT_INTERVAL_NORMAL = 30;
    static UPLOAD_COUNT_INTERVAL_MAX = 60;

    static UPLOAD_TIME_INTERVAL_MIN = 30;
    static UPLOAD_TIME_INTERVAL_NORMAL = 60;
    static UPLOAD_TIME_INTERVAL_MAX = 120;
}