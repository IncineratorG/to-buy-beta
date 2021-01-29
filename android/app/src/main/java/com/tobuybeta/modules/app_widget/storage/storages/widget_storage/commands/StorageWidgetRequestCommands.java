package com.tobuybeta.modules.app_widget.storage.storages.widget_storage.commands;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.core.util.Supplier;

import com.tobuybeta.modules.app_widget.common.command.Command;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_requests.transformer.WidgetRequestTransformer;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class StorageWidgetRequestCommands {
    public static Supplier<Boolean> emptyCommand() {
        return () -> false;
    }

    public static Supplier<Boolean> saveRequestCommand(Context context,
                                                       WidgetRequest request,
                                                       String sharedPreferencesDataField,
                                                       String sharedPreferencesRequestsField) {
        return () -> {
            if (context == null) {
                return false;
            }

            String stringifiedRequest = WidgetRequestTransformer.toString(request);
            if (stringifiedRequest.isEmpty()) {
                return false;
            }

            SharedPreferences sharedPreferences = context
                    .getSharedPreferences(sharedPreferencesDataField, Context.MODE_PRIVATE);
            Set<String> existedStringifiedRequestsSet = sharedPreferences
                    .getStringSet(sharedPreferencesRequestsField, new HashSet<>());

            existedStringifiedRequestsSet.add(stringifiedRequest);

            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putStringSet(sharedPreferencesRequestsField, existedStringifiedRequestsSet);
            return editor.commit();
        };
    }

    public static Supplier<Boolean> removeRequestCommand(Context context,
                                                         List<String> requestIds,
                                                         String sharedPreferencesDataField,
                                                         String sharedPreferencesRequestsField) {
        return () -> {
            if (context == null) {
                return false;
            } else if (requestIds == null || requestIds.isEmpty()) {
                return false;
            }

            Set<String> requestIdsSet = new HashSet<>(requestIds);

            SharedPreferences sharedPreferences = context
                    .getSharedPreferences(sharedPreferencesDataField, Context.MODE_PRIVATE);
            Set<String> existedStringifiedRequestsSet = sharedPreferences
                    .getStringSet(sharedPreferencesRequestsField, new HashSet<>());

            List<String> existedStringifiedRequestsList = new ArrayList<>(existedStringifiedRequestsSet);
            for (int i = 0; i < existedStringifiedRequestsList.size(); ++i) {
                String stringifiedRequest = existedStringifiedRequestsList.get(i);

                WidgetRequest request = WidgetRequestTransformer.fromString(stringifiedRequest);
                if (requestIdsSet.contains(request.id())) {
                    existedStringifiedRequestsSet.remove(stringifiedRequest);
                }
            }

            SharedPreferences.Editor editor = sharedPreferences.edit();
            if (existedStringifiedRequestsSet.size() > 0) {
                editor.putStringSet(sharedPreferencesRequestsField, existedStringifiedRequestsSet);
            } else {
                editor.remove(sharedPreferencesRequestsField);
            }

            return editor.commit();
        };
    }

    public static Supplier<Boolean> removeAllRequestsCommand(Context context,
                                                             String sharedPreferencesDataField,
                                                             String sharedPreferencesRequestsField) {
        return () -> {
            if (context == null) {
                return false;
            }

            SharedPreferences sharedPreferences = context
                    .getSharedPreferences(sharedPreferencesDataField, Context.MODE_PRIVATE);

            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.remove(sharedPreferencesRequestsField);
            return editor.commit();
        };
    }

    public static Supplier<List<WidgetRequest>> getAllWidgetRequestsCommand(Context context,
                                                                            String sharedPreferencesDataField,
                                                                            String sharedPreferencesRequestsField) {
        return () -> {
            if (context == null) {
                return new ArrayList<>();
            }

            SharedPreferences sharedPreferences = context
                    .getSharedPreferences(sharedPreferencesDataField, Context.MODE_PRIVATE);
            Set<String> existedStringifiedRequestsSet = sharedPreferences
                    .getStringSet(sharedPreferencesRequestsField, new HashSet<>());

            List<WidgetRequest> widgetRequestList = new ArrayList<>(existedStringifiedRequestsSet.size());
            List<String> existedStringifiedRequestsList = new ArrayList<>(existedStringifiedRequestsSet);
            for (int i = 0; i < existedStringifiedRequestsList.size(); ++i) {
                String stringifiedRequest = existedStringifiedRequestsList.get(i);

                WidgetRequest request = WidgetRequestTransformer.fromString(stringifiedRequest);
                if (!request.type().equalsIgnoreCase(WidgetRequestTypes.EMPTY_REQUEST)) {
                    widgetRequestList.add(request);
                }
            }

            return widgetRequestList;
        };
    }
}
