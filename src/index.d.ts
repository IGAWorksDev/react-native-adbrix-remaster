

export function minus(a: number, b: number): Promidse<number>;

export function deeplinkListener(subscriber: (deeplink: {deeplink: string}) => void): EmitterSubscription;
export function inAppMessageClickListener(subscriber: (args: { actionId: string, actionType: string, actionArg: string, isClosed: boolean }) => void): EmitterSubscription 

//#region - UserProperty
export function login(userId: string): void;
export function logout(): void;
/**
 * 
 * @param gender 0 = unknown, 1 = female, 2 = male, or AdbrixRm.Gender.UNKNOWN | FEMALE | MALE
 */
export function setGender(gender: GenderType[keyof GenderType]): void;
export function setAge(age: number): void;
export function saveUserProperties(userProperty: UserProperties): void;
//#endregion

//#region - Event

//#region - Common
export function event(eventName: String, attr?: AttrModel): void;
export function commonSignUp(channel: SignUpChannelType[keyof SignUpChannelType], attr?: AttrModel): void;

/**
 * 
 * @param prev - previous version of this app
 * @param curr - current version of this app
 * @param attr  
 */
export function commonAppUpdate(prev: string, curr: string, attr?: AttrModel): void;
export function commonInvite(channel: InviteChannelType[keyof InviteChannelType], attr?: AttrModel): void;
export function commonUseCredit(attr?: AttrModel): void;
export function commonPurchase(
    orderId: string,
    productList: ProductModelList,
    orderSales: number,
    discount: number,
    deliveryCharge: number,
    paymentMethod: PaymentMethodType[keyof PaymentMethodType],
    attr?: AttrModel): void;
//#endregion

//#region - Commerce
export function commerceViewHome(attr?: AttrModel): void;

export function commerceCategoryView(
    category: CategoryModel,
    productList: ProductModelList,
    attr?: AttrModel): void

export function commerceProductView(
    productInfo: ProductModel,
    attr?: AttrModel
): void;

export function commerceAddToCart(
    productList: ProductModelList,
    attr?: AttrModel
): void;

export function commerceAddToWishList(
    productInfo: ProductModel,
    attr?: AttrModel
): void;

export function commerceReviewOrder(
    orderId: string,
    productList: ProductModelList,
    discount: number,
    deliveryCharge: number,
    attr?: AttrModel
): void;

export function commerceRefund(
    orderId: string,
    productList: ProductModelList,
    penaltyCharge: number,
    attr?: AttrModel
): void;

export function commerceSearch(
    keyword: string,
    productList: ProductModelList,
    attr?: AttrModel
): void;

export function commerceShare(
    channel: SharingChannelType[keyof SharingChannelType],
    productInfo: ProductModel,
    attr?: AttrModel
): void;

export function commerceListView(
    productList: ProductModelList,
    attr?: AttrModel
): void;

export function commerceCartView(
    productList: ProductModelList,
    attr?: AttrModel
): void;

export function commercePaymentInfoAdded(
    attr?: AttrModel
): void;

export function gameTutorialCompleted(
    isSkip: boolean,
    attr?: AttrModel
): void;

export function gameCharacterCreated(
    attr?: AttrModel
): void;

export function gameStageCleared(
    stageName: string,
    attr?: AttrModel
): void;

export function gameLevelAchieved(
    level: number,
    attr?: AttrModel
): void;
//#endregion


//#region - Growth Action
export function setPushEnable(isEnabled: boolean): void;
export function createNotificationChannel(channelName: string, channelDescription: string): void;
export function setSubscriptionStatus(status: SubscriptionStatus): Promise<any>;
export function getSubscriptionStatus(): Promise<SubscriptionStatus>;
export function setKakaoId(kakaoId: string): Promise<any>
export function setPhoneNumber(number: string): Promise<any>;
//#endregion

//#region - Util
export function gdprForgetMe(): void;
export function setEventUploadCountInterval(interval: UploadCountIntervalType[keyof UploadCountIntervalType]);
export function setEventUploadTimeInterval(interval: UploadTimeIntervalType[keyof UploadTimeIntervalType]);
export function requestATTPermission(): Promise<ATTStatusType>;
export function requestNotificationPermissionForiOS(): Promise<boolean>
//#endregion

