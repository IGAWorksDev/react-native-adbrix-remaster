#include "AbxUtil.h"

@implementation AbxUtil


+ (NSString *)typeToStringWith:(_Type)type
{
    if (type == _TypeSUBSCRIBED) {
        return @"SUBSCRIBED";
    } else if (type == _TypeUNSUBSCRIBED) {
        return @"UNSUBSCRIBED";
    } else {
        return @"UNDEFINED";
    }
}


+ (SubscriptionStatus *)buildSubscriptionStatusWith:(NSDictionary *)status
{
    SubscriptionStatusBuilder *builder = [SubscriptionStatus Builder];

    for (NSString *key in status) {
        NSString *value = status[key];
        if ([key isEqual: @"informative"]) {
            if ([value isEqualToString:@"SUBSCRIBED"]) {
                [builder setInformativeNotificationFlagTo:_TypeSUBSCRIBED];
            } else if ([value isEqualToString:@"UNSUBSCRIBED"]) {
                [builder setInformativeNotificationFlagTo:_TypeUNSUBSCRIBED];
            } else {
                [builder setInformativeNotificationFlagTo:_TypeUNDEFINED];
            }
        } else if ([key isEqualToString:@"marketing"]) {
            if ([value isEqualToString:@"SUBSCRIBED"]) {
                [builder setMarketingNotificationFlagTo:_TypeSUBSCRIBED];
            } else if ([value isEqualToString:@"UNSUBSCRIBED"]) {
                [builder setMarketingNotificationFlagTo:_TypeUNSUBSCRIBED];
            } else {
                [builder setMarketingNotificationFlagTo:_TypeUNDEFINED];
            }
        } else if ([key isEqualToString:@"marketing_push"]) {
            if ([value isEqualToString:@"SUBSCRIBED"]) {
                [builder setMarketingNotificationFlagForPushChannelTo:_TypeSUBSCRIBED];
            } else if ([value isEqualToString:@"UNSUBSCRIBED"]) {
                [builder setMarketingNotificationFlagForPushChannelTo:_TypeUNSUBSCRIBED];
            } else {
                [builder setMarketingNotificationFlagForPushChannelTo:_TypeUNDEFINED];
            }
        } else if ([key isEqualToString:@"marketing_sms"]) {
            if ([value isEqualToString:@"SUBSCRIBED"]) {
                [builder setMarketingNotificationFlagForSmsChannelTo:_TypeSUBSCRIBED];
            } else if ([value isEqualToString:@"UNSUBSCRIBED"]) {
                [builder setMarketingNotificationFlagForSmsChannelTo:_TypeUNSUBSCRIBED];
            } else {
                [builder setMarketingNotificationFlagForSmsChannelTo:_TypeUNDEFINED];
            }
        } else if ([key isEqualToString:@"marketing_kakao"]) {
            if ([value isEqualToString:@"SUBSCRIBED"]) {
                [builder setMarketingNotificationFlagForKakaoChannelTo:_TypeSUBSCRIBED];
            } else if ([value isEqualToString:@"UNSUBSCRIBED"]) {
                [builder setMarketingNotificationFlagForKakaoChannelTo:_TypeUNSUBSCRIBED];
            } else {
                [builder setMarketingNotificationFlagForKakaoChannelTo:_TypeUNDEFINED];
            }
        } else if ([key isEqualToString:@"marketing_night"]) {
            if ([value isEqualToString:@"SUBSCRIBED"]) {
                [builder setMarketingNotificationAtNightFlagTo:_TypeSUBSCRIBED];
            } else if ([value isEqualToString:@"UNSUBSCRIBED"]) {
                [builder setMarketingNotificationAtNightFlagTo:_TypeUNSUBSCRIBED];
            } else {
                [builder setMarketingNotificationAtNightFlagTo:_TypeUNDEFINED];
            }
        } else if ([key isEqualToString:@"marketing_night_push"]) {
            if ([value isEqualToString:@"SUBSCRIBED"]) {
                [builder setMarketingNotificationAtNightFlagForPushChannelTo:_TypeSUBSCRIBED];
            } else if ([value isEqualToString:@"UNSUBSCRIBED"]) {
                [builder setMarketingNotificationAtNightFlagForPushChannelTo:_TypeUNSUBSCRIBED];
            } else {
                [builder setMarketingNotificationAtNightFlagForPushChannelTo:_TypeUNDEFINED];
            }
        } else if ([key isEqualToString:@"marketing_night_sms"]) {
            if ([value isEqualToString:@"SUBSCRIBED"]) {
                [builder setMarketingNotificationAtNightFlagForSmsChannelTo:_TypeSUBSCRIBED];
            } else if ([value isEqualToString:@"UNSUBSCRIBED"]) {
                [builder setMarketingNotificationAtNightFlagForSmsChannelTo:_TypeUNSUBSCRIBED];
            } else {
                [builder setMarketingNotificationAtNightFlagForSmsChannelTo:_TypeUNDEFINED];
            }
        } else if ([key isEqualToString:@"marketing_night_kakao"]) {
            if ([value isEqualToString:@"SUBSCRIBED"]) {
                [builder setMarketingNotificationAtNightFlagForKakaoChannelTo:_TypeSUBSCRIBED];
            } else if ([value isEqualToString:@"UNSUBSCRIBED"]) {
                [builder setMarketingNotificationAtNightFlagForKakaoChannelTo:_TypeUNSUBSCRIBED];
            } else {
                [builder setMarketingNotificationAtNightFlagForKakaoChannelTo:_TypeUNDEFINED];
            }
        } else {
            continue;
        }
    }
    return [builder build];
}

