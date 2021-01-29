package com.tobuybeta.modules.app_widget.module_actions.payloads.payloads;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.app_widget.common.js_payload.JSPayload;
import com.tobuybeta.modules.app_widget.common.product.Product;

import java.util.ArrayList;
import java.util.List;

public class SetShoppingListPayload implements JSPayload {
    private String LIST_ID_FIELD = "listId";
    private String LIST_NAME_FIELD = "listName";
    private String PRODUCTS_LIST_FIELD = "productsList";
    private String PRODUCT_ID_FIELD = "id";
    private String PRODUCT_NAME_FIELD = "name";
    private String PRODUCT_STATUS_FIELD = "completionStatus";
    private boolean mIsValid;
    private String mListId;
    private String mListName;
    private List<Product> mProductsList;

    public SetShoppingListPayload(ReadableMap payloadMap) {
        mListId = String.valueOf(payloadMap.getInt(LIST_ID_FIELD));
        mListName = payloadMap.getString(LIST_NAME_FIELD);
        ReadableArray productsList = payloadMap.getArray(PRODUCTS_LIST_FIELD);

        if (mListId == null || mListName == null || productsList == null) {
            mIsValid = false;
            return;
        }

        mProductsList = new ArrayList<>(productsList.size());
        for (int i = 0; i < productsList.size(); ++i) {
            ReadableMap productMap = productsList.getMap(i);
            if (productMap != null) {
                long productIntId = (long) productMap.getDouble(PRODUCT_ID_FIELD);
                String productId = String.valueOf(productIntId);
                String productName = productMap.getString(PRODUCT_NAME_FIELD);
                String productStatus = productMap.getString(PRODUCT_STATUS_FIELD);

                if (productId.isEmpty() || productName == null || productName.isEmpty()) {
                    continue;
                }

//                mProductsList.add(new Product(productId, productIntId, productName));
                mProductsList.add(new Product(productId, productIntId, productName, productStatus));
            }
        }

        mIsValid = true;
    }

    @Override
    public boolean isValid() {
        return mIsValid;
    }

    public String listId() {
        return mListId;
    }

    public String listName() {
        return mListName;
    }

    public List<Product> productsList() {
        return mProductsList;
    }
}
