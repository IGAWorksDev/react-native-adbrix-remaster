
#import "RNAdbrixRmReact.h"

@implementation RNAdbrixRmReact

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(AdbrixRm)

RCT_EXPORT_METHOD(simpleTest:(NSString *)token) {
    NSLog(@"HongUk test !!! :: %@",token);
}
@end
  