+ (AdBrixRmAttrModel *)dictToAttrModel:(NSDictionary *)dict {
    AdBrixRmAttrModel *model = [AdBrixRmAttrModel new];
    
    if (dict != nil) {
     for (NSString *key in dict) {
         id value = dict[key];
         if ([value isKindOfClass:[NSString class]]) {
            [model setAttrDataString:key :value];
         } else if ([value isKindOfClass:[NSNumber class]]) {
             if (strcmp([value objCType], @encode(double)) == 0) {
                  double val = [value doubleValue];
                 if (fmod(val, 1.0) == 0.0) {
                     [model setAttrDataInt:key :[value longValue]];
                 } else {
                     [model setAttrDataDouble:key :val];
                 }
             } else if (strcmp([value objCType], @encode(bool)) == 0 || strcmp([value objCType], @encode(char)) == 0) {
                 [model setAttrDataBool:key :[value boolValue]];
             }
         }
      }
    }
    return model;
}

+ (NSArray<AdBrixRmCommerceProductModel *> *)arrayToCommerceProductModelList:(NSArray *)array {
    
    NSMutableArray<AdBrixRmCommerceProductModel *> *tmp = [NSMutableArray new];
    NSArray<AdBrixRmCommerceProductModel *> *retVal;
    
    for (NSObject *object in array) {
        if ([object isKindOfClass:[NSDictionary class]]) {
            [tmp addObject:[self dictToCommerceProductModel:(NSDictionary *) object]];
        }
    }
    retVal = [NSArray arrayWithArray:tmp];
    
    return retVal;
}

+ (AdBrixRmCommerceProductModel *)dictToCommerceProductModel:(NSDictionary *)dict {
    NSString *_productId = @"";
    NSString *_productName = @"";
    double _price = 0.0;
    int _quantity = 0;
    double _discount = 0.0;
    NSString *_currency;
    AdBrixRmCommerceProductCategoryModel *_category;
    AdBrixRmAttrModel *attrModel;
    
    AdBrixRmCommerceProductModel *productModel = [AdBrixRmCommerceProductModel new];
    
    for (NSString *key in dict) {
        if (![key isKindOfClass:[NSNull class]]) {
            NSObject *object = [dict objectForKey:key];
            if ([key isEqualToString:@"productId"]) {
                if ([object isKindOfClass:[NSString class]]) {
                    _productId = (NSString *)object;
                } else {
                    NSLog(@"wrong type in productId");
                }
            } else if ([key isEqualToString:@"productName"]){
                if ([object isKindOfClass:[NSString class]]) {
                    _productName = (NSString *)object;
                } else {
                    NSLog(@"wrong type in productName");
                }
            } else if ([key isEqualToString:@"price"]) {
                if ([object isKindOfClass:[NSNumber class]]) {
                    _price = [(NSNumber *)object doubleValue];
                } else {
                    NSLog(@"wrong type in price");
                }
            } else if ([key isEqualToString:@"quantity"]) {
                if ([object isKindOfClass:[NSNumber class]]) {
                    _quantity = [(NSNumber *)object intValue];
                } else {
                    NSLog(@"wrong type in quantity");
                }
            } else if ([key isEqualToString:@"discount"]) {
                if ([object isKindOfClass:[NSNumber class]]) {
                    _discount = [(NSNumber *)object doubleValue];
                } else {
                    NSLog(@"wrong type in discount");
                }
            } else if ([key isEqualToString:@"currency"]) {
                if ([object isKindOfClass:[NSString class]]) {
                    _currency = (NSString *)object;
                }
            } else if ([key isEqualToString:@"category"]) {
                if ([object isKindOfClass:[NSArray class]]) {
                    _category = [self getCategoryModel:(NSArray *)object];
                }
            } else if ([key isEqualToString:@"productAttrsMap"]) {
                if ([object isKindOfClass:[NSDictionary class]]) {
                    attrModel = [self dictToAttrModel:(NSDictionary *)object];
                }
            }
        }
    }
    [productModel setModelWithProductId:_productId
                            productName:_productName
                                  price:_price
                               quantity:_quantity
                               discount:_discount
                         currencyString:_currency
                             categories:_category
                        productAttrsMap:attrModel];
    return productModel;
}


