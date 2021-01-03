package com.tobuybeta.modules.app_widget.widget_models;

import android.content.Context;

import com.tobuybeta.modules.app_widget.widget_models.model.WidgetModel;

import java.util.HashMap;
import java.util.Map;

public class WidgetModels {
    private static WidgetModels mInstance;
    private Map<Integer, WidgetModel> mModels;

    private WidgetModels() {
        mModels = new HashMap<>();
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
            model = new WidgetModel(context);
            mModels.put(appWidgetId, model);
        }

        return model;
    }

    public void clear() {
        mModels.clear();
    }
}
