//
//  ReactAdbrix.m
//  ReactAdbrix
//
//  Created by Jimmy.강세훈 on 2023/06/14.
//

#import "ReactAdbrix.h"

static AdBrixRM *adbrixrm;
static ReactAdbrix *_sharedInstance = nil;

NSString *const LISTENER_DEEPLINK = @"dfn_deeplink_listener";
NSString *const LISTENER_DEFERRED_DEEPLINK = @"dfn_deferred_deeplink_listener";
NSString *const LISTENER_IAM_CLICK = @"dfn_inappmessage_click_listener";
NSString *const LISTENER_REMOTE_NOTIFICATION = @"dfn_remote_notification_listener";

@interface ReactAdbrix () <AdBrixRMDeeplinkDelegate, AdBrixRMDeferredDeeplinkDelegate, AdBrixRMInAppMessageClickDelegate, AdBrixRmPushRemoteDelegate>

@property (nonatomic, strong) NSString *initialDeeplink;
@property (nonatomic, strong) NSString *initialDeferredDeeplink;
@property (nonatomic, strong) NSString *initialRemoteNotification;

@end

@implementation ReactAdbrix {
    bool hasListeners;
}

+ (id)allocWithZone:(NSZone *)zone {
    static ReactAdbrix *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

+ (void)initialize
{
    if (self == [ReactAdbrix class])
    {
        _sharedInstance = [[self alloc] init];
    }
}

+ (ReactAdbrix *)sharedInstance
{
    return _sharedInstance;
}

#pragma mark - Native

- (void)initAdBrixWithAppKey:(NSString *)appkey secretKey:(NSString *)secretKey launchOptions:(NSDictionary *)launchOptions
{
    adbrixrm = [AdBrixRM sharedInstance];
    [adbrixrm
     initAdBrixWithAppKey:appkey
     secretKey:secretKey
    ];
    [adbrixrm setInAppMessageClickDelegateWithDelegate:self];
    [adbrixrm setDeferredDeeplinkDelegateWithDelegate:self];
    [adbrixrm setDeeplinkDelegateWithDelegate:self];
    [adbrixrm setAdBrixRmPushRemoteDelegateWithDelegate:self];
        
    // NSDictionary *userInfo = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
    // [self emitDeeplinkFromPushWithUserInfo:userInfo];
}

- (BOOL)deeplinkOpenWith:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        NSURL *url = userActivity.webpageURL;
        return [self deeplinkOpenWithUrl:url];
    }
    return YES;
}


- (BOOL)deeplinkOpenWith:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
    return [self deeplinkOpenWithUrl:url];
}

- (BOOL)deeplinkOpenWithUrl:(NSURL *)url
{
    if (adbrixrm == nil) {
        return NO;
    }
    
    if (url == nil) {
        return NO;
    }
    [adbrixrm deepLinkOpenWithUrl:url];
    
    return YES;
}


- (void)setRegistrationIdWithDeviceToken:(NSData *)deviceToken
{
    if (adbrixrm == nil) {
        return;
    }
    
    [adbrixrm setRegistrationIdWithDeviceToken:deviceToken];
}

- (void)userNotificationCenterWithCenter:(UNUserNotificationCenter *)center response:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler
{
    if (adbrixrm == nil) {
        return;
    }
    
    [adbrixrm userNotificationCenterWithCenter:center response:response];

    completionHandler();
}

- (void)userNotificationCenterWithCenter:(UNUserNotificationCenter *)center notification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
    NSDictionary *apsInfo = notification.request.content.userInfo[@"aps"];
    if (apsInfo != nil) {
        NSNumber *genWhileRun = apsInfo[@"gen_while_run"];
        if (genWhileRun.intValue == 1) {
            completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionSound);
            return;
        }
    }
    
    completionHandler(UNNotificationPresentationOptionNone);
}

#pragma mark - delegate

- (void)didReceiveDeeplinkWithDeeplink:(NSString * _Nonnull)deeplink {
    if (hasListeners) {
        [self deeplinkCallbackWithDeeplink:deeplink];
    } else {
        _initialDeeplink = deeplink;
    }
}

