package com.tobuybeta.modules.app_widget.storage.handlers;

import android.content.Context;

import com.tobuybeta.modules.app_widget.storage.handlers.handlers.GetWidgetActiveHandler;
import com.tobuybeta.modules.app_widget.storage.handlers.handlers.SetWidgetActiveHandler;

/**
 * TODO: Add a class header comment
 */

public class StorageHandlers {
    public static SetWidgetActiveHandler setWidgetActiveHandler(Context context, boolean isActive) {
        return new SetWidgetActiveHandler(context, isActive);
    }

    public static GetWidgetActiveHandler getWidgetActiveHandler(Context context) {
        return new GetWidgetActiveHandler(context);
    }
    public static boolean getWidgetActiveHandlerResult(Object value) {
        return (boolean) value;
    }
}