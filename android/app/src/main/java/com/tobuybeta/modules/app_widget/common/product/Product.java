package com.tobuybeta.modules.app_widget.common.product;

import androidx.arch.core.util.Function;

import com.tobuybeta.modules.app_widget.module_constants.AppWidgetModuleConstants;

public class Product {
    private String mId;
    private long mIntId;
    private String mName;
    private String mStatus;
    private static String SEPARATOR = AppWidgetModuleConstants.common.SEPARATOR;
    private static Function<String, String> sIdExtractor = (serializedProduct) -> {
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
    private static Function<String, String> sNameExtractor = (serializedProduct) -> {
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
    private static Function<String, String> sStatusExtractor = (serializedProduct) -> {
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

    public boolean setStatus(String status) {
        if (status == null || status.isEmpty()) {
            return false;
        } else if (!status.equalsIgnoreCase(AppWidgetModuleConstants.productStatus.COMPLETED)
                    && !status.equalsIgnoreCase(AppWidgetModuleConstants.productStatus.NOT_COMPLETED)) {
            return false;
        }

        mStatus = status;
        return true;
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

    public static Product deserialize(String serializedProduct) {
        if (serializedProduct == null || serializedProduct.isEmpty()) {
            return new Product();
        }

        String productId = sIdExtractor.apply(serializedProduct);
        String productName = sNameExtractor.apply(serializedProduct);
        String productStatus = sStatusExtractor.apply(serializedProduct);

        return new Product(productId, Long.parseLong(productId), productName, productStatus);
    }

    public static Function<String, String> serializedIdExtractor() {
        return sIdExtractor;
    }

    public static Function<String, String> serializedNameExtractor() {
        return sNameExtractor;
    }

    public static Function<String, String> serializedStatusExtractor() {
        return sStatusExtractor;
    }
}