- (void)didReceiveDeferredDeeplinkWithDeeplink:(NSString * _Nonnull)deeplink
{
    if (hasListeners) {
        [self deferredDeeplinkCallbackWithDeferredDeeplink:deeplink];
    } else {
        _initialDeferredDeeplink = deeplink;
    }
}


- (void)pushRemoteCallbackWithData:(NSDictionary<NSString *,id> *)data state:(enum UIApplicationState)state
{
    NSString *deeplinkFromPush = [data objectForKey:@"deep_link_url"];

    if (deeplinkFromPush == nil) {
        deeplinkFromPush = @"";
    }

    if (hasListeners) {
        [self remoteNotificationClickCallbackWithPushData:deeplinkFromPush];
    } else {
        _initialRemoteNotification = deeplinkFromPush;
    }
}

- (void)onReceiveInAppMessageClickWithActionId:(NSString * _Nonnull)actionId actionType:(NSString * _Nonnull)actionType actionArg:(NSString * _Nonnull)actionArg isClosed:(BOOL)isClosed
{
    if (hasListeners) {
        [self inappmessageClickCallbackWithActionId:actionId
                                         actionType:actionType
                                          actionArg:actionArg
                                           isClosed:isClosed];
    } else {
        return;
    }
    
}

#pragma mark - EventEmitter

- (void)startObserving
{
    hasListeners = YES;
    
    if (adbrixrm == nil) {
        return;
    }
    
    if (_initialDeeplink != nil) {
        [self deeplinkCallbackWithDeeplink:_initialDeeplink];
        _initialDeeplink = nil;
    }
    if (_initialDeferredDeeplink != nil) {
        [self deferredDeeplinkCallbackWithDeferredDeeplink:_initialDeferredDeeplink];
        _initialDeferredDeeplink = nil;
    }
    if (_initialRemoteNotification != nil) {
        [self remoteNotificationClickCallbackWithPushData:_initialRemoteNotification];
        _initialRemoteNotification = nil;
    }
}

- (void)stopObserving
{
    hasListeners = NO;
}

- (NSArray<NSString *> *)supportedEvents 
{
    return @[
        LISTENER_DEEPLINK,
        LISTENER_DEFERRED_DEEPLINK,
        LISTENER_IAM_CLICK,
        LISTENER_REMOTE_NOTIFICATION
    ];
}

- (void)deeplinkCallbackWithDeeplink:(NSString *)deeplink
{
    [self sendEventWithName:LISTENER_DEEPLINK body:@{@"deeplink" : deeplink}];
}

- (void)deferredDeeplinkCallbackWithDeferredDeeplink:(NSString *)deferredDeeplink
{
    [self sendEventWithName:LISTENER_DEFERRED_DEEPLINK body:@{@"deeplink" : deferredDeeplink}];
}

- (void)inappmessageClickCallbackWithActionId:(NSString * _Nonnull)actionId actionType:(NSString * _Nonnull)actionType actionArg:(NSString * _Nonnull)actionArg isClosed:(BOOL)isClosed
{
    NSDictionary *arguments = @{
        @"actionId" : actionId,
        @"actionType" : actionType,
        @"actionArg" : actionArg,
        @"isClosed" : @(isClosed)
    };
    
    [self sendEventWithName:LISTENER_IAM_CLICK body:arguments];
    
}

- (void)remoteNotificationClickCallbackWithPushData:(NSString *)pushData
{
    [self sendEventWithName:LISTENER_REMOTE_NOTIFICATION body:@{@"pushData" : pushData}];
}

- (void)setPushEnableWith:(BOOL)isEnabled
{
    [adbrixrm setPushEnableToPushEnable:isEnabled];
}

-(void)startGettingIdfa
{
    [adbrixrm startGettingIDFA];
}

-(void)stopGettingIdfa
{
    [adbrixrm stopGettingIDFA];
}


#pragma mark - Bridge

#pragma mark - UserProperty

RCT_EXPORT_METHOD(login:(NSString *)userId)
{
    if (adbrixrm == nil) {
        return;
    }
    [adbrixrm loginWithUserId:userId];
    
}

RCT_EXPORT_METHOD(logout)
{
    if (adbrixrm == nil) {
        return;
    }
    [adbrixrm logout];
}

