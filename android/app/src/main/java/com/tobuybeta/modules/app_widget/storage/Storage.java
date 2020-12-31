package com.tobuybeta.modules.app_widget.storage;

import android.content.Context;

import com.tobuybeta.modules.app_widget.common.action.Action;
import com.tobuybeta.modules.app_widget.common.notifier.Notifier;
import com.tobuybeta.modules.app_widget.common.notifier.event_handler.EventHandler;
import com.tobuybeta.modules.app_widget.common.notifier.unsubscribe_handler.UnsubscribeHandler;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActionTypes;
import com.tobuybeta.modules.app_widget.storage.events.StorageEvents;
import com.tobuybeta.modules.app_widget.storage.handlers.StorageHandlers;
import com.tobuybeta.modules.app_widget.storage.handlers.handlers.SetWidgetActiveHandler;

/**
 * TODO: Add a class header comment
 */

public class Storage {
    private static Storage mInstance;
    private Notifier mNotifier;

    private Storage() {
        mNotifier = new Notifier();
    }

    public static synchronized Storage get() {
        if (mInstance == null) {
            mInstance = new Storage();
        }

        return mInstance;
    }

    public UnsubscribeHandler subscribe(String eventType, EventHandler handler) {
        return mNotifier.subscribe(eventType, handler);
    }

    public void execute(Action action) {
        if (action == null) {
            return;
        }

        switch (action.type()) {
            case (StorageActionTypes.SET_WIDGET_ACTIVE): {
                Context context = (Context) action.payload().get("context");
                boolean isActive = (boolean) action.payload().get("isActive");

                StorageHandlers.setWidgetActiveHandler(context, isActive).handle();

                mNotifier.notify(StorageEvents.WIDGET_ACTIVE_CHANGED, isActive);
                break;
            }

            case (StorageActionTypes.GET_WIDGET_ACTIVE): {
                Context context = (Context) action.payload().get("context");

                boolean isActive = StorageHandlers.getWidgetActiveHandlerResult(
                        StorageHandlers.getWidgetActiveHandler(context).handle()
                );

                action.complete(isActive);

                break;
            }

            default: {

            }
        }
    }
}


