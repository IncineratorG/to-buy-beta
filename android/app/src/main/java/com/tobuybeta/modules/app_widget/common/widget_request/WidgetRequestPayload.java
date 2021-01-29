package com.tobuybeta.modules.app_widget.common.widget_request;

import java.util.HashMap;
import java.util.Map;

public class WidgetRequestPayload {
    private Map<String, Object> mValues;

    public WidgetRequestPayload() {
        mValues = new HashMap<>();
    }

    public void set(String type, Object value) {
        mValues.put(type, value);
    }

    public Object get(String type) {
        return mValues.get(type);
    }
}
