package com.tobuybeta.modules.app_widget.common.shopping_list;

import androidx.arch.core.util.Function;

import com.tobuybeta.modules.app_widget.module_constants.AppWidgetModuleConstants;
import com.tobuybeta.modules.app_widget.common.product.Product;

import java.util.ArrayList;
import java.util.List;

public class ShoppingList {
    private String mListId;
    private String mListName;
    private List<Product> mProductsList;
    private static String SEPARATOR = AppWidgetModuleConstants.common.SEPARATOR;;

    public ShoppingList() {
        mListId = AppWidgetModuleConstants.common.EMPTY_ID;
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

    public static String serialize(String listId, String listName) {
        return listId + SEPARATOR + listName;
    }

    public static Function<String, String> serializedIdExtractor() {
        return (serializedList) -> {
            if (serializedList == null) {
                return "";
            }

            String[] listDataArray = serializedList.split(SEPARATOR);
            if (listDataArray.length < 1) {
                return "";
            }

            return listDataArray[0];
        };
    }

    public static Function<String, String> serializedNameExtractor() {
        return (serializedList) -> {
            if (serializedList == null) {
                return "";
            }

            String[] listDataArray = serializedList.split(SEPARATOR);
            if (listDataArray.length < 2) {
                return "";
            }

            return listDataArray[1];
        };
    }
}
