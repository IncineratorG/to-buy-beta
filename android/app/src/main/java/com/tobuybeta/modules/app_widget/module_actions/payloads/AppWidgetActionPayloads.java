package com.tobuybeta.modules.app_widget.module_actions.payloads;

import com.facebook.react.bridge.ReadableMap;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.RemoveShoppingListPayload;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.SetInitialShoppingListsPayload;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.SetMultipleShoppingListsPayload;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.SetShoppingListPayload;

public class AppWidgetActionPayloads {
    public static SetInitialShoppingListsPayload setInitialShoppingListsPayload(ReadableMap payloadMap) {
        return new SetInitialShoppingListsPayload(payloadMap);
    }

    public static SetShoppingListPayload setShoppingListPayload(ReadableMap payloadMap) {
        return new SetShoppingListPayload(payloadMap);
    }

    public static SetMultipleShoppingListsPayload setMultipleShoppingListsPayload(ReadableMap payloadMap) {
        return new SetMultipleShoppingListsPayload(payloadMap);
    }

    public static RemoveShoppingListPayload removeShoppingListPayload(ReadableMap payloadMap) {
        return new RemoveShoppingListPayload(payloadMap);
    }
}
