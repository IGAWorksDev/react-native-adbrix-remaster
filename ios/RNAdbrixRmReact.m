
#import "RNAdbrixRmReact.h"

static RNAdbrixRmReact *_sharedInstance = nil;

@implementation RNAdbrixRmReact

NSString *const DEFERRED_LINK_LISTENER_CALLBACK = @"DfnDeferredDeeplinkListener";
NSString *const DEEP_LINK_LISTENER_CALLBACK = @"DfnDeeplinkListener";
NSString *const LOCAL_PUSH_MESSAGE_CALLBACK = @"DfnLocalPushMessageListener";
NSString *const REMOTE_PUSH_MESSAGE_CALLBACK = @"DfnRemotePushMessageListener";
NSString *const IN_APP_MESSAGE_CLICK_CALLBACK = @"DfnInAppMessageClickListener";
NSString *const IN_APP_MESSAGE_AUTO_FETCH_CALLBACK = @"DfnInAppMessageAutoFetchListener";
NSString *const LOG_LISTENER_CALLBACK = @"DfnLogListener";

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(AdbrixRm)

// Version 2 note: 20210707
// Remove startAdbrixSDK API, add new initRNPlugin API
// startAdbrixSDK (v1): Move to native android code. This part needs low level integration with android platform
// Use React Native Linking class instead. https://reactnative.dev/docs/linking

