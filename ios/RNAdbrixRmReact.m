
#import "RNAdbrixRmReact.h"

static RNAdbrixRmReact *_sharedInstance = nil;

@implementation RNAdbrixRmReact

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(AdbrixRm)



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
    [[RNAdbrixRmReact sharedInstance]setAdBrixDeeplinkDelegate];
    
}
+ (RNAdbrixRmReact *)sharedInstance
{
    return _sharedInstance;
}
- (NSArray<NSString *> *)supportedEvents
{
    return @[@"AdbrixDeferredDeeplinkListener",@"AdbrixDeeplinkListener"];
}

- (void)setAdBrixDeeplinkDelegate
{
    [[AdBrixRM sharedInstance] setDeferredDeeplinkDelegateWithDelegate:self];
    [[AdBrixRM sharedInstance] setDeeplinkDelegateWithDelegate:self];
}

- (void)didReceiveDeferredDeeplinkWithDeeplink:(NSString *)deeplink
{
    // Try-catch
    [self sendEventWithName:@"AdbrixDeferredDeeplinkListener" body:deeplink];
}

- (void)didReceiveDeeplinkWithDeeplink:(NSString *)deeplink
{
    // Try-catch
    [self sendEventWithName:@"AdbrixDeeplinkListener" body:deeplink];
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
    productModel = [[AdBrixRM sharedInstance] createCommerceProductDataWithProductId:_productId
                                                                         productName:_productName
                                                                               price:_price
                                                                            quantity:_quantity
                                                                            discount:_discount
                                                                      currencyString:_currency
                                                                            category:_cate
                                                                     productAttrsMap:[[AdBrixRM sharedInstance] createCommerceProductAttrDataWithDictionary:_extraAttrs]];
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




RCT_EXPORT_METHOD(startAdbrixSDK:(NSString *)appKey secretKey :(NSString *)secretKey)
{
    [[AdBrixRM sharedInstance] initAdBrixWithAppKey:appKey secretKey: secretKey ];
}
RCT_EXPORT_METHOD(gdprForgetMe)
{
    [[AdBrixRM sharedInstance] gdprForgetMe];
}
RCT_EXPORT_METHOD(setDeviceId:(NSString *)deviceId)
{
    [[AdBrixRM sharedInstance] setDeviceId:deviceId];
}
RCT_EXPORT_METHOD(setAge:(int)age)
{
    [[AdBrixRM sharedInstance] setAgeWithInt:age];
}
RCT_EXPORT_METHOD(setGender:(int)gender)
{
    [[AdBrixRM sharedInstance] setGenderWithAdBrixGenderType:[[AdBrixRM sharedInstance] convertGender:gender]];
}
RCT_EXPORT_METHOD(setLogLevel:(int)logLevel)
{
    [[AdBrixRM sharedInstance] setLogLevel:[[AdBrixRM sharedInstance] convertLogLevel:logLevel]];
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
//RCT_EXPORT_METHOD(setEnableLocationListening:(NSInteger *)timeInterval)
//{
//    [[AdBrixRM sharedInstance] setEventUploadTimeInterval:[[AdBrixRM sharedInstance] convertTimeInterval:timeInterval]];
//}
RCT_EXPORT_METHOD(setUserProperties:(NSString *)dictionaryString)
{
    NSDictionary *json = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : dictionaryString];
    [[AdBrixRM sharedInstance] setUserPropertiesWithDictionary:json];
}
RCT_EXPORT_METHOD(clearUserProperties)
{
    [[AdBrixRM sharedInstance] clearUserProperties];
}
RCT_EXPORT_METHOD(event:(NSString *)eventName attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] eventWithEventName:eventName value:extraAttrs];
}
RCT_EXPORT_METHOD(login:(NSString *)userId)
{
    [[AdBrixRM sharedInstance] loginWithUserId:userId];
}
RCT_EXPORT_METHOD(logout)
{
    [[AdBrixRM sharedInstance] logout];
}
RCT_EXPORT_METHOD(commerceViewHome:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] commerceViewHomeWithOrderAttr:extraAttrs];
}
RCT_EXPORT_METHOD(commerceCategoryView:(NSString *)categoryArray productList:(NSString *)productList attrs:(NSString *)attrs)
{
    
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    
    NSLog(@"honguk2 ?? what? : %@",productList);
    NSArray *categoryList = [[RNAdbrixRmReact sharedInstance]getArrayFromString:categoryArray];
    AdBrixRmCommerceProductCategoryModel *cate = [[RNAdbrixRmReact sharedInstance]getCategoryModel:categoryList];
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    
    [[AdBrixRM sharedInstance] commerceCategoryViewWithCategory:cate productInfo:productArray orderAttr:extraAttrs];
}
RCT_EXPORT_METHOD(commerceProductView:(NSString *)product attrs:(NSString *)attrs)
{
    
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    AdBrixRmCommerceProductModel *productModel = [[RNAdbrixRmReact sharedInstance]getProductModel:[[RNAdbrixRmReact sharedInstance]getDictionaryFromAttrs:product]];
    
    [[AdBrixRM sharedInstance] commerceProductViewWithProductInfo:productModel orderAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(commerceAddToCart:(NSString *)productList attrs:(NSString *)attrs)
{
    
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    
    [[AdBrixRM sharedInstance] commerceAddToCartWithProductInfo:productArray orderAttr:extraAttrs];
}
RCT_EXPORT_METHOD(commerceAddToWishList:(NSString *)product attrs:(NSString *)attrs)
{
    
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    AdBrixRmCommerceProductModel *productModel = [[RNAdbrixRmReact sharedInstance]getProductModel:[[RNAdbrixRmReact sharedInstance]getDictionaryFromAttrs:product]];
    
    [[AdBrixRM sharedInstance] commerceAddToWishListWithProductInfo:productModel orderAttr:extraAttrs];
}
RCT_EXPORT_METHOD(commerceReviewOrder:(NSString *)orderId productList:(NSString *)productList discount:(double)discount deliveryCharge:(double)deliveryCharge attrs:(NSString *)attrs)
{
    
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    
    [[AdBrixRM sharedInstance] commerceReviewOrderWithOrderId:orderId productInfo:productArray discount:discount deliveryCharge:deliveryCharge orderAttr:extraAttrs];
}
RCT_EXPORT_METHOD(commerceRefund:(NSString *)orderId productList:(NSString *)productList penaltyCharge:(double)penaltyCharge attrs:(NSString *)attrs)
{
    
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    
    [[AdBrixRM sharedInstance] commerceRefundWithOrderId:orderId productInfo:productArray penaltyCharge:penaltyCharge orderAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(commerceSearch:(NSString *)keyWord productList:(NSString *)productList attrs:(NSString *)attrs)
{
    
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    
    [[AdBrixRM sharedInstance] commerceSearchWithProductInfo:productArray keyword:keyWord orderAttr: extraAttrs];
    
}
RCT_EXPORT_METHOD(commerceShare:(NSString *)sharingChannel product:(NSString *)product attrs:(NSString *)attrs)
{
    
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    AdBrixRmCommerceProductModel *productModel = [[RNAdbrixRmReact sharedInstance]getProductModel:[[RNAdbrixRmReact sharedInstance]getDictionaryFromAttrs:product]];
    
    [[AdBrixRM sharedInstance] commerceShareWithChannel:[[AdBrixRM sharedInstance] convertChannel:[[RNAdbrixRmReact sharedInstance]getCodeFromSharingChannel: sharingChannel]] productInfo:productModel orderAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(commerceListView:(NSString *)productList attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    
    [[AdBrixRM sharedInstance] commerceListViewWithProductInfo:productArray orderAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(commerceCartView:(NSString *)productList attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    
    [[AdBrixRM sharedInstance] commerceCartViewWithProductInfo:productArray orderAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(commercePaymentInfoAdded:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] commercePaymentInfoAddedWithPaymentInfoAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(gameTutorialCompleted:(BOOL)isSkip attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] gameTutorialCompletedWithIsSkip:isSkip gameInfoAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(gameLevelAchieved:(int)level attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] gameLevelAchievedWithLevel:level gameInfoAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(gameCharacterCreated:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] gameCharacterCreatedWithGameInfoAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(gameStageCleared:(NSString *)stageName attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] gameStageClearedWithStageName:stageName gameInfoAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(commonPurchase:(NSString *)orderId productList:(NSString *)productList discount:(double)discount deliveryCharge:(double)deliveryCharge paymentMethod:(NSString *)paymentMethod attrs:(NSString *)attrs)
{
    NSLog(@"honguk product list!!! :: %@",productList);
    
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    NSArray<AdBrixRmCommerceProductModel *> *productArray = [[RNAdbrixRmReact sharedInstance]getProductList:productList];
    
    [[AdBrixRM sharedInstance] commonPurchaseWithOrderId:orderId productInfo:productArray discount:discount deliveryCharge:deliveryCharge paymentMethod:[[AdBrixRM sharedInstance]convertPayment:[[RNAdbrixRmReact sharedInstance]getCodeFromPaymentMethod: paymentMethod]] extraAttr:extraAttrs];
}
RCT_EXPORT_METHOD(commonSignUp:(NSString *)channelName attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] commonSignUpWithChannel:[[AdBrixRM sharedInstance] convertSignUpChannel:[[RNAdbrixRmReact sharedInstance]getCodeFromSignUpChannel:channelName]] commonAttr:extraAttrs];
}
RCT_EXPORT_METHOD(commonUseCredit:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance]commonUseCreditWithCommonAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(commonAppUpdate:(NSString *)prevVer currentVer:(NSString *)currentVer attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] commonAppUpdateWithPrev_ver:prevVer curr_ver:currentVer commonAttr:extraAttrs];
    
}
RCT_EXPORT_METHOD(commonInvite:(NSString *)channelName attrs:(NSString *)attrs)
{
    NSDictionary *extraAttrs = @{};
    if (attrs != NULL) {
        extraAttrs = [[RNAdbrixRmReact sharedInstance] getDictionaryFromAttrs : attrs];
    }
    [[AdBrixRM sharedInstance] commonInviteWithChannel:[[AdBrixRM sharedInstance] convertInviteChannel:[[RNAdbrixRmReact sharedInstance]getCodeFromInviteChannel:channelName]] commonAttr:extraAttrs];
}
RCT_EXPORT_METHOD(setPushEnable:(BOOL)enable)
{
    [[AdBrixRM sharedInstance]setPushEnableToPushEnable:enable];
}
//RCT_EXPORT_METHOD(setRegistrationId:(NSString *)token)
//{
//    [[AdBrixRM sharedInstance]setRegistrationIdWithDeviceToken:token];
//}




@end