RCT_EXPORT_METHOD(setAge:(double)age)
{
    if (adbrixrm == nil) {
        return;
    }
    [adbrixrm setAgeWithInt:age];
}

RCT_EXPORT_METHOD(setGender:(double)gender)
{
    if (adbrixrm == nil) {
        return;
    }
    [adbrixrm setGenderWithAdBrixGenderType:[adbrixrm convertGender:gender]];
}

RCT_EXPORT_METHOD(saveUserProperties:(NSDictionary *)properties) {
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:properties];
    
    [adbrixrm setUserPropertiesWithAttrWithAttrModel:model];
}

#pragma mark - Event

#pragma mark - Common
RCT_EXPORT_METHOD(event:(NSString *)eventName:(NSDictionary *)attr) {
    if (adbrixrm == nil) {
        return;
    }
    
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel: attr];
    
    [adbrixrm eventWithAttrWithEventName:eventName value:model];
}

RCT_EXPORT_METHOD(commonSignUp:(NSString *)channel attr:(NSDictionary *)attr) {
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmSignUpChannel channelVal = [AbxUtil getCodeFromSignUpChannel:channel];
    
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel: attr];
    
    
    [adbrixrm commonSignUpWithAttrWithChannel:channelVal commonAttr:model];
}

RCT_EXPORT_METHOD(commonAppUpdate:(NSString *)prev curr:(NSString *)curr attr:(NSDictionary *)attr) {
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel: attr];
    
    [adbrixrm commonAppUpdateWithAttrWithPrev_ver:prev curr_ver:curr commonAttr:model];
}

RCT_EXPORT_METHOD(commonInvite:(NSString *)channel attr:(NSDictionary *)attr) {
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel: attr];
    
    AdBrixRmInviteChannel channelVal = [AbxUtil getCodeFromInviteChannel:channel];
    
    [adbrixrm commonInviteWithAttrWithChannel:channelVal commonAttr:model];
}

RCT_EXPORT_METHOD(commonUseCredit:(NSDictionary *)attr) {
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel: attr];
    
    [adbrixrm commonUseCreditWithAttrWithCommonAttr:model];
}

RCT_EXPORT_METHOD(commonPurchase:(NSString *)orderId
                  productList:(NSArray *)productList
                  orderSales:(double)orderSales
                  discount:(double)discount
                  deliveryCharge:(double)deliveryCharge
                  paymentMethod:(NSString *)paymentMethod
                  attr:(NSDictionary *)attr) {
    
    if (adbrixrm == nil) {
        return;
    }
    AdbrixRmPaymentMethod paymentVal = [AbxUtil getCodeFromPaymentMethod:paymentMethod];
    
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel: attr];
    
    NSArray<AdBrixRmCommerceProductModel *> *productInfo = [AbxUtil arrayToCommerceProductModelList:productList];
    
    if (productInfo == nil || productInfo.count == 0 ) {
        NSLog(@"productList is empty");
        return;
    }
    [adbrixrm
     commonPurchaseWithAttrWithOrderId:orderId
     productInfo:productInfo
     orderSales:orderSales
     discount:discount
     deliveryCharge:deliveryCharge
     paymentMethod:paymentVal
     orderAttr:model];
    
}

#pragma mark - Commerce
RCT_EXPORT_METHOD(commerceViewHome:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }

    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    [adbrixrm commerceViewHomeWithAttrWithOrderAttr:model];
}

RCT_EXPORT_METHOD(commerceCategoryView:(NSArray *)category productList:(NSArray *)productList attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    
    NSArray<AdBrixRmCommerceProductModel *> *productInfo = [AbxUtil arrayToCommerceProductModelList:productList];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    AdBrixRmCommerceProductCategoryModel *categoryModel = [AbxUtil getCategoryModel:category];
    
    [adbrixrm
     commerceCategoryViewWithAttrWithCategory:categoryModel
     productInfo:productInfo
     orderAttr:model];
    
}

RCT_EXPORT_METHOD(commerceProductView:(NSDictionary *)productInfo attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmCommerceProductModel *productData = [AbxUtil dictToCommerceProductModel:productInfo];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     commerceProductViewWithAttrWithProductInfo:productData
     orderAttr:model];
    
}

