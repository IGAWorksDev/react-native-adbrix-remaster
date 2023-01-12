
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <React/RCTEventEmitter.h>
#import <AdSupport/AdSupport.h>
#import <AdBrixRmKit/AdBrixRmKit.h>

// 콜백 상수 처리
extern NSString *const DEFERRED_LINK_LISTENER_CALLBACK;
extern NSString *const DEEP_LINK_LISTENER_CALLBACK;
extern NSString *const LOCAL_PUSH_MESSAGE_CALLBACK;
extern NSString *const REMOTE_PUSH_MESSAGE_CALLBACK;
extern NSString *const IN_APP_MESSAGE_CLICK_CALLBACK;
extern NSString *const IN_APP_MESSAGE_AUTO_FETCH_CALLBACK;
extern NSString *const LOG_LISTENER_CALLBACK;

@interface RNAdbrixRmReact : RCTEventEmitter <RCTBridgeModule,AdBrixRMDeferredDeeplinkDelegate,AdBrixRMDeeplinkDelegate,AdBrixRmPushRemoteDelegate,  AdBrixRMInAppMessageClickDelegate, DfnInAppMessageAutoFetchDelegate, AdBrixRMLogDelegate>

- (void)setDeferredDeeplinkListener;
- (void)setAdBrixDeeplinkDelegate;
- (void)setAdBrixPushRemoteDelegate;
- (void)setInAppMessageFetchDelegateWithDelegate;
- (void)setInAppMessageClickDelegate;
- (void)setLogDelegate;

@end

