package com.tobuybeta.modules.app_widget.widget_models;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

import com.tobuybeta.modules.app_widget.common.generalized_list.GeneralizedList;
import com.tobuybeta.modules.app_widget.storage.Storage;
import com.tobuybeta.modules.app_widget.storage.events.StorageEventPayloads;
import com.tobuybeta.modules.app_widget.storage.events.StorageEvents;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ProductRemovedEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ProductStatusChangedEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ShoppingListRemovedEventPayload;
import com.tobuybeta.modules.app_widget.storage.events.payloads.ShoppingListSetEventPayload;
import com.tobuybeta.modules.app_widget.widget_models.model.WidgetModel;
import com.tobuybeta.test_widget.MyTestWidget;

import java.util.HashMap;
import java.util.Map;

public class WidgetModels {
    private static WidgetModels mInstance;
    private Map<Integer, WidgetModel> mModels;
    private Storage mStorage;

    private WidgetModels() {
        mModels = new HashMap<>();

        mStorage = Storage.get();
        mStorage.subscribe(StorageEvents.SHOPPING_LIST_SET, (value) -> {
            ShoppingListSetEventPayload payload = StorageEventPayloads.toShoppingListSetEventPayload(value);
            Context context = payload.context();

            update(context);

            MyTestWidget.update(
                    context,
                    AppWidgetManager.getInstance(context).getAppWidgetIds(new ComponentName(context, MyTestWidget.class))
            );
        });
        mStorage.subscribe(StorageEvents.SHOPPING_LIST_REMOVED, (value) -> {
            ShoppingListRemovedEventPayload payload = StorageEventPayloads.toShoppingListRemovedEventPayload(value);
            Context context = payload.context();

            update(context);

            MyTestWidget.update(
                    context,
                    AppWidgetManager.getInstance(context).getAppWidgetIds(new ComponentName(context, MyTestWidget.class))
            );
        });
        mStorage.subscribe(StorageEvents.PRODUCT_REMOVED, (value) -> {
            ProductRemovedEventPayload payload = StorageEventPayloads.toProductRemovedEventPayload(value);
            Context context = payload.context();

            update(context);

            MyTestWidget.update(
                    context,
                    AppWidgetManager.getInstance(context).getAppWidgetIds(new ComponentName(context, MyTestWidget.class))
            );
        });
        mStorage.subscribe(StorageEvents.PRODUCT_STATUS_CHANGED, (value) -> {
            ProductStatusChangedEventPayload payload = StorageEventPayloads.toProductStatusChangedEventPayload(value);
            Context context = payload.context();

            update(context);

            MyTestWidget.update(
                    context,
                    AppWidgetManager.getInstance(context).getAppWidgetIds(new ComponentName(context, MyTestWidget.class))
            );
        });
    }

    public static synchronized WidgetModels get() {
        if (mInstance == null) {
            mInstance = new WidgetModels();
        }

        return mInstance;
    }

    public synchronized WidgetModel getOrCreate(Context context, int appWidgetId) {
        WidgetModel model;
        if (mModels.containsKey(appWidgetId)) {
            model = mModels.get(appWidgetId);
        } else {
            model = new WidgetModel(context, appWidgetId);
            mModels.put(appWidgetId, model);
        }

        return model;
    }

    public void update(Context context) {
        for (Map.Entry<Integer, WidgetModel> entry : mModels.entrySet()) {
            entry.getValue().update(context);
        }
    }

    public WidgetModel getOrNull(int appWidgetId) {
        if (mModels.containsKey(appWidgetId)) {
            return mModels.get(appWidgetId);
        }

        return null;
    }

    public void clear() {
        mModels.clear();
    }
}