//#region - Model
export class CategoryModel {
    categories: string[];

    constructor();

    /**
    * @param {string} category
    */
    setCategory(category: string): void;

    /**
    * @param {string} category1
    * @param {string} category2
    * @param {string} category3
    * @param {string} category4
    * @param {string} category5
    */
    setCategories(
        category1: string,
        category2?: string,
        category3?: string,
        category4?: string,
        category5?: string
    ): void;

    getCategory(): string[];
}

export class UserProperties {
    obj: Record<string, string | number | boolean>;

    constructor();

    /**
    * @param {string} key
    * @param {string | number | boolean} value
    */
    setProperty(key: string, value: string | number | boolean): void;

    getProperties(): Record<string, string | number | boolean>;
}

export class AttrModel {
    obj: Record<string, string | number | boolean>;

    constructor();

    /**
    * @param {string} key
    * @param {string | number | boolean} value
    */
    setAttrs(key: string, value: string | number | boolean): void;

    getAttrs(): Record<string, string | number | boolean>;
}

export class ProductModel {
    obj: Record<string, any>;

    constructor();

    /**
    * 
    * @param {string} productId 
    * @param {string} productName 
    * @param {number} price 
    * @param {number} quantity 
    * @param {number} discount 
    * @param {?Currency} currencyString 
    * @param {?CategoryModel} categories 
    * @param {?AttrModel} attr 
    */
    setModel(
        productId: string,
        productName: string,
        price: number,
        quantity: number,
        discount: number,
        currencyString?: CurrencyType[keyof CurrencyType],
        categories?: CategoryModel,
        attr?: AttrModel): void;

    /**
    * @param {string} productId
    */
    setProductId(productId: string): void;

    /**
    * @param {string} productName
    */
    setProductName(productName: string): void;

    /**
    * @param {number} price
    */
    setPrice(price: number): void;

    /**
    * @param {number} quantity
    */
    setQuantity(quantity: number): void;

    /**
    * @param {'KRW' | 'USD' | 'JPY' | 'EUR' | 'GBP' | 'CNY' | 'TWD' | 'HKD' | 'IDR' | 'INR' | 'RUB' | 'THB' | 'VND' | 'MYR'} currency
    * or set AdbrixRm.Currency.KRW / USD / JPY ...
    */
    setCurrency(
        currency: CurrencyType[keyof CurrencyType]
    ): void;

    /**
    * @param {CategoryModel} category
    */
    setCategory(category: CategoryModel): void;

    /**
    * @param {number} discount
    */
    setDiscount(discount: number): void;

    getProductModel(): Record<string, any>;
}

export class ProductModelList {
    list: Array<ProductModel>;

    constructor();

    /**
     * 
     * @param {ProductModel} product 
     */
    setProduct(product: ProductModel): void;

    getProductList(): Array<ProductModel>;
}

export class SubscriptionStatus {
    obj: Record<string, any>;
    constructor();
    setInformativeNotificationFlag(isSubscribed: boolean): void;
    getInformativeNotificationFlag(): SubscriptionFlagType[keyof SubscriptionFlagType];
    setMarketingNotificationFlag(isSubscribed: boolean): void;
    getMarketingNotificationFlag(): SubscriptionFlagType[keyof SubscriptionFlagType];
    setMarketingPushNotificationFlag(isSubscribed: boolean): void;
    getMarketingPushNotificationFlag(): SubscriptionFlagType[keyof SubscriptionFlagType];
    setMarketingSMSNotificationFlag(isSubscribed: boolean): void;
    getMarketingSMSNotificationFlag(): SubscriptionFlagType[keyof SubscriptionFlagType];
    setMarketingKakaoNotificationFlag(isSubscribed: boolean): void;
    getMarketingKakaoNotificationFlag(): SubscriptionFlagType[keyof SubscriptionFlagType];
    setMarketingNightNotificationFlag(isSubscribed: boolean): void;
    getMarketingNightNotificationFlag(): SubscriptionFlagType[keyof SubscriptionFlagType];
    setMarketingNightPushNotificationFlag(isSubscribed: boolean): void;
    getMarketingNightPushNotificationFlag(): SubscriptionFlagType[keyof SubscriptionFlagType];
    setMarketingNightSMSNotificationFlag(isSubscribed: boolean): void;
    getMarketingNightSMSNotificationFlag(): SubscriptionFlagType[keyof SubscriptionFlagType];
    setMarketingNightKakaoNotificationFlag(isSubscribed: boolean): void;
    getMarketingNightKakaoNotificationFlag(): SubscriptionFlagType[keyof SubscriptionFlagType];
    getObj(): { [key: string]: SubscriptionFlagType[keyof SubscriptionFlagType] };
}