+ (id)allocWithZone:(NSZone *)zone {
    static RNAdbrixRmReact *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

+ (void)initialize
{
    if (self == [RNAdbrixRmReact class])
    {
        _sharedInstance = [[self alloc] init];
    }
    
    [[RNAdbrixRmReact sharedInstance]setDeferredDeeplinkListener];
    [[RNAdbrixRmReact sharedInstance]setAdBrixDeeplinkDelegate];
    [[RNAdbrixRmReact sharedInstance]setAdBrixPushRemoteDelegate];
    [[RNAdbrixRmReact sharedInstance]setInAppMessageFetchDelegateWithDelegate];
    [[RNAdbrixRmReact sharedInstance]setInAppMessageClickDelegate];
    [[RNAdbrixRmReact sharedInstance]setLogDelegate];
}
+ (RNAdbrixRmReact *)sharedInstance
{
    return _sharedInstance;
}
- (NSArray<NSString *> *)supportedEvents
{
    return @[DEFERRED_LINK_LISTENER_CALLBACK, DEEP_LINK_LISTENER_CALLBACK, LOCAL_PUSH_MESSAGE_CALLBACK, LOG_LISTENER_CALLBACK, REMOTE_PUSH_MESSAGE_CALLBACK, IN_APP_MESSAGE_CLICK_CALLBACK, IN_APP_MESSAGE_AUTO_FETCH_CALLBACK];
}

- (void)setDeferredDeeplinkListener
{
    [[AdBrixRM sharedInstance] setDeferredDeeplinkDelegateWithDelegate:self];
}

- (void)setAdBrixDeeplinkDelegate
{
    [[AdBrixRM sharedInstance] setDeeplinkDelegateWithDelegate:self];
}

- (void)setAdBrixPushRemoteDelegate
{
    [[AdBrixRM sharedInstance] setAdBrixRmPushRemoteDelegateWithDelegate:self];
}

- (void)setInAppMessageFetchDelegateWithDelegate
{
    [[AdBrixRM sharedInstance] setInAppMessageAutoFetchDelegateWithDelegate:self];
}

- (void)setInAppMessageClickDelegate
{
    [[AdBrixRM sharedInstance] setInAppMessageClickDelegateWithDelegate:self];
}

- (void)setLogDelegate
{
    [[AdBrixRM sharedInstance] setLogDelegateWithDelegate:self];
}

- (void)didReceiveDeferredDeeplinkWithDeeplink:(NSString *)deeplink
{
    @try {
        [self sendEventWithName:DEFERRED_LINK_LISTENER_CALLBACK body:deeplink];
    }
    @catch ( NSException *e ) {
        NSLog(@"%@ Exception: %@", DEFERRED_LINK_LISTENER_CALLBACK, e);
    }
    
}

- (void)didReceiveDeeplinkWithDeeplink:(NSString *)deeplink
{
    @try {
        [self sendEventWithName:DEEP_LINK_LISTENER_CALLBACK body:deeplink];
    }
    @catch ( NSException *e ) {
        NSLog(@"%@ Exception: %@", DEEP_LINK_LISTENER_CALLBACK, e);
    }
}

- (void)pushRemoteCallbackWithData:(NSDictionary<NSString *,id> *)data state:(UIApplicationState)state
{
    @try {
        [self sendEventWithName:REMOTE_PUSH_MESSAGE_CALLBACK body:data];
    }
    @catch ( NSException *e ) {
        NSLog(@"%@ Exception: %@", REMOTE_PUSH_MESSAGE_CALLBACK, e);
    }
}

- (void)onReceiveInAppMessageClickWithActionId:(NSString * _Nonnull)actionId actionType:(NSString * _Nonnull)actionType actionArg:(NSString * _Nonnull)actionArg isClosed:(BOOL)isClosed
{
    @try {
        [self sendEventWithName:IN_APP_MESSAGE_CLICK_CALLBACK body:actionId];
    }
    @catch ( NSException *e ) {
        NSLog(@"%@ Exception: %@", IN_APP_MESSAGE_CLICK_CALLBACK, e);
    }
}


- (void)didPrintLogWithLevel:(enum AdBrixLogLevel)level log:(NSString * _Nonnull)log;
{
    @try {
        [self sendEventWithName:LOG_LISTENER_CALLBACK body:log];
    }
    @catch ( NSException *e ) {
        NSLog(@"%@ Exception: %@", LOG_LISTENER_CALLBACK, e);
    }
}

- (void)didFetchInAppMessageWithResult:(DfnInAppMessageFetchResult *)result
{
    @try {
        [self sendEventWithName:IN_APP_MESSAGE_AUTO_FETCH_CALLBACK body:result];
    }
    @catch ( NSException *e ) {
        NSLog(@"%@ Exception: %@", IN_APP_MESSAGE_AUTO_FETCH_CALLBACK, e);
    }
}

- (NSString *)checkNilToBlankString:(id)target
{
    NSString *returnString = @"";
    if (!([target isEqual:[NSNull null]] || target == nil))
    {
        returnString = target;
    }
    
    return returnString;
}

- (double)checkDoubleNilToZero:(id)target
{
    double returnDouble = 0.0f;
    if (!([target isEqual:[NSNull null]] || target == nil))
    {
        returnDouble = (double)[target doubleValue];
    }
    
    return returnDouble;
}

- (NSInteger)checkIntegerNilToZero:(id)target
{
    NSInteger returnInteger = 0;
    if (!([target isEqual:[NSNull null]] || target == nil))
    {
        returnInteger = [target integerValue];
    }
    
    return returnInteger;
}

-(int)getCodeFromSharingChannel:(NSString *)channelName
{
    if([channelName isEqualToString:@"FaceBook"]){
        return 1;
    }
    else if([channelName isEqualToString:@"Kakao"]){
        return 2;
    }
    else if([channelName isEqualToString:@"KakaoStory"]){
        return 3;
    }
    else if([channelName isEqualToString:@"Line"]){
        return 4;
    }
    else if([channelName isEqualToString:@"whatsApp"]){
        return 5;
    }
    else if([channelName isEqualToString:@"QQ"]){
        return 6;
    }
    else if([channelName isEqualToString:@"WeChat"]){
        return 7;
    }
    else if([channelName isEqualToString:@"SMS"]){
        return 8;
    }
    else if([channelName isEqualToString:@"Email"]){
        return 9;
    }
    else if([channelName isEqualToString:@"CopyUrl"]){
        return 10;
    }
    else {
        return 11;
    }
}
-(int)getCodeFromSignUpChannel:(NSString *)channelName
{
    if([channelName isEqualToString:@"Kakao"]){
        return 1;
    }
    else if([channelName isEqualToString:@"Naver"]){
        return 2;
    }
    else if([channelName isEqualToString:@"Line"]){
        return 3;
    }
    else if([channelName isEqualToString:@"Google"]){
        return 4;
    }
    else if([channelName isEqualToString:@"Facebook"]){
        return 5;
    }
    else if([channelName isEqualToString:@"Twitter"]){
        return 6;
    }
    else if([channelName isEqualToString:@"whatsApp"]){
        return 7;
    }
    else if([channelName isEqualToString:@"QQ"]){
        return 8;
    }
    else if([channelName isEqualToString:@"WeChat"]){
        return 9;
    }
    else if([channelName isEqualToString:@"UserId"]){
        return 10;
    }
    else if([channelName isEqualToString:@"SkTid"]){
        return 12;
    }
    else if([channelName isEqualToString:@"AppleId"]){
        return 13;
    }
    else {
        return 11;
    }
}
-(int)getCodeFromInviteChannel:(NSString *)channelName
{
    if([channelName isEqualToString:@"Kakao"]){
        return 1;
    }
    else if([channelName isEqualToString:@"Naver"]){
        return 2;
    }
    else if([channelName isEqualToString:@"Line"]){
        return 3;
    }
    else if([channelName isEqualToString:@"Google"]){
        return 4;
    }
    else if([channelName isEqualToString:@"Facebook"]){
        return 5;
    }
    else if([channelName isEqualToString:@"Twitter"]){
        return 6;
    }
    else if([channelName isEqualToString:@"whatsApp"]){
        return 7;
    }
    else if([channelName isEqualToString:@"QQ"]){
        return 8;
    }
    else if([channelName isEqualToString:@"WeChat"]){
        return 9;
    }
    else {
        return 10;
    }
}
-(int)getCodeFromPaymentMethod:(NSString *)paymentMethod
{
    if([paymentMethod isEqualToString:@"CreditCard"]){
        return 1;
    }
    else if([paymentMethod isEqualToString:@"BankTransfer"]){
        return 2;
    }
    else if([paymentMethod isEqualToString:@"MobilePayment"]){
        return 3;
    }
    else {
        return 4;
    }
}

-(AdBrixRmCommerceProductCategoryModel *)getCategoryModel:(NSArray *)categoryString
{
    NSString *categories[5];
    for (int i=0; i<categoryString.count; ++i)
    {
        if(i>=5){
            break;
        }
        categories[i] = categoryString[i];
    }
    AdBrixRmCommerceProductCategoryModel *categoryModel = [[AdBrixRM sharedInstance] createCommerceProductCategoryDataWithCategory:categories[0] category2:categories[1] category3:categories[2] category4:categories[3] category5:categories[4]];
    return categoryModel;
}
- (NSDictionary *)getDictionaryFromAttrs:(NSString *)attrString
{
    NSError *error;
    NSData *jsonData = [attrString dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *json = [NSJSONSerialization
                          JSONObjectWithData:jsonData
                          options:NSJSONReadingMutableContainers
                          error:&error];
    return json;
}
- (AdBrixRmAttrModel *)getAttrModelFromAttrString:(NSString *)attrString
{
    NSDictionary *dictionary = [self getDictionaryFromAttrs:attrString];
    if(dictionary == NULL) {
        return NULL;
    }
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    
    [dictionary enumerateKeysAndObjectsUsingBlock:^(id key, id value, BOOL* stop) {
        if([value isKindOfClass:[NSString class]]) {
            [attrModel setAttrDataString:key :value];
        } else if(strcmp([value objCType], @encode(long)) == 0) {
            [attrModel setAttrDataInt:key :[value intValue]];
        } else if(strcmp([value objCType], @encode(bool)) == 0 || strcmp([value objCType], @encode(char)) == 0) {
            [attrModel setAttrDataBool:key :[value boolValue]];
        } else if(strcmp([value objCType], @encode(double)) == 0) {
            [attrModel setAttrDataDouble:key :[value doubleValue]];
        } else {
            NSLog(@"%@", [@"abxrm error :: unknown data type key:: " stringByAppendingString: key]);
            NSLog(@"%@", [@"abxrm error :: unknown data type type:: " stringByAppendingString: [NSString stringWithUTF8String:[value objCType]]]);
        }
    }];
    
    return attrModel;
}
- (AbxRemotePushModel *)getRemotePushModelFromJsonString:(NSString *) pushJsonString
{
    if (pushJsonString == NULL)
    {
        NSLog(@"pushJsonString is NULL");
        return NULL;
    }
    
    NSError *error = [[NSError alloc] init];
    NSData *jsonData = [pushJsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *dictionary = [NSJSONSerialization
                          JSONObjectWithData:jsonData
                          options:NSJSONReadingMutableContainers
                          error:&error];
    if (dictionary == NULL) {
        return NULL;
    }

    AbxRemotePushModel * abxRemotePushModel = [AbxRemotePushModel alloc];
    @try {
        NSString* campaignId = dictionary[@"abx:gf:campaign_id"];
        NSInteger campaignRevisionNo = [dictionary[@"abx:gf:campaign_revision_no"] integerValue];
        NSString* stepId = dictionary[@"abx:gf:step_id"];
        NSString* cycleTime = dictionary[@"abx:gf:step_id"];
        NSLog(@"campaignId : %@s", campaignId);
        NSLog(@"cycleTime : %@s", cycleTime);
        abxRemotePushModel = [abxRemotePushModel initWithCampaignId:campaignId campaignRevisionNo:campaignRevisionNo stepId:stepId cycleTime:cycleTime error:&error];
    } @catch (NSException *exception) {
        NSLog(@"getRemotePushModelFrom catch");
    }

    
    NSLog(@"model : %@s", @[abxRemotePushModel]);
    return abxRemotePushModel;
}
- (NSArray *)getArrayFromString : (NSString *)arrayString
{
    NSCharacterSet *characterSet = [NSCharacterSet characterSetWithCharactersInString:@"[] "];
    NSArray *array = [[[arrayString componentsSeparatedByCharactersInSet:characterSet]
                       componentsJoinedByString:@""]
                      componentsSeparatedByString:@","];
    return array;
}
-(AdBrixRmCommerceProductModel *)getProductModel:(NSDictionary *)element {
    NSString *_productId = @"";
    NSString *_productName = @"";
    double _price = 0.0;
    double _discount = 0.0;
    NSUInteger _quantity = 1;
    NSString *_currency = @"";
    NSDictionary *_extraAttrs;
    NSArray *temp;
    AdBrixRmCommerceProductCategoryModel * _cate = [[RNAdbrixRmReact sharedInstance]getCategoryModel:temp];
    AdBrixRmCommerceProductModel *productModel;
    
    for(NSString* key in element)
    {
        if(![key isKindOfClass:[NSNull class]])
        {
            if ([key isEqualToString:@"productId"])
            {
                _productId = [[RNAdbrixRmReact sharedInstance] checkNilToBlankString : [element objectForKey:key]];
            }
            if ([key isEqualToString:@"productName"])
            {
                _productName = [[RNAdbrixRmReact sharedInstance] checkNilToBlankString : [element objectForKey:key]];
            }
            if ([key isEqualToString:@"price"])
            {
                _price = [[RNAdbrixRmReact sharedInstance] checkDoubleNilToZero : [element objectForKey:key]];
            }
            if ([key isEqualToString:@"discount"])
            {
                _discount = [[RNAdbrixRmReact sharedInstance] checkDoubleNilToZero : [element objectForKey:key]];
            }
            if ([key isEqualToString:@"quantity"])
            {
                _quantity = [[RNAdbrixRmReact sharedInstance] checkIntegerNilToZero : [element objectForKey:key]];
            }
            if ([key isEqualToString:@"currency"])
            {
                _currency = [[RNAdbrixRmReact sharedInstance] checkNilToBlankString : [element objectForKey:key]];
            }
            if ([key isEqualToString:@"category"])
            {
                _cate = [[RNAdbrixRmReact sharedInstance] getCategoryModel : [element objectForKey:key]];
            }
            if ([key isEqualToString:@"extra_attrs"])
            {
                _extraAttrs = @{};
            }
        }
    }
    
    
    AdBrixRmAttrModel *attrModel = [[AdBrixRM sharedInstance] createAttrModelWithDictionary:_extraAttrs];
    productModel = [[AdBrixRM sharedInstance] createCommerceProductDataWithAttrWithProductId:_productId productName:_productName price:_price quantity:_quantity discount:_discount currencyString:_currency category:_cate productAttrsMap:attrModel];
    return productModel;
}
-(NSArray<AdBrixRmCommerceProductModel *> *)getProductList:(NSString *)productList
{
    NSMutableArray<AdBrixRmCommerceProductModel *> *productListArray = [NSMutableArray array];
    NSArray *productArray = (NSArray<NSDictionary *> *)[[RNAdbrixRmReact sharedInstance]getDictionaryFromAttrs:productList];
    
    for(int i=0; i<productArray.count; i++){
        NSDictionary *element = productArray[i];
        AdBrixRmCommerceProductModel *productModel = [[RNAdbrixRmReact sharedInstance]getProductModel:element];
        [productListArray addObject: productModel];
    }
    return productListArray;
}
//+(NSDictionary )



RCT_EXPORT_METHOD(initRNPlugin)
{
   // Do nothing (Used by android to set Deferred Deeplink Listener)
    NSLog(@"Start Adbrix Dfinery React Native Plugin - JS Part");
}

RCT_EXPORT_METHOD(gdprForgetMe)
{
    [[AdBrixRM sharedInstance] gdprForgetMe];
}
RCT_EXPORT_METHOD(setAge:(int)age)
{
    [[AdBrixRM sharedInstance] setAgeWithInt:age];
}
RCT_EXPORT_METHOD(setGender:(int)gender)
{
    [[AdBrixRM sharedInstance] setGenderWithAdBrixGenderType:[[AdBrixRM sharedInstance] convertGender:gender]];
}
RCT_EXPORT_METHOD(setEventUploadCountInterval:(int)countInterval)
{
    [[AdBrixRM sharedInstance] setEventUploadCountInterval:[[AdBrixRM sharedInstance] convertCountInterval:countInterval]];
}
RCT_EXPORT_METHOD(setEventUploadTimeInterval:(int)timeInterval)
{
    [[AdBrixRM sharedInstance] setEventUploadTimeInterval:[[AdBrixRM sharedInstance] convertTimeInterval:timeInterval]];
}

RCT_EXPORT_METHOD(setLocation:(double)latitude longitude:(double)longitude )
{
    [[AdBrixRM sharedInstance] setLocationWithLatitude:latitude longitude:longitude];
}

RCT_EXPORT_METHOD(saveUserProperties:(NSString *)dictionaryString)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(dictionaryString != NULL){
        attrModel = [self getAttrModelFromAttrString: dictionaryString];
    }
    [[AdBrixRM sharedInstance] setUserPropertiesWithAttrWithAttrModel:attrModel];
}

RCT_EXPORT_METHOD(clearUserProperties)
{
    [[AdBrixRM sharedInstance] clearUserProperties];
}

RCT_EXPORT_METHOD(event:(NSString *)eventName)
{
    [[AdBrixRM sharedInstance] eventWithEventName:eventName];
}

RCT_EXPORT_METHOD(event:(NSString *)eventName attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel;
    if(attrs != NULL){
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    [[AdBrixRM sharedInstance] eventWithAttrWithEventName:eventName value:attrModel];
}

RCT_EXPORT_METHOD(flushAllEvents:(RCTResponseSenderBlock) callback)
{
    void (^completion)(DfnResult*) = ^(DfnResult* result) {
        callback(@[result]);
    };

    [[AdBrixRM sharedInstance] flushAllEventsWithCompletion:completion];
}
RCT_EXPORT_METHOD(login:(NSString *)userId)
{
    [[AdBrixRM sharedInstance] loginWithUserId:userId];
}
RCT_EXPORT_METHOD(logout)
{
    [[AdBrixRM sharedInstance] logout];
}
RCT_EXPORT_METHOD(commerceViewHome)
{
    [[AdBrixRM sharedInstance] commerceViewHome];
}
RCT_EXPORT_METHOD(commerceViewHome:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL){
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    [[AdBrixRM sharedInstance] commerceViewHomeWithAttrWithOrderAttr:attrModel];
}

RCT_EXPORT_METHOD(commerceCategoryView:(NSString *)categoryArray productList:(NSString *)productList)
{
    NSArray *categoryList = [[RNAdbrixRmReact sharedInstance]getArrayFromString:categoryArray];
    AdBrixRmCommerceProductCategoryModel *cate = [[RNAdbrixRmReact sharedInstance]getCategoryModel:categoryList];
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceCategoryViewWithCategory:cate productInfo:productArray];
}

RCT_EXPORT_METHOD(commerceCategoryView:(NSString *)categoryArray productList:(NSString *)productList attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    
    NSArray *categoryList = [[RNAdbrixRmReact sharedInstance]getArrayFromString:categoryArray];
    AdBrixRmCommerceProductCategoryModel *cate = [[RNAdbrixRmReact sharedInstance]getCategoryModel:categoryList];
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    AdBrixRmAttrModel *attrModel = [self getAttrModelFromAttrString:attrs];
    [[AdBrixRM sharedInstance] commerceCategoryViewWithAttrWithCategory:cate productInfo:productArray orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commerceProductView:(NSString *)product)
{
    if (product == NULL)
    {
        NSLog(@"abxrm : product is NULL");
        return;
    }
    
    AdBrixRmCommerceProductModel* productModel = [[RNAdbrixRmReact sharedInstance]getProductModel:[[RNAdbrixRmReact sharedInstance]getDictionaryFromAttrs:product]];
    [[AdBrixRM sharedInstance] commerceProductViewWithProductInfo:productModel];
}

RCT_EXPORT_METHOD(commerceProductView:(NSString *)product attrs:(NSString *)attrs)
{
    if (product == NULL)
    {
        NSLog(@"abxrm : product is NULL");
        return;
    }
    
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL){
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    AdBrixRmCommerceProductModel *productModel = [[RNAdbrixRmReact sharedInstance]getProductModel:[[RNAdbrixRmReact sharedInstance]getDictionaryFromAttrs:product]];
    [[AdBrixRM sharedInstance] commerceProductViewWithAttrWithProductInfo:productModel orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commerceAddToCart:(NSString *)productList)
{
    if (productList == NULL)
    {
        NSLog(@"abxrm : productList is NULL");
        return;
    }

    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceAddToCartWithProductInfo:productArray];
}

RCT_EXPORT_METHOD(commerceAddToCart:(NSString *)productList attrs:(NSString *)attrs)
{
    if (productList == NULL)
    {
        NSLog(@"abxrm : productList is NULL");
        return;
    }
    
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL){
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceAddToCartWithAttrWithProductInfo:productArray orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commerceAddToWishList:(NSString *)product)
{
    AdBrixRmCommerceProductModel *productModel = [[RNAdbrixRmReact sharedInstance]getProductModel:[[RNAdbrixRmReact sharedInstance]getDictionaryFromAttrs:product]];
    [[AdBrixRM sharedInstance] commerceAddToWishListWithProductInfo:productModel];
}

RCT_EXPORT_METHOD(commerceAddToWishList:(NSString *)product attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL){
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    AdBrixRmCommerceProductModel *productModel = [[RNAdbrixRmReact sharedInstance]getProductModel:[[RNAdbrixRmReact sharedInstance]getDictionaryFromAttrs:product]];
    [[AdBrixRM sharedInstance] commerceAddToWishListWithAttrWithProductInfo:productModel orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commerceReviewOrder:(NSString *)orderId productList:(NSString *)productList discount:(double)discount deliveryCharge:(double)deliveryCharge)
{
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceReviewOrderWithOrderId:orderId productInfo:productArray discount:discount deliveryCharge:deliveryCharge];
}

RCT_EXPORT_METHOD(commerceReviewOrder:(NSString *)orderId productList:(NSString *)productList discount:(double)discount deliveryCharge:(double)deliveryCharge attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL){
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceReviewOrderWithAttrWithOrderId:orderId productInfo:productArray discount:discount deliveryCharge:deliveryCharge orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commerceRefund:(NSString *)orderId productList:(NSString *)productList penaltyCharge:(double)penaltyCharge)
{
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceRefundWithOrderId:orderId productInfo:productArray penaltyCharge:penaltyCharge];
}

RCT_EXPORT_METHOD(commerceRefund:(NSString *)orderId productList:(NSString *)productList penaltyCharge:(double)penaltyCharge attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL){
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceRefundWithAttrWithOrderId:orderId productInfo:productArray penaltyCharge:penaltyCharge orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commerceSearch:(NSString *)keyWord productList:(NSString *)productList)
{
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceSearchWithProductInfo:productArray keyword:keyWord];
}

RCT_EXPORT_METHOD(commerceSearch:(NSString *)keyWord productList:(NSString *)productList attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceSearchWithAttrWithProductInfo:productArray keyword:keyWord orderAttr: attrModel];
}
RCT_EXPORT_METHOD(commerceShare:(NSString *)sharingChannel product:(NSString *)product)
{
    NSDictionary* productDictionary = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs:product];
    AdBrixRmCommerceProductModel *productModel = [[RNAdbrixRmReact sharedInstance] getProductModel:productDictionary];
    
    NSInteger channelInt = [[RNAdbrixRmReact sharedInstance]getCodeFromSharingChannel: sharingChannel];
    AdBrixRmSharingChannel channel = [[AdBrixRM sharedInstance] convertChannel:channelInt];
    
    [[AdBrixRM sharedInstance] commerceShareWithChannel:channel productInfo:productModel];
}
RCT_EXPORT_METHOD(commerceShare:(NSString *)sharingChannel product:(NSString *)product attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    NSDictionary* productDictionary = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs:product];
    AdBrixRmCommerceProductModel *productModel = [[RNAdbrixRmReact sharedInstance] getProductModel:productDictionary];
    
    NSInteger channelInt = [[RNAdbrixRmReact sharedInstance]getCodeFromSharingChannel: sharingChannel];
    AdBrixRmSharingChannel channel = [[AdBrixRM sharedInstance] convertChannel:channelInt];

    
    [[AdBrixRM sharedInstance] commerceShareWithAttrWithChannel:channel productInfo:productModel orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commerceListView:(NSString *)productList)
{
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceListViewWithProductInfo:productArray];
}

