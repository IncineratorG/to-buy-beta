package com.tobuybeta.modules.app_widget.common.shopping_list;

import com.tobuybeta.modules.app_widget.common.constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.product.Product;

import java.util.ArrayList;
import java.util.List;

public class ShoppingList {
    private String mListId;
    private String mListName;
    private List<Product> mProductsList;

    public ShoppingList() {
        mListId = AppWidgetModuleConstants.EMPTY_ID;
        mListName = "";
        mProductsList = new ArrayList<>();
    }

    public ShoppingList(String listId, String listName, List<Product> productsList) {
        mListId = listId;
        mListName = listName;
        mProductsList = productsList;
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
