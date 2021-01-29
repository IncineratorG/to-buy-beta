package com.tobuybeta.modules.app_widget.common.action;

import java.util.HashMap;
import java.util.Map;

public class ActionPayload {
    private Object mDefaultValue;
    private Map<String, Object> mValues;

    public ActionPayload() {
        mValues = new HashMap<>();
    }

    public ActionPayload(Object value) {
        mDefaultValue = value;
        mValues = new HashMap<>();
    }

    public void set(String type, Object value) {
        mValues.put(type, value);
    }

    public void setDefault(Object value) {
        mDefaultValue = value;
    }

    public Object get(String type) {
        return mValues.get(type);
    }

    public Object getDefault() {
        return mDefaultValue;
    }
}
