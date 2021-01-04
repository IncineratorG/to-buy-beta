package com.tobuybeta.modules.app_widget.storage.storages.widget_storage;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * TODO: Add a class header comment
 */

public class WidgetStorage {
    private static final String WIDGET_DATA_FIELD = "DATA";
    private static final String PREFERENCES_WIDGET_ACTIVE_FIELD = "widgetActive";

    public WidgetStorage() {

    }

    public boolean setWidgetActive(Context context, boolean isActive) {
        if (context == null) {
            return false;
        }

        SharedPreferences.Editor editor = context
                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE)
                .edit();

        editor.putBoolean(PREFERENCES_WIDGET_ACTIVE_FIELD, isActive);

        editor.commit();

        return true;
    }

    public boolean getWidgetActive(Context context) {
        if (context == null) {
            return false;
        }

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE);

        return sharedPreferences.getBoolean(PREFERENCES_WIDGET_ACTIVE_FIELD, false);
    }
}
