package com.tobuybeta.modules.app_widget;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tobuybeta.modules.app_widget.common.action.Action;
import com.tobuybeta.modules.app_widget.common.error.Error;
import com.tobuybeta.modules.app_widget.common.widget_request.WidgetRequest;
import com.tobuybeta.modules.app_widget.module_actions.payloads.AppWidgetJSActionPayloads;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.RemoveMultipleWidgetRequestsPayload;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.RemoveShoppingListPayload;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.SetInitialShoppingListsPayload;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.SetMultipleShoppingListsPayload;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.SetShoppingListPayload;
import com.tobuybeta.modules.app_widget.module_actions.types.AppWidgetActionTypes;
import com.tobuybeta.modules.app_widget.module_errors.AppWidgetErrors;
import com.tobuybeta.modules.app_widget.module_events.AppWidgetEventJSPayloads;
import com.tobuybeta.modules.app_widget.module_events.AppWidgetEventTypes;
import com.tobuybeta.modules.app_widget.module_requests.requests.ChangeProductStatusRequest;
import com.tobuybeta.modules.app_widget.module_requests.requests.OpenShoppingListRequest;
import com.tobuybeta.modules.app_widget.module_requests.transformer.WidgetRequestTransformer;
import com.tobuybeta.modules.app_widget.module_requests.types.WidgetRequestTypes;
import com.tobuybeta.modules.app_widget.storage.Storage;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActions;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActionResults;
import com.tobuybeta.modules.app_widget.storage.events.StorageEventPayloads;
import com.tobuybeta.modules.app_widget.storage.events.StorageEvents;
import com.tobuybeta.modules.app_widget.storage.events.payloads.WidgetRequestSetEventPayload;
import com.tobuybeta.modules.app_widget.widget.Widget;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AppWidgetModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    private Storage mStorage;

    private static final String ACTION_TYPE = "type";
    private static final String ACTION_PAYLOAD = "payload";

    public AppWidgetModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mStorage = Storage.get();

        mStorage.subscribe(StorageEvents.WIDGET_REQUEST_SET, (value) -> {
            WidgetRequestSetEventPayload payload = StorageEventPayloads.toWidgetRequestSetEventPayload(value);

            WidgetRequest request = payload.request();
            if (request.type().equalsIgnoreCase(WidgetRequestTypes.OPEN_SHOPPING_LIST_REQUEST)) {
                OpenShoppingListRequest openShoppingListRequest = (OpenShoppingListRequest) request;
                emitEvent(
                        mContext,
                        AppWidgetEventTypes.OPEN_SHOPPING_LIST_REQUEST_EVENT,
                        AppWidgetEventJSPayloads.openShoppingListRequestEventPayload(
                                openShoppingListRequest.listId()
                        )
                );
            } else if (request.type().equalsIgnoreCase(WidgetRequestTypes.CHANGE_PRODUCT_STATUS_REQUEST)) {
                ChangeProductStatusRequest changeProductStatusRequest = (ChangeProductStatusRequest) request;
                emitEvent(
                        mContext,
                        AppWidgetEventTypes.CHANGE_PRODUCT_STATUS_REQUEST_EVENT,
                        AppWidgetEventJSPayloads.changeProductStatusEventPayload(
                                changeProductStatusRequest.id(),
                                changeProductStatusRequest.listId(),
                                changeProductStatusRequest.productId(),
                                changeProductStatusRequest.productStatus()
                        )
                );
            }
        });
    }

    @NonNull
    @Override
    public String getName() {
        return "AppWidget";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        WritableMap actionTypesConstants = new WritableNativeMap();
        actionTypesConstants.putString(AppWidgetActionTypes.GET_WIDGET_STATUS, AppWidgetActionTypes.GET_WIDGET_STATUS);
        actionTypesConstants.putString(AppWidgetActionTypes.SET_SHOPPING_LIST, AppWidgetActionTypes.SET_SHOPPING_LIST);
        actionTypesConstants.putString(AppWidgetActionTypes.SET_INITIAL_SHOPPING_LISTS, AppWidgetActionTypes.SET_INITIAL_SHOPPING_LISTS);
        actionTypesConstants.putString(AppWidgetActionTypes.SET_MULTIPLE_SHOPPING_LISTS, AppWidgetActionTypes.SET_MULTIPLE_SHOPPING_LISTS);
        actionTypesConstants.putString(AppWidgetActionTypes.REMOVE_SHOPPING_LIST, AppWidgetActionTypes.REMOVE_SHOPPING_LIST);
        actionTypesConstants.putString(AppWidgetActionTypes.GET_ALL_WIDGET_REQUESTS, AppWidgetActionTypes.GET_ALL_WIDGET_REQUESTS);
        actionTypesConstants.putString(AppWidgetActionTypes.GET_AND_REMOVE_ALL_WIDGET_REQUESTS, AppWidgetActionTypes.GET_AND_REMOVE_ALL_WIDGET_REQUESTS);
        actionTypesConstants.putString(AppWidgetActionTypes.REMOVE_MULTIPLE_WIDGET_REQUESTS, AppWidgetActionTypes.REMOVE_MULTIPLE_WIDGET_REQUESTS);

        WritableMap widgetRequestsTypes = new WritableNativeMap();
        widgetRequestsTypes.putString(WidgetRequestTypes.EMPTY_REQUEST, WidgetRequestTypes.EMPTY_REQUEST);
        widgetRequestsTypes.putString(WidgetRequestTypes.OPEN_SHOPPING_LIST_REQUEST, WidgetRequestTypes.OPEN_SHOPPING_LIST_REQUEST);
        widgetRequestsTypes.putString(WidgetRequestTypes.MARK_PRODUCT_AS_BOUGHT_REQUEST, WidgetRequestTypes.MARK_PRODUCT_AS_BOUGHT_REQUEST);
        widgetRequestsTypes.putString(WidgetRequestTypes.CHANGE_PRODUCT_STATUS_REQUEST, WidgetRequestTypes.CHANGE_PRODUCT_STATUS_REQUEST);

        WritableMap widgetEventTypes = new WritableNativeMap();
        widgetEventTypes.putString(AppWidgetEventTypes.OPEN_SHOPPING_LIST_REQUEST_EVENT, AppWidgetEventTypes.OPEN_SHOPPING_LIST_REQUEST_EVENT);
        widgetEventTypes.putString(AppWidgetEventTypes.CHANGE_PRODUCT_STATUS_REQUEST_EVENT, AppWidgetEventTypes.CHANGE_PRODUCT_STATUS_REQUEST_EVENT);

        constants.put("actionTypes", actionTypesConstants);
        constants.put("widgetRequests", widgetRequestsTypes);
        constants.put("widgetEvents", widgetEventTypes);

        return constants;
    }

    @ReactMethod
    public void execute(ReadableMap action, Promise result) {
        if (action == null) {
            Error error = AppWidgetErrors.badAction();
            result.reject(error.code(), error.message());
            return;
        }

        final String type = action.getString(ACTION_TYPE);
        if (type == null) {
            Error error = AppWidgetErrors.badActionType();
            result.reject(error.code(), error.message());
            return;
        }

        switch (type) {
            case (AppWidgetActionTypes.GET_WIDGET_STATUS): {
                Action storageAction = StorageActions.getWidgetActiveAction(mContext);

                mStorage.execute(storageAction);

                boolean isActive = StorageActionResults
                        .getWidgetActiveActionResult(storageAction.result().get());

                WritableMap resultMap = new WritableNativeMap();
                resultMap.putBoolean("isActive", isActive);

                result.resolve(resultMap);
                break;
            }

            case (AppWidgetActionTypes.SET_INITIAL_SHOPPING_LISTS): {
                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                SetInitialShoppingListsPayload payload = AppWidgetJSActionPayloads.setInitialShoppingListsPayload(payloadMap);
                if (!payload.isValid()) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                mStorage.execute(
                        StorageActions.setInitialShoppingListsAction(mContext, payload.shoppingLists())
                );

                result.resolve(true);
                break;
            }

            case (AppWidgetActionTypes.SET_SHOPPING_LIST): {
                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                SetShoppingListPayload payload = AppWidgetJSActionPayloads.setShoppingListPayload(payloadMap);
                if (!payload.isValid()) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                mStorage.execute(
                        StorageActions.setShoppingListAction(
                                mContext,
                                payload.listId(),
                                payload.listName(),
                                payload.productsList()
                        )
                );

                result.resolve(true);
                break;
            }

            case (AppWidgetActionTypes.SET_MULTIPLE_SHOPPING_LISTS): {
                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                SetMultipleShoppingListsPayload payload = AppWidgetJSActionPayloads.setMultipleShoppingListsPayload(payloadMap);
                if (!payload.isValid()) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                mStorage.execute(
                        StorageActions.setMultipleShoppingListsAction(mContext, payload.shoppingLists())
                );

                result.resolve(true);
                break;
            }

            case (AppWidgetActionTypes.REMOVE_SHOPPING_LIST): {
                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                RemoveShoppingListPayload payload = AppWidgetJSActionPayloads.removeShoppingListPayload(payloadMap);
                if (!payload.isValid()) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                mStorage.execute(
                        StorageActions.removeShoppingListAction(mContext, payload.listId())
                );

                result.resolve(true);
                break;
            }

            case (AppWidgetActionTypes.GET_ALL_WIDGET_REQUESTS): {
                Action getAllWidgetRequestsAction = StorageActions.getAllWidgetRequestsAction(mContext);
                mStorage.execute(getAllWidgetRequestsAction);
                List<WidgetRequest> allWidgetRequests = StorageActionResults
                        .getAllWidgetRequestsActionResult(getAllWidgetRequestsAction.result().get());

                WritableArray jsObjectsArray = new WritableNativeArray();
                for (int i = 0; i < allWidgetRequests.size(); ++i) {
                    WidgetRequest request = allWidgetRequests.get(i);
                    WritableMap jsObject = WidgetRequestTransformer.toJsObject(request);
                    jsObjectsArray.pushMap(jsObject);
                }

                result.resolve(jsObjectsArray);
                break;
            }

            case (AppWidgetActionTypes.REMOVE_MULTIPLE_WIDGET_REQUESTS): {
                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                RemoveMultipleWidgetRequestsPayload payload = AppWidgetJSActionPayloads
                        .removeMultipleWidgetRequestsPayload(payloadMap);
                if (!payload.isValid()) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                mStorage.execute(StorageActions.removeWidgetRequests(mContext, payload.requestIds()));

                result.resolve(true);
                break;
            }

            case (AppWidgetActionTypes.GET_AND_REMOVE_ALL_WIDGET_REQUESTS): {
                Action getAllWidgetRequestsAction = StorageActions.getAllWidgetRequestsAction(mContext);
                mStorage.execute(getAllWidgetRequestsAction);
                List<WidgetRequest> allWidgetRequests = StorageActionResults
                        .getAllWidgetRequestsActionResult(getAllWidgetRequestsAction.result().get());

                WritableArray jsObjectsArray = new WritableNativeArray();
                for (int i = 0; i < allWidgetRequests.size(); ++i) {
                    WidgetRequest request = allWidgetRequests.get(i);
                    WritableMap jsObject = WidgetRequestTransformer.toJsObject(request);
                    jsObjectsArray.pushMap(jsObject);
                }

                mStorage.execute(StorageActions.removeAllWidgetRequestsAction(mContext));

                result.resolve(jsObjectsArray);
                break;
            }

            default: {
                Error error = AppWidgetErrors.unknownActionType();
                result.reject(error.code(), error.message());
            }
        }

        Widget.update(
                mContext,
                AppWidgetManager.getInstance(mContext).getAppWidgetIds(new ComponentName(mContext, Widget.class))
        );
    }

//    @ReactMethod
//    public void getWidgetStatus(Promise promise) {
//        WritableMap resultMap = new WritableNativeMap();
//        resultMap.putBoolean(IS_WIDGET_ACTIVE_FIELD, false);
//        resultMap.putString(SHOPPING_LIST_ID_FIELD, "-1");
//
//        promise.resolve(resultMap);
//    }

//    @ReactMethod
//    public void setShoppingList(String listId, String listName, ReadableArray productsList) {
////        Storage.get().setShoppingList(mContext, listId, listName, productsList);
////
////        Intent intent = new Intent(mContext, MyTestWidget.class);
////        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
////        int[] ids = AppWidgetManager.getInstance(mContext).
////                getAppWidgetIds(new ComponentName(mContext, MyTestWidget.class));
////        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
////        mContext.sendBroadcast(intent);
//    }

    private void emitEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
