package com.tobuybeta.modules.app_widget.module_actions.payloads.payloads;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.app_widget.common.js_payload.JSPayload;
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
    private boolean mIsValid;
    private List<ShoppingList> mShoppingLists;

    public SetMultipleShoppingListsPayload(ReadableMap readableMap) {
        mShoppingLists = new ArrayList<>();

        ReadableArray shoppingLists = readableMap.getArray(SHOPPING_LISTS_FIELD);
        if (shoppingLists == null || shoppingLists.size() <= 0) {
            return;
        }

        for (int i = 0; i < shoppingLists.size(); ++i) {
            ReadableMap shoppingList = shoppingLists.getMap(i);

            String shoppingListId = String.valueOf(shoppingList.getInt(LIST_ID_FIELD));
            String shoppingListName = shoppingList.getString(LIST_NAME_FIELD);

            ReadableArray productsList = shoppingList.getArray(PRODUCTS_LIST_FIELD);

        }
    }

    @Override
    public boolean isValid() {
        return mIsValid;
    }

    public List<ShoppingList> shoppingLists() {
        return mShoppingLists;
    }
}
