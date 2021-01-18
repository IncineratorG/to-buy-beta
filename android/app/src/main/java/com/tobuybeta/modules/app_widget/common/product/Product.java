package com.tobuybeta.modules.app_widget.common.product;

import androidx.arch.core.util.Function;

import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;

public class Product {
    private String mId;
    private long mIntId;
    private String mName;
    private String mStatus;
    private static String SEPARATOR = "_-9495537_-";

    public Product() {
        mId = AppWidgetModuleConstants.common.EMPTY_ID;
        mIntId = Long.parseLong(mId);
        mName = "";
        mStatus = "";
    }

    public Product(String id, String name) {
        mId = id;
        mIntId = Long.parseLong(id);
        mName = name;
        mStatus = "";
    }

//    public Product(String id, String name, String status) {
//        mId = id;
//        mIntId = Long.parseLong(id);
//        mName = name;
//        mStatus = status;
//    }

    public Product(String id, long intId, String name) {
        mId = id;
        mIntId = intId;
        mName = name;
        mStatus = "";
    }

    public Product(String id, long intId, String name, String status) {
        mId = id;
        mIntId = intId;
        mName = name;
        mStatus = status;
    }

    public String getId() {
        return mId;
    }

    public long getIntId() {
        return mIntId;
    }

    public String getName() {
        return mName;
    }

    public String getStatus() {
        return mStatus;
    }

    public static String serialize(Product product) {
        if (product == null) {
            return "";
        }

        String productId = product.getId();
        String productName = product.getName();
        String productStatus = product.getStatus();

        return productId + SEPARATOR + productName + SEPARATOR + productStatus;
    }

    public static Function<String, String> serializedIdExtractor() {
        return (serializedProduct) -> {
            if (serializedProduct == null) {
                return "";
            }
            String[] productDataArray = serializedProduct.split(SEPARATOR);
            if (productDataArray.length < 1) {
                return "";
            } else {
                return productDataArray[0];
            }
        };
    }

    public static Function<String, String> serializedNameExtractor() {
        return (serializedProduct) -> {
            if (serializedProduct == null) {
                return "";
            }
            String[] productDataArray = serializedProduct.split(SEPARATOR);
            if (productDataArray.length < 2) {
                return "";
            } else {
                return productDataArray[1];
            }
        };
    }

    public static Function<String, String> serializedStatusExtractor() {
        return (serializedProduct) -> {
            if (serializedProduct == null) {
                return "";
            }
            String[] productDataArray = serializedProduct.split(SEPARATOR);
            if (productDataArray.length < 3) {
                return "";
            } else {
                return productDataArray[2];
            }
        };
    }
}
