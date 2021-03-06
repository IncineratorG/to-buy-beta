package com.tobuybeta.modules.app_widget.storage;

import android.content.Context;
import android.widget.Toast;

import com.tobuybeta.modules.app_widget.common.action.Action;
import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.common.notifier.Notifier;
import com.tobuybeta.modules.app_widget.common.notifier.event_handler.EventHandler;
import com.tobuybeta.modules.app_widget.common.notifier.unsubscribe_handler.UnsubscribeHandler;
import com.tobuybeta.modules.app_widget.common.product.Product;
import com.tobuybeta.modules.app_widget.common.shopping_list.ShoppingList;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActionTypes;
import com.tobuybeta.modules.app_widget.storage.events.StorageEventPayloads;
import com.tobuybeta.modules.app_widget.storage.events.StorageEvents;
import com.tobuybeta.modules.app_widget.storage.storages.shopping_list_storage.ShoppingListStorage;
import com.tobuybeta.modules.app_widget.storage.storages.widget_storage.WidgetStorage;

import java.util.ArrayList;
import java.util.List;

/**
 * TODO: Add a class header comment
 */

public class Storage {
    private static Storage mInstance;
    private Notifier mNotifier;
    private WidgetStorage mWidgetStorage;
    private ShoppingListStorage mShoppingListStorage;

    private Storage() {
        mNotifier = new Notifier();
        mWidgetStorage = new WidgetStorage();
        mShoppingListStorage = new ShoppingListStorage();
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

                boolean success = mWidgetStorage.setWidgetActive(context, isActive);

                if (success) {
                    mNotifier.notify(
                            StorageEvents.WIDGET_ACTIVE_CHANGED,
                            StorageEventPayloads.widgetActiveChangedEventPayload(context, isActive)
                    );
                }
                break;
            }

            case (StorageActionTypes.GET_WIDGET_ACTIVE): {
                Context context = (Context) action.payload().get("context");

                boolean isActive = mWidgetStorage.getWidgetActive(context);

                action.complete(isActive);
                break;
            }

            case (StorageActionTypes.SET_INITIAL_SHOPPING_LISTS): {
                Context context = (Context) action.payload().get("context");
                List<ShoppingList> shoppingLists = (List<ShoppingList>) action.payload().get("shoppingLists");

                boolean success = mShoppingListStorage.initializeStorageWithShoppingLists(context, shoppingLists);

                if (success) {
                    List<String> listIds = new ArrayList<>(shoppingLists.size());
                    for (int i = 0; i < shoppingLists.size(); ++i) {
                        listIds.add(shoppingLists.get(i).listId());
                    }

                    mNotifier.notify(
                            StorageEvents.INITIAL_SHOPPING_LISTS_SET,
                            StorageEventPayloads.initialShoppingListSetEventPayload(context, listIds)
                    );
                }
                break;
            }

            case (StorageActionTypes.SET_SHOPPING_LIST): {
                Context context = (Context) action.payload().get("context");
                String listId = (String) action.payload().get("listId");
                String listName = (String) action.payload().get("listName");
                List<Product> productsList = (List<Product>) action.payload().get("productsList");

                boolean success = mShoppingListStorage
                        .setShoppingList(context, listId, listName, productsList);

                if (success) {
                    mNotifier.notify(
                            StorageEvents.SHOPPING_LIST_SET,
                            StorageEventPayloads.shoppingListSetEventPayload(context, listId)
                    );
                }
                break;
            }

            case (StorageActionTypes.SET_MULTIPLE_SHOPPING_LISTS): {
                Context context = (Context) action.payload().get("context");
                List<ShoppingList> shoppingLists = (List<ShoppingList>) action.payload().get("shoppingLists");

                boolean success = mShoppingListStorage.setMultipleShoppingLists(context, shoppingLists);

                if (success) {
                    List<String> listIds = new ArrayList<>(shoppingLists.size());
                    for (int i = 0; i < shoppingLists.size(); ++i) {
                        listIds.add(shoppingLists.get(i).listId());
                    }

                    mNotifier.notify(
                            StorageEvents.MULTIPLE_SHOPPING_LISTS_SET,
                            StorageEventPayloads.multipleShoppingListsSetPayload(context, listIds)
                    );
                }
                break;
            }

