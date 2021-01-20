package com.tobuybeta.modules.app_widget.storage.storages.widget_storage;

import android.content.Context;
import android.content.SharedPreferences;

import androidx.arch.core.util.Function;
import androidx.core.util.Supplier;

import com.tobuybeta.modules.app_widget.common.widget_list_info.WidgetListInfo;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_requests.requests.ChangeProductStatusRequest;
import com.tobuybeta.modules.app_widget.module_requests.transformer.WidgetRequestTransformer;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;
import com.tobuybeta.modules.app_widget.storage.storages.widget_storage.commands.StorageWidgetRequestCommands;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class WidgetStorage {
    private static final String WIDGET_DATA_FIELD = "DATA";
    private static final String PREFERENCES_WIDGET_ACTIVE_FIELD = "widgetActive";
    private static final String WIDGET_REQUESTS_FIELD = "widgetRequests";

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

    public boolean setWidgetRequest(Context context, WidgetRequest request) {
        if (!request.type().equalsIgnoreCase(WidgetRequestTypes.CHANGE_PRODUCT_STATUS_REQUEST)) {
            Supplier<Boolean> saveRequestCommand = StorageWidgetRequestCommands
                    .saveRequestCommand(context, request, WIDGET_DATA_FIELD, WIDGET_REQUESTS_FIELD);

            return saveRequestCommand.get();
        }

        ChangeProductStatusRequest changeProductStatusRequest = (ChangeProductStatusRequest) request;

        String listId = changeProductStatusRequest.listId();
        String productId = changeProductStatusRequest.productId();

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> existedStringifiedRequestsSet = sharedPreferences
                .getStringSet(WIDGET_REQUESTS_FIELD, new HashSet<>());

        List<String> existedStringifiedRequestsList = new ArrayList<>(existedStringifiedRequestsSet);
        String requestToRemoveId = null;
        for (int i = 0; i < existedStringifiedRequestsList.size(); ++i) {
            String existedStringifiedRequest = existedStringifiedRequestsList.get(i);
            WidgetRequest existedRequest = WidgetRequestTransformer.fromString(existedStringifiedRequest);
            if (existedRequest.type().equalsIgnoreCase(WidgetRequestTypes.CHANGE_PRODUCT_STATUS_REQUEST)) {
                ChangeProductStatusRequest existedChangeProductStatusRequest = (ChangeProductStatusRequest) existedRequest;

                String existedRequestListId = existedChangeProductStatusRequest.listId();
                String existedRequestProductId = existedChangeProductStatusRequest.productId();

                if (existedRequestListId.equalsIgnoreCase(listId) && existedRequestProductId.equalsIgnoreCase(productId)) {
                    requestToRemoveId = existedChangeProductStatusRequest.id();
                    break;
                }
            }
        }

        Supplier<Boolean> command = null;
        if (requestToRemoveId != null) {
            command = StorageWidgetRequestCommands.removeRequestCommand(
                    context,
                    Collections.singletonList(requestToRemoveId),
                    WIDGET_DATA_FIELD,
                    WIDGET_REQUESTS_FIELD
            );
        } else {
            command = StorageWidgetRequestCommands
                    .saveRequestCommand(context, request, WIDGET_DATA_FIELD, WIDGET_REQUESTS_FIELD);
        }

        return command.get();

//        Supplier<Boolean> saveRequestCommand = StorageWidgetRequestCommands
//                .saveRequestCommand(context, request, WIDGET_DATA_FIELD, WIDGET_REQUESTS_FIELD);
//
//        return saveRequestCommand.get();
    }
//    public boolean setWidgetRequest(Context context, WidgetRequest request) {
//        if (context == null) {
//            return false;
//        }
//
//        String stringifiedRequest = WidgetRequestTransformer.toString(request);
//        if (stringifiedRequest.isEmpty()) {
//            return false;
//        }
//
//        SharedPreferences sharedPreferences = context
//                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE);
//        Set<String> existedStringifiedRequestsSet = sharedPreferences
//                .getStringSet(WIDGET_REQUESTS_FIELD, new HashSet<>());
//
//        existedStringifiedRequestsSet.add(stringifiedRequest);
//
//        SharedPreferences.Editor editor = sharedPreferences.edit();
//        editor.putStringSet(WIDGET_REQUESTS_FIELD, existedStringifiedRequestsSet);
//        return editor.commit();
//    }

    public boolean removeAllWidgetRequests(Context context) {
        Supplier<Boolean> removeAllWidgetRequestsCommand = StorageWidgetRequestCommands
                .removeAllRequestsCommand(context, WIDGET_DATA_FIELD, WIDGET_REQUESTS_FIELD);

        return removeAllWidgetRequestsCommand.get();
    }

    public boolean removeWidgetRequests(Context context, List<String> requestIds) {
        Supplier<Boolean> removeWidgetRequestsCommand = StorageWidgetRequestCommands
                .removeRequestCommand(context, requestIds, WIDGET_DATA_FIELD, WIDGET_REQUESTS_FIELD);

        return removeWidgetRequestsCommand.get();
    }

    public List<WidgetRequest> getAllWidgetRequests(Context context) {
        Supplier<List<WidgetRequest>> getAllWidgetRequestsCommand = StorageWidgetRequestCommands
                .getAllWidgetRequestsCommand(context, WIDGET_DATA_FIELD, WIDGET_REQUESTS_FIELD);

        return getAllWidgetRequestsCommand.get();
    }

    public Function<Context, Boolean> getSaveRequestCommand(Context context, WidgetRequest request) {
        Function<Context, Boolean> emptySaveRequestCommand = (Context commandContext) -> false;
        Function<Context, Boolean> defaultSaveRequestCommand = (Context commandContext) -> {
            if (commandContext == null) {
                return false;
            }

            String stringifiedRequest = WidgetRequestTransformer.toString(request);
            if (stringifiedRequest.isEmpty()) {
                return false;
            }

            SharedPreferences sharedPreferences = commandContext
                    .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE);
            Set<String> existedStringifiedRequestsSet = sharedPreferences
                    .getStringSet(WIDGET_REQUESTS_FIELD, new HashSet<>());

            existedStringifiedRequestsSet.add(stringifiedRequest);

            SharedPreferences.Editor editor = sharedPreferences.edit();
            editor.putStringSet(WIDGET_REQUESTS_FIELD, existedStringifiedRequestsSet);
            return editor.commit();
        };
        Function<Context, Boolean> removeMutuallyExclusiveRequestCommand = (Context commandContext) -> {
            if (commandContext == null) {
                return false;
            }

            return false;
        };

        if (!request.type().equalsIgnoreCase(WidgetRequestTypes.CHANGE_PRODUCT_STATUS_REQUEST)) {
            return defaultSaveRequestCommand;
        }

        ChangeProductStatusRequest changeProductStatusRequest = (ChangeProductStatusRequest) request;

        String listId = changeProductStatusRequest.listId();
        String productId = changeProductStatusRequest.productId();

        SharedPreferences sharedPreferences = context
                .getSharedPreferences(WIDGET_DATA_FIELD, Context.MODE_PRIVATE);
        Set<String> existedStringifiedRequestsSet = sharedPreferences
                .getStringSet(WIDGET_REQUESTS_FIELD, new HashSet<>());

        List<String> existedStringifiedRequestsList = new ArrayList<>(existedStringifiedRequestsSet);
        String requestToRemoveId = null;
        for (int i = 0; i < existedStringifiedRequestsList.size(); ++i) {
            String existedStringifiedRequest = existedStringifiedRequestsList.get(i);
            WidgetRequest existedRequest = WidgetRequestTransformer.fromString(existedStringifiedRequest);
            if (existedRequest.type().equalsIgnoreCase(WidgetRequestTypes.CHANGE_PRODUCT_STATUS_REQUEST)) {
                ChangeProductStatusRequest existedChangeProductStatusRequest = (ChangeProductStatusRequest) existedRequest;

                String existedRequestListId = existedChangeProductStatusRequest.listId();
                String existedRequestProductId = existedChangeProductStatusRequest.productId();

                if (existedRequestListId.equalsIgnoreCase(listId) && existedRequestProductId.equalsIgnoreCase(productId)) {
                    requestToRemoveId = existedChangeProductStatusRequest.id();
                    break;
                }
            }
        }

        if (requestToRemoveId != null) {
            return removeMutuallyExclusiveRequestCommand;
        } else {
            return defaultSaveRequestCommand;
        }
    }
}
