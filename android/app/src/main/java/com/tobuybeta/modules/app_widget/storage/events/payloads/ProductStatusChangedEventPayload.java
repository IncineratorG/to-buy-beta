package com.tobuybeta.modules.app_widget.storage.events.payloads;

import android.content.Context;

public class ProductStatusChangedEventPayload {
    private Context mContext;
    private String mListId;
    private String mProductId;
    private String mNewProductStatus;

    public ProductStatusChangedEventPayload(Context context,
                                            String listId,
                                            String productId,
                                            String newProductStatus) {
        mContext = context;
        mListId = listId;
        mProductId = productId;
        mNewProductStatus = newProductStatus;
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

    public String newProductStatus() {
        return mNewProductStatus;
    }
}