//package com.tobuybeta.modules.app_widget.storage;
//
//import android.content.Context;
//import android.content.SharedPreferences;
//
//import com.facebook.react.bridge.ReadableArray;
//import com.facebook.react.bridge.ReadableMap;
//import com.tobuybeta.modules.app_widget.common.notifier.Notifier;
//import com.tobuybeta.modules.app_widget.common.notifier.event_handler.EventHandler;
//import com.tobuybeta.modules.app_widget.common.notifier.unsubscribe_handler.UnsubscribeHandler;
//import com.tobuybeta.modules.app_widget.storage.events.StorageEvents;
//import com.tobuybeta.modules.app_widget.storage.events.StorageEventsInputValues;
//import com.tobuybeta.test_widget.Product;
//
//import java.util.ArrayList;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//
///**
// * TODO: Add a class header comment
// */
//
//public class Storage {
//    private static Storage mInstance;
//    private Notifier mNotifier;
//    private static final String PREFERENCES_DATA_FIELD = "DATA";
//    private static final String PREFERENCES_WIDGET_ACTIVE_FIELD = "widgetActive";
//    private static final String PREFERENCES_LIST_ID_FIELD = "listId";
//    private static final String PREFERENCES_LIST_NAME_FIELD = "listName";
//    private static final String PREFERENCES_PRODUCTS_LIST_FIELD = "products";
//    private static final String PREFERENCES_DEFAULT_ID_VALUE = "-1";
//    private static final String PREFERENCES_DEFAULT_NAME_VALUE = "";
//    private static final Set<String> PREFERENCES_DEFAULT_PRODUCTS_LIST_VALUE = new HashSet<>();
//    private static final String PRODUCT_ID_FIELD = "id";
//    private static final String PRODUCT_NAME_FIELD = "name";
//
//    private Storage() {
//        mNotifier = new Notifier();
//    }
//
//    public static synchronized Storage get() {
//        if (mInstance == null) {
//            mInstance = new Storage();
//        }
//
//        return mInstance;
//    }
//
//    public UnsubscribeHandler subscribe(String eventType, EventHandler handler) {
//        return mNotifier.subscribe(eventType, handler);
//    }
//
//    public void clear(Context context) {
//        SharedPreferences.Editor editor = context.
//                getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE).
//                edit();
//
//        editor.putString(PREFERENCES_LIST_ID_FIELD, PREFERENCES_DEFAULT_ID_VALUE);
//        editor.putString(PREFERENCES_LIST_NAME_FIELD, PREFERENCES_DEFAULT_NAME_VALUE);
//        editor.putStringSet(PREFERENCES_PRODUCTS_LIST_FIELD, PREFERENCES_DEFAULT_PRODUCTS_LIST_VALUE);
//
//        editor.commit();
//
//        mNotifier.notify(
//                StorageEvents.SHOPPING_LIST_SET,
//                StorageEventsInputValues.shoppingListSetInputValue(PREFERENCES_DEFAULT_ID_VALUE)
//        );
//    }
//
//    public void setWidgetActive(Context context, boolean isActive) {
//        if (context == null) {
//            return;
//        }
//
//        SharedPreferences.Editor editor = context.
//                getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE).
//                edit();
//
//        editor.putBoolean(PREFERENCES_WIDGET_ACTIVE_FIELD, isActive);
//
//        editor.commit();
//
//        mNotifier.notify(
//                StorageEvents.WIDGET_ACTIVE_CHANGED,
//                StorageEventsInputValues.widgetActiveChangedInputValue(isActive)
//        );
//    }
//
//    public boolean isWidgetActive(Context context) {
//        SharedPreferences sharedPreferences = context
//                .getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE);
//
//        return sharedPreferences.getBoolean(PREFERENCES_WIDGET_ACTIVE_FIELD, false);
//    }
//
//    public void setShoppingList(Context context,
//                                String id,
//                                String name,
//                                ReadableArray productsList) {
//        if (context == null) {
//            return;
//        } else if (id == null) {
//            return;
//        } else if (name == null) {
//            return;
//        }
//
//        SharedPreferences.Editor editor = context.
//                getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE).
//                edit();
//
//        Set<String> productsSet = new HashSet<>();
//        if (productsList != null) {
//            for (int i = 0; i < productsList.size(); ++i) {
//                ReadableMap product = productsList.getMap(i);
//                if (product != null) {
//                    String productId = String.valueOf(product.getInt(PRODUCT_ID_FIELD));
//                    String productName = product.getString(PRODUCT_NAME_FIELD);
//
//                    productsSet.add(productId + " " + productName);
//                }
//            }
//        }
//
//        editor.putString(PREFERENCES_LIST_ID_FIELD, id);
//        editor.putString(PREFERENCES_LIST_NAME_FIELD, name);
//        editor.putStringSet(PREFERENCES_PRODUCTS_LIST_FIELD, productsSet);
//
//        editor.commit();
//
//        mNotifier.notify(
//                StorageEvents.SHOPPING_LIST_SET,
//                StorageEventsInputValues.shoppingListSetInputValue(id)
//        );
//    }
//
//    public String getShoppingListId(Context context) {
//        SharedPreferences sharedPreferences = context
//                .getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE);
//
//        return sharedPreferences.getString(PREFERENCES_LIST_ID_FIELD, PREFERENCES_DEFAULT_ID_VALUE);
//    }
//
//    public String getShoppingListName(Context context) {
//        SharedPreferences sharedPreferences = context.
//                getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE);
//
//        return sharedPreferences.getString(PREFERENCES_LIST_NAME_FIELD, PREFERENCES_DEFAULT_NAME_VALUE);
//    }
//
//    public List<Product> getProductsList(Context context) {
//        SharedPreferences sharedPreferences = context.
//                getSharedPreferences(PREFERENCES_DATA_FIELD, Context.MODE_PRIVATE);
//
//        Set<String> productsSet = sharedPreferences.
//                getStringSet(PREFERENCES_PRODUCTS_LIST_FIELD, PREFERENCES_DEFAULT_PRODUCTS_LIST_VALUE);
//
//        List<Product> productsList = new ArrayList<>(productsSet.size());
//        List<String> productsStringsList = new ArrayList<>(productsSet);
//        for (int i = 0; i < productsStringsList.size(); ++i) {
//            String productString = productsStringsList.get(i);
//
//            String productId = productString.substring(0, productString.indexOf(" "));
//            String productName = productString.substring(productString.indexOf(" " ) + 1);
//
//            productsList.add(new Product(productId, productName));
//        }
//
//        return productsList;
//    }
//}
