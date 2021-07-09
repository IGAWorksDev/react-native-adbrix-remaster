package io.adbrix;

import com.igaworks.v2.core.AdBrixRm;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class AdbrixUtils {

    public static long castStringToLong(String beforeCasting) {
        return Long.valueOf(beforeCasting);
    }

    public static boolean isNullString(String s){
        try{
            return s == null || s.equals("null");
        }
        catch (Exception e){
            e.printStackTrace();
            return true;
        }
    }

    public static List<AdBrixRm.CommerceProductModel> makeProductList(JSONArray items){
        try {
            List<AdBrixRm.CommerceProductModel> products = new ArrayList<AdBrixRm.CommerceProductModel>();
            for (int i = 0; i < items.length(); i++) {
                JSONObject product = items.getJSONObject(i);
                AdBrixRm.CommerceProductModel productModel = makeProductModel(product);
                products.add(productModel);
            }
            return products;
        }
        catch (Exception e){
            e.printStackTrace();
            return new ArrayList<AdBrixRm.CommerceProductModel>();
        }
    }
    public static AdBrixRm.CommerceProductModel makeProductModel(JSONObject product){
        try {
            AdBrixRm.CommerceProductModel productModel = new AdBrixRm.CommerceProductModel();
            for (Iterator<String> it = product.keys(); it.hasNext(); ) {
                String element = it.next();
                switch (element) {
                    case "productId":
                        productModel.setProductID(product.getString("productId"));
                        break;
                    case "productName":
                        productModel.setProductName(product.getString("productName"));
                        break;
                    case "price":
                        productModel.setPrice(product.getDouble("price"));
                        break;
                    case "discount":
                        productModel.setDiscount(product.getDouble("discount"));
                        break;
                    case "currency":
                        productModel.setCurrency(AdBrixRm.Currency.getCurrencyByCurrencyCode(product.getString("currency")));
                        break;
                    case "category":
                        AdBrixRm.CommerceCategoriesModel extraCategory = new AdBrixRm.CommerceCategoriesModel();
                        for (int j = 0; j < product.getJSONArray("category").length(); j++) {
                            extraCategory.setCategory(product.getJSONArray("category").getString(j));
                        }
                        productModel.setCategory(extraCategory);
                        break;
                    case "quantity":
                        productModel.setQuantity(product.getInt("quantity"));
                        break;

                }
            }
            return productModel;
        }catch (Exception e){
            e.printStackTrace();
            return new AdBrixRm.CommerceProductModel();
        }
    }
    public static AdBrixRm.UserProperties makeUserProperties(JSONObject userPropertiesJSON){
        AdBrixRm.UserProperties userProperties = new AdBrixRm.UserProperties();
        for (Iterator<String> it = userPropertiesJSON.keys(); it.hasNext(); ) {
            try {
                String key = it.next();
                Object value = userPropertiesJSON.get(key);
                if(value instanceof Integer){
                    userProperties.setAttrs(key,Long.valueOf((int)value));
                }
                else if(value instanceof Long){
                    userProperties.setAttrs(key,(long)value);
                }
                else if(value instanceof Boolean){
                    userProperties.setAttrs(key,(boolean)value);
                }
                else if(value instanceof Double){
                    userProperties.setAttrs(key,(double)value);
                }
                else if(value instanceof Float){
                    userProperties.setAttrs(key,(float)value);
                }
                else {
                    userProperties.setAttrs(key,String.valueOf(value));
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return userProperties;
    }
    // Yen: 20210709
    public static AdBrixRm.AttrModel makeEventProperties(JSONObject eventProperties){
        AdBrixRm.AttrModel eventProps = new AdBrixRm.AttrModel();
        for(Iterator<String> it = eventProperties.keys(); it.hasNext();){
            try{
                String key = it.next();
                Object value = eventProperties.get(key);
                if(value instanceof Integer){
                    eventProps.setAttrs(key,Long.valueOf((int)value));
                }
                else if(value instanceof Long){
                    eventProps.setAttrs(key,(long)value);
                }
                else if(value instanceof Boolean){
                    eventProps.setAttrs(key,(boolean)value);
                }
                else if(value instanceof Double){
                    eventProps.setAttrs(key,(double)value);
                }
                else if(value instanceof Float){
                    eventProps.setAttrs(key,(float)value);
                }
                else {
                    eventProps.setAttrs(key,String.valueOf(value));
                }
            } catch (JSONException e){
                e.printStackTrace();
            }
        }

        return eventProps;
    }
}