+(AdBrixRmCommerceProductCategoryModel *)getCategoryModel:(NSArray *)categoryArray
{
    
    NSMutableArray *categoryString = [NSMutableArray new];
    
    for (NSObject *object in categoryArray) {
        if ([object isKindOfClass:[NSString class]]) {
            [categoryString addObject:object];
        }
    }
    
    AdBrixRM *adbrix = [AdBrixRM sharedInstance];
    switch (categoryString.count) {
        case 1:
            return [adbrix createCommerceProductCategoryDataWithCategory:categoryString[0] category2:@"" category3:@"" category4:@"" category5:@""];
        case 2:
            return [adbrix createCommerceProductCategoryDataWithCategory:categoryString[0] category2:categoryString[1] category3:@"" category4:@"" category5:@""];
        case 3:
            return [adbrix createCommerceProductCategoryDataWithCategory:categoryString[0] category2:categoryString[1] category3:categoryString[2] category4:@"" category5:@""];
        case 4:
            return [adbrix createCommerceProductCategoryDataWithCategory:categoryString[0] category2:categoryString[1] category3:categoryString[2] category4:categoryString[3] category5:@""];
        case 5:
            return [adbrix createCommerceProductCategoryDataWithCategory:categoryString[0] category2:categoryString[1] category3:categoryString[2] category4:categoryString[3] category5:categoryString[4]];
            
        default:
            return [adbrix createCommerceProductCategoryDataWithCategory:@"" category2:@"" category3:@"" category4:@"" category5:@""];
    }
}

+(AdBrixRmSharingChannel)getCodeFromSharingChannel:(NSString *)channelName
{
    NSLog(@"CHANNEL NAME : %@", channelName);
    NSInteger val;
    
    if([channelName isEqualToString:@"Facebook"]){
        NSLog(@"is facebook channel");
        val = 1;
    }
    else if([channelName isEqualToString:@"KakaoTalk"]){
        val = 2;
    }
    else if([channelName isEqualToString:@"KakaoStory"]){
        val = 3;
    }
    else if([channelName isEqualToString:@"Line"]){
        val = 4;
    }
    else if([channelName isEqualToString:@"whatsApp"]){
        val = 5;
    }
    else if([channelName isEqualToString:@"QQ"]){
        val = 6;
    }
    else if([channelName isEqualToString:@"WeChat"]){
        val = 7;
    }
    else if([channelName isEqualToString:@"SMS"]){
        val = 8;
    }
    else if([channelName isEqualToString:@"Email"]){
        val = 9;
    }
    else if([channelName isEqualToString:@"copyUrl"]){
        val = 10;
    }
    else {
        val = 11;
    }
    
    return [[AdBrixRM sharedInstance]convertChannel:val];
    
}

+(AdBrixRmSignUpChannel)getCodeFromSignUpChannel:(NSString *)channelName
{
    NSInteger val;

    if([channelName isEqualToString:@"Kakao"]){
        val = 1;
    }
    else if([channelName isEqualToString:@"Naver"]){
        val = 2;
    }
    else if([channelName isEqualToString:@"Line"]){
        val = 3;
    }
    else if([channelName isEqualToString:@"Google"]){
        val = 4;
    }
    else if([channelName isEqualToString:@"Facebook"]){
        val = 5;
    }
    else if([channelName isEqualToString:@"Twitter"]){
        val = 6;
    }
    else if([channelName isEqualToString:@"whatsApp"]){
        val = 7;
    }
    else if([channelName isEqualToString:@"QQ"]){
        val = 8;
    }
    else if([channelName isEqualToString:@"WeChat"]){
        val = 9;
    }
    else if([channelName isEqualToString:@"UserId"]){
        val = 10;
    }
    else if ([channelName isEqualToString:@"SkTid"]) {
        val = 12;
    }
    else if([channelName isEqualToString:@"AppleId"]){
        val = 13;
    }
    else {
        val = 11;
    }
    
    return [[AdBrixRM sharedInstance] convertSignUpChannel:val];
}

+ (AdBrixRmInviteChannel)getCodeFromInviteChannel:(NSString *)channelName
{
    NSInteger val;

    if([channelName isEqualToString:@"Kakao"]){
        val = 1;
    }
    else if([channelName isEqualToString:@"Naver"]){
        val = 2;
    }
    else if([channelName isEqualToString:@"Line"]){
        val = 3;
    }
    else if([channelName isEqualToString:@"Google"]){
        val = 4;
    }
    else if([channelName isEqualToString:@"Facebook"]){
        val = 5;
    }
    else if([channelName isEqualToString:@"Twitter"]){
        val = 6;
    }
    else if([channelName isEqualToString:@"whatsApp"]){
        val = 7;
    }
    else if([channelName isEqualToString:@"QQ"]){
        val = 8;
    }
    else if([channelName isEqualToString:@"WeChat"]){
        val = 9;
    }
    else {
        val = 10;
    }
    
    return [[AdBrixRM sharedInstance] convertInviteChannel:val];
}

+(AdbrixRmPaymentMethod)getCodeFromPaymentMethod:(NSString *)paymentMethod
{
    NSInteger val;
    
    if([paymentMethod isEqualToString:@"CreditCard"]){
        val = 1;
    }
    else if([paymentMethod isEqualToString:@"BankTransfer"]){
        val = 2;
    }
    else if([paymentMethod isEqualToString:@"MobilePayment"]){
        val = 3;
    }
    else {
        val = 4;
    }
    
    return [[AdBrixRM sharedInstance]convertPayment:val];
}

@end
