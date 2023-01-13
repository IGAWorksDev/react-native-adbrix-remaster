#include <RNAdbrixRmUtil.h>
@implementation RNAdbrixRmUtil

+(Boolean)isNullString:(NSString *)string {
    if (string == NULL || [string isEqualToString:@""]) {
        return true;
    }
    
    return false;
}

+ (NSString *)checkNilToBlankString:(id)target {
    NSString *returnString = @"";
    if (!([target isEqual:[NSNull null]] || target == nil))
    {
        returnString = target;
    }
    
    return returnString;
}
+ (double)checkDoubleNilToZero:(id)target {
    double returnDouble = 0.0f;
    if (!([target isEqual:[NSNull null]] || target == nil))
    {
        returnDouble = (double)[target doubleValue];
    }
    
    return returnDouble;
}

+ (NSInteger)checkIntegerNilToZero:(id)target
{
    NSInteger returnInteger = 0;
    if (!([target isEqual:[NSNull null]] || target == nil))
    {
        returnInteger = [target integerValue];
    }
    
    return returnInteger;
}

+(int)getCodeFromSharingChannel:(NSString *)channelName
{
    NSLog(@"CHANNEL NAME : %@", channelName);
    if([channelName isEqualToString:@"Facebook"]){
        NSLog(@"is facebook channel");
        return 1;
    }
    else if([channelName isEqualToString:@"KakaoTalk"]){
        return 2;
    }
    else if([channelName isEqualToString:@"KakaoStory"]){
        return 3;
    }
    else if([channelName isEqualToString:@"Line"]){
        return 4;
    }
    else if([channelName isEqualToString:@"whatsApp"]){
        return 5;
    }
    else if([channelName isEqualToString:@"QQ"]){
        return 6;
    }
    else if([channelName isEqualToString:@"WeChat"]){
        return 7;
    }
    else if([channelName isEqualToString:@"SMS"]){
        return 8;
    }
    else if([channelName isEqualToString:@"Email"]){
        return 9;
    }
    else if([channelName isEqualToString:@"copyUrl"]){
        return 10;
    }
    else {
        return 11;
    }
}

+(int)getCodeFromSignUpChannel:(NSString *)channelName
{
    if([channelName isEqualToString:@"Kakao"]){
        return 1;
    }
    else if([channelName isEqualToString:@"Naver"]){
        return 2;
    }
    else if([channelName isEqualToString:@"Line"]){
        return 3;
    }
    else if([channelName isEqualToString:@"Google"]){
        return 4;
    }
    else if([channelName isEqualToString:@"Facebook"]){
        return 5;
    }
    else if([channelName isEqualToString:@"Twitter"]){
        return 6;
    }
    else if([channelName isEqualToString:@"whatsApp"]){
        return 7;
    }
    else if([channelName isEqualToString:@"QQ"]){
        return 8;
    }
    else if([channelName isEqualToString:@"WeChat"]){
        return 9;
    }
    else if([channelName isEqualToString:@"UserId"]){
        return 10;
    }
    else if ([channelName isEqualToString:@"SkTid"]) {
        return 12;
    }
    else if([channelName isEqualToString:@"AppleId"]){
        return 13;
    }
    else {
        return 11;
    }
}

+ (int)getCodeFromInviteChannel:(NSString *)channelName
{
    if([channelName isEqualToString:@"Kakao"]){
        return 1;
    }
    else if([channelName isEqualToString:@"Naver"]){
        return 2;
    }
    else if([channelName isEqualToString:@"Line"]){
        return 3;
    }
    else if([channelName isEqualToString:@"Google"]){
        return 4;
    }
    else if([channelName isEqualToString:@"Facebook"]){
        return 5;
    }
    else if([channelName isEqualToString:@"Twitter"]){
        return 6;
    }
    else if([channelName isEqualToString:@"whatsApp"]){
        return 7;
    }
    else if([channelName isEqualToString:@"QQ"]){
        return 8;
    }
    else if([channelName isEqualToString:@"WeChat"]){
        return 9;
    }
    else {
        return 10;
    }
}