RCT_EXPORT_METHOD(commerceAddToCart:(NSArray *)productList attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    NSArray<AdBrixRmCommerceProductModel *> *productInfo = [AbxUtil arrayToCommerceProductModelList:productList];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     commerceAddToCartWithAttrWithProductInfo:productInfo
     orderAttr:model];
}

RCT_EXPORT_METHOD(commerceAddToWishList:(NSDictionary *)productInfo attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmCommerceProductModel *productData = [AbxUtil dictToCommerceProductModel:productInfo];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     commerceAddToWishListWithAttrWithProductInfo:productData
     orderAttr:model];
}

RCT_EXPORT_METHOD(commerceReviewOrder:(NSString *)orderId productList:(NSArray *)productList discount:(double)discount deliveryCharge:(double)deliveryCharge attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    NSArray<AdBrixRmCommerceProductModel *> *productInfo = [AbxUtil arrayToCommerceProductModelList:productList];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     commerceReviewOrderWithAttrWithOrderId:orderId
     productInfo:productInfo
     discount:discount
     deliveryCharge:deliveryCharge
     orderAttr:model];
}

RCT_EXPORT_METHOD(commerceRefund:(NSString *)orderId productList:(NSArray *)productList penaltyCharge:(double)penaltyCharge attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    NSArray<AdBrixRmCommerceProductModel *> *productInfo = [AbxUtil arrayToCommerceProductModelList:productList];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     commerceRefundWithAttrWithOrderId:orderId
     productInfo:productInfo
     penaltyCharge:penaltyCharge
     orderAttr:model];
}

RCT_EXPORT_METHOD(commerceSearch:(NSString *)keyword productList:(NSArray *)productList attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    NSArray<AdBrixRmCommerceProductModel *> *productInfo = [AbxUtil arrayToCommerceProductModelList:productList];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     commerceSearchWithAttrWithProductInfo:productInfo
     keyword:keyword
     orderAttr:model];
}

RCT_EXPORT_METHOD(commerceShare:(NSString *)channel productInfo:(NSDictionary *)productInfo attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmCommerceProductModel *productData = [AbxUtil dictToCommerceProductModel:productInfo];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     commerceShareWithAttrWithChannel:
         [adbrixrm convertChannel:
          [AbxUtil getCodeFromSharingChannel:channel]]
     productInfo:productData
     orderAttr:model];
}

RCT_EXPORT_METHOD(commerceListView:(NSArray *)productList attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    NSArray<AdBrixRmCommerceProductModel *> *productInfo = [AbxUtil arrayToCommerceProductModelList:productList];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     commerceListViewWithAttrWithProductInfo:productInfo
     orderAttr:model];
}

RCT_EXPORT_METHOD(commerceCartView:(NSArray *)productList attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    NSArray<AdBrixRmCommerceProductModel *> *productInfo = [AbxUtil arrayToCommerceProductModelList:productList];
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     commerceCartViewWithAttrWithProductInfo:productInfo
     orderAttr:model];
}

RCT_EXPORT_METHOD(commercePaymentInfoAdded:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    [adbrixrm
     
     commercePaymentInfoAddedWithAttrWithPaymentInfoAttr:model];
}

#pragma mark - Game
RCT_EXPORT_METHOD(gameTutorialCompleted:(BOOL)isSkip attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     gameTutorialCompletedWithAttrWithIsSkip:isSkip
     gameInfoAttr:model];
}

RCT_EXPORT_METHOD(gameCharacterCreated:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     gameCharacterCreatedWithAttrWithGameInfoAttr:model];
}

RCT_EXPORT_METHOD(gameStageCleared:(NSString *)stageName attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     gameStageClearedWithAttrWithStageName:stageName
     gameInfoAttr:model];
}

RCT_EXPORT_METHOD(gameLevelAchieved:(double)level attr:(NSDictionary *)attr)
{
    if (adbrixrm == nil) {
        return;
    }
    AdBrixRmAttrModel *model = [AbxUtil dictToAttrModel:attr];
    
    [adbrixrm
     gameLevelAchievedWithAttrWithLevel:level
     gameInfoAttr:model];
}

#pragma mark - GA

