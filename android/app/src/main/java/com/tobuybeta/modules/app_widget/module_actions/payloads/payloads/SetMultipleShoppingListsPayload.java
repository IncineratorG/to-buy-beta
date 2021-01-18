package com.tobuybeta.modules.app_widget.module_actions.payloads.payloads;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.app_widget.common.js_payload.JSPayload;
import com.tobuybeta.modules.app_widget.common.product.Product;
import com.tobuybeta.modules.app_widget.common.shopping_list.ShoppingList;

import java.util.ArrayList;
import java.util.List;

public class SetMultipleShoppingListsPayload implements JSPayload {
    private String SHOPPING_LISTS_FIELD = "shoppingLists";
    private String LIST_ID_FIELD = "id";
    private String LIST_NAME_FIELD = "name";
    private String PRODUCTS_LIST_FIELD = "products";
    private String PRODUCT_ID_FIELD = "id";
    private String PRODUCT_NAME_FIELD = "name";
    private String PRODUCT_STATUS_FIELD = "completionStatus";
    private boolean mIsValid;
    private List<ShoppingList> mShoppingLists;

    public SetMultipleShoppingListsPayload(ReadableMap readableMap) {
        mShoppingLists = new ArrayList<>();

        ReadableArray shoppingLists = readableMap.getArray(SHOPPING_LISTS_FIELD);
        if (shoppingLists == null || shoppingLists.size() <= 0) {
            mIsValid = false;
            return;
        }

        for (int i = 0; i < shoppingLists.size(); ++i) {
            ReadableMap shoppingListObject = shoppingLists.getMap(i);
            if (shoppingListObject == null) {
                continue;
            }

            String shoppingListId = String.valueOf(shoppingListObject.getInt(LIST_ID_FIELD));
            String shoppingListName = shoppingListObject.getString(LIST_NAME_FIELD);

            if (shoppingListId.isEmpty() || shoppingListName == null || shoppingListName.isEmpty()) {
                continue;
            }

            ReadableArray productsListObject = shoppingListObject.getArray(PRODUCTS_LIST_FIELD);
            if (productsListObject == null) {
                continue;
            }

            List<Product> productsList = new ArrayList<>(productsListObject.size());
            for (int j = 0; j < productsListObject.size(); ++j) {
                ReadableMap productObject = productsListObject.getMap(j);
                if (productObject == null) {
                    continue;
                }

                long productIdLong = (long) productObject.getDouble(PRODUCT_ID_FIELD);
                String productId = String.valueOf(productIdLong);
                String productName = productObject.getString(PRODUCT_NAME_FIELD);
                String productStatus = productObject.getString(PRODUCT_STATUS_FIELD);

                if (productId.isEmpty() || productName == null || productName.isEmpty()) {
                    continue;
                }

//                productsList.add(new Product(productId, productIdLong, productName));
                productsList.add(new Product(productId, productIdLong, productName, productStatus));
            }

            mShoppingLists.add(new ShoppingList(shoppingListId, shoppingListName, productsList));
        }

        mIsValid = true;
    }

    @Override
    public boolean isValid() {
        return mIsValid;
    }

    public List<ShoppingList> shoppingLists() {
        return mShoppingLists;
    }
}
