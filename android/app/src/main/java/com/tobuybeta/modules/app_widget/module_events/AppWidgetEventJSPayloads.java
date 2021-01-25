package com.tobuybeta.modules.app_widget.module_events;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class AppWidgetEventJSPayloads {
    public static WritableMap openShoppingListRequestEventPayload(String listId) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putString("listId", listId);

        return jsPayload;
    }
}
