package com.tobuybeta.modules.app_widget.module_actions.payloads.payloads;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.app_widget.common.Payload;
import com.tobuybeta.modules.app_widget.common.product.Product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * TODO: Add a class header comment
 */

public class SetShoppingListPayload implements Payload {
    private String LIST_ID_FIELD = "listId";
    private String LIST_NAME_FIELD = "listName";
    private String PRODUCTS_LIST_FIELD = "productsList";
    private String PRODUCT_ID_FIELD = "id";
    private String PRODUCT_NAME_FIELD = "name";
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
                String productId = String.valueOf(productMap.getInt(PRODUCT_ID_FIELD));
                String productName = productMap.getString(PRODUCT_NAME_FIELD);

                mProductsList.add(new Product(productId, productName));
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
