package com.tobuybeta.modules.app_widget.storage.events;

import android.content.Context;

import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.storage.events.payloads.InitialShoppingListSetEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.MultipleShoppingListsSetEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ProductRemovedEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ProductStatusChangedEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ShoppingListRemovedEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ShoppingListSetEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.WidgetActiveChangedEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.WidgetRequestSetEventPayload;

import java.util.List;

public class StorageEventPayloads {
    public static WidgetActiveChangedEventPayload widgetActiveChangedEventPayload(Context context,
                                                                                  boolean isActive) {
        return new WidgetActiveChangedEventPayload(context, isActive);
    }
    public static WidgetActiveChangedEventPayload toWidgetActiveChangedEventPayload(Object value) {
        return (WidgetActiveChangedEventPayload) value;
    }

    public static InitialShoppingListSetEventPayload initialShoppingListSetEventPayload(Context context,
                                                                                        List<String> listIds) {
        return new InitialShoppingListSetEventPayload(context, listIds);
    }
    public static InitialShoppingListSetEventPayload toInitialShoppingListSetEventPayload(Object value) {
        return (InitialShoppingListSetEventPayload) value;
    }

    public static ShoppingListSetEventPayload shoppingListSetEventPayload(Context context,
                                                                          String listId) {
        return new ShoppingListSetEventPayload(context, listId);
    }
    public static ShoppingListSetEventPayload toShoppingListSetEventPayload(Object value) {
        return (ShoppingListSetEventPayload) value;
    }

    public static MultipleShoppingListsSetEventPayload multipleShoppingListsSetPayload(Context context,
                                                                                       List<String> listIds) {
        return new MultipleShoppingListsSetEventPayload(context, listIds);
    }
    public static MultipleShoppingListsSetEventPayload toMultipleShoppingListsSetPayload(Object value) {
        return (MultipleShoppingListsSetEventPayload) value;
    }

    public static ShoppingListRemovedEventPayload shoppingListRemovedEventPayload(Context context,
                                                                                  String listId) {
        return new ShoppingListRemovedEventPayload(context, listId);
    }
    public static ShoppingListRemovedEventPayload toShoppingListRemovedEventPayload(Object value) {
        return (ShoppingListRemovedEventPayload) value;
    }

    public static ProductRemovedEventPayload productRemovedEventPayload(Context context,
                                                                        String listId,
                                                                        String productId) {
        return new ProductRemovedEventPayload(context, listId, productId);
    }
    public static ProductRemovedEventPayload toProductRemovedEventPayload(Object value) {
        return (ProductRemovedEventPayload) value;
    }

    public static ProductStatusChangedEventPayload productStatusChangedEventPayload(Context context,
                                                                                    String listId,
                                                                                    String productId,
                                                                                    String newProductStatus) {
        return new ProductStatusChangedEventPayload(context, listId, productId, newProductStatus);
    }
    public static ProductStatusChangedEventPayload toProductStatusChangedEventPayload(Object value) {
        return (ProductStatusChangedEventPayload) value;
    }

    public static WidgetRequestSetEventPayload widgetRequestSetEventPayload(Context context,
                                                                            WidgetRequest widgetRequest) {
        return new WidgetRequestSetEventPayload(context, widgetRequest);
    }
    public static WidgetRequestSetEventPayload toWidgetRequestSetEventPayload(Object value) {
        return (WidgetRequestSetEventPayload) value;
    }
}