interface SubscriptionFlagType {
    SUBSCRIBED : "SUBSCRIBED",
    UNSUBSCRIBED : "UNSUBSCRIBED",
    UNDEFINED : "UNDEFINED",
};
export const SubscriptionFlag: SubscriptionFlagType;

interface GenderType {
    UNKNOWN: 0;
    FEMALE: 1;
    MALE: 2;
};
export const Gender: GenderType;

interface PaymentMethodType {
    CREDIT_CARD: 'CreditCard',
    BANK_TRANSFER: 'BankTransfer',
    MOBILE_PAYMENT: 'MobilePayment',
    ETC: 'ETC',
};
export const PaymentMethod: PaymentMethodType;

interface CurrencyType {
    KRW: 'KRW',
    USD: 'USD',
    JPY: 'JPY',
    EUR: 'EUR',
    GBP: 'GBP',
    CNY: 'CNY',
    TWD: 'TWD',
    HKD: 'HKD',
    IDR: 'IDR',
    INR: 'INR',
    RUB: 'RUB',
    THB: 'THB',
    VND: 'VND',
    MYR: 'MYR',
}
export const Currency: CurrencyType;

interface SignUpChannelType {
    KAKAO: 'Kakao',
    NAVER: 'Naver',
    LINE: 'Line',
    GOOGLE: 'Google',
    FACEBOOK: 'Facebook',
    TWITTER: 'Twitter',
    WHATSAPP: 'whatsApp',
    QQ: 'QQ',
    WECHAT: 'WeChat',
    USERID: 'UserId',
    ETC: 'ETC',
    SKTID: 'SkTid',
    APPLEID: 'AppleId',
}
export const SignUpChannel: SignUpChannelType;

interface InviteChannelType {
    KAKAO: 'Kakao',
    NAVER: 'Naver',
    LINE: 'Line',
    GOOGLE: 'Google',
    FACEBOOK: 'Facebook',
    TWITTER: 'Twitter',
    WHATSAPP: 'whatsApp',
    QQ: 'QQ',
    WECHAT: 'WeChat',
    ETC: 'ETC',
}
export const InviteChannel: InviteChannelType;

interface SharingChannelType {
    FACEBOOK: 'Facebook',
    KAKAOTALK: 'KakaoTalk',
    KAKAOSTORY: 'KakaoStory',
    LINE: 'Line',
    WHATSAPP: 'whatsApp',
    QQ: 'QQ',
    WECHAT: 'WeChat',
    SMS: 'SMS',
    EMAIL: 'Email',
    COPYURL: 'copyUrl',
    ETC: 'ETC',
}
export const SharingChannel: SharingChannelType;

interface UploadCountIntervalType {
    MIN: 10,
    NORMAL: 30,
    MAX: 60,
};
export const UploadCountInterval: UploadCountIntervalType;

interface UploadTimeIntervalType {
    MIN: 30,
    NORMAL: 60,
    MAX: 120,
};
export const UploadTimeInterval: UploadTimeIntervalType;

interface ATTStatusType {
    UNAVAILABLE: 'unavailable',
    DENIED: 'denied',
    AUTHORIZED: 'authorized',
    RESTRICTED: 'restricted',
    NOTDETERMINED: 'notDetermined'
}
export const ATTStatus: ATTStatusType;
//#endregion