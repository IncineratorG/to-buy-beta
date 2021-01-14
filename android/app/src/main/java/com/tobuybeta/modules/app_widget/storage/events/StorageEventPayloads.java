package com.tobuybeta.modules.app_widget.storage.events;

import android.content.Context;

import com.tobuybeta.modules.app_widget.storage.events.payloads.InitialShoppingListSetEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.MultipleShoppingListsSetEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ShoppingListRemovedEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ShoppingListSetEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.WidgetActiveChangedEventPayload;

import java.util.List;

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
}
