
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <AdBrixRM/AdBrixRM-Swift.h>

@interface RNAdbrixRmReact : NSObject <RCTBridgeModule>

@end

