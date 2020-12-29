package com.tobuybeta.modules.app_widget;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tobuybeta.modules.app_widget.storage.Storage;
import com.tobuybeta.modules.app_widget.storage.events.StorageEvents;
import com.tobuybeta.modules.app_widget.storage.events.StorageEventsResultValues;
import com.tobuybeta.test_widget.MyTestWidget;

import java.util.HashMap;
import java.util.Map;

/**
 * TODO: Add a class header comment
 */

public class AppWidgetModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mContext;
    private static final String IS_WIDGET_ACTIVE_FIELD = "isActive";
    private static final String SHOPPING_LIST_ID_FIELD = "shoppingListId";

    public AppWidgetModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;

        Storage storage = Storage.get();

        storage.subscribe(StorageEvents.WIDGET_ACTIVE_CHANGED, (value) -> {
            boolean isActive = StorageEventsResultValues.widgetActiveChangedEventResult(value);

            WritableMap params = new WritableNativeMap();
            params.putBoolean(IS_WIDGET_ACTIVE_FIELD, isActive);

            emitEvent(mContext, StorageEvents.WIDGET_ACTIVE_CHANGED, params);
        });

        storage.subscribe(StorageEvents.SHOPPING_LIST_SET, (value) -> {
            String shoppingListId = StorageEventsResultValues.shoppingListSetEventResult(value);

            WritableMap params = new WritableNativeMap();
            params.putString(SHOPPING_LIST_ID_FIELD, shoppingListId);

            emitEvent(mContext, StorageEvents.SHOPPING_LIST_SET, params);
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
        constants.put(StorageEvents.WIDGET_ACTIVE_CHANGED, StorageEvents.WIDGET_ACTIVE_CHANGED);
        constants.put(StorageEvents.SHOPPING_LIST_SET, StorageEvents.SHOPPING_LIST_SET);
        return constants;
    }

    @ReactMethod
    public void getWidgetStatus(Promise promise) {
        Storage storage = Storage.get();

        boolean isWidgetActive = storage.isWidgetActive(mContext);
        String currentShoppingListId = storage.getShoppingListId(mContext);

        WritableMap resultMap = new WritableNativeMap();
        resultMap.putBoolean(IS_WIDGET_ACTIVE_FIELD, isWidgetActive);
        resultMap.putString(SHOPPING_LIST_ID_FIELD, currentShoppingListId);

        promise.resolve(resultMap);
    }

    @ReactMethod
    public void setShoppingList(String listId, String listName, ReadableArray productsList) {
        Storage.get().setShoppingList(mContext, listId, listName, productsList);

        Intent intent = new Intent(mContext, MyTestWidget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        int[] ids = AppWidgetManager.getInstance(mContext).
                getAppWidgetIds(new ComponentName(mContext, MyTestWidget.class));
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
        mContext.sendBroadcast(intent);
    }

    private void emitEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}