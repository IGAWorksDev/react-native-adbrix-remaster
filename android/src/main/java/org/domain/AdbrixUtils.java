package com.test02;

import android.util.Log;

import com.igaworks.v2.core.AdBrixRm;
import com.igaworks.v2.core.utils.common.IgawConstant;
import com.igaworks.v2.core.utils.common.IgawLogger;

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
        return s.equals("null") || s == null ;
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
}
