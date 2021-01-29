package com.tobuybeta.modules.app_widget.module_events;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;

public class AppWidgetEventJSPayloads {
    public static WritableMap openShoppingListRequestEventPayload(String listId) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putString("listId", listId);

        return jsPayload;
    }

    public static WritableMap changeProductStatusEventPayload(String requestId,
                                                              String listId,
                                                              String productId,
                                                              String productStatus) {
        WritableMap jsPayload = new WritableNativeMap();
        jsPayload.putString("listId", listId);
        jsPayload.putString("productId", productId);
        jsPayload.putString("productStatus", productStatus);
        jsPayload.putString("requestId", requestId);

        return jsPayload;
    }
}