RCT_EXPORT_METHOD(commerceListView:(NSString *)productList attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    NSArray<AdBrixRmCommerceProductModel*> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceListViewWithAttrWithProductInfo:productArray orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commerceCartView:(NSString *)productList )
{
    NSArray<AdBrixRmCommerceProductModel*>* productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    [[AdBrixRM sharedInstance] commerceCartViewWithProductInfo:productArray];
}

RCT_EXPORT_METHOD(commerceCartView:(NSString *)productList attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    NSArray* productInfo = [[RNAdbrixRmReact sharedInstance] getProductList:productList];
    [[AdBrixRM sharedInstance] commerceCartViewWithAttrWithProductInfo:productInfo orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commercePaymentInfoAdded)
{
    [[AdBrixRM sharedInstance] commercePaymentInfoAdded];
}

RCT_EXPORT_METHOD(commercePaymentInfoAdded:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    [[AdBrixRM sharedInstance] commercePaymentInfoAddedWithAttrWithPaymentInfoAttr:attrModel];
}

RCT_EXPORT_METHOD(gameTutorialCompleted:(BOOL)isSkip)
{
    [[AdBrixRM sharedInstance] gameTutorialCompletedWithIsSkip:isSkip];
}

RCT_EXPORT_METHOD(gameTutorialCompleted:(BOOL)isSkip attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    [[AdBrixRM sharedInstance] gameTutorialCompletedWithAttrWithIsSkip:isSkip gameInfoAttr:attrModel];
}

RCT_EXPORT_METHOD(gameLevelAchieved:(int)level)
{
    [[AdBrixRM sharedInstance] gameLevelAchievedWithLevel:level];
}

RCT_EXPORT_METHOD(gameLevelAchieved:(int)level attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    [[AdBrixRM sharedInstance] gameLevelAchievedWithAttrWithLevel:level gameInfoAttr:attrModel];
}

RCT_EXPORT_METHOD(gameCharacterCreated)
{
    [[AdBrixRM sharedInstance] gameCharacterCreated];
}

RCT_EXPORT_METHOD(gameCharacterCreated:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    [[AdBrixRM sharedInstance] gameCharacterCreatedWithAttrWithGameInfoAttr:attrModel];
    
}

RCT_EXPORT_METHOD(gameStageCleared:(NSString *)stageName)
{
    [[AdBrixRM sharedInstance] gameStageClearedWithStageName:stageName];
}

RCT_EXPORT_METHOD(gameStageCleared:(NSString *)stageName attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    [[AdBrixRM sharedInstance] gameStageClearedWithAttrWithStageName:stageName gameInfoAttr:attrModel];
}

RCT_EXPORT_METHOD(commonPurchase:(NSString *)orderId productList:(NSString *)productList discount:(double)discount deliveryCharge:(double)deliveryCharge paymentMethod:(NSString *)paymentMethod)
{
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    AdbrixRmPaymentMethod paymentEnum = [[AdBrixRM sharedInstance] convertPayment:[self getCodeFromPaymentMethod:paymentMethod]];
    [[AdBrixRM sharedInstance] commonPurchaseWithOrderId:orderId productInfo:productArray orderSales:0.0 discount:discount deliveryCharge:deliveryCharge paymentMethod:paymentEnum];
}
RCT_EXPORT_METHOD(commonPurchase:(NSString *)orderId productList:(NSString *)productList discount:(double)discount deliveryCharge:(double)deliveryCharge paymentMethod:(NSString *)paymentMethod attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    AdbrixRmPaymentMethod paymentEnum = [[AdBrixRM sharedInstance] convertPayment:[self getCodeFromPaymentMethod:paymentMethod]];
    [[AdBrixRM sharedInstance] commonPurchaseWithAttrWithOrderId:orderId productInfo:productArray orderSales:0.0 discount:discount deliveryCharge:deliveryCharge paymentMethod:paymentEnum orderAttr:attrModel];
}

RCT_EXPORT_METHOD(commonSignUp:(NSString *)channelName)
{
    NSInteger channelCode = [[RNAdbrixRmReact sharedInstance]getCodeFromSignUpChannel:channelName];
    AdBrixRmSignUpChannel signUpChannel =[[AdBrixRM sharedInstance] convertSignUpChannel:channelCode];
    [[AdBrixRM sharedInstance] commonSignUpWithChannel:signUpChannel];
}
RCT_EXPORT_METHOD(commonSignUp:(NSString *)channelName attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    NSInteger channelCode = [[RNAdbrixRmReact sharedInstance]getCodeFromSignUpChannel:channelName];
    AdBrixRmSignUpChannel signUpChannel =[[AdBrixRM sharedInstance] convertSignUpChannel:channelCode];
    [[AdBrixRM sharedInstance] commonSignUpWithAttrWithChannel:signUpChannel commonAttr:attrModel];
}
RCT_EXPORT_METHOD(commonUseCredit)
{
    [[AdBrixRM sharedInstance]commonUseCredit];
}
RCT_EXPORT_METHOD(commonUseCredit:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    [[AdBrixRM sharedInstance]commonUseCreditWithAttrWithCommonAttr:attrModel];
}
RCT_EXPORT_METHOD(commonAppUpdate:(NSString *)prevVer currentVer:(NSString *)currentVer)
{
    [[AdBrixRM sharedInstance] commonAppUpdateWithPrev_ver:prevVer curr_ver:currentVer];
}

RCT_EXPORT_METHOD(commonAppUpdate:(NSString *)prevVer currentVer:(NSString *)currentVer attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL)
    {
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    [[AdBrixRM sharedInstance] commonAppUpdateWithAttrWithPrev_ver:prevVer curr_ver:currentVer commonAttr:attrModel];
}
RCT_EXPORT_METHOD(commonInvite:(NSString *)channelName)
{
    NSInteger channelCode = [[RNAdbrixRmReact sharedInstance] getCodeFromInviteChannel:channelName];
    AdBrixRmInviteChannel channelEnum = [[AdBrixRM sharedInstance] convertInviteChannel:channelCode];
    [[AdBrixRM sharedInstance] commonInviteWithChannel:channelEnum];
}
RCT_EXPORT_METHOD(commonInvite:(NSString *)channelName attrs:(NSString *)attrs)
{
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    if(attrs != NULL){
        attrModel = [self getAttrModelFromAttrString: attrs];
    }
    
    NSInteger channelCode = [[RNAdbrixRmReact sharedInstance] getCodeFromInviteChannel:channelName];
    AdBrixRmInviteChannel channelEnum = [[AdBrixRM sharedInstance] convertInviteChannel:channelCode];
    [[AdBrixRM sharedInstance] commonInviteWithAttrWithChannel:channelEnum commonAttr:attrModel];
}
RCT_EXPORT_METHOD(setPushEnable:(BOOL)enable)
{
    [[AdBrixRM sharedInstance]setPushEnableToPushEnable:enable];
}

// 추가 중인 메소드
// 리스너

RCT_EXPORT_METHOD(openPush:(NSString *)openPushParamJson)
{
    if (openPushParamJson == NULL)
    {
        NSLog(@"abxrm : openPushParamJson is NULL.");
        return;
    }
    
    AbxRemotePushModel* abxRemotePushModel = [self getRemotePushModelFromJsonString:openPushParamJson];
    [[AdBrixRM sharedInstance] openPush:abxRemotePushModel];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSString*, getSDKVersion)
{
    return AdBrixRM.sharedInstance.getSDKVersion;
}

RCT_EXPORT_METHOD(setRegistrationId:(NSString *)token)
{
    if (token == NULL) {
        NSLog(@"setRegistrationId : token is null");
        return;
    }
    
    NSDate* nsData = [token dataUsingEncoding:NSUTF8StringEncoding];
    [[AdBrixRM sharedInstance]setRegistrationIdWithDeviceToken:nsData];
}

RCT_EXPORT_METHOD(restartSDK:(NSString *)userId onSuccessCallback:(RCTResponseSenderBlock) onSuccessCallback onFailCallback:(RCTResponseSenderBlock) onFailCallback)
{
    void (^completion)(enum Completion) = ^(enum Completion result) {
        NSString* resultCode = [NSString stringWithFormat:@"%ld", result];
        NSArray *nsArray = [NSArray arrayWithObject: resultCode];
        
        if (result == CompletionSuccess)
        {
            if (onSuccessCallback != NULL)
            {
                onSuccessCallback(nsArray);
            }
            return;
        }
        
        if (result == CompletionFail)
        {
            if (onFailCallback == NULL)
            {
                onFailCallback(nsArray);
            }
            return;
        }
    };
    [[AdBrixRM sharedInstance] restartSDK:userId :completion];
}

RCT_EXPORT_METHOD(fetchActionHistoryByUserId:(NSString*)userId actionType:(NSArray*)actionType callback:(RCTResponseSenderBlock) callback)
{
    void (^completion)(ActionHistoryResult*) = ^(ActionHistoryResult* result) {
        NSArray *nsArray = [result getData];
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        
        callback(nsArray);
    };
    
    [[AdBrixRM sharedInstance] fetchActionHistoryByUserIdWithToken:userId actionType:actionType completion:completion];
}

RCT_EXPORT_METHOD(fetchActionHistoryByAdid:(NSString*)token actionType:(NSArray*)actionType callback:(RCTResponseSenderBlock) callback)
{
    void (^completion)(ActionHistoryResult*) = ^(ActionHistoryResult* result) {
        NSString* resultCode = [NSString stringWithFormat:@"%ld",(long)result];
        NSArray *nsArray = [NSArray arrayWithObject: resultCode];
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        
        callback(nsArray);
    };
    
    [[AdBrixRM sharedInstance] fetchActionHistoryByAdidWithToken:token actionType:actionType completion:completion];
}

RCT_EXPORT_METHOD(insertPushData:(NSString*) data)
{
    NSDictionary* dictionary = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs:data];
    [[AdBrixRM sharedInstance] insertPushDataWithPushJsonDic:dictionary];
}

