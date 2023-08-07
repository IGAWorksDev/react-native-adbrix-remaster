package io.adbrix.reactnative;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.igaworks.v2.core.AdBrixRm;
import com.igaworks.v2.core.AdBrixRm.UserProperties;
import com.igaworks.v2.core.AdBrixRm.CommerceProductModel;
import com.igaworks.v2.core.AdBrixRm.CommerceCategoriesModel;
import com.igaworks.v2.core.AdBrixRm.AttrModel;
import com.igaworks.v2.core.result.GetSubscriptionStatusResult;

import java.util.ArrayList;
import java.util.List;

import io.adbrix.sdk.component.AbxLog;
import io.adbrix.sdk.domain.model.SubscriptionStatus;

public class AbxUtil {
    public static int doubleToInt(double val) {
        Double doubleVal = val;

        return doubleVal.intValue();
    }

    public static WritableMap getSubsResultToWritableMap(GetSubscriptionStatusResult result) {
        WritableMap data = Arguments.createMap();
        data.putString("informative", getStringFromType(result.getInformativeNotificationFlag()));
        data.putString("marketing", getStringFromType(result.getMarketingNotificationFlag()));
        data.putString("marketing_push", getStringFromType(result.getMarketingNotificationFlagForPushChannel()));
        data.putString("marketing_sms", getStringFromType(result.getMarketingNotificationFlagForSmsChannel()));
        data.putString("marketing_kakao", getStringFromType(result.getMarketingNotificationFlagForKakaoChannel()));
        data.putString("marketing_night", getStringFromType(result.getMarketingNotificationAtNightFlag()));
        data.putString("marketing_night_push",
                getStringFromType(result.getMarketingNotificationAtNightFlagForPushChannel()));
        data.putString("marketing_night_sms",
                getStringFromType(result.getMarketingNotificationAtNightFlagForSmsChannel()));
        data.putString("marketing_night_kakao",
                getStringFromType(result.getMarketingNotificationAtNightFlagForKakaoChannel()));
        return data;
    }

    public static String getStringFromType(SubscriptionStatus.Type t) {
        switch (t) {
            case SUBSCRIBED:
                return "SUBSCRIBED";
            case UNSUBSCRIBED:
                return "UNSUBSCRIBED";
            default:
                return "UNDEFINED";
        }

    }

    public static SubscriptionStatus buildSubscriptionStatusWith(ReadableMap status) {
        SubscriptionStatus.Builder builder = new SubscriptionStatus.Builder();

        ReadableMapKeySetIterator iterator = status.keySetIterator();

        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            String value = status.getString(key);
            SubscriptionStatus.Type type = getTypeFromString(value);

            switch (key) {
                case "informative":
                    builder.setInformativeNotificationFlag(type);
                    break;
                case "marketing":
                    builder.setMarketingNotificationFlag(type);
                    break;
                case "marketing_push":
                    builder.setMarketingNotificationFlagForPushChannel(type);
                    break;
                case "marketing_sms":
                    builder.setMarketingNotificationFlagForSmsChannel(type);
                    break;
                case "marketing_kakao":
                    builder.setMarketingNotificationFlagForKakaoChannel(type);
                    break;
                case "marketing_night":
                    builder.setMarketingNotificationAtNightFlag(type);
                    break;
                case "marketing_night_push":
                    builder.setMarketingNotificationAtNightFlagForPushChannel(type);
                    break;
                case "marketing_night_sms":
                    builder.setMarketingNotificationAtNightFlagForSmsChannel(type);
                    break;
                case "marketing_night_kakao":
                    builder.setMarketingNotificationAtNightFlagForKakaoChannel(type);
                    break;
            }
        }

