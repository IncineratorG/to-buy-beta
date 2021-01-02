package com.tobuybeta.modules.app_widget.storage.actions;

import android.content.Context;

import com.tobuybeta.modules.app_widget.common.action.Action;
import com.tobuybeta.modules.app_widget.common.action.ActionPayload;
import com.tobuybeta.modules.app_widget.common.action.ActionResult;
import com.tobuybeta.modules.app_widget.common.product.Product;

import java.util.List;

/**
 * TODO: Add a class header comment
 */

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
}