RCT_EXPORT_METHOD(getActionHistory:(NSInteger) skip limit:(NSInteger)limit actionType:(NSArray*)actionType callback:(RCTResponseSenderBlock) callback)
{
    void (^completion)(ActionHistoryResult*) = ^(ActionHistoryResult* result) {
        NSArray *nsArray = result.getData;
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        
        callback(nsArray);
    };
    [[AdBrixRM sharedInstance] getActionHistoryWithSkip:skip limit:limit actionType:actionType completion:completion];
}

RCT_EXPORT_METHOD(getAllActionHistory:(NSArray*)action callback:(RCTResponseSenderBlock) callback)
{
    void (^completion)(ActionHistoryResult* __strong) = ^(ActionHistoryResult* result) {
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        
        callback(@[result]);
    };
    
    [[AdBrixRM sharedInstance] getAllActionHistoryWithActionType:action completion:completion];
}

RCT_EXPORT_METHOD(deleteActionHistory:(NSString*) token historyId:(NSString*)historyId timestamp:(NSString*)timestamp callback:(RCTResponseSenderBlock) callback)
{
    int64_t time = [timestamp longLongValue];
    void (^completion)(ActionHistoryResult* __strong) = ^(ActionHistoryResult* result) {
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        callback(@[result]);
    };
    
    [[AdBrixRM sharedInstance] deleteActionHistoryWithToken:token historyId:historyId timeStamp:time completion:completion];
}

