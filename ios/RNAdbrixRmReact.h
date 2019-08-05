
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <React/RCTEventEmitter.h>
#import <AdBrixRM/AdBrixRM-Swift.h>

@interface RNAdbrixRmReact : RCTEventEmitter <RCTBridgeModule,AdBrixRMDeferredDeeplinkDelegate, AdBrixRMDeeplinkDelegate>

@end

