package com.tobuybeta.modules.app_widget.common.product;

/**
 * TODO: Add a class header comment
 */

public class Product {
    private String mId;
    private int mIntId;
    private String mName;

    public Product() {
        mId = "-1";
        mIntId = -1;
        mName = "";
    }

    public Product(String id, String name) {
        mId = id;
        mIntId = Integer.parseInt(id);
        mName = name;
    }

    public Product(String id, int intId, String name) {
        mId = id;
        mIntId = intId;
        mName = name;
    }

    public String getId() {
        return mId;
    }

    public int getIntId() {
        return mIntId;
    }

    public String getName() {
        return mName;
    }
}