RCT_EXPORT_METHOD(deleteAllActionHistoryByUserId:(NSString*) token callback:(RCTResponseSenderBlock) callback)
{
    void (^completion)(ActionHistoryResult* __strong) = ^(ActionHistoryResult* result) {
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        callback(@[result]);
    };
    
    [[AdBrixRM sharedInstance] deleteAllActionHistoryByAdidWithToken:token completion:completion];
}

RCT_EXPORT_METHOD(deleteAllActionHistoryByAdid:(NSString*) token callback:(RCTResponseSenderBlock) callback)
{
    void (^completion)(ActionHistoryResult* __strong) = ^(ActionHistoryResult* result) {
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        callback(@[result]);
    };
    [[AdBrixRM sharedInstance] deleteAllActionHistoryByAdidWithToken:token completion:completion];
}

RCT_EXPORT_METHOD(clearSyncedActionHistoryInLocalDB:(RCTResponseSenderBlock) callback)
{
    void (^completion)(ActionHistoryResult* __strong) = ^(ActionHistoryResult* result) {
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        callback(@[result]);
    };
    [[AdBrixRM sharedInstance] clearSyncedActionHistoryInLocalDBWithCompletion:completion];
}

RCT_EXPORT_METHOD(setInAppMessageFetchMode:(NSInteger) mode)
{
    [[AdBrixRM sharedInstance] setInAppMessageFetchModeWithMode:mode];
}

