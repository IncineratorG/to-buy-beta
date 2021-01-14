package com.tobuybeta.modules.app_widget.common.product;

import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;

/**
 * TODO: Add a class header comment
 */

public class Product {
    private String mId;
    private int mIntId;
    private String mName;

    public Product() {
        mId = AppWidgetModuleConstants.EMPTY_ID;
        mIntId = Integer.parseInt(mId);
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
