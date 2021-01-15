package com.tobuybeta.modules.app_widget.storage.events.payloads;

import android.content.Context;

public class ProductRemovedEventPayload {
    private Context mContext;
    private String mListId;
    private String mProductId;

    public ProductRemovedEventPayload(Context context, String listId, String productId) {
        mContext = context;
        mListId = listId;
        mProductId = productId;
    }

    public Context context() {
        return mContext;
    }

    public String listId() {
        return mListId;
    }

    public String productId() {
        return mProductId;
    }
}
