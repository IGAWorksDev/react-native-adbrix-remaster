#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <AdBrixRmKit/AdBrixRmKit-Swift.h>
#import <RNAdbrixRmReact.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
