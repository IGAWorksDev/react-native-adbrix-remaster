#import "AppDelegate.h"
#import <AdSupport/AdSupport.h>
#import <AppTrackingTransparency/AppTrackingTransparency.h>
#import <AdBrixRM_XC/AdBrixRM_XC-Swift.h> // We use AdBrixRM_XC module name instead of AdBrixRM

// iOS 9.x or newer
#import <React/RCTLinkingManager.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>



static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"example"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // Create AdBrixRM Instance, Only need with Adbrix RN Plugin V2
  AdBrixRM *adBrix = [AdBrixRM sharedInstance];
  [adBrix initAdBrixWithAppKey:@"dW6eSX9fbk2r0Rr4KJIQ0A" secretKey:@"tkBFgB2bOUK0L0Jo9FKqyw"];

//  if ((NSClassFromString(@"ASIdentifierManager")) != nil) {
//     NSUUID *ifa =[[ASIdentifierManager sharedManager]advertisingIdentifier];
//     // Get IDFA from a Device and Set it in SDK
//     [adBrix setAppleAdvertisingIdentifier:[ifa UUIDString]];
//  }
  
  
  if (@available(iOS 14, *)) {
    [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(ATTrackingManagerAuthorizationStatus status) {
      switch (status) {
        case ATTrackingManagerAuthorizationStatusAuthorized:
          [adBrix startGettingIDFA];
          break;
        case ATTrackingManagerAuthorizationStatusDenied:
          [adBrix stopGettingIDFA];
          break;
        case ATTrackingManagerAuthorizationStatusRestricted:
          [adBrix stopGettingIDFA];
          break;
        case ATTrackingManagerAuthorizationStatusNotDetermined:
          [adBrix stopGettingIDFA];
          break;
        default:
          [adBrix stopGettingIDFA];
          break;
      }
    }];
  }
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
   AdBrixRM *adBrix = [AdBrixRM sharedInstance];
   [adBrix deepLinkOpenWithUrl:url]; // Deeplink tracking code
   
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  if ([userActivity.activityType isEqualToString: NSUserActivityTypeBrowsingWeb]) {
    NSURL *incomeingurl = userActivity.webpageURL;
    NSLog(@"DEEPLINK :: UniversialLink was Clicked!! : %@", incomeingurl);
    AdBrixRM *adBrix = [AdBrixRM sharedInstance];
    [adBrix deepLinkOpenWithUrl:incomeingurl];
    
  }
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

@end
