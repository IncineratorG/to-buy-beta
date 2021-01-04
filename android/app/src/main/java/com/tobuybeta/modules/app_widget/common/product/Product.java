package com.tobuybeta.modules.app_widget.common.product;

/**
 * TODO: Add a class header comment
 */

public class Product {
    private String mId;
    private String mName;

    public Product() {
        mId = "-1";
        mName = "";
    }

    public Product(String id, String name) {
        mId = id;
        mName = name;
    }

    public String getId() {
        return mId;
    }

    public String getName() {
        return mName;
    }
}
