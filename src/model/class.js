import { Currency, SignUpChannel, SubscriptionFlag } from "./enum";

export class UserProperties {
    constructor() {
        this.obj = {};
    }

    /**
    * @param {string} key
    * @param {string|number|boolean} value
    */
    setProperty(key, value) {
        this.obj[key] = value;
    }

    getProperties() {
        return { ...this.obj };
    }
}

export class AttrModel {
    constructor() {
        this.obj = {};
    }

    /**
    * @param {string} key
    * @param {string|number|boolean} value
    */
    setAttrs(key, value) {
        this.obj[key] = value;
    }

    getAttrs() {
        return { ...this.obj };
    }
}

export class CategoryModel {
    constructor() {
        this.categories = [];
    }

    /**
    * @param {string} category
    */
    setCategory(category) {
        this.categories.push(category);
    }

    /**
    * @param {string} category1
    * @param {string} category2
    * @param {string} category3
    * @param {string} category4
    * @param {string} category5
    */
    setCategories(category1, category2, category3, category4, category5) {
        this.categories = [category1, category2, category3, category4, category5];
    }

    getCategory() {
        return [...this.categories];
    }
}

export class ProductModelList {
    constructor() {
        this.list = []
    }

    /**
     * 
     * @param {ProductModel} product 
     */
    setProduct(product: ProductModel) {
        this.list.push(product.getProductModel());
    }
    getProductList() {
        return this.list.slice();
    }
}

export class ProductModel {
    constructor() {
        this.obj = {};
    }

    /**
     * 
     * @param {string} productId 
     * @param {string} productName 
     * @param {number} price 
     * @param {number} quantity 
     * @param {number} discount 
     * @param {Currency} [currencyString] 
     * @param {CategoryModel} [categories]
     * @param {AttrModel} [attr] 
     */
    setModel(
        productId,
        productName,
        price,
        quantity,
        discount,
        currencyString,
        categories,
        attr = new AttrModel()) {

        this.setProductId(productId);
        this.setProductName(productName);
        this.setPrice(price);
        this.setQuantity(quantity);
        this.setCurrency(currencyString);
        this.setCategory(categories);
        this.setDiscount(discount);
        this.obj["productAttrsMap"] = attr.getAttrs();
    }


    /**
    * @param {string} productId
    */
    setProductId(productId) {
        this.obj["productId"] = productId;
    }

    /**
    * @param {string} productName
    */
    setProductName(productName) {
        this.obj["productName"] = productName;
    }

    /**
    * @param {number} price
    */
    setPrice(price) {
        this.obj["price"] = price;
    }

    /**
    * @param {number} quantity
    */
    setQuantity(quantity) {
        this.obj["quantity"] = quantity;
    }

    /**
    * @param {('KRW'|'USD'|'JPY'|'EUR'|'GBP'|'CNY'|'TWD'|'HKD'|'IDR'|'INR'|'RUB'|'THB'|'VND'|'MYR')} currency
    * or set AdbrixRm.Currency.KRW / USD / JPY ...
    */
    setCurrency(currency) {
        if (Object.values(Currency).includes(currency)) {
            this.obj["currency"] = currency;
        } else {
            return
        }
    }

    /**
    * @param {CategoryModel} category
    */
    setCategory(category) {
        if (category instanceof CategoryModel) {
            this.obj["category"] = category.getCategory();
        } else {
            return
        }
    }

    /**
    * @param {number} discount
    */
    setDiscount(discount) {
        this.obj["discount"] = discount;
    }

    getProductModel() {
        return { ...this.obj };
    }
}

export class SubscriptionStatus {
    constructor() {
        this.obj = {};
    } 

    /**
     * 
     * @param {boolean} isSubscribed 
     * @returns 
     */
    setInformativeNotificationFlag(isSubscribed: boolean) {
        if (typeof isSubscribed !== "boolean") {
            return;
        }

        if (isSubscribed) {
            this.obj["informative"] = "SUBSCRIBED"
        } else {
            this.obj["informative"] = "UNSUBSCRIBED"

        }
    }

    /**
     * 
     * @returns SubscriptionFlag
     */
    getInformativeNotificationFlag(): SubscriptionFlag {
        return this.obj["informative"] ?? SubscriptionFlag.UNDEFINED;
    }

    /**
     * 
     * @param {boolean} isSubscribed 
     * @returns 
     */
    setMarketingNotificationFlag(isSubscribed: boolean) {
        if (typeof isSubscribed !== "boolean") {
            return;
        }

        if (isSubscribed) {
            this.obj["marketing"] = "SUBSCRIBED"
        } else {
            this.obj["marketing"] = "UNSUBSCRIBED"
        }
    }

    /**
     * 
     * @returns SubscriptionFlag
     */
    getMarketingNotificationFlag(): SubscriptionFlag {
        return this.obj["marketing"] ?? SubscriptionFlag.UNDEFINED;
    }

