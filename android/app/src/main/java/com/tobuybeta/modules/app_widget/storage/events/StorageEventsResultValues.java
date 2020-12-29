package com.tobuybeta.modules.app_widget.storage.events;

/**
 * TODO: Add a class header comment
 */

public class StorageEventsResultValues {
    public static boolean widgetActiveChangedEventResult(Object value) {
        return (boolean) value;
    }

    public static String shoppingListSetEventResult(Object value) {
        String id = (String) value;
        if (id == null) {
            return "-1";
        }

        return id;
    }
}
