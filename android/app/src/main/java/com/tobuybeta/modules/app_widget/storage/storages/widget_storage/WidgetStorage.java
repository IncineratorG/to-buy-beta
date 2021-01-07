package com.tobuybeta.modules.app_widget.storage.storages.widget_storage;

import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;

import com.tobuybeta.modules.app_widget.common.widget_list_info.WidgetListInfo;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

        return editor.commit();
    }

    public boolean getWidgetActive(Context context) {
        if (context == null) {
            return false;
        }

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE);

        return sharedPreferences.getBoolean(PREFERENCES_WIDGET_ACTIVE_FIELD, false);
    }

    public boolean setWidgetListInfo(Context context, int widgetId, String listId, String listType) {
        if (context == null) {
            return false;
        } else if (listId == null || listId.isEmpty()) {
            return false;
        } else if (listType == null || listType.isEmpty()) {
            return false;
        }

        SharedPreferences.Editor editor = context
                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE)
                .edit();

        String widgetIdString = String.valueOf(widgetId);
        String widgetListInfoDescription = listId + " " + listType;

        Set<String> widgetListInfoDescriptionSet = new HashSet<>(1);
        widgetListInfoDescriptionSet.add(widgetListInfoDescription);

        editor.putStringSet(widgetIdString, widgetListInfoDescriptionSet);

        return editor.commit();
    }

    public boolean removeWidgetListInfo(Context context, int widgetId) {
        if (context == null) {
            return false;
        }

        SharedPreferences.Editor editor = context
                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE)
                .edit();

        editor.remove(String.valueOf(widgetId));

        return editor.commit();
    }

    public WidgetListInfo getWidgetListInfo(Context context, int widgetId) {
        if (context == null) {
            return new WidgetListInfo();
        }

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> widgetListInfoDescriptionSet = sharedPreferences
                .getStringSet(String.valueOf(widgetId), new HashSet<>());

        if (widgetListInfoDescriptionSet.size() <= 0) {
            return new WidgetListInfo();
        }

        List<String> widgetListInfoDescriptionList = new ArrayList<>(widgetListInfoDescriptionSet);
        String widgetListInfoDescription = widgetListInfoDescriptionList.get(0);

        String listId = widgetListInfoDescription.substring(0, widgetListInfoDescription.indexOf(" "));
        String listType = widgetListInfoDescription.substring(widgetListInfoDescription.indexOf(" ") + 1);

        return new WidgetListInfo(widgetId, listId, listType);
    }
//    public WidgetListInfo getWidgetListInfo(Context context, int widgetId) {
//        if (context == null) {
//            return new WidgetListInfo();
//        }
//
//        SharedPreferences sharedPreferences = context
//                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE);
//        Set<String> widgetListInfoDescriptionSet = sharedPreferences
//                .getStringSet(String.valueOf(widgetId), new HashSet<>());
//
//        if (widgetListInfoDescriptionSet.size() <= 0) {
//            return new WidgetListInfo();
//        }
//
//        List<String> widgetListInfoDescriptionList = new ArrayList<>(widgetListInfoDescriptionSet);
//        String widgetListInfoDescription = widgetListInfoDescriptionList.get(0);
//
//        String listId = widgetListInfoDescription.substring(0, widgetListInfoDescription.indexOf(" "));
//        String listType = widgetListInfoDescription.substring(widgetListInfoDescription.indexOf(" " + 1));
//
//        return new WidgetListInfo(widgetId, listId, listType);
//    }
}