RCT_EXPORT_METHOD(fetchInAppMessage:(RCTResponseSenderBlock) callback)
{
    void (^completion)(DfnInAppMessageFetchResult*) = ^(DfnInAppMessageFetchResult* result) {
        callback(@[result]);
    };
    
    [[AdBrixRM sharedInstance] fetchInAppMessageWithCompletion:completion];
}

RCT_EXPORT_METHOD(getAllInAppMessage:(RCTResponseSenderBlock) callback)
{
    void (^completion)(DfnInAppMessageResult*) = ^(DfnInAppMessageResult* result) {
        NSLog(@"getAllInAppMessage result.getData : %@", result.getData);
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        
        callback(result.getData);
    };
    [[AdBrixRM sharedInstance] getAllInAppMessageWithCompletion:completion];
}

RCT_EXPORT_METHOD(openInAppMessage:(NSString*) campaignId callback:(RCTResponseSenderBlock) callback)
{
    void (^completion)(enum Completion) = ^(enum Completion result) {
        if (result == CompletionSuccess) {
            callback(@[@YES]);
        } else {
            callback(@[@NO]);
        }
    };
    
    [[AdBrixRM sharedInstance] openInAppMessageWithCampaignId:campaignId completion:completion];
}

RCT_EXPORT_METHOD(deepLinkOpenWithUrlStr:(NSString*) urlString)
{
    [[AdBrixRM sharedInstance] deepLinkOpenWithUrlStr:urlString];
}

