
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <React/RCTEventEmitter.h>
//#import <AdBrixRM/AdBrixRM-Swift.h>
#import <AdBrixRM_XC/AdBrixRM_XC-Swift.h>

@interface RNAdbrixRmReact : RCTEventEmitter <RCTBridgeModule,AdBrixRMDeferredDeeplinkDelegate>

@end

