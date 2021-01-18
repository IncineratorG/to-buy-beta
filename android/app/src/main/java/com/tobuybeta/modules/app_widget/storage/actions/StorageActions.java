package com.tobuybeta.modules.app_widget.storage.actions;

import android.content.Context;

import com.tobuybeta.modules.app_widget.common.action.Action;
import com.tobuybeta.modules.app_widget.common.action.ActionPayload;
import com.tobuybeta.modules.app_widget.common.product.Product;
import com.tobuybeta.modules.app_widget.common.shopping_list.ShoppingList;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;

import java.util.List;

public class StorageActions {
    public static Action setWidgetActiveAction(Context context, boolean isActive) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("isActive", isActive);

        return new Action(StorageActionTypes.SET_WIDGET_ACTIVE, payload);
    }

    public static Action getWidgetActiveAction(Context context) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);

        return new Action(StorageActionTypes.GET_WIDGET_ACTIVE, payload);
    }

    public static Action setInitialShoppingListsAction(Context context,
                                                       List<ShoppingList> shoppingLists) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("shoppingLists", shoppingLists);

        return new Action(StorageActionTypes.SET_INITIAL_SHOPPING_LISTS, payload);
    }

    public static Action setShoppingListAction(Context context,
                                               String listId,
                                               String listName,
                                               List<Product> productsList) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("listId", listId);
        payload.set("listName", listName);
        payload.set("productsList", productsList);

        return new Action(StorageActionTypes.SET_SHOPPING_LIST, payload);
    }

    public static Action setMultipleShoppingListsAction(Context context,
                                                        List<ShoppingList> shoppingLists) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("shoppingLists", shoppingLists);

        return new Action(StorageActionTypes.SET_MULTIPLE_SHOPPING_LISTS, payload);
    }

    public static Action removeProductAction(Context context, String listId, String productId) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("listId", listId);
        payload.set("productId", productId);

        return new Action(StorageActionTypes.REMOVE_PRODUCT, payload);
    }

    public static Action setProductStatus(Context context,
                                          String listId,
                                          String productId,
                                          String productStatus) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("listId", listId);
        payload.set("productId", productId);
        payload.set("productStatus", productStatus);

        return new Action(StorageActionTypes.SET_PRODUCT_STATUS, payload);
    }

    public static Action removeShoppingListAction(Context context, String listId) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("listId", listId);

        return new Action(StorageActionTypes.REMOVE_SHOPPING_LIST, payload);
    }

    public static Action getShoppingListsAction(Context context) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);

        return new Action(StorageActionTypes.GET_SHOPPING_LISTS, payload);
    }

    public static Action getProductsListAction(Context context, String listId) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("listId", listId);

        return new Action(StorageActionTypes.GET_PRODUCTS_LIST, payload);
    }

    public static Action setWidgetListInfoAction(Context context,
                                                 int widgetId,
                                                 String listId,
                                                 String listType) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("widgetId", widgetId);
        payload.set("listId", listId);
        payload.set("listType", listType);

        return new Action(StorageActionTypes.SET_WIDGET_LIST_INFO, payload);
    }

    public static Action removeWidgetListInfoAction(Context context, int widgetId) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("widgetId", widgetId);

        return new Action(StorageActionTypes.REMOVE_WIDGET_LIST_INFO, payload);
    }

    public static Action getWidgetListInfoAction(Context context, int widgetId) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("widgetId", widgetId);

        return new Action(StorageActionTypes.GET_WIDGET_LIST_INFO, payload);
    }

    public static Action setWidgetRequestAction(Context context, WidgetRequest widgetRequest) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);
        payload.set("widgetRequest", widgetRequest);

        return new Action(StorageActionTypes.SET_WIDGET_REQUEST, payload);
    }

    public static Action removeAllWidgetRequestsAction(Context context) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);

        return new Action(StorageActionTypes.REMOVE_ALL_WIDGET_REQUESTS, payload);
    }

    public static Action getAllWidgetRequestsAction(Context context) {
        ActionPayload payload = new ActionPayload();
        payload.set("context", context);

        return new Action(StorageActionTypes.GET_ALL_WIDGET_REQUESTS, payload);
    }
}