    /**
     * 
     * @param {boolean} isSubscribed 
     * @returns 
     */
    setMarketingPushNotificationFlag(isSubscribed: boolean) {
        if (typeof isSubscribed !== "boolean") {
            return;
        }

        if (isSubscribed) {
            this.obj["marketing_push"] = "SUBSCRIBED"
        } else {
            this.obj["marketing_push"] = "UNSUBSCRIBED"
        }
    }

    /**
     * 
     * @returns SubscriptionFlag
     */
    getMarketingPushNotificationFlag(): SubscriptionFlag {
        return this.obj["marketing_push"] ?? SubscriptionFlag.UNDEFINED;
    }

    /**
     * 
     * @param {boolean} isSubscribed 
     * @returns 
     */
    setMarketingSMSNotificationFlag(isSubscribed: boolean) {
        if (typeof isSubscribed !== "boolean") {
            return;
        }

        if (isSubscribed) {
            this.obj["marketing_sms"] = "SUBSCRIBED"
        } else {
            this.obj["marketing_sms"] = "UNSUBSCRIBED"
        }
    }

    /**
     * 
     * @returns SubscriptionFlag
     */
    getMarketingSMSNotificationFlag(): SubscriptionFlag {
        return this.obj["marketing_sms"] ?? SubscriptionFlag.UNDEFINED;
    }

    /**
     * 
     * @param {boolean} isSubscribed
     * @returns 
     */
    setMarketingKakaoNotificationFlag(isSubscribed: boolean) {
        if (typeof isSubscribed !== "boolean") {
            return;
        }

        if (isSubscribed) {
            this.obj["marketing_kakao"] = "SUBSCRIBED"
        } else {
            this.obj["marketing_kakao"] = "UNSUBSCRIBED"
        }
    }

    /**
     * 
     * @returns SubscriptionFlag
     */
    getMarketingKakaoNotificationFlag(): SubscriptionFlag {
        return this.obj["marketing_kakao"] ?? SubscriptionFlag.UNDEFINED;
    }
    
    /**
     * 
     * @param {boolean} isSubscribed 
     * @returns 
     */
    setMarketingNightNotificationFlag(isSubscribed: boolean) {
        if (typeof isSubscribed !== "boolean") {
            return;
        }

        if (isSubscribed) {
            this.obj["marketing_night"] = "SUBSCRIBED"
        } else {
            this.obj["marketing_night"] = "UNSUBSCRIBED"
        }
    }

    /**
     * 
     * @returns SubscriptionFlag
     */
    getMarketingNightNotificationFlag(): SubscriptionFlag {
        return this.obj["marketing_night"] ?? SubscriptionFlag.UNDEFINED;
    }

    /**
     * 
     * @param {boolean} isSubscribed 
     * @returns 
     */
    setMarketingNightPushNotificationFlag(isSubscribed: boolean) {
        if (typeof isSubscribed !== "boolean") {
            return;
        }

        if (isSubscribed) {
            this.obj["marketing_night_push"] = "SUBSCRIBED"
        } else {
            this.obj["marketing_night_push"] = "UNSUBSCRIBED"
        }
    }

    /**
     * 
     * @returns SubscriptionFlag
     */
    getMarketingNightPushNotificationFlag(): SubscriptionFlag {
        return this.obj["marketing_night_push"] ?? SubscriptionFlag.UNDEFINED;
    }

    /**
     * 
     * @param {boolean} isSubscribed 
     * @returns 
     */
    setMarketingNightSMSNotificationFlag(isSubscribed: boolean) {
        if (typeof isSubscribed !== "boolean") {
            return;
        }

        if (isSubscribed) {
            this.obj["marketing_night_sms"] = "SUBSCRIBED"
        } else {
            this.obj["marketing_night_sms"] = "UNSUBSCRIBED"
        }
    }

    /**
     * 
     * @returns SubscriptionFlag
     */
    getMarketingNightSMSNotificationFlag(): SubscriptionFlag {
        return this.obj["marketing_night_sms"] ?? SubscriptionFlag.UNDEFINED;
    }

    /**
     * 
     * @param {boolean} isSubscribed 
     * @returns 
     */
    setMarketingNightKakaoNotificationFlag(isSubscribed: boolean) {
        if (typeof isSubscribed !== "boolean") {
            return;
        }

        if (isSubscribed) {
            this.obj["marketing_night_kakao"] = "SUBSCRIBED"
        } else {
            this.obj["marketing_night_kakao"] = "UNSUBSCRIBED"
        }
    }

    /**
     * 
     * @returns SubscriptionFlag
     */
    getMarketingNightKakaoNotificationFlag(): SubscriptionFlag {
        return this.obj["marketing_night_kakao"] ?? SubscriptionFlag.UNDEFINED;
    }

    getObj() {
        return { ...this.obj };    
    }
}