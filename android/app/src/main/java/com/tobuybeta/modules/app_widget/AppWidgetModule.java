package com.tobuybeta.modules.app_widget;

import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tobuybeta.modules.app_widget.common.action.Action;
import com.tobuybeta.modules.app_widget.common.error.Error;
import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.module_actions.payloads.AppWidgetActionPayloads;
import com.tobuybeta.modules.app_widget.module_actions.payloads.payloads.SetShoppingListPayload;
import com.tobuybeta.modules.app_widget.module_actions.types.AppWidgetActionTypes;
import com.tobuybeta.modules.app_widget.module_errors.AppWidgetErrors;
import com.tobuybeta.modules.app_widget.storage.Storage;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActions;
import com.tobuybeta.modules.app_widget.storage.actions.StorageActionResults;

import java.util.HashMap;
import java.util.Map;

/**
 * TODO: Add a class header comment
 */

public class AppWidgetModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    private Storage mStorage;

    private static final String ACTION_TYPE = "type";
    private static final String ACTION_PAYLOAD = "payload";

    private static final String IS_WIDGET_ACTIVE_FIELD = "isActive";
    private static final String SHOPPING_LIST_ID_FIELD = "shoppingListId";

    public AppWidgetModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        mStorage = Storage.get();

//        Storage storage = Storage.get();
//
//        storage.subscribe(StorageEvents.WIDGET_ACTIVE_CHANGED, (value) -> {
//            boolean isActive = StorageEventsResultValues.widgetActiveChangedEventResult(value);
//
//            WritableMap params = new WritableNativeMap();
//            params.putBoolean(IS_WIDGET_ACTIVE_FIELD, isActive);
//
//            emitEvent(mContext, StorageEvents.WIDGET_ACTIVE_CHANGED, params);
//        });
//
//        storage.subscribe(StorageEvents.SHOPPING_LIST_SET, (value) -> {
//            String shoppingListId = StorageEventsResultValues.shoppingListSetEventResult(value);
//
//            WritableMap params = new WritableNativeMap();
//            params.putString(SHOPPING_LIST_ID_FIELD, shoppingListId);
//
//            emitEvent(mContext, StorageEvents.SHOPPING_LIST_SET, params);
//        });
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
//        constants.put(StorageEvents.WIDGET_ACTIVE_CHANGED, StorageEvents.WIDGET_ACTIVE_CHANGED);
//        constants.put(StorageEvents.SHOPPING_LIST_SET, StorageEvents.SHOPPING_LIST_SET);
//
//        WritableMap map = new WritableNativeMap();
//        map.putString("ONE", "one");
//        map.putString("TWO", "two");
//
//        constants.put("MAP", map);

//        WritableMap eventConstants = new WritableNativeMap();
//        eventConstants.putString(StorageEvents.WIDGET_ACTIVE_CHANGED, StorageEvents.WIDGET_ACTIVE_CHANGED);
//
//        constants.put("events", eventConstants);

        WritableMap actionTypesConstants = new WritableNativeMap();
        actionTypesConstants.putString(AppWidgetActionTypes.GET_WIDGET_STATUS, AppWidgetActionTypes.GET_WIDGET_STATUS);
        actionTypesConstants.putString(AppWidgetActionTypes.SET_SHOPPING_LIST, AppWidgetActionTypes.SET_SHOPPING_LIST);

        constants.put("actionTypes", actionTypesConstants);

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

            case (AppWidgetActionTypes.SET_SHOPPING_LIST): {
                ReadableMap payloadMap = action.getMap(ACTION_PAYLOAD);
                if (payloadMap == null) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                SetShoppingListPayload payload = AppWidgetActionPayloads.setShoppingListPayload(payloadMap);
                if (!payload.isValid()) {
                    Error error = AppWidgetErrors.badPayload();
                    result.reject(error.code(), error.message());
                    return;
                }

                // ===
//                Toast.makeText(
//                        mContext,
//                        payload.listId() + " - " + payload.listName() + " - " + payload.productsList().size(),
//                        Toast.LENGTH_LONG
//                ).show();
                // ===

                mStorage.execute(
                        StorageActions.setShoppingListAction(
                                mContext,
                                payload.listId(),
                                payload.listName(),
                                payload.productsList()
                        )
                );

                // ===
                // =====
                Action getShoppingListsAction = StorageActions.getShoppingListsAction(mContext);
                mStorage.execute(getShoppingListsAction);
                GeneralizedList shoppingLists = StorageActionResults
                        .getShoppingListsActionResult(getShoppingListsAction.result().get());

                String savedShoppingLists = "";
                for (int i = 0; i < shoppingLists.size(); ++i) {
                    String listDescription = shoppingLists.id(i) + " - " + shoppingLists.name(i);
                    savedShoppingLists = savedShoppingLists + listDescription + "\n";
                }

                Toast.makeText(mContext, String.valueOf(shoppingLists.size()), Toast.LENGTH_LONG).show();
                // =====
                // ===

                result.resolve(true);
                break;
            }

            default: {
                Error error = AppWidgetErrors.unknownActionType();
                result.reject(error.code(), error.message());
            }
        }

//        String type = action.getString("type");
//        ReadableMap payload = action.getMap("payload");
//        if (payload == null) {
//            return;
//        }
//
//        String one = payload.getString("one");
//        String two = payload.getString("two");
//
//        Toast.makeText(mContext, type + " - " + one + " - " + two, Toast.LENGTH_LONG).show();
//
//        WritableMap resultMap = new WritableNativeMap();
//        resultMap.putInt("resOne", 1);
//        resultMap.putBoolean("resTwo", true);
//
//        result.resolve(resultMap);
    }

    @ReactMethod
    public void getWidgetStatus(Promise promise) {
//        Storage storage = Storage.get();
//
//        boolean isWidgetActive = storage.isWidgetActive(mContext);
//        String currentShoppingListId = storage.getShoppingListId(mContext);

        WritableMap resultMap = new WritableNativeMap();
        resultMap.putBoolean(IS_WIDGET_ACTIVE_FIELD, false);
        resultMap.putString(SHOPPING_LIST_ID_FIELD, "-1");

        promise.resolve(resultMap);
    }

    @ReactMethod
    public void setShoppingList(String listId, String listName, ReadableArray productsList) {
//        Storage.get().setShoppingList(mContext, listId, listName, productsList);
//
//        Intent intent = new Intent(mContext, MyTestWidget.class);
//        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
//        int[] ids = AppWidgetManager.getInstance(mContext).
//                getAppWidgetIds(new ComponentName(mContext, MyTestWidget.class));
//        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
//        mContext.sendBroadcast(intent);
    }

    private void emitEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
