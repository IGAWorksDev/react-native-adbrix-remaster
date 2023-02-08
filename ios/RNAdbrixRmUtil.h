#include <AdBrixRmKit/AdBrixRmKit.h>

// 콜백 상수 처리
@interface RNAdbrixRmUtil : NSObject
+ (Boolean)isNullString:(NSString*)string;
+ (NSString *)checkNilToBlankString:(id)target;
+ (double)checkDoubleNilToZero:(id)target;
+ (NSInteger)checkIntegerNilToZero:(id)target;
+ (int)getCodeFromSharingChannel:(NSString *)channelName;
+ (int)getCodeFromSignUpChannel:(NSString *)channelName;
+ (int)getCodeFromInviteChannel:(NSString *)channelName;
+ (int)getCodeFromPaymentMethod:(NSString *)paymentMethod;
+ (NSDictionary *)getDictionaryFromAttrs:(NSString *)attrString;
+ (AdBrixRmAttrModel *)getAttrModelFromAttrString:(NSString *)attrString;
+ (AbxRemotePushModel *)getRemotePushModelFromJsonString:(NSString *) pushJsonString;
+ (NSArray *)getArrayFromString : (NSString *)arrayString;
@end