            case (StorageActionTypes.REMOVE_SHOPPING_LIST): {
                Context context = (Context) action.payload().get("context");
                String listId = (String) action.payload().get("listId");

                boolean success = mShoppingListStorage.removeShoppingList(context, listId);
                if (success) {
                    mNotifier.notify(
                            StorageEvents.SHOPPING_LIST_REMOVED,
                            StorageEventPayloads.shoppingListRemovedEventPayload(context, listId)
                    );
                }
                break;
            }

            case (StorageActionTypes.REMOVE_PRODUCT): {
                Context context = (Context) action.payload().get("context");
                String listId = (String) action.payload().get("listId");
                String productId = (String) action.payload().get("productId");

                boolean success = mShoppingListStorage.removeProduct(context, listId, productId);
                if (success) {
                    mNotifier.notify(
                            StorageEvents.PRODUCT_REMOVED,
                            StorageEventPayloads.productRemovedEventPayload(context, listId, productId)
                    );
                }
                break;
            }

            case (StorageActionTypes.SET_PRODUCT_STATUS): {
                Context context = (Context) action.payload().get("context");
                String listId = (String) action.payload().get("listId");
                String productId = (String) action.payload().get("productId");
                String productStatus = (String) action.payload().get("productStatus");

                boolean success = mShoppingListStorage.setProductStatus(context, listId, productId, productStatus);
                if (success) {
                    mNotifier.notify(
                            StorageEvents.PRODUCT_STATUS_CHANGED,
                            StorageEventPayloads.productStatusChangedEventPayload(context, listId, productId, productStatus)
                    );
                }
                break;
            }

            case (StorageActionTypes.GET_SHOPPING_LISTS): {
                Context context = (Context) action.payload().get("context");
                action.complete(mShoppingListStorage.getShoppingLists(context));
                break;
            }

            case (StorageActionTypes.GET_PRODUCTS_LIST): {
                Context context = (Context) action.payload().get("context");
                String listId = (String) action.payload().get("listId");

                action.complete(mShoppingListStorage.getProductsList(context, listId));
                break;
            }

            case (StorageActionTypes.SET_WIDGET_LIST_INFO): {
                Context context = (Context) action.payload().get("context");
                int widgetId = (int) action.payload().get("widgetId");
                String listId = (String) action.payload().get("listId");
                String listType = (String) action.payload().get("listType");

                mWidgetStorage.setWidgetListInfo(context, widgetId, listId, listType);
                break;
            }

            case (StorageActionTypes.REMOVE_WIDGET_LIST_INFO): {
                Context context = (Context) action.payload().get("context");
                int widgetId = (int) action.payload().get("widgetId");

                mWidgetStorage.removeWidgetListInfo(context, widgetId);
                break;
            }

            case (StorageActionTypes.GET_WIDGET_LIST_INFO): {
                Context context = (Context) action.payload().get("context");
                int widgetId = (int) action.payload().get("widgetId");

                action.complete(mWidgetStorage.getWidgetListInfo(context, widgetId));
                break;
            }

            case (StorageActionTypes.SET_WIDGET_REQUEST): {
                Context context = (Context) action.payload().get("context");
                WidgetRequest widgetRequest = (WidgetRequest) action.payload().get("widgetRequest");

                boolean success = mWidgetStorage.setWidgetRequest(context, widgetRequest);
                if (success) {
                    mNotifier.notify(
                            StorageEvents.WIDGET_REQUEST_SET,
                            StorageEventPayloads.widgetRequestSetEventPayload(context, widgetRequest)
                    );
                }
                break;
            }

            case (StorageActionTypes.REMOVE_ALL_WIDGET_REQUESTS): {
                Context context = (Context) action.payload().get("context");

                mWidgetStorage.removeAllWidgetRequests(context);
                break;
            }

            case (StorageActionTypes.GET_ALL_WIDGET_REQUESTS): {
                Context context = (Context) action.payload().get("context");

                action.complete(mWidgetStorage.getAllWidgetRequests(context));
                break;
            }

            case (StorageActionTypes.REMOVE_WIDGET_REQUESTS): {
                Context context = (Context) action.payload().get("context");
                List<String> requestIds = (List<String>) action.payload().get("requestIds");

                mWidgetStorage.removeWidgetRequests(context, requestIds);
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
//import com.tobuybeta.modules.app_widget.common.product.Product;
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
