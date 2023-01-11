
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <React/RCTEventEmitter.h>
#import <AdSupport/AdSupport.h>
#import <AdBrixRmKit/AdBrixRmKit.h>

@interface RNAdbrixRmReact : RCTEventEmitter <RCTBridgeModule,AdBrixRMDeferredDeeplinkDelegate,AdBrixRMDeeplinkDelegate,AdBrixRmPushRemoteDelegate,  AdBrixRMInAppMessageClickDelegate, DfnInAppMessageAutoFetchDelegate, AdBrixRMLogDelegate> {
}
@end

