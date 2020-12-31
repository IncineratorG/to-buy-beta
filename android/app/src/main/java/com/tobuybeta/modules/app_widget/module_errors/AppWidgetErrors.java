package com.tobuybeta.modules.app_widget.module_errors;

import com.tobuybeta.modules.app_widget.common.error.Error;

/**
 * TODO: Add a class header comment
 */

public class AppWidgetErrors {
    public static Error badAction() {
        return new Error("1", "BAD_ACTION");
    }

    public static Error badActionType() {
        return new Error("2", "BAD_ACTION_TYPE");
    }

    public static Error unknownActionType() {
        return new Error("3", "UNKNOWN_ACTION_TYPE");
    }
}