        return builder.build();
    }

    public static SubscriptionStatus.Type getTypeFromString(String s) {
        switch (s) {
            case "SUBSCRIBED":
                return SubscriptionStatus.Type.SUBSCRIBED;
            case "UNSUBSCRIBED":
                return SubscriptionStatus.Type.UNSUBSCRIBED;
            default:
                return SubscriptionStatus.Type.UNDEFINED;
        }
    }

    public static AttrModel convertMapToAttr(ReadableMap map) {
        AttrModel result = new AttrModel();
        if (map == null) {
            return result;
        }
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            try {
                ReadableType type = map.getType(key);
                switch (type) {
                    case Number:
                        double doubleValue = map.getDouble(key);
                        if (doubleValue % 1 == 0) {
                            int intValue = (int) doubleValue;
                            result.setAttrs(key, intValue);
                        } else {
                            result.setAttrs(key, doubleValue);
                        }
                        break;
                    case Boolean:
                        result.setAttrs(key, map.getBoolean(key));
                        break;
                    case String:
                        result.setAttrs(key, map.getString(key));
                        break;
                    default:
                        break;
                }
            } catch (Exception e) {
                AbxLog.e(e.getLocalizedMessage(), false);
            }
        }
        return result;
    }

    public static UserProperties convertMapToUserProperties(ReadableMap map) {
        UserProperties userProperties = new UserProperties();

        if (map != null) {
            ReadableMapKeySetIterator iterator = map.keySetIterator();

            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                try {
                    ReadableType type = map.getType(key);
                    switch (type) {
                        case Number:
                            double doubleValue = map.getDouble(key);
                            if (doubleValue % 1 == 0) {
                                int intValue = (int) doubleValue;
                                userProperties.setAttrs(key, intValue);
                            } else {
                                userProperties.setAttrs(key, doubleValue);
                            }
                            break;
                        case String:
                            userProperties.setAttrs(key, map.getString(key));
                            break;
                        case Boolean:
                            userProperties.setAttrs(key, map.getBoolean(key));
                            break;
                        default:
                            break;
                    }
                } catch (Exception e) {
                    AbxLog.e(e.getLocalizedMessage(), false);
                }
            }
        }
        return userProperties;
    }

    public static List<CommerceProductModel> convertArrayToCommerceProductModelList(ReadableArray array) {
        List<CommerceProductModel> productModelList = new ArrayList<>();

        for (int i = 0; i < array.size(); i++) {
            if (array.getType(i) == ReadableType.Map) {
                ReadableMap map = array.getMap(i);
                productModelList.add(convertMapToProductModel(map));
            }
        }
        return productModelList;
    }

    public static CommerceProductModel convertMapToProductModel(ReadableMap map) {
        CommerceProductModel productModel = new CommerceProductModel();

        productModel.setProductID(extractString(map, "productId"));
        productModel.setProductName(extractString(map, "productName"));
        productModel.setPrice(extractDouble(map, "price"));
        productModel.setQuantity(extractInt(map, "quantity"));
        productModel.setDiscount(extractDouble(map, "discount"));
        productModel.setCurrency(convertStringToCurrency(extractString(map, "currency")));
        productModel.setCategory(convertArrayToCategoryModel(extractArray(map, "category")));
        productModel.setAttrModel(extractAttrModel(map, "productAttrsMap"));

        return productModel;
    }

    public static CommerceCategoriesModel convertReadableArrayToCategoryModel(ReadableArray readableArray) {
        CommerceCategoriesModel categoryModel = new CommerceCategoriesModel();

        for (int i = 0; i < readableArray.size(); i++) {
            if (readableArray.getType(i) == ReadableType.String) {
                categoryModel.setCategory(readableArray.getString(i));
            }
        }
        return categoryModel;
    }

    private static CommerceCategoriesModel convertArrayToCategoryModel(ArrayList<String> array) {
        CommerceCategoriesModel categoryModel = new CommerceCategoriesModel();
        for (int i = 0; i < array.size(); i++) {
            categoryModel.setCategory(array.get(i));
        }
        return categoryModel;
    }

    private static AdBrixRm.Currency convertStringToCurrency(String str) {
        return AdBrixRm.Currency.getCurrencyByCurrencyCode(str);
    }

    private static String extractString(ReadableMap map, String key) {
        return map.hasKey(key) && map.getType(key) == ReadableType.String ? map.getString(key) : "";
    }

    private static double extractDouble(ReadableMap map, String key) {
        return map.hasKey(key) && map.getType(key) == ReadableType.Number ? map.getDouble(key) : 0.0;
    }

    private static int extractInt(ReadableMap map, String key) {
        return map.hasKey(key) && map.getType(key) == ReadableType.Number ? (int) map.getDouble(key) : 0;
    }

    private static ArrayList<String> extractArray(ReadableMap map, String key) {
        ArrayList<String> list = new ArrayList<>();
        if (map.hasKey(key) && map.getType(key) == ReadableType.Array) {
            ReadableArray array = map.getArray(key);
            for (int i = 0; i < array.size(); i++) {
                if (array.getType(i) == ReadableType.String) {
                    list.add(array.getString(i));
                }
            }
        }
        return list;
    }

    private static AttrModel extractAttrModel(ReadableMap map, String key) {
        if (map.hasKey(key) && map.getType(key) == ReadableType.Map) {
            ReadableMap attrMap = map.getMap(key);
            return convertMapToAttr(attrMap);
        } else {
            return new AttrModel();
        }
    }

}