+(int)getCodeFromPaymentMethod:(NSString *)paymentMethod
{
    if([paymentMethod isEqualToString:@"CreditCard"]){
        return 1;
    }
    else if([paymentMethod isEqualToString:@"BankTransfer"]){
        return 2;
    }
    else if([paymentMethod isEqualToString:@"MobilePayment"]){
        return 3;
    }
    else {
        return 4;
    }
}

+ (NSDictionary *)getDictionaryFromAttrs:(NSString *)attrString
{
    NSError *error;
    NSData *jsonData = [attrString dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *json = [NSJSONSerialization
                          JSONObjectWithData:jsonData
                          options:NSJSONReadingMutableContainers
                          error:&error];
    return json;
}

+ (AdBrixRmAttrModel *)getAttrModelFromAttrString:(NSString *)attrString
{
    NSDictionary *dictionary = [self getDictionaryFromAttrs:attrString];
    if(dictionary == NULL) {
        return NULL;
    }
    AdBrixRmAttrModel *attrModel = [AdBrixRmAttrModel new];
    
    [dictionary enumerateKeysAndObjectsUsingBlock:^(id key, id value, BOOL* stop) {
        if([value isKindOfClass:[NSString class]]) {
            [attrModel setAttrDataString:key :value];
        } else if(strcmp([value objCType], @encode(long)) == 0) {
            [attrModel setAttrDataInt:key :[value intValue]];
        } else if(strcmp([value objCType], @encode(bool)) == 0 || strcmp([value objCType], @encode(char)) == 0) {
            [attrModel setAttrDataBool:key :[value boolValue]];
        } else if(strcmp([value objCType], @encode(double)) == 0) {
            [attrModel setAttrDataDouble:key :[value doubleValue]];
        } else {
            NSLog(@"%@", [@"abxrm error :: unknown data type key:: " stringByAppendingString: key]);
            NSLog(@"%@", [@"abxrm error :: unknown data type type:: " stringByAppendingString: [NSString stringWithUTF8String:[value objCType]]]);
        }
    }];
    
    return attrModel;
}

+ (AbxRemotePushModel *)getRemotePushModelFromJsonString:(NSString *) pushJsonString
{
    if (pushJsonString == NULL)
    {
        NSLog(@"pushJsonString is NULL");
        return NULL;
    }
    
    NSError *error = [[NSError alloc] init];
    NSData *jsonData = [pushJsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *dictionary = [NSJSONSerialization
                          JSONObjectWithData:jsonData
                          options:NSJSONReadingMutableContainers
                          error:&error];
    if (dictionary == NULL) {
        return NULL;
    }

    AbxRemotePushModel * abxRemotePushModel = [AbxRemotePushModel alloc];
    @try {
        NSString* campaignId = dictionary[@"abx:gf:campaign_id"];
        NSInteger campaignRevisionNo = [dictionary[@"abx:gf:campaign_revision_no"] integerValue];
        NSString* stepId = dictionary[@"abx:gf:step_id"];
        NSString* cycleTime = dictionary[@"abx:gf:step_id"];
        NSLog(@"campaignId : %@s", campaignId);
        NSLog(@"cycleTime : %@s", cycleTime);
        abxRemotePushModel = [abxRemotePushModel initWithCampaignId:campaignId campaignRevisionNo:campaignRevisionNo stepId:stepId cycleTime:cycleTime error:&error];
    } @catch (NSException *exception) {
        NSLog(@"getRemotePushModelFrom catch");
    }

    
    NSLog(@"model : %@s", @[abxRemotePushModel]);
    return abxRemotePushModel;
}

+ (NSArray *)getArrayFromString : (NSString *)arrayString
{
    NSCharacterSet *characterSet = [NSCharacterSet characterSetWithCharactersInString:@"[] "];
    NSArray *array = [[[arrayString componentsSeparatedByCharactersInSet:characterSet]
                       componentsJoinedByString:@""]
                      componentsSeparatedByString:@","];
    return array;
}

@end