RCT_EXPORT_METHOD(setPushEnable:(BOOL)isEnabled)
{
    if (adbrixrm == nil) {
        return;
    }
    [adbrixrm setPushEnableToPushEnable:isEnabled];
}


//Promise의 경우 RCT매크로를 사용하면 호출이 안됨(0.72 newArch 기준)
// #ifdef RCT_NEW_ARCH_ENABLED
// - (void)setSubscriptionStatus:(NSDictionary *)status
//                       resolve:(RCTPromiseResolveBlock)resolve
//                        reject:(RCTPromiseRejectBlock)reject
// {
//     [self _setSubscriptionStatus:status resolve:resolve reject:reject];
// }
// - (void)getSubscriptionStatus:(RCTPromiseResolveBlock)resolve
//                        reject:(RCTPromiseRejectBlock)reject
// {
//     [self _getSubscriptionStatus:resolve reject:reject];
// }

// - (void)setKakaoId:(NSString *)kakaoId
//            resolve:(RCTPromiseResolveBlock)resolve
//             reject:(RCTPromiseRejectBlock)reject
// {
//     [self _setKakaoId:kakaoId resolve:resolve reject:reject];
// }
// - (void)setPhoneNumber:(NSString *)number
//            resolve:(RCTPromiseResolveBlock)resolve
//             reject:(RCTPromiseRejectBlock)reject
// {
//     [self _setPhoneNumber:number resolve:resolve reject:reject];
// }
// #else
RCT_EXPORT_METHOD(setSubscriptionStatus:(NSDictionary *)status
                  withResolver:(RCTPromiseResolveBlock) resolve
                  withRejecter:(RCTPromiseRejectBlock) reject)
{
    [self _setSubscriptionStatus:status resolve:resolve reject:reject];
}

RCT_EXPORT_METHOD(getSubscriptionStatus:(RCTPromiseResolveBlock) resolve
                  withRejecter:(RCTPromiseRejectBlock) reject)
{
    [self _getSubscriptionStatus:resolve reject:reject];
}
RCT_EXPORT_METHOD(setKakaoId:(NSString *)kakaoId
           resolve:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject)
{
    [self _setKakaoId:kakaoId resolve:resolve reject:reject];
}
RCT_EXPORT_METHOD(setPhoneNumber:(NSString *)number
           resolve:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject)
{
    [self _setPhoneNumber:number resolve:resolve reject:reject];
}

RCT_EXPORT_METHOD(requestNotificationPermissionForiOS:(RCTPromiseResolveBlock) resolve
                  withRejecter:(RCTPromiseRejectBlock) reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UNUserNotificationCenter currentNotificationCenter] requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error) {
            if (granted) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    [[UIApplication sharedApplication] registerForRemoteNotifications];
                });
                [self setPushEnable:true];
                resolve(@YES);
            } else {
                resolve(@NO);
            }
        }];
    });
}


// #endif

#pragma mark - Util

RCT_EXPORT_METHOD(gdprForgetMe)
{
    if (adbrixrm == nil) {
        return;
    }
    [adbrixrm gdprForgetMe];
}

RCT_EXPORT_METHOD(setEventUploadCountInterval:(double)interval)
{
    if (adbrixrm == nil) {
        return;
    }
    
    [adbrixrm setEventUploadCountInterval:[adbrixrm convertCountInterval:interval]];
}

RCT_EXPORT_METHOD(setEventUploadTimeInterval:(double)interval)
{
    if (adbrixrm == nil) {
        return;
    }
    
    [adbrixrm setEventUploadTimeInterval:[adbrixrm convertTimeInterval:interval]];
}


RCT_EXPORT_METHOD(requestATTPermission:(RCTPromiseResolveBlock) resolve
                  withRejecter:(RCTPromiseRejectBlock) reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if (@available(iOS 14, *)) {
            [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
                switch (status) {
                    case ATTrackingManagerAuthorizationStatusNotDetermined:
                        [adbrixrm stopGettingIDFA];
                        resolve(@"notDetermined");
                        break;
                    case  ATTrackingManagerAuthorizationStatusRestricted:
                        [adbrixrm stopGettingIDFA];
                        resolve(@"restricted");
                        break;
                    case ATTrackingManagerAuthorizationStatusDenied:
                        [adbrixrm stopGettingIDFA];
                        resolve(@"denied");
                        break;
                    case ATTrackingManagerAuthorizationStatusAuthorized:
                        [adbrixrm startGettingIDFA];
                        resolve(@"authorized");
                        break;
                }
            }];
        } else {
            [adbrixrm stopGettingIDFA];
            resolve(@"unavailable");
        }
    });
    
}

