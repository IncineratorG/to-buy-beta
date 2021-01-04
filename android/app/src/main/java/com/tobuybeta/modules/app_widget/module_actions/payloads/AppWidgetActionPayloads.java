package com.tobuybeta.modules.app_widget.module_actions.payloads;

import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.RemoveShoppingListPayload;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.SetShoppingListPayload;

/**
 * TODO: Add a class header comment
 */

public class AppWidgetActionPayloads {
    public static SetShoppingListPayload setShoppingListPayload(ReadableMap payloadMap) {
        return new SetShoppingListPayload(payloadMap);
    }

    public static RemoveShoppingListPayload removeShoppingListPayload(ReadableMap payloadMap) {
        return new RemoveShoppingListPayload(payloadMap);
    }
}
