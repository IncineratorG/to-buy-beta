package com.tobuybeta.modules.app_widget.common.product;

import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;

/**
 * TODO: Add a class header comment
 */

public class Product {
    private String mId;
    private long mIntId;
    private String mName;

    public Product() {
        mId = AppWidgetModuleConstants.EMPTY_ID;
        mIntId = Long.parseLong(mId);
        mName = "";
    }

    public Product(String id, String name) {
        mId = id;
        mIntId = Long.parseLong(id);
        mName = name;
    }

    public Product(String id, long intId, String name) {
        mId = id;
        mIntId = intId;
        mName = name;
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
}
