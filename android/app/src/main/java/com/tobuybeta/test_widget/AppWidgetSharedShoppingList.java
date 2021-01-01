package com.tobuybeta.test_widget;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.app_widget.common.product.Product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * TODO: Add a class header comment
 */

public class AppWidgetSharedShoppingList {
    private static AppWidgetSharedShoppingList mInstance;
    private static final String PREFERENCES_DATA_FIELD = "DATA";
    private static final String PREFERENCES_LIST_ID_FIELD = "listId";
    private static final String PREFERENCES_LIST_NAME_FIELD = "listName";
    private static final String PREFERENCES_PRODUCTS_LIST_FIELD = "products";
    private static final String PREFERENCES_DEFAULT_ID_VALUE = "-1";
    private static final String PREFERENCES_DEFAULT_NAME_VALUE = "";
    private static final Set<String> PREFERENCES_DEFAULT_PRODUCTS_LIST_VALUE = new HashSet<>();
    private static final String PRODUCT_ID_FIELD = "id";
    private static final String PRODUCT_NAME_FIELD = "name";

    private AppWidgetSharedShoppingList() {

    }

    public static synchronized AppWidgetSharedShoppingList get() {
        if (mInstance == null) {
            mInstance = new AppWidgetSharedShoppingList();
        }

        return mInstance;
    }

    public void setShoppingList(Context context,
                                String id,
                                String name,
                                ReadableArray productsList) {
        if (context == null) {
            return;
        } else if (id == null) {
            return;
        } else if (name == null) {
            return;
        }

        SharedPreferences.Editor editor = context.
                getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE).
                edit();

        Set<String> productsSet = new HashSet<>();
        if (productsList != null) {
            for (int i = 0; i < productsList.size(); ++i) {
                ReadableMap product = productsList.getMap(i);
                if (product != null) {
                    String productId = String.valueOf(product.getInt(PRODUCT_ID_FIELD));
                    String productName = product.getString(PRODUCT_NAME_FIELD);

                    productsSet.add(productId + " " + productName);
                }
            }
        }

        editor.putString(PREFERENCES_LIST_ID_FIELD, id);
        editor.putString(PREFERENCES_LIST_NAME_FIELD, name);
        editor.putStringSet(PREFERENCES_PRODUCTS_LIST_FIELD, productsSet);

        editor.commit();
    }

    public String getShoppingListId(Context context) {
        SharedPreferences sharedPreferences = context
                .getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE);

        return sharedPreferences.getString(PREFERENCES_LIST_ID_FIELD, PREFERENCES_DEFAULT_ID_VALUE);
    }

    public String getShoppingListName(Context context) {
        SharedPreferences sharedPreferences = context.
                getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE);

        return sharedPreferences.getString(PREFERENCES_LIST_NAME_FIELD, PREFERENCES_DEFAULT_NAME_VALUE);
    }

    public List<Product> getProductsList(Context context) {
        SharedPreferences sharedPreferences = context.
                getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE);

        Set<String> productsSet = sharedPreferences.
                getStringSet(PREFERENCES_PRODUCTS_LIST_FIELD, PREFERENCES_DEFAULT_PRODUCTS_LIST_VALUE);

        List<Product> productsList = new ArrayList<>(productsSet.size());
        List<String> productsStringsList = new ArrayList<>(productsSet);
        for (int i = 0; i < productsStringsList.size(); ++i) {
            String productString = productsStringsList.get(i);

            String productId = productString.substring(0, productString.indexOf(" "));
            String productName = productString.substring(productString.indexOf(" " ) + 1);

            productsList.add(new Product(productId, productName));
        }

        return productsList;
    }
}
