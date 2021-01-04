package com.tobuybeta.modules.app_widget.storage.events;

import android.content.Context;

import com.tobuybeta.modules.app_widget.storage.events.payloads.ShoppingListRemovedEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ShoppingListSetEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.WidgetActiveChangedEventPayload;

/**
 * TODO: Add a class header comment
 */

public class StorageEventPayloads {
    public static WidgetActiveChangedEventPayload widgetActiveChangedEventPayload(Context context,
                                                                                  boolean isActive) {
        return new WidgetActiveChangedEventPayload(context, isActive);
    }
    public static WidgetActiveChangedEventPayload toWidgetActiveChangedEventPayload(Object value) {
        return (WidgetActiveChangedEventPayload) value;
    }

    public static ShoppingListSetEventPayload shoppingListSetEventPayload(Context context,
                                                                          String listId) {
        return new ShoppingListSetEventPayload(context, listId);
    }
    public static ShoppingListSetEventPayload toShoppingListSetEventPayload(Object value) {
        return (ShoppingListSetEventPayload) value;
    }

    public static ShoppingListRemovedEventPayload shoppingListRemovedEventPayload(Context context,
                                                                                  String listId) {
        return new ShoppingListRemovedEventPayload(context, listId);
    }
    public static ShoppingListRemovedEventPayload toShoppingListRemovedEventPayload(Object value) {
        return (ShoppingListRemovedEventPayload) value;
    }
}