RCT_EXPORT_METHOD(deleteUserDataAndStopSDK:(NSString*) userId callback:(RCTResponseSenderBlock) callback)
{
    void (^completion)(NSInteger) = ^(NSInteger result) {
        NSString* resultCode = [NSString stringWithFormat:@"%ld",(long)result];
        NSArray *nsArray = [NSArray arrayWithObject: resultCode];
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        callback(nsArray);
    };
    
    [[AdBrixRM sharedInstance] deleteUserDataAndStopSDK:userId :completion];
}

RCT_EXPORT_METHOD(setInAppMessageToken:(NSString*) token)
{
    if (token == NULL) {
        NSLog(@"abxrm : setInAppMessageToken : token is NULL");
        return;
    }
    
    [[AdBrixRM sharedInstance] setInAppMessageTokenWithToken:token];
}

RCT_EXPORT_METHOD(setUserCiWithAttr:(NSString*) attrModelJsonString)
{
    AdBrixRmAttrModel* attrModel = [AdBrixRmAttrModel new];
    if (attrModelJsonString != NULL) {
        attrModel = [self getAttrModelFromAttrString:attrModelJsonString];
    }
    
    [[AdBrixRM sharedInstance] setUserCiWithAttrWithAttrModel:attrModel];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(Boolean, getPushEnable)
{
    return [DfnUtil getPushEnable];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(Boolean, getOsPushEnable)
{
    return [DfnUtil getOsPushEnable];
}

RCT_EXPORT_METHOD(setKakaoId:(NSString*) kakaoId)
{
    [[AdBrixRM sharedInstance] setKakaoIdWithKakaoId:kakaoId];
}

RCT_EXPORT_METHOD(getUserId:(RCTResponseSenderBlock) callback)
{
    void (^completion)(NSString*) = ^(NSString* result) {
        if (callback == NULL)
        {
            NSLog(@"abxrm : callback is NULL");
            return;
        }
        callback(@[result]);
    };
    [[AdBrixRM sharedInstance] getUserIdWithCompletion:completion];
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(AbxRemotePushModel*, parsePushData:(NSDictionary*)pushDataMap)
{
    NSError* error = [[NSError alloc] init];
    return [[AdBrixRM sharedInstance] parsePushData:pushDataMap error:&error];
}

// ******************** For v1 backward compatibility only. Please use new API *********************
RCT_EXPORT_METHOD(startAdbrixSDK:(NSString *)appKey secretKey :(NSString *)secretKey)
{
    NSLog(@"startAdbrixSDK is deprecated.");
}
// ***************** END v1 backward compatibility *************
@end