//private
//TurboModule을 위해 impl 코드를 분리했었음
- (void)_setKakaoId:(NSString *)kakaoId
           resolve:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject
{
    if (adbrixrm == nil) {
        return;
    }
    [adbrixrm setKakaoIdWithKakaoId:kakaoId completion:^(SetCiProfileResult *result) {
        if (result.isSuccess) {
            resolve(@"success");
        } else {
            reject(@"event_failure", result.resultMessage, nil);
        }
    }];
}

- (void)_setPhoneNumber:(NSString *)number
           resolve:(RCTPromiseResolveBlock)resolve
            reject:(RCTPromiseRejectBlock)reject
{
    if (adbrixrm == nil) {
        return;
    }
    [adbrixrm setPhoneNumberWithNumber:number completion:^(SetCiProfileResult *result) {
        if (result.isSuccess) {
            resolve(@"success");
        } else {
            reject(@"event_failure",  result.resultMessage, nil);
        }
    }];
}



- (void)_setSubscriptionStatus:(NSDictionary *)status
       resolve:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
{
    if (adbrixrm == nil) {
        reject(@"event_failure", @"native module not instantiated", nil);
        return;
    }
    
    if (status != nil) {
        SubscriptionStatus *statusVal = [AbxUtil buildSubscriptionStatusWith:status];
        [adbrixrm setSubscriptionStatusWithStatus:statusVal completion:^(SetSubscriptionResult *result) {
            if (result.isSuccess) {
                resolve(@"success");
            } else {
                reject(@"event_failure", result.resultMessage, nil);
            }
        }];
    } else {
        reject(@"event_failure", @"status is null", nil);
    }
    
}

- (void)_getSubscriptionStatus:(RCTPromiseResolveBlock)resolve
        reject:(RCTPromiseRejectBlock)reject
{
    if (adbrixrm == nil) {
        reject(@"event_failure", @"native module not instantiated", nil);
        return;
    }
    
    [adbrixrm getSubscriptionStatusWithCompletion:^(GetSubscriptionResult *result) {
        if (result.isSuccess) {
            NSMutableDictionary *dict = [NSMutableDictionary dictionary];
            
            [dict setObject:[AbxUtil typeToStringWith:result.value.informativeNotificationFlag] forKey:@"informative"];
            [dict setObject:[AbxUtil typeToStringWith:result.value.marketingNotificationFlag] forKey:@"marketing"];
            [dict setObject:[AbxUtil typeToStringWith:result.value.marketingNotificationFlagForPushChannel] forKey:@"marketing_push"];
            [dict setObject:[AbxUtil typeToStringWith:result.value.marketingNotificationFlagForSmsChannel] forKey:@"marketing_sms"];
            [dict setObject:[AbxUtil typeToStringWith:result.value.marketingNotificationFlagForKakaoChannel] forKey:@"marketing_kakao"];
            [dict setObject:[AbxUtil typeToStringWith:result.value.marketingNotificationAtNightFlag] forKey:@"marketing_night"];
            [dict setObject:[AbxUtil typeToStringWith:result.value.marketingNotificationAtNightFlagForPushChannel] forKey:@"marketing_night_push"];
            [dict setObject:[AbxUtil typeToStringWith:result.value.marketingNotificationAtNightFlagForSmsChannel] forKey:@"marketing_night_sms"];
            [dict setObject:[AbxUtil typeToStringWith:result.value.marketingNotificationAtNightFlagForKakaoChannel] forKey:@"marketing_night_kakao"];
            resolve(dict);
        } else {
            reject(@"event_failure", result.resultMessage, nil);
        }
    }];
    
}


RCT_EXPORT_MODULE(ReactAdbrixBridge)

@end
