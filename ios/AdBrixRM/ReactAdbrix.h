//
//  ReactAdbrix.h
//  ReactAdbrix
//
//  Created by Jimmy.강세훈 on 2023/06/14.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#import <UserNotifications/UserNotifications.h>
#import <AdSupport/AdSupport.h>
#import <AppTrackingTransparency/AppTrackingTransparency.h>
#import <AdBrixRmKit/AdBrixRmKit-Swift.h>
#import <AbxUtil.h>


@interface ReactAdbrix : RCTEventEmitter <RCTBridgeModule>
+ (ReactAdbrix *)sharedInstance;
- (void)initAdBrixWithAppKey:(NSString *)appkey secretKey:(NSString *)secretKey launchOptions:(NSDictionary *)launchOptions;
- (void)setRegistrationIdWithDeviceToken:(NSData *)deviceToken;
- (void)userNotificationCenterWithCenter:(UNUserNotificationCenter *)center response:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler;
- (void)userNotificationCenterWithCenter:(UNUserNotificationCenter *)center notification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler;
- (void)setPushEnableWith:(BOOL)isEnabled;
- (BOOL)deeplinkOpenWith:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options;
- (BOOL)deeplinkOpenWith:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler;


@end
