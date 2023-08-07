#import <AdBrixRmKit/AdBrixRmKit-Swift.h>

@interface AbxUtil : NSObject

+ (AdBrixRmAttrModel *)dictToAttrModel:(NSDictionary *)dict;
+ (NSArray<AdBrixRmCommerceProductModel *> *)arrayToCommerceProductModelList:(NSArray *)array;
+ (AdBrixRmCommerceProductModel *)dictToCommerceProductModel:(NSDictionary *)dict;
+ (AdBrixRmCommerceProductCategoryModel *)getCategoryModel:(NSArray *)categoryArray;

+ (AdBrixRmSharingChannel)getCodeFromSharingChannel:(NSString *)channelName;
+ (AdBrixRmSignUpChannel)getCodeFromSignUpChannel:(NSString *)channelName;
+ (AdBrixRmInviteChannel)getCodeFromInviteChannel:(NSString *)channelName;
+ (AdbrixRmPaymentMethod)getCodeFromPaymentMethod:(NSString *)paymentMethod;

+ (SubscriptionStatus *)buildSubscriptionStatusWith:(NSDictionary *)status;
+ (NSString *)typeToStringWith:(_Type)type;
@end
